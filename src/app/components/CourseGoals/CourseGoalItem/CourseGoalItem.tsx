"use client";

import './CourseGoalItem.css';
import { useState } from "react";

type Props = {
    id: any;
    onDelete: Function;
    children: any;
};

const CourseGoalItem: React.FC<Props> = ({ onDelete, id, children }): JSX.Element => {
    const [deleteText, setDeleteText] = useState('');

    const deleteHandler = () => {
        setDeleteText('(Deleted!)');
        onDelete(id);
    };

    return (
        <li className="goal-item" onClick={deleteHandler}>
            {children}
        </li>
    );
};

export default CourseGoalItem;
