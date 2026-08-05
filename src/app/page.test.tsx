import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
});
