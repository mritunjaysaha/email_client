import React, { useState, useEffect } from "react";

import axios from "axios";

import { Filter } from "./components/filter/filter";

import API from "../../APIs.json";
import { EmailIndividual } from "./components/emailIndividual/EmailIndividual";

import styles from "./email.module.css";
import { EmailDetails } from "./components/emailDetails/EmailDetails";

import { useSelector, useDispatch } from "react-redux";
import { setEmailsList, setSelectedEmail } from "./emailSlice";

export function Email() {
    const dispatch = useDispatch();

    const { emails } = useSelector((state) => state.email);

    const [emailList, setEmailList] = useState([]);

    const [isRightPaneActive, setIsRightPaneActive] = useState(false);

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
                    };
                }
            );
            console.log({ emailObj });

            dispatch(setEmailsList(emailObj));
            setEmailList(Object.keys(emailObj));
        }

        getEmails();
    }, []);

    return (
        <section>
            <Filter />

            <div className={styles.panes_container}>
                <div
                    className={`${styles.left_pane} ${
                        isRightPaneActive ? styles.left_pane_active : ""
                    }`}
                >
                    {emailList.map((id, index) => {
                        const { from, date, subject, short_description } =
                            emails[id];

                        return (
                            <EmailIndividual
                                key={index}
                                id={id}
                                from={from}
                                date={date}
                                subject={subject}
                                short_description={short_description}
                                handleClick={() => {
                                    setIsRightPaneActive(!isRightPaneActive);
                                    console.log("[clicked]");
                                    dispatch(
                                        setSelectedEmail({
                                            id,
                                            from,
                                            subject,
                                            date,
                                        })
                                    );
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
