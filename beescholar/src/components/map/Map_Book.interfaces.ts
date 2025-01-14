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
    name: string
}

export interface INPCInteraction{
    characterPicture: string,
    characterName: string,
    line: string,
    speed: number
}


export interface ICampusRoom{
    id: string,
    roomName: string,
    type: string,
    background: string
}

export interface IActivityHeader{
    id: string,
    dateEnd?: Date,
    dateStart?: Date,
    description: string,
    questTitle: string,
    roomName?: string,
    activities: IActivityData[],
    type?: string,
    isCompleted?: boolean
    isRepeatable?: boolean
    name: string,
    startSceneId: string
}

export interface IActivityData{
    id: string,
    name: string,
    type: string,
    description: string,
    isRepeatable: boolean,
    isCompleted: boolean,
    completionPoint: number,
    priority: number,
    startSceneId: string
}