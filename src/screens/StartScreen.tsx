// SPDX-FileCopyrightText: 2022 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import React, { useEffect } from "react"
import { fetchElectionByIdAsync, selectElectionById } from "../store/elections/electionsSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { Box } from "@mui/material"
import {PageLimit, BreadCrumbSteps, Icon, IconButton, theme, Candidate} from "ui-essentials"
import {styled} from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import {faCircleQuestion, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons"
import { IAnswer, IQuestion } from "sequent-core"
import Image from "mui-image"
import {useTranslation} from "react-i18next"
import Button from "@mui/material/Button"
import {Link as RouterLink} from "react-router-dom"

const StyledLink = styled(RouterLink)`
    margin: auto 0;
    text-decoration: none;
`

const StyledTitle = styled(Typography)`
    margin-top: 25.5px;
    display: flex;
    flex-direction: row;
    gap: 16px;
`

const CandidatesWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 12px 0;
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

interface IAnswerProps {
    answer: IAnswer
}
const Answer: React.FC<IAnswerProps> = ({answer}) => {
    const imageUrl = answer.urls.find((url) => "Image URL" === url.title)?.url

    return <Candidate
        title={answer.text}
        description={
            <span
                dangerouslySetInnerHTML={{__html: answer.details}}
            />
        }
        isActive={true}
    >
        {
            imageUrl
            ? <Image src={imageUrl} duration={100} />
            : null
        }
    </Candidate>
}

interface IQuestionProps {
    question: IQuestion
}

const Question: React.FC<IQuestionProps> = ({question}) => {
    return <Box>
        <StyledTitle variant="h5">
            <span>{question.title}</span>
            <IconButton
                icon={faCircleQuestion}
                sx={{fontSize: "unset", lineHeight: "unset", paddingBottom: "2px"}}
                fontSize="16px"
            />
        </StyledTitle>
        {
            question.description
            ? <Typography
                dangerouslySetInnerHTML={{__html: question.description}}
                variant="body2"
                sx={{color: theme.palette.customGrey.main}}>
            </Typography>
            : null
        }
        <CandidatesWrapper>
        {
            question.answers.map((answer, index) =>
                <Answer answer={answer} key={index}/>
            )
        }
        </CandidatesWrapper>
    </Box>
}

interface ActionButtonProps {}

const ActionButtons: React.FC<ActionButtonProps> = ({}) => {
    const {t} = useTranslation()

    return (
        <ActionsContainer>
            <StyledLink to="/" sx={{margin: "auto 0", width: {xs: "100%", sm: "200px"}}}>
                <StyledButton sx={{width: {xs: "100%", sm: "200px"}}}>
                    <Icon icon={faAngleLeft} size="sm" />
                    <span>{t("votingScreen.backButton")}</span>
                </StyledButton>
            </StyledLink>
            <StyledButton sx={{width: {xs: "100%", sm: "200px"}}}>
                <span>{t("votingScreen.reviewButton")}</span>
                <Icon icon={faAngleRight} size="sm" />
            </StyledButton>
        </ActionsContainer>
    )
}

export const StartScreen: React.FC = () => {
    const election = useAppSelector(selectElectionById(34570001));
    const dispatch = useAppDispatch()

    useEffect( () => {
        dispatch(fetchElectionByIdAsync(3))
    }, [])

    if (!election) {
        return <Box>Loading</Box>
    }

    return <PageLimit maxWidth="md">
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
        <StyledTitle variant="h4">
            <span>{election.configuration.title}</span>
            <IconButton
                icon={faCircleQuestion}
                sx={{fontSize: "unset", lineHeight: "unset", paddingBottom: "2px"}}
                fontSize="16px"
            />
        </StyledTitle>
        {
            election.configuration.description
            ? <Typography
                dangerouslySetInnerHTML={{__html: election.configuration.description}}
                variant="body2"
                sx={{color: theme.palette.customGrey.main}}>
            </Typography>
            : null
        }
        {
            election.configuration.questions.map((question, index) =>
                <Question question={question} key={index}/>
            )
        }
        <ActionButtons />
    </PageLimit>
}
