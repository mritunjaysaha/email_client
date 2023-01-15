import React, { useState } from "react";

import styles from "./filter.module.css";

import { FILTER_TYPES } from "../../../../constants/filterType";

export function Filter({ handleEmailShowType }) {
    const [isActive, setIsActive] = useState(FILTER_TYPES.UNREAD);

    return (
        <div className={styles.filter_container}>
            Filter by:{" "}
            <div className={styles.filter_button_container}>
                <button
                    className={`${styles.filter_button} ${
                        isActive === FILTER_TYPES.UNREAD
                            ? styles.filter_button_active
                            : ""
                    }`}
                    onClick={() => {
                        setIsActive(FILTER_TYPES.UNREAD);
                        handleEmailShowType(FILTER_TYPES.UNREAD);
                    }}
                >
                    Unread
                </button>

                <button
                    className={`${styles.filter_button} ${
                        isActive === FILTER_TYPES.READ
                            ? styles.filter_button_active
                            : ""
                    }`}
                    onClick={() => {
                        setIsActive(FILTER_TYPES.READ);

                        handleEmailShowType(FILTER_TYPES.READ);
                    }}
                >
                    Read
                </button>

                <button
                    className={`${styles.filter_button} ${
                        isActive === FILTER_TYPES.FAVORITE
                            ? styles.filter_button_active
                            : ""
                    }`}
                    onClick={() => {
                        setIsActive(FILTER_TYPES.FAVORITE);

                        handleEmailShowType(FILTER_TYPES.FAVORITE);
                    }}
                >
                    Favorite
                </button>
            </div>
        </div>
    );
}
