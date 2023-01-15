import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emails: {},
    selectedEmail: {},
    readEmails: [],
    favoriteEmails: []
}

export const emailSlice = createSlice({
    name: "email",
    initialState,
    reducers: {
        setEmailsList: (state, { payload }) => {

            state.emails = { ...payload }
            localStorage.setItem("emails", JSON.stringify({ ...payload }));

        },
        setSelectedEmail: (state, { payload }) => {
            console.log({ payload })
            state.selectedEmail = { ...payload }

        }
        ,
        setReadEmails: (state, { payload }) => {
            console.log({ payload })
            state.readEmails.push(payload)

            localStorage.setItem("readEmails", JSON.stringify(state.readEmails))

        },
    }
})


export const { setEmailsList, setSelectedEmail, setReadEmails } = emailSlice.actions