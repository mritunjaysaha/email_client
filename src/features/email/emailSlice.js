import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emails: {},
    selectedEmail: {},
    readEmails: {},
    favoriteEmails: {}
}

export const emailSlice = createSlice({
    name: "email",
    initialState,
    reducers: {
        setEmailsList: (state, { payload }) => {
            console.log("[setEmailsList]", { payload })
            state.emails = payload
            localStorage.setItem("emails", JSON.stringify({ ...payload }));

        },
        setSelectedEmail: (state, { payload }) => {
            console.log({ payload })
            state.selectedEmail = { ...payload }

        }
        ,
        setReadEmails: (state, { payload }) => {
            console.log("setReadEmails", { payload })

            state.readEmails[payload.id] = payload

            localStorage.setItem("readEmails", JSON.stringify(state.readEmails))

        },

        setFavoriteEmails: (state, { payload }) => {
            console.log("setFavoriteEmails ", { payload, state })

            state.favoriteEmails[payload.id] = payload
            localStorage.setItem("favoriteEmails", JSON.stringify(state.readEmails))
        },

    }
})


export const { setEmailsList, setSelectedEmail, setReadEmails, setFavoriteEmails } = emailSlice.actions