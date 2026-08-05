"use client";

import styles from './Button.module.css';
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, ...buttonProps }: Props) => {
    return (
        <button className={styles.button} {...buttonProps}>
            {children}
        </button>
    );
};
