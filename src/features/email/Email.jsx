import React, { useState, useEffect } from "react";

import axios from "axios";

import { Filter } from "./components/filter/filter";

import API from "../../APIs.json";
import { EmailIndividual } from "./components/emailIndividual/EmailIndividual";

import styles from "./email.module.css";
import { EmailDetails } from "./components/emailDetails/EmailDetails";

import { useSelector, useDispatch } from "react-redux";
import { setEmailsList, setReadEmails, setSelectedEmail } from "./emailSlice";
import { FILTER_TYPES } from "../../constants/filterType";

export function Email() {
    const dispatch = useDispatch();

    const { emails, readEmails, favoriteEmails } = useSelector(
        (state) => state.email
    );

    const [emailList, setEmailList] = useState([]);
    const [isRightPaneActive, setIsRightPaneActive] = useState(false);
    const [showEmailsObj, setShowEmailsObj] = useState({});

    useEffect(() => {
        async function getEmails() {
            const res = await axios.get(API.EMAIL_LIST);

            console.log(res.data.list);

            const emailObj = {};

            await res.data.list.map(
                ({ id, from, date, subject, short_description }) => {
                    emailObj[id] = {
                        id,
                        from,
                        date,
                        subject,
                        short_description,
                        isFavorite: false,
                    };
                }
            );
            console.log({ emailObj });

            dispatch(setEmailsList(emailObj));
            setEmailList(Object.keys(emailObj));
            setShowEmailsObj(emailObj);
        }

        async function getLocalEmails() {
            const localEmails = await JSON.parse(
                localStorage.getItem("emails")
            );
            const localReadEmails = await JSON.parse(
                localStorage.getItem("readEmails")
            );

            dispatch(setEmailsList(localEmails));
            // dispatch(setReadEmails(localReadEmails));

            setEmailList(Object.keys(localEmails));
            setShowEmailsObj(localEmails);
        }

        getLocalEmails();

        if (emailList.length === 0) {
            console.log("Emails fetched");
            getEmails();
        }
    }, []);

    function handleEmailShowType(type) {
        if (type === FILTER_TYPES.UNREAD) {
            console.log({ emails });
            setEmailList(Object.keys(emails));
            setShowEmailsObj(emails);
        } else if (type === FILTER_TYPES.READ) {
            console.log({ readEmails });
            setEmailList(Object.keys(readEmails));
            setShowEmailsObj(readEmails);
        } else if (type === FILTER_TYPES.FAVORITE) {
            console.log({ favoriteEmails });

            setEmailList(Object.keys(favoriteEmails));
            setShowEmailsObj(favoriteEmails);
        }
    }

    return (
        <section>
            <Filter handleEmailShowType={handleEmailShowType} />

            <div className={styles.panes_container}>
                <div
                    className={`${styles.left_pane} ${
                        isRightPaneActive ? styles.left_pane_active : ""
                    }`}
                >
                    {emailList.map((id, index) => {
                        const { from, date, subject, short_description } =
                            showEmailsObj[id];

                        return (
                            <EmailIndividual
                                key={index}
                                id={id}
                                from={from}
                                date={date}
                                subject={subject}
                                short_description={short_description}
                                handleClick={() => {
                                    setIsRightPaneActive(true);
                                    console.log("[clicked]");
                                    dispatch(
                                        setSelectedEmail(showEmailsObj[id])
                                    );

                                    dispatch(setReadEmails(showEmailsObj[id]));
                                }}
                            />
                        );
                    })}
                </div>
                {isRightPaneActive && (
                    <div className={styles.right_pane}>
                        <EmailDetails />
                    </div>
                )}{" "}
            </div>
        </section>
    );
}
