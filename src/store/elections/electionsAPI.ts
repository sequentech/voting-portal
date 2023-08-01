// SPDX-FileCopyrightText: 2023 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import {SIMPLE_ELECTION} from "../../fixtures/election"
import {sleep} from "ui-essentials"
import {IElectionDTO} from "sequent-core"

export const fetchElection = async (_electionId: number): Promise<IElectionDTO | undefined> => {
    await sleep(500)

    return SIMPLE_ELECTION
}
