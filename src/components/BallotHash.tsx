// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import { Box } from "@mui/material"
import React from "react"
import {styled} from "@mui/material/styles"
import {IconButton, theme} from "ui-essentials"
import { useTranslation } from "react-i18next"
import {faCircleQuestion, faCheck} from "@fortawesome/free-solid-svg-icons"

const HashContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    padding: 10px 22px;
    color: #047857;
    background-color: ${({theme}) => theme.palette.green.light};
    gap: 8px;
    border-radius: 4px;
    border: 1px solid #047857;
    align-items: center;
`

const TotalContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

export interface BallotHashProps {
    hash: string
}

export const BallotHash: React.FC<BallotHashProps> = ({hash}) => {
    const {t} = useTranslation()

    return <TotalContainer>
        <HashContainer>
            <IconButton
                icon={faCheck}
                sx={{fontSize: "unset", lineHeight: "unset", paddingBottom: "2px"}}
                fontSize="14px"
            />
            <span>{t("ballotHash")}</span>
            <span>{hash}</span>
            <IconButton
                icon={faCircleQuestion}
                sx={{fontSize: "unset", lineHeight: "unset", paddingBottom: "2px", marginLeft: "16px", color: theme.palette.customGrey.contrastText}}
                fontSize="18px"
            />
        </HashContainer>
    </TotalContainer>
}