// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import {IAuditableBallot, hash_ballot} from "sequent-core"

export interface IBallotService {
    hashBallot512: (auditableBallot: IAuditableBallot) => string
}

export const hashBallot512 = (auditableBallot: IAuditableBallot): string => {
    try {
        return hash_ballot(auditableBallot)
    } catch (e) {
        console.log(e)
        throw e
    }
}

export const provideBallotService = (): IBallotService => ({
    hashBallot512,
})
