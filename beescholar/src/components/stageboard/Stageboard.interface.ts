export interface IMultipleChoice{
    choiceId: string,
    choiceText: string
}

export interface IReordering{
    orderables: string[];
}

export interface IYesOrNo{
    choiceId: string,
    choiceText: string
}

export interface IQuestion{
    text: string;
    answer: any;
    type: 'MC'|'RR'|'YN'; // Multiple Choice | Reordering | Yes or No
}

export interface IStageData{
    question: IQuestion[];
}