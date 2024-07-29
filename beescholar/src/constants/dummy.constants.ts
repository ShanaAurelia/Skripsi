import { IDialogueProps } from '../components/dialogue/Dialogue.interface';
import { IDialogue, IStudent } from './global.interfaces';

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
