"use client";

import type { ReactNode } from "react";
import styles from "./CourseGoalItem.module.css";

type Props = {
    id: string;
    completed: boolean;
    createdAt: string;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
    children: ReactNode;
};

const CourseGoalItem = ({ onDelete, onToggle, id, completed, createdAt, children }: Props) => {
    const dateLabel = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short' }).format(new Date(createdAt));

    return (
        <li className={`${styles['goal-item']} ${completed ? styles.completed : ''}`}>
            <label className={styles.content}>
                <input type="checkbox" checked={completed} onChange={() => onToggle(id)} />
                <span>
                    <strong>{children}</strong>
                    <small>Added {dateLabel}</small>
                </span>
            </label>
            <button type="button" onClick={() => onDelete(id)} aria-label={`Delete goal: ${children}`}>
                Delete
            </button>
        </li>
    );
};

export default CourseGoalItem;
