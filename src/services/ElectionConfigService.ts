// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import {IAnswer, IQuestion} from "sequent-core"

export const findUrlByTitle = (answer: IAnswer, urlTitle: string): string | undefined =>
    answer.urls.find((url) => urlTitle === url.title)?.url

export const getImageUrl = (answer: IAnswer): string | undefined =>
    findUrlByTitle(answer, "Image URL")

export const getLinkUrl = (answer: IAnswer): string | undefined => findUrlByTitle(answer, "URL")

export const checkIsWriteIn = (answer: IAnswer): boolean =>
    "true" === findUrlByTitle(answer, "isWriteIn")

export const checkAllowWriteIns = (question: IQuestion): boolean =>
    !!question.extra_options?.allow_writeins

export const getCheckableOptions = (
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
