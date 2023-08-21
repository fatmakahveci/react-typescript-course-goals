"use client";

import './Button.css';

type Props = {
    type: any;
    children: any;
};

const Button: React.FC<Props> = ({ type, children }) => {
    return (
        <button type={type} className="button">
            {children}
        </button>
    );
};

export default Button;
