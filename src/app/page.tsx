"use client";

import { useMemo, useState, useSyncExternalStore } from 'react';
import type { CourseGoal } from '@/shared/types/Types';
import CourseGoalList from './components/CourseGoals/CourseGoalList/CourseGoalList';
import CourseInput from './components/CourseGoals/CourseInput/CourseInput';

const INITIAL_GOALS: CourseGoal[] = [
  { text: 'Do all exercises!', id: 'g1', completed: false, createdAt: '2026-08-05T09:00:00.000Z' },
  { text: 'Finish the course!', id: 'g2', completed: false, createdAt: '2026-08-05T09:05:00.000Z' },
];

const STORAGE_KEY = 'course-goals';
const STORAGE_EVENT = 'course-goals-change';
const INITIAL_GOALS_JSON = JSON.stringify(INITIAL_GOALS);
type GoalFilter = 'all' | 'active' | 'completed';

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

const parseGoals = (snapshot: string): CourseGoal[] => {
  try {
    const storedGoals = JSON.parse(snapshot) as Partial<CourseGoal>[];
    if (!Array.isArray(storedGoals)) return INITIAL_GOALS;
    return storedGoals
      .filter((goal): goal is Partial<CourseGoal> & { id: string; text: string } =>
        typeof goal.id === 'string' && typeof goal.text === 'string',
      )
      .map((goal) => ({
        id: goal.id,
        text: goal.text,
        completed: Boolean(goal.completed),
        createdAt: goal.createdAt ?? new Date(0).toISOString(),
      }));
  } catch {
    return INITIAL_GOALS;
  }
};

export default function Home() {
  const goalsSnapshot = useSyncExternalStore(subscribeToGoals, getGoalsSnapshot, getServerGoalsSnapshot);
  const courseGoals = useMemo(() => parseGoals(goalsSnapshot), [goalsSnapshot]);
  const [filter, setFilter] = useState<GoalFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const updateGoals = (update: (goals: CourseGoal[]) => CourseGoal[]) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(update(courseGoals)));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  };

  const addGoalHandler = (enteredText: string) => {
    const isDuplicate = courseGoals.some(
      (goal) => goal.text.toLocaleLowerCase() === enteredText.toLocaleLowerCase(),
    );
    if (isDuplicate) return false;

    updateGoals((previousGoals) => [
      {
        text: enteredText,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...previousGoals,
    ]);
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

  const completedCount = courseGoals.filter((goal) => goal.completed).length;
  const progress = courseGoals.length === 0 ? 0 : Math.round((completedCount / courseGoals.length) * 100);
  const visibleGoals = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
    return courseGoals.filter((goal) => {
      const matchesFilter = filter === 'all'
        || (filter === 'active' && !goal.completed)
        || (filter === 'completed' && goal.completed);
      return matchesFilter && goal.text.toLocaleLowerCase().includes(normalizedSearch);
    });
  }, [courseGoals, filter, searchTerm]);

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

        {visibleGoals.length > 0 ? (
          <CourseGoalList items={visibleGoals} onDeleteItem={deleteItemHandler} onToggleItem={toggleItemHandler} />
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
