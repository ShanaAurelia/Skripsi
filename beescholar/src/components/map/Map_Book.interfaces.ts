export interface IInteractibles{
    id: string,
    type: string,
    description: string,
    minigameType?: string;
    location: string;
}

export interface ITask{
    tasks: ITrivialTask[];
}
export interface ITrivialTask{
    id: string;
    type: string;
    description: string;
    location: string;
}