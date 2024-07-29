import React, { Component } from 'react';
import { DummyDialogueLine } from '../../constants/dummy.constants';
import { IDialogueProps, IDialogueState } from './Dialogue.interface';
import { ICharacter } from '../../constants/global.interfaces';
import Button from '@mui/material/Button';
import Speech from '../speech/Speech';

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

  // componentDidUpdate(prevProps: Readonly<IDialogueProps>, prevState: Readonly<IDialogueState>, snapshot?: any): void {
  //   if(prevState.currentIndex !== this.state.currentIndex && prevState.currentIndex === 0){
  //     this.setState({ isLoading: true }, () => {this.setUserMadeChangeTrue()})
  //   }
  // }

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
    }
  };

  render() {
    const { background, characters } = this.props;
    const { dialogue, currentIndex, isLoading, activeCharacter } = this.state;
    return (
      <div className='flex justify-center w-10/12 bg-orange-200 h-screen'>
        <div className='container flex flex-col h-full justify-between'>
          <div className='flex flex-col'>
            <img
              className='bg-fixed bg-cover absolute h-full w-5/6 z-0'
              src={background}
            />
            <div className='bg-fixed bg-cover absolute h-full w-5/6 z-0 bg-black opacity-70' />
            {isLoading && <div></div>}
            {!isLoading && (
              <>
                <div className='flex flex-row flex-wrap justify-between z-10 h-1/5'>
                  {characters.map((c: ICharacter, charIndex: number) => {
                    var additionalClass = '';
                    if ((charIndex + 1) % 2 == 0) {
                      if ((c.id === activeCharacter)) {
                        additionalClass = ' w-1/2';
                      } else {
                        additionalClass = ' w-10/12';
                      }

                      return (
                        <div className='ml-5 w-1/6 mt-56'>
                          <img
                            className={'bg-scroll bg-cover' + additionalClass}
                            src={c.picture}
                          />
                        </div>
                      );
                    } else {
                      if ((c.id === activeCharacter)) {
                        additionalClass = ' w-1/2';
                      } else {
                        additionalClass = ' w-10/12';
                      }

                      return (
                        <div className='mr-5 w-1/6 mt-56'>
                          <img
                            className={'bg-scroll bg-cover'+ additionalClass}
                            src={c.picture}
                          />
                        </div>
                      );
                    }
                  })}
            </div>
              </>
            )}
          </div>

          {isLoading && (
            <div className=' container bg-white bg-fixed bg-cover z-20 w-full h-1/4'></div>
          )}
          {!isLoading && (
            <div className=' bg-white bg-fixed bg-cover z-20 w-full h-1/4 overflow-hidden'>
              <div className=' bg-teal-100 bg-fixed bg-cover w-fit p-3 rounded-xl flex overflow-hidden'>
                {characters.find((c) => c.id === activeCharacter)?.name}
              </div>
              <Speech
                line={dialogue.line.text}
                speed={dialogue.line.speed}
                class={[]}
                handleNext={this.handleNextSpeech}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Dialogue;
