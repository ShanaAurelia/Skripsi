export interface IMultipleChoice{
    choice: string[];
}

export interface IReordering{
    orderables: string[];
}

export interface IYesOrNo{
    yesText: string;
    noText: string;
}

export interface IAnswer{
    number: number;
    answer: string;
}

export interface IQuestion{
    text: string;
    answer: any;
    type: 'MC'|'RR'|'YN'; // Multiple Choice | Reordering | Yes or No
}

export interface IStageData{
    question: IQuestion[];
}