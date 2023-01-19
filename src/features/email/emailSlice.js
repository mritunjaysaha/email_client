import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emails: {},
    selectedEmail: {},
    readEmails: {},
    favoriteEmails: {},
    favoriteEmailIds: []
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


            if (!Object.keys(payload).includes("updateAll")) {
                state.readEmails[payload.id] = payload
            } else {
                state.readEmails = { ...payload.updateAll }
            }
            localStorage.setItem("readEmails", JSON.stringify(state.readEmails))

        },

        setFavoriteEmails: (state, { payload }) => {
            console.log("setFavoriteEmails ", { payload, state })

            if (!Object.keys(payload).includes("updateAll")) {

                state.favoriteEmails[payload.id] = payload

                state.favoriteEmailIds.push(payload.id)
            } else {
                state.favoriteEmails = { ...payload.updateAll }


            }

            localStorage.setItem("favoriteEmails", JSON.stringify(state.favoriteEmails))
        },

        setFavoriteEmailIds: (state, { payload }) => {

            state.push(...payload)
        }
    }
})


export const { setAllEmails, setSelectedEmail, setReadEmails, setFavoriteEmails, setFavoriteEmailIds } = emailSlice.actions