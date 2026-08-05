"use client";

import { FormEvent, useState } from 'react';
import type { GoalDraft, GoalPriority } from '@/shared/types/Types';
import { Button } from '../../UI/Button';
import styles from './CourseInput.module.css';

type Props = {
  onAddGoal: (goal: GoalDraft) => boolean;
};

const MAX_LENGTH = 80;

const CourseInput = ({ onAddGoal }: Props) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [priority, setPriority] = useState<GoalPriority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const goalInputChangeHandler = (value: string) => {
    setEnteredValue(value);
    if (value.trim()) setError('');
  };

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const goal = enteredValue.trim();

    if (!goal) {
      setError('Enter a goal before adding it.');
      return;
    }

    if (!onAddGoal({ text: goal, priority, dueDate: dueDate || null })) {
      setError('This goal is already on your list.');
      return;
    }

    setEnteredValue('');
    setPriority('medium');
    setDueDate('');
    setError('');
  };

  return (
    <form onSubmit={formSubmitHandler} noValidate>
      <div className={`${styles['form-control']} ${error ? styles.invalid : ''}`}>
        <label htmlFor="course-goal">Course goal</label>
        <input
          id="course-goal"
          type="text"
          value={enteredValue}
          maxLength={MAX_LENGTH}
          onChange={(event) => goalInputChangeHandler(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'goal-error goal-counter' : 'goal-counter'}
          autoComplete="off"
          placeholder="e.g. Complete module 3"
        />
        <div className={styles['input-meta']}>
          <span>{error && <span id="goal-error" className={styles.error}>{error}</span>}</span>
          <span id="goal-counter" className={styles.counter}>{enteredValue.length}/{MAX_LENGTH}</span>
        </div>
      </div>
      <div className={styles.options}>
        <label>
          Priority
          <select value={priority} onChange={(event) => setPriority(event.target.value as GoalPriority)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          Due date <span>(optional)</span>
          <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
        </label>
      </div>
      <Button type="submit">Add goal</Button>
    </form>
  );
};

export default CourseInput;
