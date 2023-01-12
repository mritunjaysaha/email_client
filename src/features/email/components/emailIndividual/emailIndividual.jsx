import React from "react";

import styles from "./emailIndividual.module.css";

function formatDate(unformattedDate) {
    const date = new Date(unformattedDate);

    const dd = date.getDate();
    const mm = date.getMonth();
    const yy = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const meridian = hours > 12 ? "pm" : "am";

    const formattedDate = `${dd}/${mm}/${yy} ${
        hours % 12
    }:${minutes}${meridian}`;

    console.log({ formattedDate });
    return formattedDate;
}

export function EmailIndividual({
    id,
    from,
    date,
    subject,
    short_description,
}) {
    const formattedDate = formatDate(date);
    return (
        <div className={styles.email_individual_container} id={id}>
            <div className={styles.email_display_picture}></div>

            <div className={styles.email_contents}>
                <p className={styles.email_contents_from}>
                    From:{" "}
                    <span className={styles.bold}>
                        {from.name} &lt;{from.email}&gt;
                    </span>
                </p>
                <p className={styles.email_contents_subject}>
                    Subject: <span className={styles.bold}>{subject}</span>
                </p>

                <p className={styles.email_contents_short_description}>
                    {short_description}
                </p>

                <p>{formattedDate}</p>
            </div>
        </div>
    );
}
