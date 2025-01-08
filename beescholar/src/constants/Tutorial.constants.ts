import { ITutorialData } from '../components/tutorial/Tutorial.interface';

export const TutorialData: ITutorialData[] = [
  {
    title: 'Play Story',
    description:
      "To play Beescholar Story, you have to search for the story quest room in 'Campus Map'. Blue colored task in the to-do list means the quest is part of the Beescholar main story questline. Orange colored task in the to-do list means the quest is part of the Trivial Task, side questline of the Campus.",
    image: '/tutorial/PlayStory.png',
  },
  {
    title: 'Continue Story',
    description:
      'After finishing a story questline, the browser will save the last processed scene for you to go back to your latest Story progress. This menu will be disabled if there is no saved Scene in the browser.',
  },
  {
    title: 'Beescholar',
    description:
      'Beescholar is an organization group consists of strictly selected students across the campus. Becoming a Beescholar is not an easy task, but the benefits are well worth the challenge!',
  },
  {
    title: 'Candidate Points',
    description:
      'You have to earn enough Candidate Points to qualify as a Beescholar. Candidate points can be earned from Minigames, Crosswords, Stages, Trivial Tasks, and Story Quest completion.',
  },
  {
    title: 'Trivial Task',
    description:
      'Trivial tasks are the side quests in the Beescholar world. Each trivial task starts with a story, then a minigame. Trivial Tasks rewards Candidate Points on completion.',
  },
  {
    title: 'Minigame: Follow the Drum',
    description:
      "Follow the Drum consists of a Drum pattern and Drum components. First, player have to click on the 'Start' button to start the pattern color. The circle above the button will turn into a specific color, in which the player must follow. Following the correct pattern rewards higher points to finish the minigame.",
  },
  {
    title: 'Minigame: Story Case',
    description:
      'Story case consists of a case in which players have to solve. The NPC will ask certain questions regarding their problems, and the player can choose one of the solution choices. Giving the correct solution for the NPC rewards higher points.',
  },
  {
    title: 'Minigame: Crossword',
    description:
      'Crossword is A crossword puzzle consists of a grid of black and white square. Each clue corresponds to a word that fits into the numbered squares in either an across or down. Numbers in the grid match numbers in the clue list. Fill in the grids completely to earn the Candidate Points!',
  },
  {
    title: 'NPC Interaction',
    description:
      'When exploring the rooms and traversing the activities, some NPC will try to interact with you. Interacting with the NPC will reward Candidate Points',
  },
  {
    title: 'Stage',
    description:
      'Stage is the final examination of a campus. During a Stage, player is asked to fill questions based on the question type.',
  },
];
