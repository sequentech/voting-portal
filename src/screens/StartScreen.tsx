// SPDX-FileCopyrightText: 2022 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import React, { useEffect } from "react"
import { fetchElectionByIdAsync, selectElectionById } from "../store/elections/electionsSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { Box } from "@mui/material"
import {PageLimit, BreadCrumbSteps, IconButton, theme} from "ui-essentials"
import {styled} from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import {faCircleQuestion} from "@fortawesome/free-solid-svg-icons"
import { IAnswer, IQuestion } from "sequent-core"

const StyledTitle = styled(Typography)`
    margin-top: 25.5px;
    display: flex;
    flex-direction: row;
    gap: 16px;
`
interface IAnswerProps {
    answer: IAnswer
}
const Answer: React.FC<IAnswerProps> = ({answer}) => {
    return <Box>
        
    </Box>
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
        {
            question.answers.map((answer, index) =>
                <Answer answer={answer} key={index}/>
            )
        }
    </Box>
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
        <StyledTitle variant="h5">
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
    </PageLimit>
}
