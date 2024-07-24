export interface IStudent {
  id: string;
  name: string;
  userCode: number;
  academicCareer: string;
  totalPoint: number;
  completionDate: Date;
  semester: number;
  email: string;
  gender: string;
  userPictureUrl: string;
}

export interface ICharacter {
  id: string;
  role: string;
  name: string;
  campusId: string;
  description: string;
  likes: string;
  dislikes: string;
  picture: string;
}

export interface IDialogue {
  index: number;
  line: ISpeech;
  choiceLine?: ISpeechOption;
}

export interface ISpeech {
  text: string;
  speed: string;
  characterId: string;
  characterExpression: string;
}

export interface ISpeechOption {
  optionId: string;
  text: string;
  speechId: string;
  nextSceneId: string;
}

export interface ICampus {
  id: string;
  name: string;
  minimumSemester: number;
  description: string;
}
