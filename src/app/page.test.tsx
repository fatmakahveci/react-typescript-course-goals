import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Home from './page';

const addGoal = (text: string) => {
  fireEvent.change(screen.getByPlaceholderText('e.g. Complete module 3'), {
    target: { value: text },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Add goal' }));
};

describe('Course Goals', () => {
  it('adds a new goal and persists it', () => {
    render(<Home />);

    addGoal('Review TypeScript notes');

    expect(screen.getByText('Review TypeScript notes')).toBeInTheDocument();
    expect(window.localStorage.getItem('course-goals')).toContain('Review TypeScript notes');
  });

  it('rejects duplicate goals', () => {
    render(<Home />);

    addGoal('Do all exercises!');

    expect(screen.getByText('This goal is already on your list.')).toBeInTheDocument();
  });

  it('marks goals as completed and filters the list', () => {
    render(<Home />);
    const goal = screen.getByText('Do all exercises!').closest('li');

    fireEvent.click(within(goal!).getByRole('checkbox'));

    expect(screen.getByText('1 of 2 completed')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Active' }));
    expect(screen.queryByText('Do all exercises!')).not.toBeInTheDocument();
    expect(screen.getByText('Finish the course!')).toBeInTheDocument();
  });

  it('edits an existing goal', () => {
    render(<Home />);

    fireEvent.click(screen.getByRole('button', { name: 'Edit goal: Finish the course!' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Edit goal' }), {
      target: { value: 'Finish the React course!' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('Finish the React course!')).toBeInTheDocument();
  });

  it('adds priority and due-date metadata', () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText('Priority'), { target: { value: 'high' } });
    fireEvent.change(screen.getByLabelText(/Due date/), { target: { value: '2027-01-15' } });
    addGoal('Ship the capstone');

    const goal = screen.getByText('Ship the capstone').closest('li');
    expect(within(goal!).getByText('high')).toBeInTheDocument();
    expect(within(goal!).getByText(/Due Jan 15, 2027/)).toBeInTheDocument();
  });

  it('adds a category and finds the goal by category', () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'TypeScript' } });
    addGoal('Study generics');

    const goal = screen.getByText('Study generics').closest('li');
    expect(within(goal!).getByText('TypeScript')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search goals…'), { target: { value: 'typescript' } });
    expect(screen.getByText('Study generics')).toBeInTheDocument();
    expect(screen.queryByText('Finish the course!')).not.toBeInTheDocument();
  });

  it('adds, completes, and deletes a subtask', () => {
    render(<Home />);
    const goal = screen.getByText('Finish the course!').closest('li')!;
    const subtaskInput = within(goal).getByRole('textbox', { name: 'Add a subtask to Finish the course!' });

    fireEvent.change(subtaskInput, { target: { value: 'Submit the final project' } });
    fireEvent.click(within(goal).getByRole('button', { name: 'Add' }));

    const subtask = within(goal).getByText('Submit the final project');
    fireEvent.click(subtask.closest('label')!.querySelector('input')!);
    expect(within(goal).getByText('1/1')).toBeInTheDocument();
    fireEvent.click(within(goal).getByRole('button', { name: 'Delete subtask: Submit the final project' }));
    expect(within(goal).queryByText('Submit the final project')).not.toBeInTheDocument();
  });

  it('applies and persists the selected theme', async () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText('Theme'), { target: { value: 'dark' } });

    await waitFor(() => expect(document.documentElement).toHaveAttribute('data-theme', 'dark'));
    expect(window.localStorage.getItem('course-goals-theme')).toBe('dark');
  });

  it('sorts goals by priority', () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText('Priority'), { target: { value: 'low' } });
    addGoal('Low priority reading');
    fireEvent.change(screen.getByLabelText('Sort by'), { target: { value: 'priority' } });

    const goalTexts = within(document.querySelector('ul')!).getAllByRole('listitem')
      .map((item) => item.querySelector('strong')?.textContent);
    expect(goalTexts).toEqual(['Do all exercises!', 'Finish the course!', 'Low priority reading']);
  });

  it('shows an overdue indicator for past due dates', () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText(/Due date/), { target: { value: '2020-01-01' } });
    addGoal('Review overdue lesson');

    const goal = screen.getByText('Review overdue lesson').closest('li');
    expect(within(goal!).getByText(/\(overdue\)/)).toBeInTheDocument();
  });

  it('migrates goals from an older JSON backup', async () => {
    render(<Home />);
    const backup = JSON.stringify([{
      id: 'legacy-goal',
      text: 'Imported legacy goal',
      completed: false,
      createdAt: '2025-01-01T00:00:00.000Z',
    }]);
    const file = new File([backup], 'goals.json', { type: 'application/json' });
    Object.defineProperty(file, 'text', { value: async () => backup });

    fireEvent.change(screen.getByLabelText('Import JSON'), { target: { files: [file] } });

    expect(await screen.findByText('Imported legacy goal')).toBeInTheDocument();
    expect(screen.getByText('medium')).toBeInTheDocument();
    expect(screen.getByText('1 goals restored.')).toBeInTheDocument();
  });

  it('rejects an invalid JSON backup without replacing goals', async () => {
    render(<Home />);
    const file = new File(['not-json'], 'invalid.json', { type: 'application/json' });
    Object.defineProperty(file, 'text', { value: async () => 'not-json' });

    fireEvent.change(screen.getByLabelText('Import JSON'), { target: { files: [file] } });

    expect(await screen.findByText('No valid goals found in this file.')).toBeInTheDocument();
    expect(screen.getByText('Do all exercises!')).toBeInTheDocument();
    expect(screen.getByText('Finish the course!')).toBeInTheDocument();
  });

  it('exports goals as a JSON download', async () => {
    render(<Home />);
    const createObjectURL = vi.fn(() => 'blob:course-goals');
    const revokeObjectURL = vi.fn();
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: createObjectURL });
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: revokeObjectURL });
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);

    fireEvent.click(screen.getByRole('button', { name: 'Export JSON' }));

    await waitFor(() => expect(createObjectURL).toHaveBeenCalledOnce());
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:course-goals');
    expect(screen.getByText('Backup downloaded.')).toBeInTheDocument();
  });

  it('clears all completed goals at once', () => {
    render(<Home />);
    const goal = screen.getByText('Do all exercises!').closest('li');
    fireEvent.click(within(goal!).getByRole('checkbox'));

    fireEvent.click(screen.getByRole('button', { name: 'Clear completed' }));

    expect(screen.queryByText('Do all exercises!')).not.toBeInTheDocument();
    expect(screen.getByText('Finish the course!')).toBeInTheDocument();
  });
});
