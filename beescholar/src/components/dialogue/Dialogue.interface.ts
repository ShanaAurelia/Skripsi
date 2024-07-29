import { ICharacter, IDialogue } from "../../constants/global.interfaces";

export interface IDialogueState{
    dialogue: IDialogue;
    activeCharacter: string;
    currentIndex: number;
    userMadeChange: boolean;
    isLoading: boolean;
}

export interface  IDialogueProps{
    background: string;
    characters: ICharacter[];
}
