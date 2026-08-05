"use client";

import { FormEvent, useState } from 'react';
import { Button } from '../../UI/Button';
import styles from './CourseInput.module.css';

type Props = {
  onAddGoal: (goal: string) => boolean;
};

const MAX_LENGTH = 80;

const CourseInput = ({ onAddGoal }: Props) => {
  const [enteredValue, setEnteredValue] = useState('');
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

    if (!onAddGoal(goal)) {
      setError('This goal is already on your list.');
      return;
    }

    setEnteredValue('');
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
      <Button type="submit">Add goal</Button>
    </form>
  );
};

export default CourseInput;
