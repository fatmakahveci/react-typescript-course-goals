"use client";

import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Button } from '../../UI/Button';
import styles from './CourseInput.module.css';

type Props = {
    onAddGoal: Function;
};

const CourseInput: FC<Props> = ({ onAddGoal }): JSX.Element => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isValid, setIsValid] = useState(true);

    const goalInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.value.trim().length > 0) {
            setIsValid(true);
        }
        setEnteredValue(e.target.value);
    };

    const formSubmitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (enteredValue.trim().length === 0) {
            setIsValid(false);
            return;
        }
        onAddGoal(enteredValue);
    };

    return (
        <form onSubmit={formSubmitHandler}>
            <div className={`${styles['form-control']} ${!isValid && styles.invalid}`}>
                <label>Course Goal
                    <input type="text" onChange={goalInputChangeHandler} />
                </label>
            </div>
            <Button type="submit">Add Goal</Button>
        </form>
    );
};

export default CourseInput;
