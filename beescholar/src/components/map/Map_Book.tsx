import React, { useEffect, useState } from 'react';
import './Map_Book.css';
import '../../constants/global.css';
import { Modal, Popover } from '@mui/material';
import {
  IActivityData,
  IActivityHeader,
  ICampusRoom,
  IInteractibles,
  INPCInteraction,
  ITask,
  ITrivialTask,
  IUnlockCampus,
} from './Map_Book.interfaces';
import {
  DummyFollowTheDrum,
  DummyInteractibles,
  DummyNPCInteraction,
  DummyTasksList,
} from '../../constants/dummy.constants';
import { useNavigate } from 'react-router-dom';
import '../../constants/global.css';
import Speech from '../speech/Speech';
import Character from '../dialogue/Character';
import axios from 'axios';
import { useAuth } from '../../config/Context';

const MapBook = () => {
  const [activeLocation, setActiveLocation] = useState<string>('KMG');
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [openTaskModal, setOpenTaskModal] = useState<boolean>(false);
  const [taskModalData, setTaskModalData] = useState<ITrivialTask>();
  const [taskList, setTaskList] = useState<ITask>();
  const [openMainQuestModal, setOpenMainQuestModal] = useState<boolean>(false);
  const [openInteraction, setOpenInteraction] = useState<boolean>(false);
  const [noInteractibleModalOpen, setNoInteractibleModalOpen] =
    useState<boolean>(false);
  const [unlockedCampus, setUnlockedCampus] = useState<IUnlockCampus[]>([]);
  const [room, setRoom] = useState<ICampusRoom[]>([]);
  const [activity, setActivity] = useState<IActivityHeader[]>([]);
  const [isLoadingActivity, setIsLoadingActivity] = useState<boolean>(false);
  const [currentActivityData, setCurrentActivityData] =
    useState<IActivityData>();
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [popoverLocation, setPopoverLocation] = useState<string>();
  const [interactionData, setInteractionData] = useState<INPCInteraction[]>([]);
  const [interactionCount, setInteractionCount] = useState<number>(0);
  const [element, setElement] = useState<any>();
  const [interactibles, setInteractibles] = useState<IInteractibles[]>([]);
  const navigate = useNavigate();
  const Auth = useAuth();

  useEffect(() => {
    getData();
    // setTaskList(DummyTasksList);
    setInteractionData(DummyNPCInteraction);
    setInteractionCount(0);
  }, []);

  useEffect(() => {
    // fetch campus rooms
    if (unlockedCampus.length > 0) {
      axios
        .get(`http://127.0.0.1:8000/api/room/${unlockedCampus[0].id}`)
        .then((res) => {
          var tempRoomData: ICampusRoom[] = [];
          res.data.data.map((data: any) => {
            tempRoomData.push({
              id: data.id,
              roomName: data.room_name,
              type: data.type,
              background: data.background,
            });
          });
          setRoom(tempRoomData);
        })
        .catch((error) => {
          setIsFailed(true);
          console.log(error);
        });
    }
  }, [unlockedCampus]);

  useEffect(() => {}, [activeLocation]);

  useEffect(() => {
    if (element !== undefined) {
      setOpenPopover(true);
      if (room.length > 0) {
        setIsLoadingActivity(true);
        const _room = room.find(
          (r) => r.roomName === translateKMGMapId(popoverLocation || '')
        );
        console.log(
          'room: ',
          _room?.roomName,
          'popover: ',
          translateKMGMapId(popoverLocation || '')
        );
        if (_room) {
          var tempInteractibles: IActivityHeader[] = [];
          axios
            .get(`http://127.0.0.1:8000/api/activity/${_room.id}`)
            .then((res) => {
              tempInteractibles.push(...res.data.data);
            })
            .catch((error) => {
              setIsFailed(true);
              console.log(error);
            });
          setActivity(tempInteractibles);
        }
        setTimeout(() => {
          setIsLoadingActivity(false);
        }, 500);
      }
    }
  }, [popoverLocation]);

  const getData = async () => {
    setIsLoading(true);
    // fetch unlock campus
    const user = Auth.user;
    await axios
      .get(`http://127.0.0.1:8000/api/campus/${user?.id}`)
      .then((res) => {
        setUnlockedCampus(res.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsFailed(true);
        console.log(error);
      });
  };

  const translateCampusCodetoName = (name: string) => {
    switch (name) {
      case 'KMG':
        return 'Kemanggisan';
      case 'BDG':
        return 'Bandung';
      case 'MLG':
        return 'Malang';
      case 'BKS':
        return 'Bekasi';
      case 'ALS':
        return 'Alam Sutera';
      case 'SMG':
        return 'Semarang';
    }
  };

  const handleNewActiveLocation = (location: string) => {
    setActiveLocation(location);
  };

  const handleInteractibleColor = (type: string) => {
    switch (type) {
      case 'Main Quest':
        return 'bg-[#67BBE7]';
      default:
        return 'bg-[#F3931B]';
    }
  };

  const handleInteractibleTextColor = (type: string) => {
    switch (type) {
      case 'Main Quest':
        return 'text-[#67BBE7]';
      default:
        return 'text-[#F3931B]';
    }
  };

  const handleInteractibleIcon = (type: string) => {
    switch (type) {
      case 'Interaction':
        return '!';
      default:
        return '?';
    }
  };

  const handleSelectTrivialTask = () => {
    if (popoverLocation)
      setTaskModalData(
        taskList?.tasks.find(
          (task) => task.location === translateKMGMapId(popoverLocation)
        )
      );
    setTimeout(() => {
      setOpenTaskModal(true);
    }, 500);
  };

  const handleNavigateTrivialTask = () => {
    if (taskModalData?.type === 'Follow the Drum') {
      return navigate('/game/followthedrum', { replace: true });
    } else {
      return navigate('/game/storycase', { replace: true });
    }
  };

  const handleNavigateStory = () => {
    return navigate('/game/stage', { replace: true });
  };

  const handleInteractibleAction = () => {
    if (popoverLocation !== undefined) {
      const trigger = activity[0];
      console.log(trigger);
      if (trigger !== undefined) {
        switch (trigger.activities[0].type) {
          case 'Trivial Task':
            handleSelectTrivialTask();
            return;
          case 'Interaction':
            setOpenInteraction(true);
            return;
          case 'Story Quest':
            setCurrentActivityData(trigger.activities[0]);
            setOpenMainQuestModal(true);
            return;
          default:
            setNoInteractibleModalOpen(true);
            return;
        }
      } else {
        setNoInteractibleModalOpen(true);
      }
    }
  };

  const handleMapLocation = () => {
    setPopoverLocation(element.target.id);
  };

  const translateKMGMapId = (roomId: string) => {
    switch (roomId) {
      case 'teacher-office':
        return 'Teacher Office';
      case 'classroom':
        return 'Classroom';
      case 'band-room':
        return 'Band Room';
      case 'hallway-horizontal':
        return 'Hallway';
      case 'hallway-vertical':
        return 'Hallway';
      default:
        return '...';
    }
  };

  const renderMapInteractibles = () => (
    <div
      id='interactible-container'
      className='w-full h-full flex justify-center items-center'>
      <div
        id='container-margin'
        className='w-11/12 h-5/6 flex flex-col'>
        <div
          id='to-do-container'
          className='h-1/2 w-full bg-[#A95E01] relative flex flex-col rounded-lg drop-shadow-md inner-shadow'>
          <div
            id='todo-header'
            className='h-1/3'>
            <h3 className='ml-3 mt-2 text-2xl text-white tracking-widest font-semibold'>
              TO-DO
            </h3>
          </div>
          {!isLoadingActivity && (
            <div
              id='todo-interactibles-list'
              className='w-full h-2/3 overflow-y-auto text-wrap flex flex-col items-center no-scrollbar '>
              {activity.length > 0 && activity.map((i) => (
                <div
                  id={`${i.id}-container`}
                  className={`${handleInteractibleColor(
                    i.questTitle
                  )} w-11/12 rounded-lg h-max flex flex-row relative mb-3 justify-evenly p-1`}>
                  <div
                    id={`${i.id}-icon-container`}
                    className='flex justify-center items-center'>
                    <div
                      id={`${i.id}-icon`}
                      className={`bg-white w-5 h-5 rounded-full flex justify-center items-center ${handleInteractibleTextColor(
                        i.activities[0].type
                      )}`}>
                      {handleInteractibleIcon(i.activities[0].type)}
                    </div>
                  </div>
                  <div
                    id={`${i.id}-description-container`}
                    className='w-10/12 h-full'>
                    <h5 className='text-wrap text-lg font-medium text-white'>
                      {i.description}
                    </h5>
                  </div>
                </div>
              ))}
              {activity.length === 0 && (
                <p className='text-white font-semibold text-xl'>There is nothing to do here...</p>
              )}
            </div>
          )}
          {!!isLoadingActivity && (
            <div
              id='todo-interactibles-list'
              className='w-full h-2/3 overflow-y-auto text-wrap flex flex-col items-center no-scrollbar text-center text-xl text-white font-semibold '>
                fetching to-do data...
            </div>
          )}
        </div>
        <div
          id='flex-container-description'
          className='flex flex-row justify-evenly w-full h-max items-center'>
          <div
            id='tutorial-container'
            className='w-2/5 h-5/6 flex flex-col'>
            <div
              id='tutorial-box'
              className='bg-[#014769] text-white flex flex-col p-3 mt-5 rounded-lg drop-shadow-lg shadow-md'>
              <div
                id='tutorial-text-container'
                className='h-1/3 w-full'>
                <h3 className='text-white tracking-widest font-bold'>
                  TUTORIAL
                </h3>
              </div>
              <div
                id='tutorial-step-container'
                className='h-2/3 w-full flex flex-col'>
                <h5 className='text-white font-semibold'>1. Select a room</h5>
                <h5 className='text-white font-semibold'>2. Click Navigate</h5>
              </div>
            </div>
          </div>
          <div
            id='active-location-container'
            className='w-2/5 h-5/6 flex flex-col'>
            <div
              id='active-location-box'
              className='bg-[#014769] text-white flex flex-col p-3 mt-5 rounded-lg justify-between drop-shadow-lg shadow-md'>
              <div
                id='active-location-text-container'
                className='h-1/3 w-full text-center'>
                <h3 className='text-white tracking-widest font-bold'>
                  SELECTED LOCATION
                </h3>
              </div>
              <div
                id='active-location-step-container'
                className='h-1/3 w-full flex flex-col text-center mb-2 mt-4 bg-white rounded-lg'>
                <h5 className='text-[#014769] font-semibold'>
                  {popoverLocation ? translateKMGMapId(popoverLocation) : '...'}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div
          id='navigate-button-container'
          className='flex justify-center items-center w-full pt-10'>
          <button
            id='navigate-button'
            className='beescholar-button text-lg font-bold rounded-2xl w-1/2 drop-shadow-md shadow-md'
            disabled={!popoverLocation}
            onClick={handleInteractibleAction}>
            NAVIGATE
          </button>
        </div>
      </div>
    </div>
  );

  const renderBookmark = () => (
    <div
      id='bookmark'
      className='h-full w-14 flex-col justify-items-end'>
      <button
        id='KMG'
        disabled={
          unlockedCampus.find(
            (c) => c.campusName !== translateCampusCodetoName('KMG')
          )
            ? true
            : false
        }
        className={
          (activeLocation === 'KMG' ? 'bg-[#4EB0E1] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('KMG')}>
        <h5 className='bookmark-text'>K M G</h5>
      </button>
      <button
        id='BDG'
        disabled={
          unlockedCampus.find(
            (c) => c.campusName !== translateCampusCodetoName('BDG')
          )
            ? true
            : false
        }
        className={
          (activeLocation === 'BDG' ? 'bg-[#4EB0E1] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('BDG')}>
        <h5 className='bookmark-text'>B D G</h5>
      </button>
      <button
        id='SMG'
        disabled={
          unlockedCampus.find(
            (c) => c.campusName !== translateCampusCodetoName('SMG')
          )
            ? true
            : false
        }
        className={
          (activeLocation === 'SMG' ? 'bg-[#4EB0E1] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('SMG')}>
        <h5 className='bookmark-text'>S M G</h5>
      </button>
      <button
        id='BKS'
        disabled={
          unlockedCampus.find(
            (c) => c.campusName !== translateCampusCodetoName('BKS')
          )
            ? true
            : false
        }
        className={
          (activeLocation === 'BKS' ? 'bg-[#4EB0E1] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('BKS')}>
        <h5 className='bookmark-text'>B K S</h5>
      </button>
      <button
        id='MLG'
        disabled={
          unlockedCampus.find(
            (c) => c.campusName !== translateCampusCodetoName('MLG')
          )
            ? true
            : false
        }
        className={
          (activeLocation === 'MLG' ? 'bg-[#4EB0E1] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('MLG')}>
        <h5 className='bookmark-text'>M L G</h5>
      </button>
      <button
        id='ALS'
        disabled={
          unlockedCampus.find(
            (c) => c.campusName !== translateCampusCodetoName('ALS')
          )
            ? true
            : false
        }
        className={
          (activeLocation === 'ALS' ? 'bg-[#4EB0E1] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('ALS')}>
        <h5 className='bookmark-text'>A L S</h5>
      </button>
    </div>
  );

  const renderMiddlePart = () => (
    <div
      id='book-middle-part'
      className='h-full w-10 flex flex-col justify-evenly items-center absolute'>
      <div
        id='top-pin'
        className='book-pin'>
        <div
          id='top-pin-container'
          className='pins-container'>
          <div
            id='pin'
            className='left-shadow-pin'
          />
          <div
            id='pin'
            className='right-shadow-pin'
          />
        </div>
        <div
          id='top-pin-container'
          className='pins-container'>
          <div
            id='pin'
            className='left-shadow-pin'
          />
          <div
            id='pin'
            className='right-shadow-pin'
          />
        </div>
      </div>
      <div
        id='book-shadow'
        className='absolute z-0 h-full w-0.5 flex justify-center items-center'>
        <div
          id='left-book-shadow'
          className='shadow-[10px_0_20px_1px_black] h-full w-1/2 '
        />
        <div
          id='right-book-shadow'
          className='shadow-[-10px_0_20px_1px_black] h-full w-1/2 '
        />
      </div>
      <div
        id='top-pin'
        className='book-pin'>
        <div
          id='top-pin-container'
          className='pins-container'>
          <div
            id='pin'
            className='left-shadow-pin'
          />
          <div
            id='pin'
            className='right-shadow-pin'
          />
        </div>
        <div
          id='top-pin-container'
          className='pins-container'>
          <div
            id='pin'
            className='left-shadow-pin'
          />
          <div
            id='pin'
            className='right-shadow-pin'
          />
        </div>
      </div>
    </div>
  );

  const KMGMap = () => (
    <svg
      viewBox='0 0 521 735'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <rect
        width='521'
        height='735'
        fill='white'
      />
      <rect
        x='62'
        y='227'
        width='76'
        height='467'
        fill='#D9D9D9'
        onMouseEnter={(e) => {
          setElement(e);
          setOpenPopover(true);
        }}
        onMouseLeave={() => {
          setOpenPopover(false);
          setElement(undefined);
        }}
        onClick={(e) => {
          setElement(e);
          setOpenPopover(true);
          setTimeout(() => {
            handleMapLocation();
          }, 300);
        }}
        id='hallway-horizontal'
        className='hover:cursor-pointer'
      />
      <rect
        x='62'
        y='303'
        width='76'
        height='397'
        transform='rotate(-90 62 303)'
        fill='#D9D9D9'
        onMouseEnter={(e) => {
          setElement(e);
          setOpenPopover(true);
        }}
        onMouseLeave={() => {
          setOpenPopover(false);
          setElement(undefined);
        }}
        onClick={(e) => {
          setElement(e);
          setOpenPopover(true);
          setTimeout(() => {
            handleMapLocation();
          }, 300);
        }}
        id='hallway-vertical'
        className='hover:cursor-pointer active:border-black active:border-2'
      />
      <path
        d='M232.555 263.273V265.113H223.32V263.273H232.555ZM223.672 255.938V273H221.41V255.938H223.672ZM234.523 255.938V273H232.273V255.938H234.523ZM245.691 270.832V264.305C245.691 263.805 245.59 263.371 245.387 263.004C245.191 262.629 244.895 262.34 244.496 262.137C244.098 261.934 243.605 261.832 243.02 261.832C242.473 261.832 241.992 261.926 241.578 262.113C241.172 262.301 240.852 262.547 240.617 262.852C240.391 263.156 240.277 263.484 240.277 263.836H238.109C238.109 263.383 238.227 262.934 238.461 262.488C238.695 262.043 239.031 261.641 239.469 261.281C239.914 260.914 240.445 260.625 241.062 260.414C241.688 260.195 242.383 260.086 243.148 260.086C244.07 260.086 244.883 260.242 245.586 260.555C246.297 260.867 246.852 261.34 247.25 261.973C247.656 262.598 247.859 263.383 247.859 264.328V270.234C247.859 270.656 247.895 271.105 247.965 271.582C248.043 272.059 248.156 272.469 248.305 272.812V273H246.043C245.934 272.75 245.848 272.418 245.785 272.004C245.723 271.582 245.691 271.191 245.691 270.832ZM246.066 265.312L246.09 266.836H243.898C243.281 266.836 242.73 266.887 242.246 266.988C241.762 267.082 241.355 267.227 241.027 267.422C240.699 267.617 240.449 267.863 240.277 268.16C240.105 268.449 240.02 268.789 240.02 269.18C240.02 269.578 240.109 269.941 240.289 270.27C240.469 270.598 240.738 270.859 241.098 271.055C241.465 271.242 241.914 271.336 242.445 271.336C243.109 271.336 243.695 271.195 244.203 270.914C244.711 270.633 245.113 270.289 245.41 269.883C245.715 269.477 245.879 269.082 245.902 268.699L246.828 269.742C246.773 270.07 246.625 270.434 246.383 270.832C246.141 271.23 245.816 271.613 245.41 271.98C245.012 272.34 244.535 272.641 243.98 272.883C243.434 273.117 242.816 273.234 242.129 273.234C241.27 273.234 240.516 273.066 239.867 272.73C239.227 272.395 238.727 271.945 238.367 271.383C238.016 270.812 237.84 270.176 237.84 269.473C237.84 268.793 237.973 268.195 238.238 267.68C238.504 267.156 238.887 266.723 239.387 266.379C239.887 266.027 240.488 265.762 241.191 265.582C241.895 265.402 242.68 265.312 243.547 265.312H246.066ZM253.625 255V273H251.445V255H253.625ZM259.461 255V273H257.281V255H259.461ZM266.152 270.75L269.41 260.32H270.84L270.559 262.395L267.242 273H265.848L266.152 270.75ZM263.961 260.32L266.738 270.867L266.938 273H265.473L261.793 260.32H263.961ZM273.957 270.785L276.605 260.32H278.762L275.082 273H273.629L273.957 270.785ZM271.156 260.32L274.344 270.574L274.707 273H273.324L269.914 262.371L269.633 260.32H271.156ZM288.465 270.832V264.305C288.465 263.805 288.363 263.371 288.16 263.004C287.965 262.629 287.668 262.34 287.27 262.137C286.871 261.934 286.379 261.832 285.793 261.832C285.246 261.832 284.766 261.926 284.352 262.113C283.945 262.301 283.625 262.547 283.391 262.852C283.164 263.156 283.051 263.484 283.051 263.836H280.883C280.883 263.383 281 262.934 281.234 262.488C281.469 262.043 281.805 261.641 282.242 261.281C282.688 260.914 283.219 260.625 283.836 260.414C284.461 260.195 285.156 260.086 285.922 260.086C286.844 260.086 287.656 260.242 288.359 260.555C289.07 260.867 289.625 261.34 290.023 261.973C290.43 262.598 290.633 263.383 290.633 264.328V270.234C290.633 270.656 290.668 271.105 290.738 271.582C290.816 272.059 290.93 272.469 291.078 272.812V273H288.816C288.707 272.75 288.621 272.418 288.559 272.004C288.496 271.582 288.465 271.191 288.465 270.832ZM288.84 265.312L288.863 266.836H286.672C286.055 266.836 285.504 266.887 285.02 266.988C284.535 267.082 284.129 267.227 283.801 267.422C283.473 267.617 283.223 267.863 283.051 268.16C282.879 268.449 282.793 268.789 282.793 269.18C282.793 269.578 282.883 269.941 283.062 270.27C283.242 270.598 283.512 270.859 283.871 271.055C284.238 271.242 284.688 271.336 285.219 271.336C285.883 271.336 286.469 271.195 286.977 270.914C287.484 270.633 287.887 270.289 288.184 269.883C288.488 269.477 288.652 269.082 288.676 268.699L289.602 269.742C289.547 270.07 289.398 270.434 289.156 270.832C288.914 271.23 288.59 271.613 288.184 271.98C287.785 272.34 287.309 272.641 286.754 272.883C286.207 273.117 285.59 273.234 284.902 273.234C284.043 273.234 283.289 273.066 282.641 272.73C282 272.395 281.5 271.945 281.141 271.383C280.789 270.812 280.613 270.176 280.613 269.473C280.613 268.793 280.746 268.195 281.012 267.68C281.277 267.156 281.66 266.723 282.16 266.379C282.66 266.027 283.262 265.762 283.965 265.582C284.668 265.402 285.453 265.312 286.32 265.312H288.84ZM297.418 271.688L300.945 260.32H303.266L298.18 274.957C298.062 275.27 297.906 275.605 297.711 275.965C297.523 276.332 297.281 276.68 296.984 277.008C296.688 277.336 296.328 277.602 295.906 277.805C295.492 278.016 294.996 278.121 294.418 278.121C294.246 278.121 294.027 278.098 293.762 278.051C293.496 278.004 293.309 277.965 293.199 277.934L293.188 276.176C293.25 276.184 293.348 276.191 293.48 276.199C293.621 276.215 293.719 276.223 293.773 276.223C294.266 276.223 294.684 276.156 295.027 276.023C295.371 275.898 295.66 275.684 295.895 275.379C296.137 275.082 296.344 274.672 296.516 274.148L297.418 271.688ZM294.828 260.32L298.121 270.164L298.684 272.449L297.125 273.246L292.461 260.32H294.828Z'
        fill='black'
      />
      <rect
        x='152'
        y='326'
        width='307'
        height='100'
        rx='20'
        fill='#F39F33'
        id='teacher-office'
        className='hover:cursor-pointer'
        onMouseEnter={(e) => {
          setElement(e);
          setOpenPopover(true);
        }}
        onMouseLeave={() => setOpenPopover(false)}
        onClick={(e) => {
          setElement(e);
          setOpenPopover(true);
          setTimeout(() => {
            handleMapLocation();
          }, 300);
        }}
      />
      <path
        id='item-1'
        d='M219.039 391.938V409H216.812V391.938H219.039ZM224.523 391.938V393.789H211.34V391.938H224.523ZM237.895 407.16V409H228.859V407.16H237.895ZM229.316 391.938V409H227.055V391.938H229.316ZM236.699 399.273V401.113H228.859V399.273H236.699ZM237.777 391.938V393.789H228.859V391.938H237.777ZM247.012 393.449L241.363 409H239.055L245.559 391.938H247.047L247.012 393.449ZM251.746 409L246.086 393.449L246.051 391.938H247.539L254.066 409H251.746ZM251.453 402.684V404.535H241.867V402.684H251.453ZM266.512 403.574H268.762C268.645 404.652 268.336 405.617 267.836 406.469C267.336 407.32 266.629 407.996 265.715 408.496C264.801 408.988 263.66 409.234 262.293 409.234C261.293 409.234 260.383 409.047 259.562 408.672C258.75 408.297 258.051 407.766 257.465 407.078C256.879 406.383 256.426 405.551 256.105 404.582C255.793 403.605 255.637 402.52 255.637 401.324V399.625C255.637 398.43 255.793 397.348 256.105 396.379C256.426 395.402 256.883 394.566 257.477 393.871C258.078 393.176 258.801 392.641 259.645 392.266C260.488 391.891 261.438 391.703 262.492 391.703C263.781 391.703 264.871 391.945 265.762 392.43C266.652 392.914 267.344 393.586 267.836 394.445C268.336 395.297 268.645 396.285 268.762 397.41H266.512C266.402 396.613 266.199 395.93 265.902 395.359C265.605 394.781 265.184 394.336 264.637 394.023C264.09 393.711 263.375 393.555 262.492 393.555C261.734 393.555 261.066 393.699 260.488 393.988C259.918 394.277 259.438 394.688 259.047 395.219C258.664 395.75 258.375 396.387 258.18 397.129C257.984 397.871 257.887 398.695 257.887 399.602V401.324C257.887 402.16 257.973 402.945 258.145 403.68C258.324 404.414 258.594 405.059 258.953 405.613C259.312 406.168 259.77 406.605 260.324 406.926C260.879 407.238 261.535 407.395 262.293 407.395C263.254 407.395 264.02 407.242 264.59 406.938C265.16 406.633 265.59 406.195 265.879 405.625C266.176 405.055 266.387 404.371 266.512 403.574ZM282.988 399.273V401.113H273.754V399.273H282.988ZM274.105 391.938V409H271.844V391.938H274.105ZM284.957 391.938V409H282.707V391.938H284.957ZM299.816 407.16V409H290.781V407.16H299.816ZM291.238 391.938V409H288.977V391.938H291.238ZM298.621 399.273V401.113H290.781V399.273H298.621ZM299.699 391.938V393.789H290.781V391.938H299.699ZM302.617 391.938H308.266C309.547 391.938 310.629 392.133 311.512 392.523C312.402 392.914 313.078 393.492 313.539 394.258C314.008 395.016 314.242 395.949 314.242 397.059C314.242 397.84 314.082 398.555 313.762 399.203C313.449 399.844 312.996 400.391 312.402 400.844C311.816 401.289 311.113 401.621 310.293 401.84L309.66 402.086H304.352L304.328 400.246H308.336C309.148 400.246 309.824 400.105 310.363 399.824C310.902 399.535 311.309 399.148 311.582 398.664C311.855 398.18 311.992 397.645 311.992 397.059C311.992 396.402 311.863 395.828 311.605 395.336C311.348 394.844 310.941 394.465 310.387 394.199C309.84 393.926 309.133 393.789 308.266 393.789H304.879V409H302.617V391.938ZM312.59 409L308.441 401.266L310.797 401.254L315.004 408.859V409H312.59ZM336.496 399.93V401.008C336.496 402.289 336.336 403.438 336.016 404.453C335.695 405.469 335.234 406.332 334.633 407.043C334.031 407.754 333.309 408.297 332.465 408.672C331.629 409.047 330.691 409.234 329.652 409.234C328.645 409.234 327.719 409.047 326.875 408.672C326.039 408.297 325.312 407.754 324.695 407.043C324.086 406.332 323.613 405.469 323.277 404.453C322.941 403.438 322.773 402.289 322.773 401.008V399.93C322.773 398.648 322.938 397.504 323.266 396.496C323.602 395.48 324.074 394.617 324.684 393.906C325.293 393.188 326.016 392.641 326.852 392.266C327.695 391.891 328.621 391.703 329.629 391.703C330.668 391.703 331.605 391.891 332.441 392.266C333.285 392.641 334.008 393.188 334.609 393.906C335.219 394.617 335.684 395.48 336.004 396.496C336.332 397.504 336.496 398.648 336.496 399.93ZM334.258 401.008V399.906C334.258 398.891 334.152 397.992 333.941 397.211C333.738 396.43 333.438 395.773 333.039 395.242C332.641 394.711 332.152 394.309 331.574 394.035C331.004 393.762 330.355 393.625 329.629 393.625C328.926 393.625 328.289 393.762 327.719 394.035C327.156 394.309 326.672 394.711 326.266 395.242C325.867 395.773 325.559 396.43 325.34 397.211C325.121 397.992 325.012 398.891 325.012 399.906V401.008C325.012 402.031 325.121 402.938 325.34 403.727C325.559 404.508 325.871 405.168 326.277 405.707C326.691 406.238 327.18 406.641 327.742 406.914C328.312 407.188 328.949 407.324 329.652 407.324C330.387 407.324 331.039 407.188 331.609 406.914C332.18 406.641 332.66 406.238 333.051 405.707C333.449 405.168 333.75 404.508 333.953 403.727C334.156 402.938 334.258 402.031 334.258 401.008ZM342.145 391.938V409H339.883V391.938H342.145ZM349.293 399.613V401.465H341.652V399.613H349.293ZM350.453 391.938V393.789H341.652V391.938H350.453ZM355.41 391.938V409H353.148V391.938H355.41ZM362.559 399.613V401.465H354.918V399.613H362.559ZM363.719 391.938V393.789H354.918V391.938H363.719ZM368.84 391.938V409H366.578V391.938H368.84ZM383.254 403.574H385.504C385.387 404.652 385.078 405.617 384.578 406.469C384.078 407.32 383.371 407.996 382.457 408.496C381.543 408.988 380.402 409.234 379.035 409.234C378.035 409.234 377.125 409.047 376.305 408.672C375.492 408.297 374.793 407.766 374.207 407.078C373.621 406.383 373.168 405.551 372.848 404.582C372.535 403.605 372.379 402.52 372.379 401.324V399.625C372.379 398.43 372.535 397.348 372.848 396.379C373.168 395.402 373.625 394.566 374.219 393.871C374.82 393.176 375.543 392.641 376.387 392.266C377.23 391.891 378.18 391.703 379.234 391.703C380.523 391.703 381.613 391.945 382.504 392.43C383.395 392.914 384.086 393.586 384.578 394.445C385.078 395.297 385.387 396.285 385.504 397.41H383.254C383.145 396.613 382.941 395.93 382.645 395.359C382.348 394.781 381.926 394.336 381.379 394.023C380.832 393.711 380.117 393.555 379.234 393.555C378.477 393.555 377.809 393.699 377.23 393.988C376.66 394.277 376.18 394.688 375.789 395.219C375.406 395.75 375.117 396.387 374.922 397.129C374.727 397.871 374.629 398.695 374.629 399.602V401.324C374.629 402.16 374.715 402.945 374.887 403.68C375.066 404.414 375.336 405.059 375.695 405.613C376.055 406.168 376.512 406.605 377.066 406.926C377.621 407.238 378.277 407.395 379.035 407.395C379.996 407.395 380.762 407.242 381.332 406.938C381.902 406.633 382.332 406.195 382.621 405.625C382.918 405.055 383.129 404.371 383.254 403.574ZM399.426 407.16V409H390.391V407.16H399.426ZM390.848 391.938V409H388.586V391.938H390.848ZM398.23 399.273V401.113H390.391V399.273H398.23ZM399.309 391.938V393.789H390.391V391.938H399.309Z'
        fill='black'
      />
      <rect
        x='152'
        y='498'
        width='169'
        height='100'
        rx='20'
        fill='#81C7E9'
        id='band-room'
        onMouseEnter={(e) => {
          setElement(e);
          setOpenPopover(true);
        }}
        onMouseLeave={() => setOpenPopover(false)}
        onClick={(e) => {
          setElement(e);
          setOpenPopover(true);
          setTimeout(() => {
            handleMapLocation();
          }, 300);
        }}
        className='hover:cursor-pointer'
      />
      <path
        id='item-2'
        d='M182.57 573.02H178.246L178.223 571.203H182.148C182.797 571.203 183.363 571.094 183.848 570.875C184.332 570.656 184.707 570.344 184.973 569.938C185.246 569.523 185.383 569.031 185.383 568.461C185.383 567.836 185.262 567.328 185.02 566.938C184.785 566.539 184.422 566.25 183.93 566.07C183.445 565.883 182.828 565.789 182.078 565.789H178.75V581H176.488V563.938H182.078C182.953 563.938 183.734 564.027 184.422 564.207C185.109 564.379 185.691 564.652 186.168 565.027C186.652 565.395 187.02 565.863 187.27 566.434C187.52 567.004 187.645 567.688 187.645 568.484C187.645 569.188 187.465 569.824 187.105 570.395C186.746 570.957 186.246 571.418 185.605 571.777C184.973 572.137 184.23 572.367 183.379 572.469L182.57 573.02ZM182.465 581H177.355L178.633 579.16H182.465C183.184 579.16 183.793 579.035 184.293 578.785C184.801 578.535 185.188 578.184 185.453 577.73C185.719 577.27 185.852 576.727 185.852 576.102C185.852 575.469 185.738 574.922 185.512 574.461C185.285 574 184.93 573.645 184.445 573.395C183.961 573.145 183.336 573.02 182.57 573.02H179.348L179.371 571.203H183.777L184.258 571.859C185.078 571.93 185.773 572.164 186.344 572.562C186.914 572.953 187.348 573.453 187.645 574.062C187.949 574.672 188.102 575.344 188.102 576.078C188.102 577.141 187.867 578.039 187.398 578.773C186.938 579.5 186.285 580.055 185.441 580.438C184.598 580.812 183.605 581 182.465 581ZM198.59 578.832V572.305C198.59 571.805 198.488 571.371 198.285 571.004C198.09 570.629 197.793 570.34 197.395 570.137C196.996 569.934 196.504 569.832 195.918 569.832C195.371 569.832 194.891 569.926 194.477 570.113C194.07 570.301 193.75 570.547 193.516 570.852C193.289 571.156 193.176 571.484 193.176 571.836H191.008C191.008 571.383 191.125 570.934 191.359 570.488C191.594 570.043 191.93 569.641 192.367 569.281C192.812 568.914 193.344 568.625 193.961 568.414C194.586 568.195 195.281 568.086 196.047 568.086C196.969 568.086 197.781 568.242 198.484 568.555C199.195 568.867 199.75 569.34 200.148 569.973C200.555 570.598 200.758 571.383 200.758 572.328V578.234C200.758 578.656 200.793 579.105 200.863 579.582C200.941 580.059 201.055 580.469 201.203 580.812V581H198.941C198.832 580.75 198.746 580.418 198.684 580.004C198.621 579.582 198.59 579.191 198.59 578.832ZM198.965 573.312L198.988 574.836H196.797C196.18 574.836 195.629 574.887 195.145 574.988C194.66 575.082 194.254 575.227 193.926 575.422C193.598 575.617 193.348 575.863 193.176 576.16C193.004 576.449 192.918 576.789 192.918 577.18C192.918 577.578 193.008 577.941 193.188 578.27C193.367 578.598 193.637 578.859 193.996 579.055C194.363 579.242 194.812 579.336 195.344 579.336C196.008 579.336 196.594 579.195 197.102 578.914C197.609 578.633 198.012 578.289 198.309 577.883C198.613 577.477 198.777 577.082 198.801 576.699L199.727 577.742C199.672 578.07 199.523 578.434 199.281 578.832C199.039 579.23 198.715 579.613 198.309 579.98C197.91 580.34 197.434 580.641 196.879 580.883C196.332 581.117 195.715 581.234 195.027 581.234C194.168 581.234 193.414 581.066 192.766 580.73C192.125 580.395 191.625 579.945 191.266 579.383C190.914 578.812 190.738 578.176 190.738 577.473C190.738 576.793 190.871 576.195 191.137 575.68C191.402 575.156 191.785 574.723 192.285 574.379C192.785 574.027 193.387 573.762 194.09 573.582C194.793 573.402 195.578 573.312 196.445 573.312H198.965ZM206.336 571.027V581H204.168V568.32H206.219L206.336 571.027ZM205.82 574.18L204.918 574.145C204.926 573.277 205.055 572.477 205.305 571.742C205.555 571 205.906 570.355 206.359 569.809C206.812 569.262 207.352 568.84 207.977 568.543C208.609 568.238 209.309 568.086 210.074 568.086C210.699 568.086 211.262 568.172 211.762 568.344C212.262 568.508 212.688 568.773 213.039 569.141C213.398 569.508 213.672 569.984 213.859 570.57C214.047 571.148 214.141 571.855 214.141 572.691V581H211.961V572.668C211.961 572.004 211.863 571.473 211.668 571.074C211.473 570.668 211.188 570.375 210.812 570.195C210.438 570.008 209.977 569.914 209.43 569.914C208.891 569.914 208.398 570.027 207.953 570.254C207.516 570.48 207.137 570.793 206.816 571.191C206.504 571.59 206.258 572.047 206.078 572.562C205.906 573.07 205.82 573.609 205.82 574.18ZM225.426 578.539V563H227.605V581H225.613L225.426 578.539ZM216.895 574.801V574.555C216.895 573.586 217.012 572.707 217.246 571.918C217.488 571.121 217.828 570.438 218.266 569.867C218.711 569.297 219.238 568.859 219.848 568.555C220.465 568.242 221.152 568.086 221.91 568.086C222.707 568.086 223.402 568.227 223.996 568.508C224.598 568.781 225.105 569.184 225.52 569.715C225.941 570.238 226.273 570.871 226.516 571.613C226.758 572.355 226.926 573.195 227.02 574.133V575.211C226.934 576.141 226.766 576.977 226.516 577.719C226.273 578.461 225.941 579.094 225.52 579.617C225.105 580.141 224.598 580.543 223.996 580.824C223.395 581.098 222.691 581.234 221.887 581.234C221.145 581.234 220.465 581.074 219.848 580.754C219.238 580.434 218.711 579.984 218.266 579.406C217.828 578.828 217.488 578.148 217.246 577.367C217.012 576.578 216.895 575.723 216.895 574.801ZM219.074 574.555V574.801C219.074 575.434 219.137 576.027 219.262 576.582C219.395 577.137 219.598 577.625 219.871 578.047C220.145 578.469 220.492 578.801 220.914 579.043C221.336 579.277 221.84 579.395 222.426 579.395C223.145 579.395 223.734 579.242 224.195 578.938C224.664 578.633 225.039 578.23 225.32 577.73C225.602 577.23 225.82 576.688 225.977 576.102V573.277C225.883 572.848 225.746 572.434 225.566 572.035C225.395 571.629 225.168 571.27 224.887 570.957C224.613 570.637 224.273 570.383 223.867 570.195C223.469 570.008 222.996 569.914 222.449 569.914C221.855 569.914 221.344 570.039 220.914 570.289C220.492 570.531 220.145 570.867 219.871 571.297C219.598 571.719 219.395 572.211 219.262 572.773C219.137 573.328 219.074 573.922 219.074 574.555ZM237.262 563.938H242.91C244.191 563.938 245.273 564.133 246.156 564.523C247.047 564.914 247.723 565.492 248.184 566.258C248.652 567.016 248.887 567.949 248.887 569.059C248.887 569.84 248.727 570.555 248.406 571.203C248.094 571.844 247.641 572.391 247.047 572.844C246.461 573.289 245.758 573.621 244.938 573.84L244.305 574.086H238.996L238.973 572.246H242.98C243.793 572.246 244.469 572.105 245.008 571.824C245.547 571.535 245.953 571.148 246.227 570.664C246.5 570.18 246.637 569.645 246.637 569.059C246.637 568.402 246.508 567.828 246.25 567.336C245.992 566.844 245.586 566.465 245.031 566.199C244.484 565.926 243.777 565.789 242.91 565.789H239.523V581H237.262V563.938ZM247.234 581L243.086 573.266L245.441 573.254L249.648 580.859V581H247.234ZM251.148 574.801V574.531C251.148 573.617 251.281 572.77 251.547 571.988C251.812 571.199 252.195 570.516 252.695 569.938C253.195 569.352 253.801 568.898 254.512 568.578C255.223 568.25 256.02 568.086 256.902 568.086C257.793 568.086 258.594 568.25 259.305 568.578C260.023 568.898 260.633 569.352 261.133 569.938C261.641 570.516 262.027 571.199 262.293 571.988C262.559 572.77 262.691 573.617 262.691 574.531V574.801C262.691 575.715 262.559 576.562 262.293 577.344C262.027 578.125 261.641 578.809 261.133 579.395C260.633 579.973 260.027 580.426 259.316 580.754C258.613 581.074 257.816 581.234 256.926 581.234C256.035 581.234 255.234 581.074 254.523 580.754C253.812 580.426 253.203 579.973 252.695 579.395C252.195 578.809 251.812 578.125 251.547 577.344C251.281 576.562 251.148 575.715 251.148 574.801ZM253.316 574.531V574.801C253.316 575.434 253.391 576.031 253.539 576.594C253.688 577.148 253.91 577.641 254.207 578.07C254.512 578.5 254.891 578.84 255.344 579.09C255.797 579.332 256.324 579.453 256.926 579.453C257.52 579.453 258.039 579.332 258.484 579.09C258.938 578.84 259.312 578.5 259.609 578.07C259.906 577.641 260.129 577.148 260.277 576.594C260.434 576.031 260.512 575.434 260.512 574.801V574.531C260.512 573.906 260.434 573.316 260.277 572.762C260.129 572.199 259.902 571.703 259.598 571.273C259.301 570.836 258.926 570.492 258.473 570.242C258.027 569.992 257.504 569.867 256.902 569.867C256.309 569.867 255.785 569.992 255.332 570.242C254.887 570.492 254.512 570.836 254.207 571.273C253.91 571.703 253.688 572.199 253.539 572.762C253.391 573.316 253.316 573.906 253.316 574.531ZM264.836 574.801V574.531C264.836 573.617 264.969 572.77 265.234 571.988C265.5 571.199 265.883 570.516 266.383 569.938C266.883 569.352 267.488 568.898 268.199 568.578C268.91 568.25 269.707 568.086 270.59 568.086C271.48 568.086 272.281 568.25 272.992 568.578C273.711 568.898 274.32 569.352 274.82 569.938C275.328 570.516 275.715 571.199 275.98 571.988C276.246 572.77 276.379 573.617 276.379 574.531V574.801C276.379 575.715 276.246 576.562 275.98 577.344C275.715 578.125 275.328 578.809 274.82 579.395C274.32 579.973 273.715 580.426 273.004 580.754C272.301 581.074 271.504 581.234 270.613 581.234C269.723 581.234 268.922 581.074 268.211 580.754C267.5 580.426 266.891 579.973 266.383 579.395C265.883 578.809 265.5 578.125 265.234 577.344C264.969 576.562 264.836 575.715 264.836 574.801ZM267.004 574.531V574.801C267.004 575.434 267.078 576.031 267.227 576.594C267.375 577.148 267.598 577.641 267.895 578.07C268.199 578.5 268.578 578.84 269.031 579.09C269.484 579.332 270.012 579.453 270.613 579.453C271.207 579.453 271.727 579.332 272.172 579.09C272.625 578.84 273 578.5 273.297 578.07C273.594 577.641 273.816 577.148 273.965 576.594C274.121 576.031 274.199 575.434 274.199 574.801V574.531C274.199 573.906 274.121 573.316 273.965 572.762C273.816 572.199 273.59 571.703 273.285 571.273C272.988 570.836 272.613 570.492 272.16 570.242C271.715 569.992 271.191 569.867 270.59 569.867C269.996 569.867 269.473 569.992 269.02 570.242C268.574 570.492 268.199 570.836 267.895 571.273C267.598 571.703 267.375 572.199 267.227 572.762C267.078 573.316 267.004 573.906 267.004 574.531ZM281.254 570.84V581H279.074V568.32H281.137L281.254 570.84ZM280.809 574.18L279.801 574.145C279.809 573.277 279.922 572.477 280.141 571.742C280.359 571 280.684 570.355 281.113 569.809C281.543 569.262 282.078 568.84 282.719 568.543C283.359 568.238 284.102 568.086 284.945 568.086C285.539 568.086 286.086 568.172 286.586 568.344C287.086 568.508 287.52 568.77 287.887 569.129C288.254 569.488 288.539 569.949 288.742 570.512C288.945 571.074 289.047 571.754 289.047 572.551V581H286.879V572.656C286.879 571.992 286.766 571.461 286.539 571.062C286.32 570.664 286.008 570.375 285.602 570.195C285.195 570.008 284.719 569.914 284.172 569.914C283.531 569.914 282.996 570.027 282.566 570.254C282.137 570.48 281.793 570.793 281.535 571.191C281.277 571.59 281.09 572.047 280.973 572.562C280.863 573.07 280.809 573.609 280.809 574.18ZM289.023 572.984L287.57 573.43C287.578 572.734 287.691 572.066 287.91 571.426C288.137 570.785 288.461 570.215 288.883 569.715C289.312 569.215 289.84 568.82 290.465 568.531C291.09 568.234 291.805 568.086 292.609 568.086C293.289 568.086 293.891 568.176 294.414 568.355C294.945 568.535 295.391 568.812 295.75 569.188C296.117 569.555 296.395 570.027 296.582 570.605C296.77 571.184 296.863 571.871 296.863 572.668V581H294.684V572.645C294.684 571.934 294.57 571.383 294.344 570.992C294.125 570.594 293.812 570.316 293.406 570.16C293.008 569.996 292.531 569.914 291.977 569.914C291.5 569.914 291.078 569.996 290.711 570.16C290.344 570.324 290.035 570.551 289.785 570.84C289.535 571.121 289.344 571.445 289.211 571.812C289.086 572.18 289.023 572.57 289.023 572.984Z'
        fill='black'
      />
      <rect
        x='62'
        y='112'
        width='169'
        height='100'
        rx='20'
        fill='#81C7E9'
        id='classroom'
        onMouseEnter={(e) => {
          setElement(e);
          setOpenPopover(true);
        }}
        onMouseLeave={() => setOpenPopover(false)}
        onClick={(e) => {
          setElement(e);
          setOpenPopover(true);
          setTimeout(() => {
            handleMapLocation();
          }, 300);
        }}
        className='hover:cursor-pointer'
      />
      <path
        id='item-3'
        d='M87.9062 183.574H90.1562C90.0391 184.652 89.7305 185.617 89.2305 186.469C88.7305 187.32 88.0234 187.996 87.1094 188.496C86.1953 188.988 85.0547 189.234 83.6875 189.234C82.6875 189.234 81.7773 189.047 80.957 188.672C80.1445 188.297 79.4453 187.766 78.8594 187.078C78.2734 186.383 77.8203 185.551 77.5 184.582C77.1875 183.605 77.0312 182.52 77.0312 181.324V179.625C77.0312 178.43 77.1875 177.348 77.5 176.379C77.8203 175.402 78.2773 174.566 78.8711 173.871C79.4727 173.176 80.1953 172.641 81.0391 172.266C81.8828 171.891 82.832 171.703 83.8867 171.703C85.1758 171.703 86.2656 171.945 87.1562 172.43C88.0469 172.914 88.7383 173.586 89.2305 174.445C89.7305 175.297 90.0391 176.285 90.1562 177.41H87.9062C87.7969 176.613 87.5938 175.93 87.2969 175.359C87 174.781 86.5781 174.336 86.0312 174.023C85.4844 173.711 84.7695 173.555 83.8867 173.555C83.1289 173.555 82.4609 173.699 81.8828 173.988C81.3125 174.277 80.832 174.688 80.4414 175.219C80.0586 175.75 79.7695 176.387 79.5742 177.129C79.3789 177.871 79.2812 178.695 79.2812 179.602V181.324C79.2812 182.16 79.3672 182.945 79.5391 183.68C79.7188 184.414 79.9883 185.059 80.3477 185.613C80.707 186.168 81.1641 186.605 81.7188 186.926C82.2734 187.238 82.9297 187.395 83.6875 187.395C84.6484 187.395 85.4141 187.242 85.9844 186.938C86.5547 186.633 86.9844 186.195 87.2734 185.625C87.5703 185.055 87.7812 184.371 87.9062 183.574ZM103.586 187.16V189H95.0547V187.16H103.586ZM95.5 171.938V189H93.2383V171.938H95.5ZM112.727 173.449L107.078 189H104.77L111.273 171.938H112.762L112.727 173.449ZM117.461 189L111.801 173.449L111.766 171.938H113.254L119.781 189H117.461ZM117.168 182.684V184.535H107.582V182.684H117.168ZM131.16 184.688C131.16 184.289 131.098 183.938 130.973 183.633C130.855 183.32 130.645 183.039 130.34 182.789C130.043 182.539 129.629 182.301 129.098 182.074C128.574 181.848 127.91 181.617 127.105 181.383C126.262 181.133 125.5 180.855 124.82 180.551C124.141 180.238 123.559 179.883 123.074 179.484C122.59 179.086 122.219 178.629 121.961 178.113C121.703 177.598 121.574 177.008 121.574 176.344C121.574 175.68 121.711 175.066 121.984 174.504C122.258 173.941 122.648 173.453 123.156 173.039C123.672 172.617 124.285 172.289 124.996 172.055C125.707 171.82 126.5 171.703 127.375 171.703C128.656 171.703 129.742 171.949 130.633 172.441C131.531 172.926 132.215 173.562 132.684 174.352C133.152 175.133 133.387 175.969 133.387 176.859H131.137C131.137 176.219 131 175.652 130.727 175.16C130.453 174.66 130.039 174.27 129.484 173.988C128.93 173.699 128.227 173.555 127.375 173.555C126.57 173.555 125.906 173.676 125.383 173.918C124.859 174.16 124.469 174.488 124.211 174.902C123.961 175.316 123.836 175.789 123.836 176.32C123.836 176.68 123.91 177.008 124.059 177.305C124.215 177.594 124.453 177.863 124.773 178.113C125.102 178.363 125.516 178.594 126.016 178.805C126.523 179.016 127.129 179.219 127.832 179.414C128.801 179.688 129.637 179.992 130.34 180.328C131.043 180.664 131.621 181.043 132.074 181.465C132.535 181.879 132.875 182.352 133.094 182.883C133.32 183.406 133.434 184 133.434 184.664C133.434 185.359 133.293 185.988 133.012 186.551C132.73 187.113 132.328 187.594 131.805 187.992C131.281 188.391 130.652 188.699 129.918 188.918C129.191 189.129 128.379 189.234 127.48 189.234C126.691 189.234 125.914 189.125 125.148 188.906C124.391 188.688 123.699 188.359 123.074 187.922C122.457 187.484 121.961 186.945 121.586 186.305C121.219 185.656 121.035 184.906 121.035 184.055H123.285C123.285 184.641 123.398 185.145 123.625 185.566C123.852 185.98 124.16 186.324 124.551 186.598C124.949 186.871 125.398 187.074 125.898 187.207C126.406 187.332 126.934 187.395 127.48 187.395C128.27 187.395 128.938 187.285 129.484 187.066C130.031 186.848 130.445 186.535 130.727 186.129C131.016 185.723 131.16 185.242 131.16 184.688ZM145.41 184.688C145.41 184.289 145.348 183.938 145.223 183.633C145.105 183.32 144.895 183.039 144.59 182.789C144.293 182.539 143.879 182.301 143.348 182.074C142.824 181.848 142.16 181.617 141.355 181.383C140.512 181.133 139.75 180.855 139.07 180.551C138.391 180.238 137.809 179.883 137.324 179.484C136.84 179.086 136.469 178.629 136.211 178.113C135.953 177.598 135.824 177.008 135.824 176.344C135.824 175.68 135.961 175.066 136.234 174.504C136.508 173.941 136.898 173.453 137.406 173.039C137.922 172.617 138.535 172.289 139.246 172.055C139.957 171.82 140.75 171.703 141.625 171.703C142.906 171.703 143.992 171.949 144.883 172.441C145.781 172.926 146.465 173.562 146.934 174.352C147.402 175.133 147.637 175.969 147.637 176.859H145.387C145.387 176.219 145.25 175.652 144.977 175.16C144.703 174.66 144.289 174.27 143.734 173.988C143.18 173.699 142.477 173.555 141.625 173.555C140.82 173.555 140.156 173.676 139.633 173.918C139.109 174.16 138.719 174.488 138.461 174.902C138.211 175.316 138.086 175.789 138.086 176.32C138.086 176.68 138.16 177.008 138.309 177.305C138.465 177.594 138.703 177.863 139.023 178.113C139.352 178.363 139.766 178.594 140.266 178.805C140.773 179.016 141.379 179.219 142.082 179.414C143.051 179.688 143.887 179.992 144.59 180.328C145.293 180.664 145.871 181.043 146.324 181.465C146.785 181.879 147.125 182.352 147.344 182.883C147.57 183.406 147.684 184 147.684 184.664C147.684 185.359 147.543 185.988 147.262 186.551C146.98 187.113 146.578 187.594 146.055 187.992C145.531 188.391 144.902 188.699 144.168 188.918C143.441 189.129 142.629 189.234 141.73 189.234C140.941 189.234 140.164 189.125 139.398 188.906C138.641 188.688 137.949 188.359 137.324 187.922C136.707 187.484 136.211 186.945 135.836 186.305C135.469 185.656 135.285 184.906 135.285 184.055H137.535C137.535 184.641 137.648 185.145 137.875 185.566C138.102 185.98 138.41 186.324 138.801 186.598C139.199 186.871 139.648 187.074 140.148 187.207C140.656 187.332 141.184 187.395 141.73 187.395C142.52 187.395 143.188 187.285 143.734 187.066C144.281 186.848 144.695 186.535 144.977 186.129C145.266 185.723 145.41 185.242 145.41 184.688ZM150.566 171.938H156.215C157.496 171.938 158.578 172.133 159.461 172.523C160.352 172.914 161.027 173.492 161.488 174.258C161.957 175.016 162.191 175.949 162.191 177.059C162.191 177.84 162.031 178.555 161.711 179.203C161.398 179.844 160.945 180.391 160.352 180.844C159.766 181.289 159.062 181.621 158.242 181.84L157.609 182.086H152.301L152.277 180.246H156.285C157.098 180.246 157.773 180.105 158.312 179.824C158.852 179.535 159.258 179.148 159.531 178.664C159.805 178.18 159.941 177.645 159.941 177.059C159.941 176.402 159.812 175.828 159.555 175.336C159.297 174.844 158.891 174.465 158.336 174.199C157.789 173.926 157.082 173.789 156.215 173.789H152.828V189H150.566V171.938ZM160.539 189L156.391 181.266L158.746 181.254L162.953 188.859V189H160.539ZM178.492 179.93V181.008C178.492 182.289 178.332 183.438 178.012 184.453C177.691 185.469 177.23 186.332 176.629 187.043C176.027 187.754 175.305 188.297 174.461 188.672C173.625 189.047 172.688 189.234 171.648 189.234C170.641 189.234 169.715 189.047 168.871 188.672C168.035 188.297 167.309 187.754 166.691 187.043C166.082 186.332 165.609 185.469 165.273 184.453C164.938 183.438 164.77 182.289 164.77 181.008V179.93C164.77 178.648 164.934 177.504 165.262 176.496C165.598 175.48 166.07 174.617 166.68 173.906C167.289 173.188 168.012 172.641 168.848 172.266C169.691 171.891 170.617 171.703 171.625 171.703C172.664 171.703 173.602 171.891 174.438 172.266C175.281 172.641 176.004 173.188 176.605 173.906C177.215 174.617 177.68 175.48 178 176.496C178.328 177.504 178.492 178.648 178.492 179.93ZM176.254 181.008V179.906C176.254 178.891 176.148 177.992 175.938 177.211C175.734 176.43 175.434 175.773 175.035 175.242C174.637 174.711 174.148 174.309 173.57 174.035C173 173.762 172.352 173.625 171.625 173.625C170.922 173.625 170.285 173.762 169.715 174.035C169.152 174.309 168.668 174.711 168.262 175.242C167.863 175.773 167.555 176.43 167.336 177.211C167.117 177.992 167.008 178.891 167.008 179.906V181.008C167.008 182.031 167.117 182.938 167.336 183.727C167.555 184.508 167.867 185.168 168.273 185.707C168.688 186.238 169.176 186.641 169.738 186.914C170.309 187.188 170.945 187.324 171.648 187.324C172.383 187.324 173.035 187.188 173.605 186.914C174.176 186.641 174.656 186.238 175.047 185.707C175.445 185.168 175.746 184.508 175.949 183.727C176.152 182.938 176.254 182.031 176.254 181.008ZM195.016 179.93V181.008C195.016 182.289 194.855 183.438 194.535 184.453C194.215 185.469 193.754 186.332 193.152 187.043C192.551 187.754 191.828 188.297 190.984 188.672C190.148 189.047 189.211 189.234 188.172 189.234C187.164 189.234 186.238 189.047 185.395 188.672C184.559 188.297 183.832 187.754 183.215 187.043C182.605 186.332 182.133 185.469 181.797 184.453C181.461 183.438 181.293 182.289 181.293 181.008V179.93C181.293 178.648 181.457 177.504 181.785 176.496C182.121 175.48 182.594 174.617 183.203 173.906C183.812 173.188 184.535 172.641 185.371 172.266C186.215 171.891 187.141 171.703 188.148 171.703C189.188 171.703 190.125 171.891 190.961 172.266C191.805 172.641 192.527 173.188 193.129 173.906C193.738 174.617 194.203 175.48 194.523 176.496C194.852 177.504 195.016 178.648 195.016 179.93ZM192.777 181.008V179.906C192.777 178.891 192.672 177.992 192.461 177.211C192.258 176.43 191.957 175.773 191.559 175.242C191.16 174.711 190.672 174.309 190.094 174.035C189.523 173.762 188.875 173.625 188.148 173.625C187.445 173.625 186.809 173.762 186.238 174.035C185.676 174.309 185.191 174.711 184.785 175.242C184.387 175.773 184.078 176.43 183.859 177.211C183.641 177.992 183.531 178.891 183.531 179.906V181.008C183.531 182.031 183.641 182.938 183.859 183.727C184.078 184.508 184.391 185.168 184.797 185.707C185.211 186.238 185.699 186.641 186.262 186.914C186.832 187.188 187.469 187.324 188.172 187.324C188.906 187.324 189.559 187.188 190.129 186.914C190.699 186.641 191.18 186.238 191.57 185.707C191.969 185.168 192.27 184.508 192.473 183.727C192.676 182.938 192.777 182.031 192.777 181.008ZM199.117 171.938H201.309L206.898 185.848L212.477 171.938H214.68L207.742 189H206.031L199.117 171.938ZM198.402 171.938H200.336L200.652 182.344V189H198.402V171.938ZM213.449 171.938H215.383V189H213.133V182.344L213.449 171.938Z'
        fill='black'
      />
    </svg>
  );

  const renderPopoverComponents = () => (
    <Popover
      id={`popover`}
      container={() => document.getElementById('campus-map-container')}
      open={false}
      hideBackdrop={true}
      onClose={() => setOpenPopover(false)}
      className='z-30 w-1/2 h-1/4 rounded-lg'
      anchorEl={element !== undefined ? element.target : null}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}>
      <div
        id='popover-backrgound'
        className='bg-white w-44 h-30 flex flex-col'>
        {/* <div
          id='popover-header'
          className='w-full h-7 bg-[#014769] flex justify-end items-center z-20'>
          <div
            id='cancel-button-container'
            className='h-3/4 w-1/6 bg-white rounded-full flex justify-center items-center mr-3.5'>
            <button
              id='cancel-button'
              className='text-[#D73930] text-sm font-extrabold'
              onClick={() => setOpenPopover(false)}>
              X
            </button>
          </div>
        </div> */}
        <div
          id='popover-body'
          className='h-1/4 w-full flex z-10 relative bg-black'>
          <img
            src='/backgrounds/dummy-classroom.jpeg'
            className='h-24 w-full opacity-80'
          />
          <div
            id='navigate-button-container'
            className='absolute z-20 w-full h-max flex justify-center bottom-2'></div>
        </div>
      </div>
    </Popover>
  );

  const renderMainQuestModal = () => (
    <Modal
      open={openMainQuestModal}
      className='w-full h-full flex justify-center items-center'
      disableScrollLock={true}>
      <div
        id='task-modal-container'
        className='w-11/12 h-3/4 bg-[#0171A9] flex flex-col rounded-xl border-black border-4'>
        <div
          id='task-modal-title-container'
          className='flex justify-center items-center w-full h-1/4 relative'>
          <div
            id='task-modal-title-box'
            className='bg-[#4EB0E1] w-1/2 h-min p-3 rounded-md shadow-xl border-black border-2 absolute -top-10 text-center'>
            <h4 className='text-white font-semibold tracking-widest text-2xl'>
              {translateKMGMapId(popoverLocation || '').toUpperCase()}
            </h4>
          </div>
          <button
            id='close-modal-button'
            className='absolute right-5 top-5 text-4xl text-black bg-white w-20 h-20 2 hover:outline-2 hover:outline hover:outline-black rounded-full'
            onClick={() => setOpenMainQuestModal(false)}>
            ❌
          </button>
        </div>
        <div
          id='task-modal-body-container'
          className='w-full h-1/2 flex flex-row justify-evenly items-center'>
          <div
            id='profiles-picture'
            className=' w-1/4 h-full flex justify-center items-center relative'>
            <div
              id='profiles-squareframe'
              className='bg-white h-5/6 w-1/2 rounded-md border-black border-2 shadow-xl'
            />
            <img
              src={'/characters/aset merch BINUS Support 3 - bahagia copy.png'}
              className='absolute w-full'
            />
          </div>
          <div
            id='task-modal-descriptions-container'
            className='w-1/2 h-full flex flex-col justify-evenly relative'>
            <div
              id='task-modal-descriptions'
              className='w-full h-3/4 bg-white rounded-t-xl shadow-xl border-black border-2 flex-col p-2 '>
              <div
                id='task-modal-description-header'
                className='w-full h-1/4 text-center '>
                <h5 className='text-white bg-[#4EB0E1] font-semibold tracking-wider text-xl p-2 '>
                  {'STORY CONTINUATION'}
                </h5>
              </div>
              <div
                id='task-modal-description-body'
                className='w-full h-3/4 pt-3 flex justify-between flex-col'>
                <p className='text-black font-medium tracking-wide text-lg'>
                  {currentActivityData?.description}
                </p>
                <p className='text-black font-medium tracking-wide text-lg'>
                  {}
                </p>
              </div>
            </div>
            <div
              id='button-container'
              className='w-full h-max flex justify-end flex-row'>
              <button
                id='go-button'
                className='beescholar-success-button border-2 border-black hover:border-2 rounded-lg p-3 font-bold text-lg tracking-wider  hover:border-black'
                onClick={() => handleNavigateStory()}>
                LETS GO
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );

  const renderTaskModal = () => (
    <Modal
      open={openTaskModal}
      className='w-full h-full flex justify-center items-center'
      disableScrollLock={true}>
      <div
        id='task-modal-container'
        className='w-11/12 h-3/4 bg-[#C06C00] flex flex-col rounded-xl border-black border-4'>
        <div
          id='task-modal-title-container'
          className='flex justify-center items-center w-full h-1/4 relative'>
          <div
            id='task-modal-title-box'
            className='bg-[#F3931B] w-1/2 h-min p-3 rounded-md shadow-xl border-black border-2 absolute -top-10 text-center'>
            <h4 className='text-white font-semibold tracking-widest text-2xl'>
              {translateKMGMapId(popoverLocation || '').toUpperCase()}
            </h4>
          </div>
          <button
            id='close-modal-button'
            className='absolute right-5 top-5 text-4xl text-black bg-white w-20 h-20 2 hover:outline-2 hover:outline hover:outline-black rounded-full'
            onClick={() => setOpenTaskModal(false)}>
            ❌
          </button>
        </div>
        <div
          id='task-modal-body-container'
          className='w-full h-1/2 flex flex-row justify-evenly items-center'>
          <div
            id='profiles-picture'
            className=' w-1/4 h-full flex justify-center items-center relative'>
            <div
              id='profiles-squareframe'
              className='bg-white h-5/6 w-1/2 rounded-md border-black border-2 shadow-xl'
            />
            <img
              src={'/characters/aset merch BINUS Support 3 - bahagia copy.png'}
              className='absolute w-full'
            />
          </div>
          <div
            id='task-modal-descriptions-container'
            className='w-1/2 h-full flex flex-col justify-evenly relative'>
            <div
              id='task-modal-descriptions'
              className='w-full h-3/4 bg-white rounded-t-xl shadow-xl border-black border-2 flex-col p-2 '>
              <div
                id='task-modal-description-header'
                className='w-full h-1/4 text-center '>
                <h5 className='text-white bg-[#F3931B] font-semibold tracking-wider text-xl p-2 '>
                  TRIVIAL TASK
                </h5>
              </div>
              <div
                id='task-modal-description-body'
                className='w-full h-3/4 pt-3 flex justify-between flex-col'>
                <p className='text-black font-medium tracking-wide text-lg'>
                  {taskModalData?.description}
                </p>
                <p className='text-black font-medium tracking-wide text-lg'>
                  Minigame: {taskModalData?.type}
                </p>
              </div>
            </div>
            <div
              id='button-container'
              className='w-full h-max flex justify-end flex-row'>
              <button
                id='go-button'
                className='beescholar-success-button border-2 border-black hover:border-2 rounded-lg p-3 font-bold text-lg tracking-wider  hover:border-black'
                onClick={() => handleNavigateTrivialTask()}>
                LETS GO
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );

  const renderNoInteractibleModal = () => (
    <Modal
      open={noInteractibleModalOpen}
      onClose={() => setNoInteractibleModalOpen(false)}
      className='w-full h-full flex justify-center items-center'>
      <div
        id='modal-container'
        className='w-11/12 h-3/4 bg-[#C06C00] flex flex-col rounded-xl border-black border-4 text-center m-5'>
        {' '}
        <h2 className='font-semibold tracking-widest text-2xl text-white'>
          There is nothing to do here...
        </h2>
      </div>
    </Modal>
  );

  const renderInteraction = () => {
    const _interactionData = interactionData[interactionCount];

    const handleCheckDialogue = () => {
      if (interactionData[interactionCount + 1] === undefined) {
        return false;
      }
      return true;
    };

    const handleNextDialogue = () => {
      handleCheckDialogue() && setInteractionCount(interactionCount + 1);
      !handleCheckDialogue() && setOpenInteraction(false);
    };

    return (
      <div className='w-full h-full flex flex-col absolute justify-center items-center'>
        <div
          id='character'
          className='w-1/4 h-1/2 absolute z-30'>
          <img
            src={_interactionData.characterPicture}
            className=''
          />
        </div>
        <div
          id='speech-box'
          className='z-30 w-full h-1/3 absolute bottom-0'>
          <div
            className='w-full h-full bg-white flex  flex-col justify-start'
            id='speech-background'>
            <div
              id='speech-character-name'
              className='bg-orange-300 p-3 rounded-lg h-max -top-10 left-5 w-max z-40 absolute font-bold text-3xl text-black'>
              {_interactionData.characterName}
            </div>
            <div
              id='speech-box'
              className=' flex flex-row absolute h-full w-full justify-between overflow-auto top-10'>
              <div
                id='speech-text'
                className='w-5/6 h-1/3 text-xl font-medium text-black ml-5'>
                {_interactionData.line}
              </div>
              <button
                className='absolute h-1/4 top-4 right-2 beescholar-button p-2 rounded-xl'
                onClick={handleNextDialogue}>
                <p className='font-bold text-white text-3xl '>
                  {handleCheckDialogue() ? 'Next' : 'Finish'}
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className='w-full h-full bg-black opacity-70 z-20'></div>
      </div>
    );
  };

  const renderCampusMap = () => (
    <div
      id='campus-map-container'
      className='w-full h-full flex justify-center items-center'>
      <div
        id='campus-map-background'
        className='w-3/4 h-5/6 flex bg-white justify-center'>
        <div
          id='map-svg-container'
          className='object-scale-down w-3/4'>
          {KMGMap()}
          {renderPopoverComponents()}
        </div>
      </div>
    </div>
  );

  const renderBook = () => (
    <>
      <div className=' w-5/6 h-5/6 flex flex-row relative justify-center items-center '>
        {renderBookmark()}
        <div
          id='book-page-left'
          className='bg-[#4EB0E1] w-1/2 h-full overflow-auto overflow-x-hidden drop-shadow-lg shadow-md shadow-black'>
          {renderCampusMap()}
        </div>
        <div className='w-1/6 h-full absolute flex justify-center ml-12'>
          <div className='justify-center items-center flex z-10 absolute h-full w-min ml-1 drop-shadow-lg shadow-md shadow-black'>
            {renderMiddlePart()}
          </div>
        </div>
        <div
          id='book-page-right'
          className='bg-white h-full w-1/2 drop-shadow-lg shadow-md shadow-black'>
          {renderMapInteractibles()}
        </div>
      </div>
      {renderTaskModal()}
      {renderMainQuestModal()}
      {renderNoInteractibleModal()}
      {openInteraction && renderInteraction()}
    </>
  );

  return <>{renderBook()}</>;
};

export default MapBook;
