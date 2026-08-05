"use client";

import { CourseGoal } from '@/shared/types/Types';
import CourseGoalItem from '../CourseGoalItem/CourseGoalItem';
import styles from "./CourseGoalList.module.css";

type Props = {
    items: CourseGoal[];
    onDeleteItem: (id: string) => void;
    onToggleItem: (id: string) => void;
    onEditItem: (id: string, text: string) => boolean;
}

const CourseGoalList = ({ items, onDeleteItem, onToggleItem, onEditItem }: Props) => {
    return (
        <ul className={`${styles['goal-list']}`}>
            {items.map((goal) => (
                <CourseGoalItem
                    key={goal.id}
                    id={goal.id}
                    completed={goal.completed}
                    createdAt={goal.createdAt}
                    priority={goal.priority}
                    dueDate={goal.dueDate}
                    onDelete={onDeleteItem}
                    onToggle={onToggleItem}
                    onEdit={onEditItem}
                    text={goal.text}
                />
            ))}
        </ul>
    );
};

export default CourseGoalList;
