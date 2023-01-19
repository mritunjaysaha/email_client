import React, { useEffect, useState } from "react";
import { DisplayPicture } from "../displayPicture/DisplayPicture";
import { formatDate } from "../../../utils/formatDate";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import API from "../../../../APIs.json";

import styles from "./emailDetails.module.css";
import {
    setAllEmails,
    setFavoriteEmails,
    setReadEmails,
    setFavoriteEmailIds,
} from "../../emailSlice";

function EmailHeader() {
    const dispatch = useDispatch();
    const { selectedEmail, emails, favoriteEmailIds } = useSelector(
        (state) => state.email
    );

    const { id, subject, date, isFavorite } = selectedEmail;
    const [isMarkedFavorite, setIsMarkedFavorite] = useState(isFavorite);

    const emailsFav = JSON.parse(JSON.stringify(emails));

    async function handleClick() {
        console.log("favorite email", id);

        if (!isFavorite) {
            emailsFav[id].isFavorite = true;
            setIsMarkedFavorite(true);
            dispatch(setFavoriteEmails(emailsFav[id]));
        } else {
            emailsFav[id].isFavorite = false;
            setIsMarkedFavorite(false);
            console.log();

            const filterFavoriteEmailsIds = favoriteEmailIds.filter(
                (emailId) => emailId !== id
            );

            const favoriteObject = {};

            for (
                let i = 0, len = filterFavoriteEmailsIds.length;
                i < len;
                i++
            ) {
                let id = filterFavoriteEmailsIds[i];
                favoriteObject[id] = emails[id];
            }

            dispatch(setFavoriteEmailIds({ updateAll: favoriteObject }));
        }

        dispatch(setAllEmails(emailsFav));
        dispatch(setReadEmails(emailsFav[id]));
    }

    return (
        <div className={styles.details_header}>
            <div className={styles.details_subject_date}>
                <p className={styles.details_subject}>{subject}</p>
                <p className={styles.details_date}>{formatDate(date)}</p>
            </div>

            <button
                className={styles.details_favorite_button}
                onClick={handleClick}
            >
                {!isMarkedFavorite ? "Mark as Favorite" : "Remove Favorite"}
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

    const { id, from, subject, date, isFavorite } = selectedEmail;

    const [body, setBody] = useState("");

    useEffect(() => {
        async function getEmailDetails() {
            const res = await axios.get(`${API.EMAIL_BODY}${selectedEmail.id}`);

            setBody(res.data.body);
        }

        getEmailDetails();
    }, [selectedEmail]);

    return (
        <div className={styles.details_container} key={id}>
            <DisplayPicture name={from.name} />

            <div>
                <EmailHeader />
                <EmailBody body={body} />
            </div>
        </div>
    );
}
