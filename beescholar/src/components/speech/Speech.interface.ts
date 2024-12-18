import { Speed } from "react-type-animation";

export interface  ISpeechState{

}

export interface ISpeechProps{
    line: string;
    speed: number;
    class: string[];
    handleNext(): void;
    character: string;
    // isLoading: boolean;
}