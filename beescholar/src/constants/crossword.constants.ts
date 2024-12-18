import { CluesInput } from '@jaredreisinger/react-crossword';
import {
  ICrosswordData,
  ICrosswordCell,
  ICrosswordCellData,
} from './global.interfaces';

// template
const template = {
  num: {
    answer: '',
    clue: '',
    col: 0,
    row: 0,
  },
};

export const testCrossword: CluesInput = {
  across: {
    1: {
      answer: 'ENRICHMENT',
      clue: 'Apa nama program pengayaan yang ditawarkan oleh Binus University untuk meningkatkan keterampilan non-akademis mahasiswa?',
      col: 0,
      row: 0,
    },
    2: {
        answer: 'SOFTSKILL',
        clue: 'Apa istilah untuk kegiatan yang membantu mahasiswa mengembangkan soft skills di Binus University? (tanpa spasi)',
        col: 0,
        row: 2,
      },
    4: {
      answer: 'CAREERFAIR',
      clue: 'Apa jenis kegiatan yang sering diadakan oleh Binus University untuk memperkenalkan mahasiswa pada industri dan dunia kerja?(tanpa spasi)',
      col: 0,
      row: 4,
    },
  },
  down: {
    3: {
        answer: 'BEM',
        clue: 'Apa nama organisasi mahasiswa di Binus University yang berfokus pada pengembangan kepemimpinan dan manajemen? (akronim)',
        col: 1,
        row: 5,
      },
    5: {
      answer: 'BINUS',
      clue: 'Sebutkan singkatan dari Bina Nusantara',
      col: 8,
      row: 3,
    },
  },
};
