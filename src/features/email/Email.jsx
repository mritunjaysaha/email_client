import React, { useState, useEffect } from "react";

import axios from "axios";

import { Filter } from "./components/filter/filter";

import API from "../../APIs.json";
import { EmailIndividual } from "./components/emailIndividual/emailIndividual";

export function Email() {
    const [emailList, setEmailList] = useState([]);

    useEffect(() => {
        async function getEmails() {
            const res = await axios.get(API.EMAIL_LIST);

            console.log(res.data.list);
            setEmailList(res.data.list);
        }

        getEmails();
    }, []);

    return (
        <section>
            <Filter />

            {emailList.map(
                ({ id, from, date, subject, short_description }, index) => (
                    <EmailIndividual
                        id={id}
                        from={from}
                        date={date}
                        subject={subject}
                        short_description={short_description}
                    />
                )
            )}
        </section>
    );
}
