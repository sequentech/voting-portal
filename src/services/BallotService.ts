// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import {
    IAuditableBallot,
    IElectionDTO,
    hash_cyphertext_js,
    encrypt_decoded_question_js,
} from "sequent-core"
import {BallotSelection} from "../store/ballotSelections/ballotSelectionsSlice"

export interface IBallotService {
    hashBallot512: (auditableBallot: IAuditableBallot) => string
    encryptBallotSelection: (
        ballotSelection: BallotSelection,
        election: IElectionDTO
    ) => IAuditableBallot
}

export const hashBallot512 = (auditableBallot: IAuditableBallot): string => {
    try {
        return hash_cyphertext_js(auditableBallot.choices)
    } catch (e) {
        console.log(e)
        throw e
    }
}

export const encryptBallotSelection = (
    ballotSelection: BallotSelection,
    election: IElectionDTO
): IAuditableBallot => {
    try {
        return encrypt_decoded_question_js(ballotSelection, election)
    } catch (e) {
        console.log(e)
        throw e
    }
}

export const provideBallotService = (): IBallotService => ({
    hashBallot512,
    encryptBallotSelection,
})
