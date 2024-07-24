import { ICharacter, IDialogue } from "../../constants/global.interfaces";

export interface IDialogueState{
    dialogue: IDialogue;
    currentIndex: number;
}

export interface  IDialogueProps{
    background: string;
    characters: ICharacter[];
}