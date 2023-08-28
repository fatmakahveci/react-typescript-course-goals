"use client";

import { CourseGoal } from '@/shared/types/Types';
import { FC } from "react";
import CourseGoalItem from '../CourseGoalItem/CourseGoalItem';
import styles from "./CourseGoalList.module.css";

type Props = {
    items: CourseGoal[];
    onDeleteItem: Function;
}

const CourseGoalList: FC<Props> = ({ items, onDeleteItem }): JSX.Element => {
    return (
        <ul className={`${styles['goal-list']}`}>
            {items.map((goal: CourseGoal) => (
                <CourseGoalItem
                    key={goal.id}
                    id={goal.id}
                    onDelete={onDeleteItem}
                >
                    {goal.text}
                </CourseGoalItem>
            ))}
        </ul>
    );
};

export default CourseGoalList;
