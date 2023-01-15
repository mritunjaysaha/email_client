import React from "react";
import { DisplayPicture } from "../displayPicture/DisplayPicture";

import { formatDate } from "../../../utils/formatDate";

import styles from "./emailIndividual.module.css";

function EmailContents({ from, subject, short_description, date }) {
    const formattedDate = formatDate(date);

    return (
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
    );
}

export function EmailIndividual({
    id,
    from,
    date,
    subject,
    short_description,
    handleClick,
}) {
    return (
        <div
            className={styles.email_individual_container}
            id={id}
            onClick={handleClick}
        >
            <DisplayPicture name={from.name} />

            <EmailContents
                from={from}
                date={date}
                subject={subject}
                short_description={short_description}
            />
        </div>
    );
}
