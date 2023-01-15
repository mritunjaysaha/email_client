import React, { useEffect, useState } from "react";
import { DisplayPicture } from "../displayPicture/DisplayPicture";
import { formatDate } from "../../../utils/formatDate";
import { useSelector } from "react-redux";
import axios from "axios";

import API from "../../../../APIs.json";

import styles from "./emailDetails.module.css";

function EmailHeader({ id, subject, date }) {
    return (
        <div className={styles.details_header}>
            <div className={styles.details_subject_date}>
                <p className={styles.details_subject}>{subject}</p>
                <p className={styles.details_date}>{formatDate(date)}</p>
            </div>

            <button className={styles.details_favorite_button}>
                Mark as Favorite
            </button>
        </div>
    );
}

function EmailBody({ body }) {
    const [para, setPara] = useState([]);

    const handleHTMLparse = (body) => {
        if (!body) {
            return;
        }

        const parser = new DOMParser();

        const doc = parser.parseFromString(body, "text/html");

        const docBody = doc.body;
        const docBodyChildNodes = docBody.childNodes[0].childNodes;

        setPara([]);

        for (let i = 0; i < docBodyChildNodes.length; i++) {
            const text = docBodyChildNodes[i].innerText;

            setPara((prev) => [...prev, text]);
        }
    };

    useEffect(() => {
        handleHTMLparse(body);
    }, [body]);

    return (
        <div className={styles.details_body}>
            {para.map((text, index) => (
                <p key={index} className={styles.details_p}>
                    {text}
                </p>
            ))}
        </div>
    );
}

export function EmailDetails() {
    const { selectedEmail } = useSelector((state) => state.email);

    const { id, from, subject, date } = selectedEmail;

    const [body, setBody] = useState("");

    useEffect(() => {
        async function getEmailDetails() {
            const res = await axios.get(`${API.EMAIL_BODY}${selectedEmail.id}`);

            setBody(res.data.body);
        }

        getEmailDetails();
    }, [selectedEmail]);

    return (
        <div className={styles.details_container}>
            <DisplayPicture name={from.name} />

            <div>
                <EmailHeader subject={subject} date={date} />
                <EmailBody body={body} />
            </div>
        </div>
    );
}
