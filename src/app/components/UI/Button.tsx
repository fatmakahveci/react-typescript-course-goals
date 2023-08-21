"use client";

import './Button.css';

type Props = {
    type: any;
    onClick: any;
    children: any;
};

const Button: React.FC<Props> = ({ type }) => {
    return (
        <button type={type} className="button">
            {/* {children} */}
        </button>
    );
};

export default Button;
