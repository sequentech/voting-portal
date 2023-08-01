// SPDX-FileCopyrightText: 2022 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import React, { useEffect } from "react"
import { fetchElectionByIdAsync, selectElectionById } from "../store/elections/electionsSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { Box } from "@mui/material";

export const StartScreen: React.FC = () => {
    const election = useAppSelector(selectElectionById(34570001));
    const dispatch = useAppDispatch()

    useEffect( () => {
        dispatch(fetchElectionByIdAsync(3))
    }, [])

    return <Box>
        {
            election
            ? <p>Election Id: {election.id}</p>
            : null
        }
    </Box>
}
