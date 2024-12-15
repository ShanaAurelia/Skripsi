import React, { useEffect, useRef, useState } from 'react';
import {
  IAnswer,
  IMultipleChoice,
  IReordering,
  IStageData,
  IYesOrNo,
} from './Stageboard.interface';
import { DummyStage } from '../../constants/dummy.constants';

const Stageboard = () => {
  // for stage
  const [stageData, setStageData] = useState<IStageData>();
  const [activeNumber, setActiveNumber] = useState<number>(-1);
  const [answeredNumber, setAnsweredNumber] = useState<number[]>([]);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tryRefresh, setTryRefresh] = useState<boolean>(false);
  // for multiple-choice
  const [multipleChoice, setMultipleChoice] = useState<any>();
  const [mcanswerKey, setmcAnswerKey] = useState<number>();
  // for re-ordering
  const [reordering, setReordering] = useState<any>();
  const [draggedData, setDraggedData] = useState<string>();
  const [draggedDataLocation, setDraggedDataLocation] = useState<number>();
  const [order, setOrders] = useState<string[]>([]); // ex: A B C
  const [reorders, setReorders] = useState<string[]>([]); // ex: answer1 answer2 answer3
  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);
  const [rrasnwerKey, setrrAnswerKey] = useState<number>();
  // for yes-or-no
  const [yesOrNo, setYesOrNo] = useState<any>();

  useEffect(() => {
    setStageData(DummyStage);
    handleAnswerByType();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    handleReinitializeAnswer();
    handleReinitializeReordering();
    setTimeout(() => {
      handleAnswerByType();
    }, 500);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setTimeout(() => {
      if (isLoading || isLoadingOrder) {
        setTryRefresh(true);
      }
    }, 5000);
  }, [activeNumber]);

  const handlemcAnswerKey = () => {
    setmcAnswerKey(Math.random());
  };

  const handlerrAnswerKey = () => {
    setrrAnswerKey(Math.random());
  };

  const draggedItem = useRef();
  const draggedLocation = useRef();

  const handleDragStart = (e: any, position: any, value: string) => {
    draggedItem.current = position;
    // console.log(e.target.innerHTML, value, position);
    setDraggedData(value);
    setDraggedDataLocation(position);
  };

  const handleDragEnd = (e: any, position: any, value: string) => {
    draggedLocation.current = position;
    setIsLoadingOrder(true);
    // console.log(e.target.innerHTML, value, position);
    let _orders = order;
    let _reorder = reorders;
    if (draggedData) {
      // update order
      _orders[position] = draggedData;
      setOrders(_orders);
    }
    // if (draggedDataLocation !== undefined) {
    //   _reorder[draggedDataLocation] = value;
    //   setReorders(_reorder);
    // }
    handlerrAnswerKey();
    setIsLoadingOrder(false);
  };

  const handleRenderByType = (type: string) => {
    if (type === 'MC') return renderMultipleChoice();
    if (type === 'RR') return renderReordering();
    if (type === 'YN') return renderYesOrNo();
    if (type === 'null') return renderAnswerError();
  };

  const handleIntializeReodering = () => {
    const _answerIndex = answers.findIndex(
      (ans) => ans.number === activeNumber
    );
    if (_answerIndex === -1) {
      // if no saved answer found
      setIsLoadingOrder(true);
      const _reorder = stageData?.question[activeNumber].answer;
      setReordering(_reorder);
      const _newReorder = _reorder.orderables;
      if (order.length === 0 && reorders.length === 0) {
        for (let index = 0; index < _newReorder.length; index++) {
          const _orderBox = handleChoiceByIndex(index);
          setOrders((curr) => {
            if (!order.find((o) => o === _orderBox)) {
              return [...curr, _orderBox];
            }
            return curr;
          });
          setReorders((curr) => {
            if (!reorders.find((o) => o === _newReorder[index])) {
              return [...curr, _newReorder[index]];
            }
            return curr;
          });
        }
      }
      if (order.length === 0 && reorders.length === 0) {
        setIsLoadingOrder(false);
      }
    } else {
      // if saved answer found
      // still need set reorder data loop to change answers
      const _reorder = stageData?.question[activeNumber].answer;
      setReordering(_reorder);
      const _newReorder = _reorder.orderables;
      for (let index = 0; index < _newReorder.length; index++) {
        setReorders((curr) => {
          if (!reorders.find((o) => o === _newReorder[index])) {
            return [...curr, _newReorder[index]];
          }
          return curr;
        });
      }
      // set saved order data answer to orders
      setOrders(handleSavedReordering(_answerIndex));
    }
    if ((!!tryRefresh) || ( order.length > 0 && reorders.length > 0 )) {
      setTryRefresh(false);
      setIsLoadingOrder(false);
    }
  };

  const handleAnswerByType = () => {
    const type = stageData?.question[activeNumber].type;
    if (type === 'MC')
      return setMultipleChoice(stageData?.question[activeNumber].answer);
    if (type === 'RR') {
      handleIntializeReodering();
    }
    if (type === 'YN')
      return setYesOrNo(stageData?.question[activeNumber].answer);
  };

  const handleReinitializeAnswer = () => {
    setMultipleChoice(undefined);
    setReordering(undefined);
    setYesOrNo(undefined);
  };

  const handleReinitializeReordering = () => {
    setOrders([]);
    setReorders([]);
    setDraggedData(undefined);
    setDraggedDataLocation(undefined);
  };

  const handleSavedReordering = (answerIndex: number) => {
    const savedAnswer = answers[answerIndex].answer;
    return savedAnswer.split(/->+/);
  };

  const handleChoiceByIndex = (idx: number) => {
    return String.fromCharCode(idx + 65).toString();
  };

  const handleAnswer = (answer: string) => {
    const _answer: IAnswer = {
      answer: answer,
      number: activeNumber,
    };
    let answerIndex = answers.findIndex((ans) => ans.number === activeNumber);
    if (answerIndex === -1) {
      setAnswers([...answers, _answer]);
      setAnsweredNumber([...answeredNumber, activeNumber]);
    } else {
      let newAnswer = answers;
      newAnswer[answerIndex] = _answer;
      setAnswers(newAnswer);
    }
    handlemcAnswerKey();
    handlerrAnswerKey();
  };

  const handleReorderingAnswer = () => {
    let _answer = '';
    order.map((o, idx) => {
      if (idx === order.length - 1) {
        _answer = _answer + o;
      } else {
        _answer = _answer + (o + '->');
      }
    });
    return handleAnswer(_answer);
  };

  const LoadingSvg = () => (
    <svg
      className='animate-spin h-20 w-20 mr-3 text-gray-500'
      fill='none'
      viewBox='0 0 24 24'>
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'></circle>
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z'></path>
    </svg>
  );

  const renderMultipleChoice = () => (
    <div
      key={'mc-' + activeNumber + '-' + mcanswerKey}
      id='multiple-choice-container'
      className='w-5/6 h-3/4 flex flex-col'>
      {multipleChoice !== undefined &&
        multipleChoice.choice?.map((mc: any, idx: any) => (
          <>
            <div
              id={'mc-' + idx + '-container'}
              className='w-5/6 h-1/5 flex flex-row justify-center items-center'>
              <button
                id={'choice-' + idx}
                onClick={() => {
                  handleAnswer(mc);
                }}
                className={
                  'border-2 p-2 text-center border-black w-10 h-10 flex justify-center items-center rounded-full hover:border-[#F39F33] hover:text-[#F39F33] ' +
                  (answers.find(
                    (ans) => ans.answer === mc && ans.number === activeNumber
                  )
                    ? 'bg-[#76BF43]'
                    : '')
                }>
                <p className='font-bold text-2xl'>{handleChoiceByIndex(idx)}</p>
              </button>
              <div
                id={'choice-text-' + idx}
                className='w-3/4 h-full flex items-center'>
                <p className='font-semibold text-lg ml-5'>{mc}</p>
              </div>
            </div>
          </>
        ))}
    </div>
  );

  const renderAnswerError = () => <></>;

  const renderLazyLoading = () => (
    <>
      <div
        id='loading'
        className='w-full h-full flex flex-col justify-center items-center'>
        {LoadingSvg()}
        <p>Loading...</p>
      </div>
    </>
  );

  const renderYesOrNo = () => <></>;

  const renderReordering = () => (
    <>
      <div
        key={'rr-' + activeNumber + '-' + rrasnwerKey}
        id='reordering-container'
        className='w-5/6 h-1/6 flex flex-row justify-evenly'>
        {order !== undefined &&
          !isLoadingOrder &&
          order.map((char: any, idx: any) => (
            <>
              <div
                id={'rr-orderables' + idx}
                key={'rr-orderables' + idx}
                className='w-max h-max bg-[#E0E0E0] border-2 border-slate-500 ml-2 flex justify-center items-center rounded-lg pl-2 pr-2'
                draggable
                onDragEnter={(e) => handleDragEnd(e, idx, char)}>
                <p className='text-black font-medium text-lg'>{char}</p>
              </div>
              {idx + 1 < order.length && (
                <div
                  id='arrow'
                  className='text-2xl'>
                  ➡️
                </div>
              )}
            </>
          ))}
        {isLoadingOrder && renderLazyLoading()}
      </div>
      <div
        key={'rr' + activeNumber + '-' + rrasnwerKey}
        id='reordering-answers'
        className='w-5/6 h-1/4 flex flex-row justify-evenly'>
        {reorders !== undefined &&
          !isLoadingOrder &&
          reorders.map((choice: any, idx: any) => (
            <>
              <div
                id={'rr-orderables-answer' + idx}
                draggable
                onDragStart={(e) => handleDragStart(e, idx, choice)}
                className='w-max h-max bg-[#E0E0E0] border-2 border-slate-500 ml-2 flex justify-center items-center rounded-lg pl-2 pr-2'>
                <p className='text-black font-medium text-lg'>{choice}</p>
              </div>
            </>
          ))}
        {isLoadingOrder && renderLazyLoading()}
      </div>
      {!tryRefresh && !isLoadingOrder && (
        <button
          className='bg-[#F3931B] rounded-md pl-2 pr-2 pt-1 pb-1 text-white font-bold tracking-widest disabled:cursor-wait'
          disabled={isLoadingOrder}
          onClick={() => {
            handleReorderingAnswer();
          }}>
          Save Answer
        </button>
      )}
      {(
        <div className='flex flex-col justify-center items-center'>
        <button
          className='bg-[#67BBE7] w-max h-max rounded-md pl-2 pr-2 pt-1 pb-1 text-white font-bold tracking-widest mt-5 ' 
          onClick={() => {
            handleIntializeReodering();
          }}>
          Refresh Question
        </button>
          <p className='text-slate-500 font-normal text-sm'>If reorder boxes is loading too long or not showing, please try Refresh Question</p>
        </div>
      )}
    </>
  );

  const handleChangeNumber = (idx: number) => {
    setActiveNumber(idx);
  };

  const renderWhiteboard = () => (
    <div
      id='whiteboard-container'
      className='w-5/6 h-3/4 flex bg-white shadow-inner shadow-black justify-center place-items-center flex-col'>
      {!isLoading && activeNumber > -1 && (
        <>
          <div
            id='question-container'
            className='w-3/4 h-1/4 flex justify-start items-center'>
            <h3 className='font-bold text-black text-2xl'>
              {stageData?.question[activeNumber].text}
            </h3>
          </div>
          {handleRenderByType(stageData?.question[activeNumber].type || 'null')}
        </>
      )}
      {isLoading && renderLazyLoading()}
      {activeNumber === -1 && (
        <>
          <div
            id='question-container'
            className='w-3/4 h-1/4 flex justify-start items-center'>
            <h3 className='font-bold text-black text-2xl'>
              Select a question to start answering. Best of luck for you!
            </h3>
          </div>
        </>
      )}
    </div>
  );

  const renderNumberBoard = () => (
    <div
      id='number-whiteboard'
      className='w-3/4 h-1/6 grid grid-cols-10 justify-center gap-2 bg-white shadow-black rounded-lg shadow-inner drop-shadow-md'>
      {stageData?.question.map((data, idx) => (
        <div
          id='grid-container'
          className='flex justify-center items-center'>
          <button
            id={'number-' + idx + '-container'}
            onClick={() => handleChangeNumber(idx)}
            className={
              'w-12 h-16 border-4 border-black flex justify-center items-center text-black hover:border-[#F39F33] hover:text-[#F39F33] transition-colors delay-150 ' +
              (activeNumber === idx
                ? 'bg-yellow-200'
                : answeredNumber.find((n) => n === idx) !== undefined
                ? 'bg-[#76B743]'
                : '')
            }>
            <h2 className=' font-bold text-2xl text-center'>{idx + 1}</h2>
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div
      id='board-container'
      className='w-full h-full flex flex-col justify-evenly items-center'>
      {renderWhiteboard()}
      {renderNumberBoard()}
    </div>
  );
};

export default Stageboard;
