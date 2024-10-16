import React, { Component } from 'react';
import { DummyDialogueLine } from '../../constants/dummy.constants';
import { IDialogueProps, IDialogueState } from './Scene.interface';
import { ICharacter } from '../../constants/global.interfaces';
import Button from '@mui/material/Button';
import Speech from '../speech/Speech';
import Character from './Character';

class Dialogue extends Component<IDialogueProps, IDialogueState> {
  constructor(props: IDialogueProps) {
    super(props);
    this.state = {
      activeCharacter: '',
      currentIndex: 0,
      userMadeChange: false,
      isLoading: false,
      dialogue: {
        index: 0,
        line: {
          characterExpression: '',
          characterId: '',
          speed: 1,
          text: 'no text found',
        },
      },
    };
  }

  componentDidMount(): void {
    this.handleNextSpeech();
  }

  setUserMadeChange = () => {
    this.setState({ userMadeChange: true });
  };

  handleNextSpeech = () => {
    const { currentIndex } = this.state;
    this.setState({ isLoading: true }, () => {
      this.setUserMadeChange();
    });
    setTimeout(() => {
      this.dummyApiCall(currentIndex);
    }, 500);
  };

  dummyApiCall = (index: number) => {
    const { currentIndex } = this.state;
    if (DummyDialogueLine[currentIndex] !== undefined) {
      this.setState(
        {
          dialogue: DummyDialogueLine[index],
          currentIndex: currentIndex + 1,
          isLoading: false,
          activeCharacter: DummyDialogueLine[index].line.characterId,
        },
        () => {
          this.setUserMadeChange();
        }
      );
    } else {
      this.props.backToHomepage();
    }
  };

  render() {
    const { background, characters } = this.props;
    const { dialogue, currentIndex, isLoading, activeCharacter } = this.state;
    return (
      <div
        id='dialogue-skeleton'
        className='flex justify-center w-full h-full overflow-hidden relative'>
        <div
          id='dialogue-background'
          className='absolute overflow-hidden w-full h-full'>
          <img
            src={background}
            className='object-fill w-full h-full opacity-60 bg-black'
          />
        </div>
        <div
          id='character-background'
          className='z-10 w-full h-5/6 absolute bottom-0 flex flex-row justify-between'>
          {characters.map((char, idx) => (
            <Character
              src={char.picture}
              isActive={char.id === activeCharacter}
              position={idx % 2 == 0 ? 'left' : 'right'}
            />
          ))}
        </div>
        <div
          id='dialogue-background'
          className='bg-black z-30 w-full h-1/3 absolute bottom-0'>
          {
            <Speech
              character={
                characters.find((char) => char.id === dialogue.line.characterId)
                  ?.name || 'Placeholder'
              }
              line={dialogue.line.text}
              speed={dialogue.line.speed}
              class={[]}
              handleNext={this.handleNextSpeech}
              isLoading={isLoading}
            />
          }
        </div>
      </div>
    );
  }
}

export default Dialogue;
