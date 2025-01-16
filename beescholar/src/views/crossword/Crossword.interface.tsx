export interface ICrosswordState {
    isCrosswordComplete: boolean;
    isCrosswordCorrect: boolean;
    openModal: boolean;
}

export interface ICrosswordProps {
}

export interface ICrosswordRaw{
    wordId: string,
    clue: string,
    direction: string,
    colStartIdx: number,
    rowStartIdx: number,
    answer:string
}

