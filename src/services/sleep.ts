export const sleep = async (ms: number): Promise<undefined> => {
    return new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), ms))
}
