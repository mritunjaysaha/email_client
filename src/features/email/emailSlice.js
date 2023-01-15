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
        setAllEmails: (state, { payload }) => {
            console.log("[setAllEmails]", { payload })
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


            if (!Object.keys(payload).includes("fromLocal")) {
                state.readEmails[payload.id] = payload
            } else {
                state.readEmails = { ...payload.fromLocal }
            }
            localStorage.setItem("readEmails", JSON.stringify(state.readEmails))

        },

        setFavoriteEmails: (state, { payload }) => {
            console.log("setFavoriteEmails ", { payload, state })

            if (!Object.keys(payload).includes("fromLocal")) {

                state.favoriteEmails[payload.id] = payload
            } else {
                state.favoriteEmails = { ...payload.fromLocal }
            }

            localStorage.setItem("favoriteEmails", JSON.stringify(state.favoriteEmails))
        },

    }
})


export const { setAllEmails, setSelectedEmail, setReadEmails, setFavoriteEmails } = emailSlice.actions