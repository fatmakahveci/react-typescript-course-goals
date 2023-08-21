"use client";

import { FC, ReactNode } from 'react';
import './Button.css';

type Props = {
    type: any;
    children: ReactNode;
};

const Button: FC<Props> = ({ type, children }): JSX.Element => {
    return (
        <button type={type} className="button">
            {children}
        </button>
    );
};

export default Button;
