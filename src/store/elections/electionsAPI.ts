import { SIMPLE_ELECTION } from "../../fixtures/election"
import {sleep} from "../../services/sleep"
import { IElectionDTO } from "sequent-core"

export const fetchElection = async (_electionId: number): Promise<IElectionDTO | undefined> => {
    await sleep(500)

    return SIMPLE_ELECTION
}
