import { Speed } from "react-type-animation";

export interface IStudent {
  id: string;
  name: string;
  userCode: number;
  role: string;
  academicCareer: string;
  totalPoint: number;
  completionDate: Date;
  semester: number;
  email: string;
  gender: string;
  profilePicture: string;
  token: string
}

export interface ICharacter {
  id: string;
  roles: string[];
  name: string;
  campusId: string;
  description: string;
  likes: string[];
  dislikes: string[];
  image: string;
  gender: string;
}


export interface IUnlockCampus{
  id: string,
  campusName: string,
  description: string,
  mininumSemester: number
}

export interface IDialogue {
  sceneId: string
  dialogueText: string,
  isStartScene: boolean,
  isEndScene: boolean,
  nextSceneId: string,
  characterName: string,
  characterImage?: string,
  background: string,
  options?: ISpeechOption[],
}

export interface ISpeechOption{
  optionId: string,
  optionText: string,
  nextSceneId: string,
}

export interface ISpeech {
  text: string;
  speed: number;
  characterId: string;
  characterExpression: string;
}

export interface ICampus {
  id: string;
  name: string;
  minimumSemester: number;
  description: string;
}

export interface IMinigameHeader {
  minigameId: string,
  minigameName: string,
  minigameType: string,
  quizType: string,
  quizTopic?: string,
  hint?: string,
  instruction: string
  quizQuestions: IQuizQuestion[];
  totalHit: number,
  minimumPassingPoint: number,
  maximumPointReward: number,
}

export interface IMinigameData {

}

export interface IQuiz{
  quizQuestions: IQuizQuestion[]
}

export interface IQuizQuestion{
  questionId: string,
  questionTitle: string,
  questionType: string,
  questionPoint: number,
  characterName?: string,
  characterImage?: string,
  choices: IQuizChoice[],
  steps: IQuizSteps[]
}

export interface IQuizSteps{
  stepId: string,
  stepText: string
}

export interface IStepChoiceAnswers{
  questionId: string,
  questionOrder: number,
  stepIds: string[]
}

export interface IQuizChoiceAnswers{
  questionId: string,
  choiceId: string,
  questionOrder: number
}

export interface IQuizChoice{
  choiceId: string,
  choiceText: string
}

// FOR REACT-CROSSWORD
export interface ICrosswordData {
  across: ICrosswordCell[];
  down: ICrosswordCell[];
}

export interface ICrosswordCell{
  answerNumber: number;
  data: ICrosswordCellData;
}

export interface ICrosswordCellData{
  clue: string;
  answer: string;
  row: number;
  col: number;
}

export interface IRank{
  rank: number;
  name: string;
  leaderboard: string;
}
