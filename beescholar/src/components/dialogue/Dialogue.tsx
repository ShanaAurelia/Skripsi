import React, { Component } from 'react';
import { DummyDialogueLine } from '../../constants/dummy.constants';
import { IDialogueProps, IDialogueState } from './Dialogue.interface';
import { ICharacter } from '../../constants/global.interfaces';

class Dialogue extends Component<IDialogueProps, IDialogueState> {
  constructor(props: IDialogueProps) {
    super(props);
    this.state = {
      currentIndex: -1,
      dialogue: {
        index: 0,
        line: {
          characterExpression: '',
          characterId: '',
          speed: '',
          text: 'no text found',
        },
      },
    };
  }

  dummyApiCall = (index: number) => {
    this.setState({ dialogue: DummyDialogueLine[index] });
  };

  render() {
    const { background, characters } = this.props;
    const { dialogue, currentIndex } = this.state;
    return (
      <div className='flex justify-center w-10/12 bg-orange-200 h-screen'>
        <div className='container flex flex-col h-full justify-between'>
          <div className='flex flex-col'>
            <img
              className='bg-fixed bg-cover absolute h-full w-5/6 z-0'
              src={background}
            />
            <div className='bg-fixed bg-cover absolute h-full w-5/6 z-0 bg-black opacity-70' />
            <div className='flex flex-row flex-wrap justify-between z-10 h-1/5'>
              {characters.map((c: ICharacter, charIndex: number) => {
                if ((charIndex + 1) % 2 == 0) {
                  return (
                    <div className='ml-5 w-1/6 mt-56'>
                      <img
                        className='bg-scroll bg-cover w-10/12'
                        src={c.picture}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div className='mr-5 w-1/6 mt-56'>
                      <img
                        className='bg-scroll bg-cover w-10/12'
                        src={c.picture}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <div className=' container bg-white bg-fixed bg-cover z-20 w-full h-1/4'></div>
        </div>
      </div>
    );
  }
}

export default Dialogue;
