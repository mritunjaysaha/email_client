import React from "react";

import styles from "./filter.module.css";

export function Filter() {
    return (
        <div className={styles.filter_container}>
            Filter by:{" "}
            <div className={styles.filter_button_container}>
                <button className={styles.filter_button}>Unread</button>

                <button className={styles.filter_button}>Read</button>

                <button className={styles.filter_button}>Favorite</button>
            </div>
        </div>
    );
}
