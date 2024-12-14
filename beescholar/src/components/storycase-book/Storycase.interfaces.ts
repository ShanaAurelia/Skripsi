import { ICharacter, IDialogue } from "../../constants/global.interfaces"

export interface IStorycaseData{
    id: string,
    caseNumber: string,
    description: string,
    articleLink: string,
    profilePicture: string,
}

export interface IStoryCaseSpeech{
    dialogueBubble?: IStoryCaseBubbleSpeech,
    speechOption?: IStoryCaseOption[]
}

export interface IStorycase{
    data: IStorycaseData
}

export interface IStoryCaseBubbleSpeech{
    text: string,
    isSatisfactory?: boolean;
}

export interface IStoryCaseOption{
    optionText: string
}