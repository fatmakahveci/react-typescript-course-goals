"use client";

import { FC, ReactNode, useState } from "react";
import styles from "./CourseGoalItem.module.css";

type Props = {
    id: string;
    onDelete: Function;
    children: ReactNode;
};

const CourseGoalItem: FC<Props> = ({ onDelete, id, children }): JSX.Element => {
    const [_, setDeleteText] = useState('');

    const deleteHandler = () => {
        setDeleteText('(Deleted!)');
        onDelete(id);
    };

    return (
        <li className={`${styles['goal-item']}`} onClick={deleteHandler}>
            {children}
        </li>
    );
};

export default CourseGoalItem;
