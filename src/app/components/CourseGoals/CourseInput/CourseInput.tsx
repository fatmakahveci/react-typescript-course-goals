"use client";

import { ButtonHTMLAttributes, ChangeEvent, DetailedHTMLProps, FC, FormEvent, useState } from 'react';
import Button from '../../UI/Button';
import './CourseInput.css';
import styled, { IStyledComponent } from "styled-components";

type Props = {
    onAddGoal: Function;
    invalid: boolean;
};

const FormControl: IStyledComponent<"web", DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = styled.div`
    margin: 0.5rem 0;

    & label {
        font-weight: bold;
        display: block;
        margin-bottom: 0.5rem;
        color: ${props => (props.invalid ? 'red' : 'black')};
    }
  
    & input {
        display: block;
        width: 100%;
        border: 1px solid ${props => (props.invalid ? 'red' : '#ccc')};
        background: ${props => (props.invalid ? '#ffd7d7' : 'transparent')};
        font: inherit;
        line-height: 1.5rem;
        padding: 0 0.25rem;
    }
    
    & input:focus {
        outline: none;
        background: #fad0ec;
        border-color: #8b005d;
    }
`;

const CourseInput: FC<Props> = ({ onAddGoal, invalid }): JSX.Element => {
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
            <FormControl invalid={!isValid}>
                <label style={{ color: !isValid ? 'red' : 'black' }}>Course Goal
                    <input type="text" onChange={goalInputChangeHandler} />
                </label>
                </FormControl>
            <Button>Add Goal</Button>
        </form>
    );
};

export default CourseInput;
