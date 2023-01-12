import React, { useState, useEffect } from "react";

import axios from "axios";

import { Filter } from "./components/filter";

import API from "../../APIs.json";

export function Email() {
    const [emailList, setEmailList] = useState([]);

    useEffect(() => {
        async function getEmails() {
            const res = await axios.get(API.EMAIL_LIST);

            setEmailList(res.data.list);
        }

        getEmails();
    }, []);

    return (
        <section>
            <Filter />

            {emailList.map((emails, index) => (
                <div key={index}>{JSON.stringify(emails)}</div>
            ))}
        </section>
    );
}
