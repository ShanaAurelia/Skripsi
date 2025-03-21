import { ICharacter, IDialogue, IQuizChoiceAnswers } from "../../constants/global.interfaces"

export interface IStorycaseData{
    id: string,
    caseNumber: string,
    description: string,
    articleLink: string,
    profilePicture: string,
}

export interface IStoryCaseSpeech{
    dialogueBubble?: string,
    speechOption?: ISpeechOption[]
}

export interface ISpeechOption{
    choiceId: string,
    choiceText: string
}

export interface IStorycase{
    data: IStorycaseData
}

export interface IStoryCasePayload{
    minigameId: string
    quizChoiceAnswers: IQuizChoiceAnswers[]
}


