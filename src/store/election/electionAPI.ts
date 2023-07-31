import { sleep } from "../../services/sleep"
import { ElectionState } from "./electionSlice"

export const fetchElection = async (electionId: number): Promise<ElectionState | null> => {
    await sleep(500)

    return {
        id: electionId,
        status: "started",
    }
}