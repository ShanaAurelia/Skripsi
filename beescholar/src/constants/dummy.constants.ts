import { IDialogueProps } from '../components/dialogue/Scene.interface';
import { IInteractibles } from '../components/map/Map_Book.interfaces';
import { ICharacter, IDialogue, IRank, IStudent } from './global.interfaces';

export const DummyStudent: IStudent = {
  id: '0a1d5e9e-ca7d-47d1-8466-00ca9f8818b7',
  academicCareer: 'Undergraduate',
  completionDate: new Date('2024-12-20'),
  email: 'dummy@binus.ac.id',
  gender: 'Male',
  name: 'John Doe',
  semester: 1,
  totalPoint: 0,
  userCode: 2502001001,
  userPictureUrl:
    'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721433600&semt=ais_user',
};

export const DummyDialogue: IDialogueProps = {
  background: '/backgrounds/dummy-classroom.jpeg',
  characters: [
    {
      campusId: '1',
      description: 'Kemanggisan',
      dislikes: 'Robots',
      id: '01',
      likes: 'Spicy Food',
      name: 'Female Player',
      role: 'Student',
      picture: '/characters/aset merch BINUS Support 3 - bahagia copy.png',
    },
    {
      campusId: '1',
      description: 'Kemanggisan',
      dislikes: 'Robots',
      id: '02',
      likes: 'Spicy Food',
      name: 'Male Player',
      role: 'Student',
      picture: '/characters/aset merch BINUS Support 6 - pemberi info copy.png',
    },
  ],
};

export const DummyDialogueLine: IDialogue[] = [
  {
    index: 0,
    line: {
      characterExpression: 'Empty',
      characterId: '01',
      speed: 2,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus porta ante, non efficitur magna ullamcorper et. Donec et dui in risus vehicula euismod eu et diam. Duis dignissim est ex, id hendrerit est fermentum ut. Sed pellentesque augue viverra mauris imperdiet interdum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque ut malesuada urna. Proin.',
    },
  },
  {
    index: 1,
    line: {
      characterExpression: 'Empty',
      characterId: '02',
      speed: 2,
      text: 'I am Good',
    },
  },
  {
    index: 2,
    line: {
      characterExpression: 'Empty',
      characterId: '01',
      speed: 4,
      text: 'is that true?',
    },
  },
  {
    index: 3,
    line: {
      characterExpression: 'Empty',
      characterId: '02',
      speed: 2,
      text: 'yeah',
    },
  },
  {
    index: 4,
    line: {
      characterExpression: 'Empty',
      characterId: '01',
      speed: 4,
      text: 'Truthfully true?',
    },
  },
];

export const DummyIntroductionDialogue: IDialogue[] = [
  {
    index: 0,
    line: {
      characterExpression: 'Empty',
      characterId: '01',
      speed: 1,
      text: 'Halo, siapa nama kamu?',
    },
  },
  {
    index: 1,
    line: {
      characterExpression: 'Empty',
      characterId: '01',
      speed: 1,
      text: 'Hi {playerName}. Perkenalkan nama aku Diyan... Aku akan mendampingi mu agar kamu bisa berhasil menjadi Beescholar',
    },
  },
  {
    index: 2,
    line: {
      characterExpression: 'Empty',
      characterId: '01',
      speed: 1,
      text: 'Hi {playerName}, selamat kamu telah direkomendasikan menjadi salah satu kandidat "Beescholar". Saat ini kamu dipanggil ke ruang guru untuk menerima informasi detailnya.',
    },
  },
  {
    index: 3,
    line: {
      characterExpression: 'Empty',
      characterId: '01',
      speed: 1,
      text: 'Sebagai salah satu kandidat yang direkomendasikan, kamu juga mendapat poster berisi petunjuk proses untuk menjadi Beescholar dan kamu dapat menyimpannya di ruang penyimpananmu.',
    },
  },
];

export const KMGCharacters: ICharacter[] = [
  {
    id: '01',
    campusId: '01',
    description: 'A temporary description',
    dislikes: 'Spicy food',
    likes: 'Mild food',
    name: 'Tempo',
    picture: '/characters/aset merch BINUS Support 4 - pusing copy.png',
    role: 'Student',
  },
  {
    id: '02',
    campusId: '02',
    description: 'A temporary description',
    dislikes: 'Spicy food',
    likes: 'Mild food',
    name: 'Tempon',
    picture: '/characters/aset merch BINUS Support 4 - pusing copy.png',
    role: 'Beescholar',
  },
  {
    id: '03',
    campusId: '03',
    description: 'A temporary description',
    dislikes: 'Spicy food',
    likes: 'Mild food',
    name: 'Temporin',
    picture: '/characters/aset merch BINUS Support 4 - pusing copy.png',
    role: 'Student',
  },
  {
    id: '04',
    campusId: '04',
    description: 'A temporary description',
    dislikes: 'Spicy food',
    likes: 'Mild food',
    name: 'Tempo',
    picture: '/characters/aset merch BINUS Support 4 - pusing copy.png',
    role: 'Literature Club Leader',
  },
];

export const DummyInteractibles: IInteractibles[] = [
  {
    id: '01',
    description: 'Meet Up with Diyan in the Teacher Office',
    type: 'Main Quest',
  },
  {
    id: '02',
    description: 'Someone wants to talk in the Band Room',
    type: 'Trivial Task',
  },
  {
    id: '03',
    description: 'Someone needs help in the Classroom',
    type: 'Interaction',
  },
  {
    id: '04',
    description: 'Talk to Ania in the Hallway',
    type: 'Interaction',
  },
];

export const DummyLeaderboardStory: string[] = [
  'John Doe',
  'Maria Sanches',
  'Maurine Moran',
  'Dennis Jones',
  'Elena Ormanda',
  'Esther Carmilla Colleta',
  'Shannon Legase',
  'Juan Deleon',
  'Francis Schmidt',
  'Michael Bernard Magdir',
];
export const DummyLeaderboardPoints: string[] = [
  'John Doe',
  'Maria Sanches',
  'Maurine Moran',
  'Dennis Jones',
  'Elena Ormanda',
  'Esther Carmilla Colleta',
  'Shannon Legase',
  'Juan Deleon',
  'Francis Schmidt',
  'Michael Bernard Magdir',
];
export const DummyLeaderboardCrossword: string[] = [
  'John Doe',
  'Maria Sanches',
  'Maurine Moran',
  'Dennis Jones',
  'Elena Ormanda',
  'Esther Carmilla Colleta',
  'Shannon Legase',
  'Juan Deleon',
  'Francis Schmidt',
  'Michael Bernard Magdir',
];

export const DummyPlayerRank: IRank[] = [
  { leaderboard: 'story', name: 'John Doe', rank: 1 },
  { leaderboard: 'points', name: 'John Doe', rank: 1 },
  { leaderboard: 'crossword', name: 'John Doe', rank: 1 },
];
