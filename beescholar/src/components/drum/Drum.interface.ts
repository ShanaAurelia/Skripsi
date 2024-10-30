export interface IDrumPattern{
    pattern: string[];
    minimumScore: number;
    isReplayable: boolean;
}

export interface IDrumProps{
    patternSet: IDrumPattern;
}