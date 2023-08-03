// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import {Box, Typography} from "@mui/material"
import React, {useEffect} from "react"
import {useTranslation} from "react-i18next"
import {BreadCrumbSteps, PageLimit, theme, stringToHtml} from "ui-essentials"
import {styled} from "@mui/material/styles"
import {Link as RouterLink} from "react-router-dom"
import Button from "@mui/material/Button"
import {useAppDispatch, useAppSelector} from "../store/hooks"
import {fetchElectionByIdAsync, selectElectionById} from "../store/elections/electionsSlice"
import {SIMPLE_ELECTION} from "../fixtures/election"
import {IElectionDTO} from "sequent-core"

const StyledTitle = styled(Typography)`
    margin-top: 25.5px;
    display: flex;
    flex-direction: row;
    gap: 16px;
`

const ActionsContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
    margin-top: 10px;
    gap: 2px;
`

const StyledLink = styled(RouterLink)`
    margin: auto 0;
    text-decoration: none;
`

const StyledButton = styled(Button)`
    display flex;
    padding: 5px;

    span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 5px;
    }
`

interface ActionButtonsProps {
    election: IElectionDTO
}

const ActionButtons: React.FC<ActionButtonsProps> = ({election}) => {
    const {t} = useTranslation()

    return (
        <ActionsContainer>
            <StyledLink to={`/election/${election.id}/vote`} sx={{margin: "auto 0", width: "100%"}}>
                <StyledButton sx={{width: "100%"}}>{t("startScreen.startButton")}</StyledButton>
            </StyledLink>
        </ActionsContainer>
    )
}

export const StartScreen: React.FC = () => {
    const {t} = useTranslation()
    const election = useAppSelector(selectElectionById(SIMPLE_ELECTION.id))
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchElectionByIdAsync(SIMPLE_ELECTION.id))
    }, [])

    if (!election) {
        return <Box>Loading</Box>
    }

    return (
        <PageLimit maxWidth="lg">
            <Box marginTop="48px">
                <BreadCrumbSteps
                    labels={[
                        "breadcrumbSteps.ballot",
                        "breadcrumbSteps.review",
                        "breadcrumbSteps.confirmation",
                    ]}
                    selected={0}
                />
            </Box>
            <StyledTitle variant="h3" justifyContent="center" fontWeight="bold">
                <span>{election.configuration.title}</span>
            </StyledTitle>
            {election.configuration.description ? (
                <Typography variant="body2" sx={{color: theme.palette.customGrey.main}}>
                    {stringToHtml(election.configuration.description)}
                </Typography>
            ) : null}
            <Typography variant="h5">{t("startScreen.instructionsTitle")}</Typography>
            <Typography variant="body2">{t("startScreen.instructionsDescription")}</Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {xs: "column", md: "row"},
                    gap: {sm: 0, md: "15px"},
                }}
            >
                <Box sx={{width: {xs: "100%", md: "33.33333333%"}}}>
                    <Typography variant="h5" sx={{color: theme.palette.brandColor}}>
                        {t("startScreen.step1Title")}
                    </Typography>
                    <Typography variant="body2">{t("startScreen.step1Description")}</Typography>
                </Box>
                <Box sx={{width: {xs: "100%", md: "33.33333333%"}}}>
                    <Typography variant="h5" sx={{color: theme.palette.brandColor}}>
                        {t("startScreen.step2Title")}
                    </Typography>
                    <Typography variant="body2">{t("startScreen.step2Description")}</Typography>
                </Box>
                <Box sx={{width: {xs: "100%", md: "33.33333333%"}}}>
                    <Typography variant="h5" sx={{color: theme.palette.brandColor}}>
                        {t("startScreen.step3Title")}
                    </Typography>
                    <Typography variant="body2">{t("startScreen.step3Description")}</Typography>
                </Box>
            </Box>
            <ActionButtons election={election} />
        </PageLimit>
    )
}
