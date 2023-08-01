// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import {Box} from "@mui/material"
import React from "react"
import {useTranslation} from "react-i18next"
import {PageLimit, BreadCrumbSteps, Icon} from "ui-essentials"
import {styled} from "@mui/material/styles"
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons"
import Button from "@mui/material/Button"
import {Link as RouterLink} from "react-router-dom"

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

const ActionsContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 2px;
`

const ActionButtons: React.FC = ({}) => {
    const {t} = useTranslation()

    return (
        <ActionsContainer>
            <StyledLink to="/" sx={{margin: "auto 0", width: {xs: "100%", sm: "200px"}}}>
                <StyledButton sx={{width: {xs: "100%", sm: "200px"}}}>
                    <Icon icon={faAngleLeft} size="sm" />
                    <Box>{t("votingScreen.backButton")}</Box>
                </StyledButton>
            </StyledLink>
            <StyledLink to="/review" sx={{margin: "auto 0", width: {xs: "100%", sm: "200px"}}}>
                <StyledButton sx={{width: {xs: "100%", sm: "200px"}}}>
                    <Box>{t("votingScreen.reviewButton")}</Box>
                    <Icon icon={faAngleRight} size="sm" />
                </StyledButton>
            </StyledLink>
        </ActionsContainer>
    )
}

export const ConfirmationScreen: React.FC = () => {
    return <PageLimit maxWidth="lg">
        <Box marginTop="48px">
            <BreadCrumbSteps
                labels={[
                    "breadcrumbSteps.ballot",
                    "breadcrumbSteps.review",
                    "breadcrumbSteps.confirmation",
                ]}
                selected={2}
            />
        </Box>
        <ActionButtons />
    </PageLimit>
}