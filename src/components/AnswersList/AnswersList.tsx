// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import React from "react"
import {Box} from "@mui/material"
import {theme, CandidatesList, stringToHtml, isUndefined} from "ui-essentials"
import {styled} from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import {IAnswer, IElectionDTO, IQuestion} from "sequent-core"
import {Answer} from "../Answer/Answer"
import {useAppDispatch, useAppSelector} from "../../store/hooks"
import {
    selectBallotSelectionVoteChoice,
    setBallotSelectionVoteChoice,
} from "../../store/ballotSelections/ballotSelectionsSlice"

export interface ICategory {
    header?: IAnswer
    candidates: Array<IAnswer>
}

export interface AnswersListProps {
    title: string
    isActive: boolean
    checkableLists: boolean
    checkableCandidates: boolean
    category: ICategory
    election: IElectionDTO
    questionIndex: number
}

export const AnswersList: React.FC<AnswersListProps> = ({
    title,
    isActive,
    checkableLists,
    checkableCandidates,
    category,
    election,
    questionIndex,
}) => {
    const categoryAnswerId = category.header?.id || -1
    const selectionState = useAppSelector(
        selectBallotSelectionVoteChoice(election.id, questionIndex, categoryAnswerId)
    )
    const dispatch = useAppDispatch()
    const isChecked = () => !isUndefined(selectionState) && selectionState.selected > -1
    const setChecked = (value: boolean) =>
        dispatch(
            setBallotSelectionVoteChoice({
                election,
                questionIndex,
                voteChoice: {
                    id: categoryAnswerId,
                    selected: value ? 0 : -1,
                },
            })
        )

    return (
        <CandidatesList
            title={title}
            isActive={isActive}
            isCheckable={checkableLists}
            checked={isChecked()}
            setChecked={setChecked}
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
    )
}
