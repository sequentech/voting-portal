// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import React from "react"
import {useAppDispatch, useAppSelector} from "../../store/hooks"
import {Candidate, stringToHtml, isUndefined} from "ui-essentials"
import {IAnswer, IElectionDTO} from "sequent-core"
import Image from "mui-image"
import {
    selectBallotSelectionVoteChoice,
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
}

export const Answer: React.FC<IAnswerProps> = ({
    answer,
    questionIndex,
    election,
    hasCategory,
    isActive,
    isReview,
}) => {
    const selectionState = useAppSelector(
        selectBallotSelectionVoteChoice(election.id, questionIndex, answer.id)
    )
    const question = election.configuration.questions[questionIndex]
    const dispatch = useAppDispatch()
    const imageUrl = getImageUrl(answer)
    const infoUrl = getLinkUrl(answer)

    const isChecked = () => !isUndefined(selectionState) && selectionState.selected > -1
    const setChecked = (value: boolean) => {
        if (!isActive || isReview) {
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

    if (isReview && (isUndefined(selectionState) || selectionState.selected < 0)) {
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
        >
            {imageUrl ? <Image src={imageUrl} duration={100} /> : null}
        </Candidate>
    )
}
