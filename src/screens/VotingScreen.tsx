// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import React, {useEffect, useState} from "react"
import {fetchElectionByIdAsync, selectElectionById} from "../store/elections/electionsSlice"
import {useAppDispatch, useAppSelector} from "../store/hooks"
import {Box} from "@mui/material"
import {
    PageLimit,
    BreadCrumbSteps,
    Icon,
    IconButton,
    theme,
    Candidate,
    stringToHtml,
    isNumber,
} from "ui-essentials"
import {styled} from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import {faCircleQuestion, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons"
import {IAnswer, IElectionDTO, IQuestion} from "sequent-core"
import Image from "mui-image"
import {useTranslation} from "react-i18next"
import Button from "@mui/material/Button"
import {Link as RouterLink} from "react-router-dom"
import {
    selectBallotSelectionByQuestionAnswer,
    setBallotSelectionElectionQuestionAnswer,
} from "../store/ballotSelections/ballotSelectionsSlice"
import {SIMPLE_ELECTION} from "../fixtures/election"

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
    questionIndex: number
    answerIndex: number
    election: IElectionDTO
}
const Answer: React.FC<IAnswerProps> = ({answer, questionIndex, answerIndex, election}) => {
    const selectionState = useAppSelector(
        selectBallotSelectionByQuestionAnswer(election.id, questionIndex, answerIndex)
    )
    const dispatch = useAppDispatch()
    const imageUrl = answer.urls.find((url) => "Image URL" === url.title)?.url
    const infoUrl = answer.urls.find((url) => "URL" === url.title)?.url

    const isChecked = () => isNumber(selectionState) && selectionState > -1
    const setChecked = (value: boolean) =>
        dispatch(
            setBallotSelectionElectionQuestionAnswer({
                election,
                questionIndex,
                answerIndex,
                selection: value ? 0 : -1,
            })
        )

    return (
        <Candidate
            title={answer.text}
            description={stringToHtml(answer.details)}
            isActive={true}
            checked={isChecked()}
            setChecked={setChecked}
            url={infoUrl}
        >
            {imageUrl ? <Image src={imageUrl} duration={100} /> : null}
        </Candidate>
    )
}

interface IQuestionProps {
    election: IElectionDTO
    question: IQuestion
    questionIndex: number
}

const Question: React.FC<IQuestionProps> = ({election, question, questionIndex}) => {
    return (
        <Box>
            <StyledTitle variant="h5">
                <span>{question.title}</span>
                <IconButton
                    icon={faCircleQuestion}
                    sx={{fontSize: "unset", lineHeight: "unset", paddingBottom: "2px"}}
                    fontSize="16px"
                />
            </StyledTitle>
            {question.description ? (
                <Typography variant="body2" sx={{color: theme.palette.customGrey.main}}>
                    {stringToHtml(question.description)}
                </Typography>
            ) : null}
            <CandidatesWrapper>
                {question.answers.map((answer, answerIndex) => (
                    <Answer
                        election={election}
                        answer={answer}
                        questionIndex={questionIndex}
                        answerIndex={answerIndex}
                        key={answerIndex}
                    />
                ))}
            </CandidatesWrapper>
        </Box>
    )
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
            <StyledLink to="/review" sx={{margin: "auto 0", width: {xs: "100%", sm: "200px"}}}>
                <StyledButton sx={{width: {xs: "100%", sm: "200px"}}}>
                    <span>{t("votingScreen.reviewButton")}</span>
                    <Icon icon={faAngleRight} size="sm" />
                </StyledButton>
            </StyledLink>
        </ActionsContainer>
    )
}

export const VotingScreen: React.FC = () => {
    const election = useAppSelector(selectElectionById(SIMPLE_ELECTION.id))
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchElectionByIdAsync(SIMPLE_ELECTION.id))
    }, [])

    if (!election) {
        return <Box>Loading</Box>
    }

    return (
        <PageLimit maxWidth="md">
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
            {election.configuration.description ? (
                <Typography variant="body2" sx={{color: theme.palette.customGrey.main}}>
                    {stringToHtml(election.configuration.description)}
                </Typography>
            ) : null}
            {election.configuration.questions.map((question, index) => (
                <Question
                    election={election}
                    question={question}
                    questionIndex={index}
                    key={index}
                />
            ))}
            <ActionButtons />
        </PageLimit>
    )
}
