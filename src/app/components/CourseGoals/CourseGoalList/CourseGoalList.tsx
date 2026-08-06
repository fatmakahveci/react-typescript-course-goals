"use client";

import { useState } from 'react';
import { CourseGoal } from '@/shared/types/Types';
import CourseGoalItem from '../CourseGoalItem/CourseGoalItem';
import styles from "./CourseGoalList.module.css";

type Props = {
    items: CourseGoal[];
    onDeleteItem: (id: string) => void;
    onToggleItem: (id: string) => void;
    onEditItem: (id: string, text: string) => boolean;
    onAddSubtask: (goalId: string, text: string) => boolean;
    onToggleSubtask: (goalId: string, subtaskId: string) => void;
    onDeleteSubtask: (goalId: string, subtaskId: string) => void;
    onMoveItem: (sourceId: string, targetId: string) => void;
    manualOrder: boolean;
}

const CourseGoalList = ({ items, onDeleteItem, onToggleItem, onEditItem, onAddSubtask, onToggleSubtask, onDeleteSubtask, onMoveItem, manualOrder }: Props) => {
    const [draggedId, setDraggedId] = useState<string | null>(null);

    const moveBy = (id: string, offset: -1 | 1) => {
        const index = items.findIndex((goal) => goal.id === id);
        const target = items[index + offset];
        if (target) onMoveItem(id, target.id);
    };

    return (
        <ul className={`${styles['goal-list']}`}>
            {items.map((goal, index) => (
                <CourseGoalItem
                    key={goal.id}
                    id={goal.id}
                    completed={goal.completed}
                    createdAt={goal.createdAt}
                    priority={goal.priority}
                    dueDate={goal.dueDate}
                    category={goal.category}
                    subtasks={goal.subtasks}
                    onDelete={onDeleteItem}
                    onToggle={onToggleItem}
                    onEdit={onEditItem}
                    onAddSubtask={onAddSubtask}
                    onToggleSubtask={onToggleSubtask}
                    onDeleteSubtask={onDeleteSubtask}
                    manualOrder={manualOrder}
                    isDragging={draggedId === goal.id}
                    canMoveUp={index > 0}
                    canMoveDown={index < items.length - 1}
                    onMoveUp={() => moveBy(goal.id, -1)}
                    onMoveDown={() => moveBy(goal.id, 1)}
                    onDragStart={(event) => {
                        setDraggedId(goal.id);
                        event.dataTransfer.effectAllowed = 'move';
                        event.dataTransfer.setData('text/plain', goal.id);
                    }}
                    onDragEnd={() => setDraggedId(null)}
                    onDragOver={(event) => {
                        if (manualOrder) event.preventDefault();
                    }}
                    onDrop={(event) => {
                        event.preventDefault();
                        const sourceId = event.dataTransfer.getData('text/plain') || draggedId;
                        if (sourceId) onMoveItem(sourceId, goal.id);
                        setDraggedId(null);
                    }}
                    text={goal.text}
                />
            ))}
        </ul>
    );
};

export default CourseGoalList;
