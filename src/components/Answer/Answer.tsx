// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import React from "react"
import {useAppDispatch, useAppSelector} from "../../store/hooks"
import {Candidate, stringToHtml, isUndefined} from "ui-essentials"
import {IAnswer, IElectionDTO} from "sequent-core"
import Image from "mui-image"
import {
    selectBallotSelectionQuestion,
    selectBallotSelectionVoteChoice,
    setBallotSelectionInvalidVote,
    setBallotSelectionVoteChoice,
} from "../../store/ballotSelections/ballotSelectionsSlice"
import {
    checkAllowWriteIns,
    checkIsWriteIn,
    getImageUrl,
    getLinkUrl,
} from "../../services/ElectionConfigService"

export interface IAnswerProps {
    answer: IAnswer
    questionIndex: number
    election: IElectionDTO
    hasCategory?: boolean
    isActive: boolean
    isReview: boolean
    isInvalidVote?: boolean
}

export const Answer: React.FC<IAnswerProps> = ({
    answer,
    questionIndex,
    election,
    hasCategory,
    isActive,
    isReview,
    isInvalidVote,
}) => {
    const selectionState = useAppSelector(
        selectBallotSelectionVoteChoice(election.id, questionIndex, answer.id)
    )
    const questionState = useAppSelector(selectBallotSelectionQuestion(election.id, questionIndex))
    const question = election.configuration.questions[questionIndex]
    const dispatch = useAppDispatch()
    const imageUrl = getImageUrl(answer)
    const infoUrl = getLinkUrl(answer)

    const isChecked = (): boolean => {
        if (!isInvalidVote) {
            return !isUndefined(selectionState) && selectionState.selected > -1
        } else {
            return !isUndefined(questionState) && questionState.is_explicit_invalid
        }
    }
    const setInvalidVote = (value: boolean) => {
        dispatch(
            setBallotSelectionInvalidVote({
                election,
                questionIndex,
                isExplicitInvalid: value,
            })
        )
    }
    const setChecked = (value: boolean) => {
        if (!isActive || isReview) {
            return
        }
        if (isInvalidVote) {
            setInvalidVote(value)
            return
        }
        dispatch(
            setBallotSelectionVoteChoice({
                election,
                questionIndex,
                voteChoice: {
                    id: answer.id,
                    selected: value ? 0 : -1,
                    writein_text: selectionState?.writein_text,
                },
            })
        )
    }

    const isWriteIn = checkIsWriteIn(answer)
    const allowWriteIns = checkAllowWriteIns(question)

    const setWriteInText = (writeInText: string): void => {
        if (!isWriteIn || !allowWriteIns || !isActive || isReview) {
            return
        }
        dispatch(
            setBallotSelectionVoteChoice({
                election,
                questionIndex,
                voteChoice: {
                    id: answer.id,
                    selected: isUndefined(selectionState) ? -1 : selectionState.selected,
                    writein_text: writeInText,
                },
            })
        )
    }

    if (isReview && !isChecked()) {
        return null
    }

    return (
        <Candidate
            title={answer.text}
            description={stringToHtml(answer.details)}
            isActive={isActive}
            checked={isChecked()}
            setChecked={setChecked}
            url={infoUrl}
            hasCategory={hasCategory}
            isWriteIn={allowWriteIns && isWriteIn}
            writeInValue={selectionState?.writein_text}
            setWriteInText={setWriteInText}
            isInvalidVote={isInvalidVote}
        >
            {imageUrl ? <Image src={imageUrl} duration={100} /> : null}
        </Candidate>
    )
}
