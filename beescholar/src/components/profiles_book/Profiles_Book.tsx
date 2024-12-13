import React, { useEffect, useState } from 'react';
import { KMGCharacters } from '../../constants/dummy.constants';
import './Profiles_Book.css';
import { ICharacter } from '../../constants/global.interfaces';

const ProfilesBook = () => {
  const [activeLocation, setActiveLocation] = useState<string>('KMG');
  const [activeProfile, setActiveProfile] = useState<ICharacter>();
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [activeClub, setActiveClub] = useState<string>();
  const [students, setStudents] = useState<ICharacter[]>([]);

  useEffect(() => {
    setStudents(KMGCharacters);
    setActiveProfile(KMGCharacters[0]);
  }, []);

  useEffect(() => {
    setActiveClub(undefined);
    handleCreateTags();
  }, [activeProfile]);

  useEffect(() => {
    handleClubMembership();
  }, [activeTags]);

  useEffect(() => {
    // when changing location, change active character to first character index
    setActiveProfile(KMGCharacters[0]);
  }, [activeLocation]);

  const handleNewActiveLocation = (location: string) => {
    setActiveLocation(location);
  };

  const handleProfileSelect = (profile: ICharacter) => {
    setActiveProfile(profile);
  };

  const handleTranslateCampusLLocationId = (locationId: string) => {
    switch (locationId) {
      case '01':
        return '@Kemanggisan';
      case '02':
        return '@Bandung';
      case '03':
        return '@Semarang';
      case '04':
        return '@Bekasi';
      case '05':
        return '@Malang';
      case '06':
        return '@AlamSutera';
      default:
        return '@Binus';
    }
  };

  const handleSeperateRole = (role: string) => {
    return role.split(/;\s*/);
  };

  const handleCreateTags = () => {
    // student role, campus location, and club position counts as a 'tag'
    if (activeProfile !== undefined) {
      const locationTag = handleTranslateCampusLLocationId(
        activeProfile.campusId
      );
      const roleTag = handleSeperateRole(activeProfile.role);
      setActiveTags([...roleTag, locationTag]);
    }
  };

  const handleTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'beescholar':
        return 'bg-[#F39F33]';
      case 'student':
        return 'bg-[#81C7E9]';
      case 'lecturer':
        return 'bg-[#34A4DC]';
      default:
        return 'bg-[#014769] text-white';
    }
  };

  const handleClubMembership = () => {
    activeTags.forEach((tag) => {
      const match = tag.match(/^(.*?\bClub\b)/i); // Extracts up to 'Club'
      if (match !== null) {
        setActiveClub(match[0]);
        return;
      }
    });
  };

  const renderBookmark = () => (
    <div
      id='bookmark'
      className='h-full w-14 flex-col justify-items-end '>
      <button
        id='KMG'
        className={
          (activeLocation === 'KMG' ? 'bg-[#81C7E9] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('KMG')}>
        <h5 className='bookmark-text'>K M G</h5>
      </button>
      <button
        id='BDG'
        className={
          (activeLocation === 'BDG' ? 'bg-[#81C7E9] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('BDG')}>
        <h5 className='bookmark-text'>B D G</h5>
      </button>
      <button
        id='SMG'
        className={
          (activeLocation === 'SMG' ? 'bg-[#81C7E9] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('SMG')}>
        <h5 className='bookmark-text'>S M G</h5>
      </button>
      <button
        id='BKS'
        className={
          (activeLocation === 'BKS' ? 'bg-[#81C7E9] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('BKS')}>
        <h5 className='bookmark-text'>B K S</h5>
      </button>
      <button
        id='MLG'
        className={
          (activeLocation === 'MLG' ? 'bg-[#81C7E9] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('MLG')}>
        <h5 className='bookmark-text'>M L G</h5>
      </button>
      <button
        id='ALS'
        className={
          (activeLocation === 'ALS' ? 'bg-[#81C7E9] ' : '') + 'bookmark-button'
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

  const renderProfileList = () => (
    <div className='grid grid-cols-3 gap-3 gap-y-6 m-10 z-30'>
      {students.map((student) => (
        <>
          <button
            id={student.id}
            className={
              'list-profile ' +
              (student.id === activeProfile?.id
                ? ' border-[#ff4545] border-4'
                : '')
            }
            onClick={() => handleProfileSelect(student)}>
            <img
              src={student.picture}
              className='object-fill w-3/4 h-3/4'
            />
          </button>
        </>
      ))}
    </div>
  );

  const renderProfileDescription = () => (
    <div
      id='proile'
      className='flex flex-col justify-evenly w-full h-full z-30'>
      <div
        id='profile-top'
        className='flex flex-row w-full h-1/2 bg-white'>
        <div
          id='descipriton-container'
          className='flex flex-col relative w-1/2'>
          <div
            id='character-description'
            className='flex flex-row mb-auto mt-auto justify-center items-center overflow-auto'>
            <div
              id='left-quote-description'
              className='relative md:-left-5 sm:-left-2'>
              <h1 className='font-bold md:text-4xl absolute bottom-0 sm:text-xl'>
                "
              </h1>
            </div>
            <div
              id='description-character'
              className='w-1/2 ml-3 mr-3 mt-5'>
              <h5 className='font-medium md:text-lg sm:text-sm'>
                {activeProfile?.description}
              </h5>
              <h5 className='text-start font-medium text-xs'>
                -Agatha @Beerita(20XX)
              </h5>
            </div>
            <div
              id='right-quote-description'
              className='relative'>
              <h1 className='font-bold md:text-4xl absolute top-0 sm:text-xl '>
                "
              </h1>
            </div>
          </div>
        </div>
        <div
          id='profiles-picture'
          className=' w-1/2 h-full flex justify-center items-center relative'>
          <div
            id='profiles-squareframe'
            className='bg-[#E0E0E0] h-3/4 w-2/3 border-[#F39F33] border-8'
          />
          <img
            src={activeProfile?.picture}
            className='absolute w-3/4'
          />
        </div>
      </div>
      <div
        id='profile-middle'
        className=' h-5 w-full flex flex-row relative'>
        <h1 className='font-extrabold md:text-4xl sm:text-base absolute md:right-10 sm:right-3 md:-top-7 sm:-top-3 drop-shadow-md'>
          {activeProfile?.name}
        </h1>
        <div
          id='middle-line'
          className='h-1 w-full bg-[#E0E0E0] absolute bottom-0'
        />
      </div>
      <div
        id='profile-bottom'
        className=' h-1/2 w-full relative flex flex-col'>
        <div
          id='profile-tags'
          className='h-1/4 w-full flex flex-row overflow-x-auto overflow-y-hidden'>
          {activeTags.map((tag) => (
            <>
              <div
                className={
                  'h-min w-max pl-3 pr-3 m-2 md:pt-1 md:pb-1 sm:pt-0 sm:pb-1 ' +
                  handleTagColor(tag) +
                  ' flex justify-center items-center rounded-xl'
                }>
                <h4 className='text-center font-normal md:text-xl sm:text-xs'>
                  {tag}
                </h4>
              </div>
            </>
          ))}
        </div>
        <div
          id='decoration-container'
          className='flex flex-row w-11/12 h-3/4 mb-3.5 ml-3 justify-evenly overflow-auto'>
          {activeClub !== undefined && (
            <div
              id='club-decoration'
              className='flex justify-center items-center bg-[#F39F33] w-1/2 h-max rounded-xl flex-col'>
              <h2 className='md:font-semibold md:text-xl sm:text-xs sm:font-medium sm:tracking-normal sm:text-center text-white tracking-wider'>
                CLUB CERTIFICATION
              </h2>
              <div
                id='club-name'
                className='flex justify-center items-center flex-row'>
                <h5 className='text-white md:text-2xl sm:text-base'>"</h5>
                <h5 className='text-white md:text-lg sm:text-xs'>
                  {activeClub}
                </h5>
                <h5 className='text-white md:text-2xl sm:text-base'>"</h5>
              </div>
            </div>
          )}
          <div
            id='beerita-notes'
            className='flex justify-center bg-[#81C7E9] md:w-2/5 sm:w-2/3 h-max md:pt-3 md:pb-3 md:mr-3 md:pl-3 md:pr-3 sm:pt-1 sm:pb-1 sm:pl-1 sm:mr-0.5 sm:pr-1 rounded-xl relative flex-col'>
            <div
              id='beerita-notes-title'
              className='align-middle bg-white drop-shadow-md md:pl-2 md:pr-2 sm:pl-0 sm:pr-0 rounded-2xl flex justify-center items-center'>
              <h3 className='text-[#81C7E9] md:text-xl md:font-medium md:tracking-wider sm:text-base sm:font-normal sm:tracking-normal text-center'>
                Beerita Notes
              </h3>
            </div>
            <div
              id='beerita-notes-list'
              className='flex flex-col justify-between'>
              <div
                id='beerita-notes-likes'
                className='flex flex-row h-max w-full md:mt-3 sm:mt-0.5'>
                <div
                  id='checkmark-container'
                  className='w-1/4 flex justify-center items-center'>
                  <div
                    id='checkmark'
                    className='md:w-5 md:h-5 sm:w-1 sm:h-1 bg-white drop-shadow-md'
                  />
                </div>
                <div
                  id='likes-container'
                  className='w-3/4 h-max'>
                  <h5 className='md:font-semibold md:text-base sm:font-light sm:text-xs'>
                    {activeProfile?.name} likes {activeProfile?.likes}
                  </h5>
                </div>
              </div>
              <div
                id='beerita-notes-dislikes'
                className='flex flex-row h-max w-full md:mt-3 sm:mt-0.5'>
                <div
                  id='checkmark-container'
                  className='w-1/4 flex justify-center items-center'>
                  <div
                    id='checkmark'
                    className='md:w-5 md:h-5 sm:w-1 sm:h-1 bg-white drop-shadow-md'
                  />
                </div>
                <div
                  id='dislikes-container'
                  className='w-3/4 h-max'>
                  <h5 className='md:font-semibold md:text-base sm:font-light sm:text-xs'>
                    {activeProfile?.name} dislikes {activeProfile?.dislikes}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBook = () => (
    <div className=' w-5/6 h-5/6 flex flex-row relative justify-center items-center'>
      {renderBookmark()}
      <div
        id='book-page-left'
        className='bg-[#81C7E9] w-1/2 h-full shadow-[1px_0_1px_0_black_inset] overflow-auto overflow-x-hidden'>
        {renderProfileList()}
      </div>
      <div className='w-1/6 h-full absolute flex justify-center ml-12'>
      <div className='justify-center items-center flex z-0 absolute h-full w-min ml-1'>
      {renderMiddlePart()}
      </div>
      </div>
      <div
        id='book-page-right'
        className='bg-white h-full w-1/2'>
        {renderProfileDescription()}
      </div>
    </div>
  );

  return <>{renderBook()}</>;
};

export default ProfilesBook;
