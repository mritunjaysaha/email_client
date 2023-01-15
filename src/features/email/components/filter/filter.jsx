import React from "react";

import styles from "./filter.module.css";

export function Filter({ handleEmailShowType }) {
    return (
        <div className={styles.filter_container}>
            Filter by:{" "}
            <div className={styles.filter_button_container}>
                <button
                    className={styles.filter_button}
                    onClick={() => {
                        handleEmailShowType("unread");
                    }}
                >
                    Unread
                </button>

                <button
                    className={styles.filter_button}
                    onClick={() => {
                        handleEmailShowType("read");
                    }}
                >
                    Read
                </button>

                <button
                    className={styles.filter_button}
                    onClick={() => {
                        handleEmailShowType("favorite");
                    }}
                >
                    Favorite
                </button>
            </div>
        </div>
    );
}
