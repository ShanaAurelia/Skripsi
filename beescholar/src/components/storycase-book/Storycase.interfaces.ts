import { ICharacter, IDialogue } from "../../constants/global.interfaces"

export interface IStorycaseData{
    id: string,
    caseNumber: string,
    description: string,
    articleLink: string,
    profilePicture: string
}

export interface IStoryCaseCharacter{
    id: string,
    name: string
}

export interface IStorycase{
    data: IStorycaseData,
    dialogue: IDialogue[],
    characters: IStoryCaseCharacter[]
}