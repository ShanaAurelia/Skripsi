export interface IPersonalStats{
    id: string,
    name: string,
    totalPoint: number,
    completionDate?: Date,
    activityCompleted: number,
    totalActivity: number,
    questCompleted: number,
    totalQuest: number,
    crosswordCompleted: number,
    totalCrossword: number,
    campusUnlocked: number,
    totalCampus: number   
}

export interface IPlayerRank{
    id: string,
    name: string,
    userCode: string,
    profilePicture: string,
    completionDate?: Date,
    totalPoint?: number,
    crosswordDone?: number
}