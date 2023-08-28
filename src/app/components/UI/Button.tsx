"use client";

import styles from './Button.module.css';
import { FC, ReactNode } from "react";

interface Props {
    type: "submit";
    children: ReactNode;
}

export const Button: FC<Props> = ({ type, children }) => {
    return (
        <button type={type} className={styles.button}>
            {children}
        </button>
    );
};
