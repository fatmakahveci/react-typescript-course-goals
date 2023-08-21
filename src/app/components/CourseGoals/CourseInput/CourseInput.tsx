"use client";

import { useState } from 'react';
import './CourseInput.css';
import Button from '../../UI/Button';

type Props = {
    onAddGoal: Function;
};

const CourseInput: React.FC<Props> = ({ onAddGoal }): JSX.Element => {
    const [enteredValue, setEnteredValue] = useState('');

    const goalInputChangeHandler = (event: any) => {
        setEnteredValue(event.target.value);
    };

    const formSubmitHandler = (event: any) => {
        event.preventDefault();
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
