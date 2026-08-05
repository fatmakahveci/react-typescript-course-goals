"use client";

import { ChangeEvent, useMemo, useState, useSyncExternalStore } from 'react';
import type { CourseGoal, GoalDraft, GoalPriority } from '@/shared/types/Types';
import CourseGoalList from './components/CourseGoals/CourseGoalList/CourseGoalList';
import CourseInput from './components/CourseGoals/CourseInput/CourseInput';

const INITIAL_GOALS: CourseGoal[] = [
  { text: 'Do all exercises!', id: 'g1', completed: false, createdAt: '2026-08-05T09:00:00.000Z', priority: 'high', dueDate: null },
  { text: 'Finish the course!', id: 'g2', completed: false, createdAt: '2026-08-05T09:05:00.000Z', priority: 'medium', dueDate: null },
];

const STORAGE_KEY = 'course-goals';
const STORAGE_EVENT = 'course-goals-change';
const INITIAL_GOALS_JSON = JSON.stringify(INITIAL_GOALS);
type GoalFilter = 'all' | 'active' | 'completed';
type GoalSort = 'newest' | 'oldest' | 'priority' | 'due-date';
const PRIORITY_ORDER: Record<GoalPriority, number> = { high: 0, medium: 1, low: 2 };

const subscribeToGoals = (callback: () => void) => {
  window.addEventListener('storage', callback);
  window.addEventListener(STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
};

const getGoalsSnapshot = () => window.localStorage.getItem(STORAGE_KEY) ?? INITIAL_GOALS_JSON;
const getServerGoalsSnapshot = () => INITIAL_GOALS_JSON;

const parseGoals = (snapshot: string, fallback: CourseGoal[] = INITIAL_GOALS): CourseGoal[] => {
  try {
    const storedGoals = JSON.parse(snapshot) as Partial<CourseGoal>[];
    if (!Array.isArray(storedGoals)) return fallback;
    return storedGoals
      .filter((goal): goal is Partial<CourseGoal> & { id: string; text: string } =>
        typeof goal.id === 'string' && typeof goal.text === 'string',
      )
      .map((goal) => ({
        id: goal.id,
        text: goal.text,
        completed: Boolean(goal.completed),
        createdAt: typeof goal.createdAt === 'string' && !Number.isNaN(Date.parse(goal.createdAt))
          ? goal.createdAt
          : new Date(0).toISOString(),
        priority: ['low', 'medium', 'high'].includes(goal.priority ?? '') ? goal.priority as GoalPriority : 'medium',
        dueDate: typeof goal.dueDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(goal.dueDate) ? goal.dueDate : null,
      }));
  } catch {
    return fallback;
  }
};

export default function Home() {
  const goalsSnapshot = useSyncExternalStore(subscribeToGoals, getGoalsSnapshot, getServerGoalsSnapshot);
  const courseGoals = useMemo(() => parseGoals(goalsSnapshot), [goalsSnapshot]);
  const [filter, setFilter] = useState<GoalFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState<GoalSort>('newest');
  const [backupMessage, setBackupMessage] = useState('');

  const updateGoals = (update: (goals: CourseGoal[]) => CourseGoal[]) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(update(courseGoals)));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  };

  const addGoalHandler = (draft: GoalDraft) => {
    const isDuplicate = courseGoals.some(
      (goal) => goal.text.toLocaleLowerCase() === draft.text.toLocaleLowerCase(),
    );
    if (isDuplicate) return false;

    updateGoals((previousGoals) => [
      {
        ...draft,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...previousGoals,
    ]);
    return true;
  };

  const editItemHandler = (goalId: string, text: string) => {
    const normalizedText = text.trim();
    const isDuplicate = courseGoals.some(
      (goal) => goal.id !== goalId && goal.text.toLocaleLowerCase() === normalizedText.toLocaleLowerCase(),
    );
    if (!normalizedText || isDuplicate) return false;
    updateGoals((previousGoals) => previousGoals.map((goal) =>
      goal.id === goalId ? { ...goal, text: normalizedText } : goal,
    ));
    return true;
  };

  const deleteItemHandler = (goalId: string) => {
    updateGoals((previousGoals) =>
      previousGoals.filter((goal) => goal.id !== goalId),
    );
  };

  const toggleItemHandler = (goalId: string) => {
    updateGoals((previousGoals) =>
      previousGoals.map((goal) =>
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal,
      ),
    );
  };

  const clearCompletedHandler = () => {
    updateGoals((previousGoals) => previousGoals.filter((goal) => !goal.completed));
  };

  const exportGoalsHandler = () => {
    const blob = new Blob([JSON.stringify(courseGoals, null, 2)], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `course-goals-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(downloadUrl);
    setBackupMessage('Backup downloaded.');
  };

  const importGoalsHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.size > 1_000_000) {
      setBackupMessage('Backup file must be smaller than 1 MB.');
      return;
    }
    const importedGoals = parseGoals(await file.text(), []);
    if (importedGoals.length === 0) {
      setBackupMessage('No valid goals found in this file.');
      return;
    }
    updateGoals(() => importedGoals);
    setBackupMessage(`${importedGoals.length} goals restored.`);
  };

  const completedCount = courseGoals.filter((goal) => goal.completed).length;
  const progress = courseGoals.length === 0 ? 0 : Math.round((completedCount / courseGoals.length) * 100);
  const visibleGoals = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
    const filteredGoals = courseGoals.filter((goal) => {
      const matchesFilter = filter === 'all'
        || (filter === 'active' && !goal.completed)
        || (filter === 'completed' && goal.completed);
      return matchesFilter && goal.text.toLocaleLowerCase().includes(normalizedSearch);
    });
    return [...filteredGoals].sort((first, second) => {
      if (sort === 'oldest') return first.createdAt.localeCompare(second.createdAt);
      if (sort === 'priority') return PRIORITY_ORDER[first.priority] - PRIORITY_ORDER[second.priority];
      if (sort === 'due-date') return (first.dueDate ?? '9999-12-31').localeCompare(second.dueDate ?? '9999-12-31');
      return second.createdAt.localeCompare(first.createdAt);
    });
  }, [courseGoals, filter, searchTerm, sort]);

  return (
    <main>
      <section id="goal-form" aria-labelledby="page-title">
        <h1 id="page-title">Course goals</h1>
        <p className="intro">Keep your learning targets clear and actionable.</p>
        <CourseInput onAddGoal={addGoalHandler} />
      </section>
      <section id="goals" aria-live="polite">
        <div className="goal-summary">
          <div>
            <strong>{completedCount} of {courseGoals.length} completed</strong>
            <span>{progress}% progress</span>
          </div>
          <div className="progress-track" role="progressbar" aria-label="Course goal progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="goal-tools">
          <label className="search-field">
            <span className="sr-only">Search goals</span>
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search goals…" />
          </label>
          <div className="filters" aria-label="Filter goals">
            {(['all', 'active', 'completed'] as GoalFilter[]).map((item) => (
              <button key={item} type="button" className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} aria-pressed={filter === item}>
                {item[0].toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="secondary-tools">
          <label>
            <span>Sort by</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as GoalSort)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="priority">Priority</option>
              <option value="due-date">Due date</option>
            </select>
          </label>
          <div className="backup-actions">
            <button type="button" onClick={exportGoalsHandler}>Export JSON</button>
            <label className="import-button">
              Import JSON
              <input type="file" accept="application/json,.json" onChange={importGoalsHandler} />
            </label>
          </div>
        </div>
        {backupMessage && <p className="backup-message" role="status">{backupMessage}</p>}

        {visibleGoals.length > 0 ? (
          <CourseGoalList items={visibleGoals} onDeleteItem={deleteItemHandler} onToggleItem={toggleItemHandler} onEditItem={editItemHandler} />
        ) : (
          <p className="empty-state">
            {courseGoals.length === 0 ? 'No goals yet. Add your first one above.' : 'No goals match this view.'}
          </p>
        )}
        {completedCount > 0 && (
          <button className="clear-button" type="button" onClick={clearCompletedHandler}>Clear completed</button>
        )}
      </section>
    </main>
  );
}
