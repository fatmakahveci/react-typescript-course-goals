"use client";

import styles from './Button.module.css';

export const Button = (props: any) => {
    return (
        <button type={props.type} className={styles.button} onClick={props.onClick}>
            {props.children}
        </button>
    );
};
