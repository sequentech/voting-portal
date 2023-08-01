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
    BallotHash,
    isNumber,
    Dialog,
} from "ui-essentials"
import {styled} from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import {
    faCircleQuestion,
    faAngleLeft,
    faAngleRight,
    faFire,
} from "@fortawesome/free-solid-svg-icons"
import {IAnswer, IQuestion} from "sequent-core"
import Image from "mui-image"
import {useTranslation} from "react-i18next"
import Button from "@mui/material/Button"
import {Link as RouterLink} from "react-router-dom"
import {selectBallotSelectionByQuestionAnswer} from "../store/ballotSelections/ballotSelectionsSlice"
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
    electionId: number
}
const Answer: React.FC<IAnswerProps> = ({answer, questionIndex, answerIndex, electionId}) => {
    const selectionState = useAppSelector(
        selectBallotSelectionByQuestionAnswer(electionId, questionIndex, answerIndex)
    )
    const imageUrl = answer.urls.find((url) => "Image URL" === url.title)?.url
    const infoUrl = answer.urls.find((url) => "URL" === url.title)?.url

    if (!isNumber(selectionState) || selectionState < 0) {
        return null
    }

    return (
        <Candidate
            title={answer.text}
            description={stringToHtml(answer.details)}
            isActive={false}
            url={infoUrl}
        >
            {imageUrl ? <Image src={imageUrl} duration={100} /> : null}
        </Candidate>
    )
}

interface IQuestionProps {
    question: IQuestion
    questionIndex: number
    electionId: number
}

const Question: React.FC<IQuestionProps> = ({question, questionIndex, electionId}) => {
    return (
        <Box>
            <StyledTitle variant="h5">
                {String(questionIndex + 1) + ". " + question.title}
            </StyledTitle>
            <CandidatesWrapper>
                {question.answers.map((answer, answerIndex) => (
                    <Answer
                        key={answerIndex}
                        questionIndex={questionIndex}
                        answerIndex={answerIndex}
                        answer={answer}
                        electionId={electionId}
                    />
                ))}
            </CandidatesWrapper>
        </Box>
    )
}

interface ActionButtonProps {}

const ActionButtons: React.FC<ActionButtonProps> = ({}) => {
    const {t} = useTranslation()

    return (<Box sx={{ marginBottom: "10px", marginTop: "10px"}}>
        <StyledLink to="/audit" sx={{display: {xs: "block", sm: "none"}, marginBottom: "2px", width: "100%"}}>
            <StyledButton sx={{width: "100%"}} variant="warning">
                <Icon icon={faFire} size="sm" />
                <Box>{t("reviewScreen.auditButton")}</Box>
            </StyledButton>
        </StyledLink>
        <ActionsContainer>
            <StyledLink to="/vote" sx={{margin: "auto 0", width: {xs: "100%", sm: "200px"}}}>
                <StyledButton sx={{width: {xs: "100%", sm: "200px"}}}>
                    <Icon icon={faAngleLeft} size="sm" />
                    <Box>{t("reviewScreen.backButton")}</Box>
                </StyledButton>
            </StyledLink>
            <StyledLink to="/audit" sx={{display: {xs: "none", sm: "block"}, margin: "auto 0", width: {xs: "100%", sm: "200px"}}}>
                <StyledButton sx={{width: {xs: "100%", sm: "200px"}}} variant="warning">
                    <Icon icon={faFire} size="sm" />
                    <Box>{t("reviewScreen.auditButton")}</Box>
                </StyledButton>
            </StyledLink>
            <StyledLink to="/confirmation" sx={{margin: "auto 0", width: {xs: "100%", sm: "200px"}}}>
                <StyledButton sx={{width: {xs: "100%", sm: "200px"}}}>
                    <Box>{t("reviewScreen.castBallotButton")}</Box>
                    <Icon icon={faAngleRight} size="sm" />
                </StyledButton>
            </StyledLink>
        </ActionsContainer>
    </Box>)
}

export const ReviewScreen: React.FC = () => {
    const {t} = useTranslation()
    const election = useAppSelector(selectElectionById(SIMPLE_ELECTION.id))
    const dispatch = useAppDispatch()
    const [openBallotIdHelp, setOpenBallotIdHelp] = useState(false)

    useEffect(() => {
        dispatch(fetchElectionByIdAsync(SIMPLE_ELECTION.id))
    }, [])

    if (!election) {
        return <Box>Loading</Box>
    }

    return (
        <PageLimit maxWidth="lg">
            <BallotHash hash="eee6fe54bc8a5f3fce2d2b8aa1909259ceaf7df3266302b7ce1a65ad85a53a92" onHelpClick={() => setOpenBallotIdHelp(true)}/>
            <Dialog
                handleClose={() => setOpenBallotIdHelp(false)}
                open={openBallotIdHelp}
                title={t("reviewScreen.ballotIdHelpDialog.title")}
                ok={t("reviewScreen.ballotIdHelpDialog.ok")}
                cancel={t("reviewScreen.ballotIdHelpDialog.cancel")}
                variant="info"
            >
                {stringToHtml(t("reviewScreen.ballotIdHelpDialog.content"))}
            </Dialog>
            <Box marginTop="48px">
                <BreadCrumbSteps
                    labels={[
                        "breadcrumbSteps.ballot",
                        "breadcrumbSteps.review",
                        "breadcrumbSteps.confirmation",
                    ]}
                    selected={1}
                />
            </Box>
            <StyledTitle variant="h4" fontSize="24px" fontWeight="bold" sx={{margin: 0}}>
                <Box>{t("reviewScreen.title")}</Box>
                <IconButton
                    icon={faCircleQuestion}
                    sx={{fontSize: "unset", lineHeight: "unset", paddingBottom: "2px"}}
                    fontSize="16px"
                />
            </StyledTitle>
            <Typography variant="body2" sx={{color: theme.palette.customGrey.main}}>
                {stringToHtml(t("reviewScreen.description"))}
            </Typography>
            {election.configuration.questions.map((question, index) => (
                <Question
                    electionId={election.id}
                    question={question}
                    key={index}
                    questionIndex={index}
                />
            ))}
            <ActionButtons />
        </PageLimit>
    )
}
