// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import React from "react"
import {Box} from "@mui/material"
import {theme, CandidatesList, stringToHtml} from "ui-essentials"
import {styled} from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import {IAnswer, IElectionDTO, IQuestion} from "sequent-core"
import {Answer} from "../Answer/Answer"

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

interface ICategory {
    header?: IAnswer
    candidates: Array<IAnswer>
}

type CategoriesMap = {[category: string]: ICategory}

const createCategories = (question: IQuestion): [Array<IAnswer>, CategoriesMap] => {
    const nonCategoryCandidates: Array<IAnswer> = []

    const categoriesMap: CategoriesMap = {}
    for (let answer of question.answers) {
        let category = answer.category
        if (!category) {
            nonCategoryCandidates.push(answer)
            continue
        }
        if (!categoriesMap[category]) {
            // initialize category
            categoriesMap[category] = {
                candidates: [],
            }
        }
        const isCategoryHeader = answer.urls.some(
            (url) => "isCategoryList" === url.title && "true" === url.url
        )
        if (isCategoryHeader) {
            categoriesMap[category].header = answer
        } else {
            categoriesMap[category].candidates.push(answer)
        }
    }

    return [nonCategoryCandidates, categoriesMap]
}

const getCheckableOptions = (
    question: IQuestion
): {checkableLists: boolean; checkableCandidates: boolean} => {
    const enableCheckableLists = question.extra_options?.enable_checkable_lists || "disabled"
    switch (enableCheckableLists) {
        case "allow-selecting-candidates-and-lists":
            return {checkableLists: true, checkableCandidates: true}
        case "allow-selecting-candidates":
            return {checkableLists: false, checkableCandidates: true}
            break
        case "allow-selecting-lists":
            return {checkableLists: true, checkableCandidates: false}
        default:
            return {checkableLists: false, checkableCandidates: false}
    }
}

export interface IQuestionProps {
    election: IElectionDTO
    question: IQuestion
    questionIndex: number
}

export const Question: React.FC<IQuestionProps> = ({election, question, questionIndex}) => {
    const [nonCategoryCandidates, categoriesMap] = createCategories(question)
    const {checkableLists, checkableCandidates} = getCheckableOptions(question)

    return (
        <Box>
            <StyledTitle variant="h5">{question.title}</StyledTitle>
            {question.description ? (
                <Typography variant="body2" sx={{color: theme.palette.customGrey.main}}>
                    {stringToHtml(question.description)}
                </Typography>
            ) : null}
            <CandidatesWrapper>
                {Object.entries(categoriesMap).map(([categoryName, category], categoryIndex) => (
                    <CandidatesList
                        title={categoryName}
                        isActive={true}
                        key={categoryIndex}
                        isCheckable={checkableLists}
                    >
                        {category.candidates.map((candidate, candidateIndex) => (
                            <Answer
                                election={election}
                                answer={candidate}
                                questionIndex={questionIndex}
                                key={candidateIndex}
                                hasCategory={true}
                                isActive={checkableCandidates}
                            />
                        ))}
                    </CandidatesList>
                ))}
                {nonCategoryCandidates.map((answer, answerIndex) => (
                    <Answer
                        election={election}
                        answer={answer}
                        questionIndex={questionIndex}
                        key={answerIndex}
                        isActive={true}
                    />
                ))}
            </CandidatesWrapper>
        </Box>
    )
}
