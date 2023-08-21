"use client";

import { FC, useState } from 'react';
import Button from '../../UI/Button';
import './CourseInput.css';

type Props = {
    onAddGoal: Function;
};

const CourseInput: FC<Props> = ({ onAddGoal }): JSX.Element => {
    const [enteredValue, setEnteredValue] = useState('');

    const goalInputChangeHandler = (e: any) => {
        setEnteredValue(e.target.value);
    };

    const formSubmitHandler = (e: any) => {
        e.preventDefault();
        onAddGoal(enteredValue);
    };

    return (
        <form onSubmit={formSubmitHandler}>
            <div className="form-control">
                <label>Course Goal
                    <input type="text" onChange={goalInputChangeHandler} />
                </label>
            </div>
            <Button type="submit">Add Goal</Button>
        </form>
    );
};

export default CourseInput;
