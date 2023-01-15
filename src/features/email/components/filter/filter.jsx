import React, { useState } from "react";

import styles from "./filter.module.css";

const FILTER_TYPES = {
    UNREAD: "unread",
    READ: "read",
    FAVORITE: "favorite",
};

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
                        handleEmailShowType("unread");
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

                        handleEmailShowType("read");
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

                        handleEmailShowType("favorite");
                    }}
                >
                    Favorite
                </button>
            </div>
        </div>
    );
}
