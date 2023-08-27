"use client";

import { FC, ReactNode, useState } from "react";
import { GoalItem } from './CourseGoalItem.style';

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
        <GoalItem onClick={deleteHandler}>
            {children}
        </GoalItem>
    );
};

export default CourseGoalItem;
