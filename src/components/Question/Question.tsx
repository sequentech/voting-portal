// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import React from "react"
import {useAppDispatch, useAppSelector} from "../../store/hooks"
import {Box} from "@mui/material"
import {theme, Candidate, stringToHtml, isUndefined} from "ui-essentials"
import {styled} from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import {IAnswer, IElectionDTO, IQuestion} from "sequent-core"
import Image from "mui-image"
import Button from "@mui/material/Button"
import {
    selectBallotSelectionVoteChoice,
    setBallotSelectionVoteChoice,
} from "../../store/ballotSelections/ballotSelectionsSlice"

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

interface IAnswerProps {
    answer: IAnswer
    questionIndex: number
    answerIndex: number
    election: IElectionDTO
}
const Answer: React.FC<IAnswerProps> = ({answer, questionIndex, answerIndex, election}) => {
    const selectionState = useAppSelector(
        selectBallotSelectionVoteChoice(election.id, questionIndex, answerIndex)
    )
    const dispatch = useAppDispatch()
    const imageUrl = answer.urls.find((url) => "Image URL" === url.title)?.url
    const infoUrl = answer.urls.find((url) => "URL" === url.title)?.url

    const isChecked = () => !isUndefined(selectionState) && selectionState.selected > -1
    const setChecked = (value: boolean) =>
        dispatch(
            setBallotSelectionVoteChoice({
                election,
                questionIndex,
                voteChoice: {
                    id: answerIndex,
                    selected: value ? 0 : -1,
                },
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

export const Question: React.FC<IQuestionProps> = ({election, question, questionIndex}) => {
    return (
        <Box>
            <StyledTitle variant="h5">{question.title}</StyledTitle>
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
