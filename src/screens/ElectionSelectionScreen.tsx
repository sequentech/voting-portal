// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import {Box, Typography} from "@mui/material"
import React, {useEffect, useState} from "react"
import {useTranslation} from "react-i18next"
import {
    BreadCrumbSteps,
    Dialog,
    IconButton,
    PageLimit,
    SelectElection,
    stringToHtml,
    theme,
} from "ui-essentials"
import {faCircleQuestion} from "@fortawesome/free-solid-svg-icons"
import {styled} from "@mui/material/styles"
import {useAppDispatch, useAppSelector} from "../store/hooks"
import {fetchElectionByIdAsync, selectElectionById} from "../store/elections/electionsSlice"
import {ELECTIONS_LIST} from "../fixtures/election"
import { useNavigate } from "react-router-dom"

const StyledTitle = styled(Typography)`
    margin-top: 25.5px;
    display: flex;
    flex-direction: row;
    gap: 16px;
    font-size: 24px;
    font-weight: 500;
    line-height: 27px;
    margin-top: 20px;
    margin-bottom: 16px;
`

const ElectionContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

interface ElectionWrapperProps {
    electionId: number
}

const ElectionWrapper: React.FC<ElectionWrapperProps> = ({electionId}) => {
    const election = useAppSelector(selectElectionById(electionId))
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchElectionByIdAsync(electionId))
    }, [])

    const onClickToVote = () => {
        navigate(`/election/${electionId}/start`)
    }

    if (!election) {
        return null
    }
    return (
        <SelectElection
            isActive={true}
            isOpen={election.state === "started"}
            title={election.configuration.title}
            electionHomeUrl={"https://sequentech.io"}
            hasVoted={electionId === ELECTIONS_LIST[0].id}
            openDate={""}
            closeDate={""}
            onClickToVote={onClickToVote}
            onClickElectionResults={() => undefined}
        />
    )
}

export const ElectionSelectionScreen: React.FC = () => {
    const {t} = useTranslation()
    const [openChooserHelp, setOpenChooserHelp] = useState(false)

    const electionIds = ELECTIONS_LIST.map((election) => election.id)

    return (
        <PageLimit maxWidth="lg">
            <Box marginTop="48px">
                <BreadCrumbSteps
                    labels={[
                        "breadcrumbSteps.electionList",
                        "breadcrumbSteps.ballot",
                        "breadcrumbSteps.review",
                        "breadcrumbSteps.confirmation",
                    ]}
                    selected={0}
                />
            </Box>
            <StyledTitle variant="h1">
                <Box>{t("electionSelectionScreen.title")}</Box>
                <IconButton
                    icon={faCircleQuestion}
                    sx={{fontSize: "unset", lineHeight: "unset", paddingBottom: "2px"}}
                    fontSize="16px"
                    onClick={() => setOpenChooserHelp(true)}
                />
                <Dialog
                    handleClose={() => setOpenChooserHelp(false)}
                    open={openChooserHelp}
                    title={t("electionSelectionScreen.chooserHelpDialog.title")}
                    ok={t("electionSelectionScreen.chooserHelpDialog.ok")}
                    variant="info"
                >
                    {stringToHtml(t("electionSelectionScreen.chooserHelpDialog.content"))}
                </Dialog>
            </StyledTitle>
            <Typography variant="body1" sx={{color: theme.palette.customGrey.contrastText}}>
                {stringToHtml(t("electionSelectionScreen.description"))}
            </Typography>
            <ElectionContainer>
                {electionIds.map((electionId) => (
                    <ElectionWrapper electionId={electionId} key={electionId} />
                ))}
            </ElectionContainer>
        </PageLimit>
    )
}
