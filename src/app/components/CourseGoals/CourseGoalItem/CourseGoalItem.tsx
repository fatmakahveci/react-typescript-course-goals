"use client";

import './CourseGoalItem.css';
import { FC, ReactNode, useState } from "react";

type Props = {
    id: string;
    onDelete: Function;
    children: ReactNode;
};

const CourseGoalItem: FC<Props> = ({ onDelete, id, children }): JSX.Element => {
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
