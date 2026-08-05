"use client";

import { CourseGoal } from '@/shared/types/Types';
import CourseGoalItem from '../CourseGoalItem/CourseGoalItem';
import styles from "./CourseGoalList.module.css";

type Props = {
    items: CourseGoal[];
    onDeleteItem: (id: string) => void;
    onToggleItem: (id: string) => void;
}

const CourseGoalList = ({ items, onDeleteItem, onToggleItem }: Props) => {
    return (
        <ul className={`${styles['goal-list']}`}>
            {items.map((goal) => (
                <CourseGoalItem
                    key={goal.id}
                    id={goal.id}
                    completed={goal.completed}
                    createdAt={goal.createdAt}
                    onDelete={onDeleteItem}
                    onToggle={onToggleItem}
                >
                    {goal.text}
                </CourseGoalItem>
            ))}
        </ul>
    );
};

export default CourseGoalList;
