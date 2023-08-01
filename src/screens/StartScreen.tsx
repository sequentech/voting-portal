// SPDX-FileCopyrightText: 2022 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import React, { useEffect } from "react"
import { fetchElectionByIdAsync, selectElectionId } from "../store/election/electionSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { Box } from "@mui/material";

export const StartScreen: React.FC = () => {
    const electionId = useAppSelector(selectElectionId);
    const dispatch = useAppDispatch()

    useEffect( () => {
        dispatch(fetchElectionByIdAsync(3))
    }, [])

    return <Box>
        {
            electionId
            ? <p>Election Id: {electionId}</p>
            : null
        }
    </Box>
}
