"use client";

import CourseGoalItem from '../CourseGoalItem/CourseGoalItem';
import './CourseGoalList.css';

type Props = {
    items: any;
    onDeleteItem: Function;
}

const CourseGoalList: React.FC<Props> = ({ items, onDeleteItem }): JSX.Element => {
    return (
        <ul className="goal-list">
            {items.map((goal: any) => (
                <CourseGoalItem
                    key={goal.id}
                    id={goal.id}
                    onDelete={onDeleteItem}
                >
                    {goal.text}
                </CourseGoalItem>
            ))}
        </ul>
    );
};

export default CourseGoalList;
