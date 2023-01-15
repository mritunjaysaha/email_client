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

        },
        setSelectedEmail: (state, { payload }) => {
            console.log({ payload })
            state.selectedEmail = { ...payload }
        }
    }
})


export const { setEmailsList, setSelectedEmail } = emailSlice.actions