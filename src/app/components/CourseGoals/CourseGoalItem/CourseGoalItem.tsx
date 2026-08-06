"use client";

import { DragEvent, FormEvent, useState } from "react";
import type { GoalPriority, Subtask } from '@/shared/types/Types';
import styles from "./CourseGoalItem.module.css";

type Props = {
    id: string;
    completed: boolean;
    createdAt: string;
    priority: GoalPriority;
    dueDate: string | null;
    category: string;
    subtasks: Subtask[];
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
    onEdit: (id: string, text: string) => boolean;
    onAddSubtask: (goalId: string, text: string) => boolean;
    onToggleSubtask: (goalId: string, subtaskId: string) => void;
    onDeleteSubtask: (goalId: string, subtaskId: string) => void;
    manualOrder: boolean;
    isDragging: boolean;
    canMoveUp: boolean;
    canMoveDown: boolean;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onDragStart: (event: DragEvent<HTMLLIElement>) => void;
    onDragEnd: () => void;
    onDragOver: (event: DragEvent<HTMLLIElement>) => void;
    onDrop: (event: DragEvent<HTMLLIElement>) => void;
    text: string;
};

const CourseGoalItem = ({ onDelete, onToggle, onEdit, onAddSubtask, onToggleSubtask, onDeleteSubtask, manualOrder, isDragging, canMoveUp, canMoveDown, onMoveUp, onMoveDown, onDragStart, onDragEnd, onDragOver, onDrop, id, completed, createdAt, priority, dueDate, category, subtasks, text }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);
    const [editError, setEditError] = useState('');
    const [subtaskText, setSubtaskText] = useState('');
    const [subtaskError, setSubtaskError] = useState('');
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

    const submitSubtaskHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!onAddSubtask(id, subtaskText)) {
            setSubtaskError('Enter a unique subtask.');
            return;
        }
        setSubtaskText('');
        setSubtaskError('');
    };

    const completedSubtasks = subtasks.filter((subtask) => subtask.completed).length;

    return (
        <li className={`${styles['goal-item']} ${completed ? styles.completed : ''} ${isDragging ? styles.dragging : ''}`} draggable={manualOrder} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver} onDrop={onDrop}>
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
                                <span className={styles.category}>{category}</span>
                                Added {dateLabel}
                                {dueDateLabel && <span className={isOverdue ? styles.overdue : ''}> · Due {dueDateLabel}{isOverdue ? ' (overdue)' : ''}</span>}
                            </small>
                        </span>
                    </label>
                    <div className={styles.actions}>
                        {manualOrder && (
                            <>
                                <button className={styles['drag-handle']} type="button" data-drag-handle aria-label={`Drag to reorder: ${text}`} title="Drag to reorder">↕</button>
                                <button type="button" onClick={onMoveUp} disabled={!canMoveUp} aria-label={`Move up: ${text}`}>↑</button>
                                <button type="button" onClick={onMoveDown} disabled={!canMoveDown} aria-label={`Move down: ${text}`}>↓</button>
                            </>
                        )}
                        <button type="button" onClick={() => { setEditedText(text); setIsEditing(true); }} aria-label={`Edit goal: ${text}`}>Edit</button>
                        <button type="button" onClick={() => onDelete(id)} aria-label={`Delete goal: ${text}`}>Delete</button>
                    </div>
                    <div className={styles.subtasks}>
                        <div className={styles['subtask-heading']}>
                            <strong>Subtasks</strong>
                            <span>{completedSubtasks}/{subtasks.length}</span>
                        </div>
                        {subtasks.length > 0 && (
                            <ul>
                                {subtasks.map((subtask) => (
                                    <li key={subtask.id}>
                                        <label>
                                            <input type="checkbox" checked={subtask.completed} onChange={() => onToggleSubtask(id, subtask.id)} />
                                            <span>{subtask.text}</span>
                                        </label>
                                        <button type="button" onClick={() => onDeleteSubtask(id, subtask.id)} aria-label={`Delete subtask: ${subtask.text}`}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <form className={styles['subtask-form']} onSubmit={submitSubtaskHandler}>
                            <input value={subtaskText} maxLength={80} onChange={(event) => { setSubtaskText(event.target.value); setSubtaskError(''); }} placeholder="Add a subtask" aria-label={`Add a subtask to ${text}`} aria-invalid={Boolean(subtaskError)} />
                            <button type="submit">Add</button>
                        </form>
                        {subtaskError && <small className={styles['subtask-error']}>{subtaskError}</small>}
                    </div>
                </>
            )}
        </li>
    );
};

export default CourseGoalItem;
