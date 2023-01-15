import React, { useEffect, useState } from "react";
import { DisplayPicture } from "../displayPicture/DisplayPicture";
import { formatDate } from "../../../utils/formatDate";
import { useSelector } from "react-redux";
import axios from "axios";

import API from "../../../../APIs.json";

function EmailHeader({ id, subject, date }) {
    return (
        <div>
            <p>{subject}</p>
            <p>{formatDate(date)}</p>
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

        console.log({ doc }, docBodyChildNodes[0].innerText);

        setPara([]);

        for (let i = 0; i < docBodyChildNodes.length; i++) {
            console.log(docBodyChildNodes[i].innerText);

            const text = docBodyChildNodes[i].innerText;

            setPara((prev) => [...prev, text]);
        }
    };

    useEffect(() => {
        handleHTMLparse(body);
    }, [body]);

    // if (body) {
    //     handleHTMLparse();
    // }
    return (
        <div>
            <div>
                {para.map((text) => (
                    <p>{text}</p>
                ))}
            </div>
        </div>
    );
}

export function EmailDetails() {
    const { selectedEmail } = useSelector((state) => state.email);

    const { id, from, subject, date } = selectedEmail;

    const [body, setBody] = useState("");

    useEffect(() => {
        async function getEmailDetails() {
            console.log("[getEmailDetails]", { selectedEmail });
            const res = await axios.get(`${API.EMAIL_BODY}${selectedEmail.id}`);

            console.log("[EmailDetails]", { res });

            setBody(res.data.body);
        }

        getEmailDetails();
    }, [selectedEmail]);

    return (
        <div>
            <DisplayPicture name={from.name} />

            <div>
                <EmailHeader subject={subject} date={date} />
                <EmailBody body={body} />
            </div>
        </div>
    );
}
