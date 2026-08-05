"use client";

import { FormEvent, useState } from "react";
import type { GoalPriority } from '@/shared/types/Types';
import styles from "./CourseGoalItem.module.css";

type Props = {
    id: string;
    completed: boolean;
    createdAt: string;
    priority: GoalPriority;
    dueDate: string | null;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
    onEdit: (id: string, text: string) => boolean;
    text: string;
};

const CourseGoalItem = ({ onDelete, onToggle, onEdit, id, completed, createdAt, priority, dueDate, text }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);
    const [editError, setEditError] = useState('');
    const dateLabel = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short' }).format(new Date(createdAt));
    const dueDateLabel = dueDate
        ? new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${dueDate}T00:00:00`))
        : null;
    const isOverdue = Boolean(dueDate && !completed && dueDate < new Date().toISOString().slice(0, 10));

    const submitEditHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!onEdit(id, editedText)) {
            setEditError('Enter a unique goal.');
            return;
        }
        setEditError('');
        setIsEditing(false);
    };

    return (
        <li className={`${styles['goal-item']} ${completed ? styles.completed : ''}`}>
            {isEditing ? (
                <form className={styles['edit-form']} onSubmit={submitEditHandler}>
                    <input autoFocus value={editedText} maxLength={80} onChange={(event) => { setEditedText(event.target.value); setEditError(''); }} aria-label="Edit goal" aria-invalid={Boolean(editError)} />
                    {editError && <small>{editError}</small>}
                    <div>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => { setEditedText(text); setEditError(''); setIsEditing(false); }}>Cancel</button>
                    </div>
                </form>
            ) : (
                <>
                    <label className={styles.content}>
                        <input type="checkbox" checked={completed} onChange={() => onToggle(id)} />
                        <span>
                            <strong>{text}</strong>
                            <small>
                                <span className={`${styles.priority} ${styles[priority]}`}>{priority}</span>
                                Added {dateLabel}
                                {dueDateLabel && <span className={isOverdue ? styles.overdue : ''}> · Due {dueDateLabel}{isOverdue ? ' (overdue)' : ''}</span>}
                            </small>
                        </span>
                    </label>
                    <div className={styles.actions}>
                        <button type="button" onClick={() => { setEditedText(text); setIsEditing(true); }} aria-label={`Edit goal: ${text}`}>Edit</button>
                        <button type="button" onClick={() => onDelete(id)} aria-label={`Delete goal: ${text}`}>Delete</button>
                    </div>
                </>
            )}
        </li>
    );
};

export default CourseGoalItem;
