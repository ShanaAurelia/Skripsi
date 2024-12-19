import React, { useEffect, useState } from 'react';
import { ITemplateProps } from './Profiles.interface';
import { KMGCharacters } from '../../constants/dummy.constants';
import './Profiles.css';
import { ICharacter } from '../../constants/global.interfaces';
import ProfilesBook from '../../components/profiles_book/Profiles_Book';

const CharacterProfiles = () => {
  const [isLoading, setIsLoading] = useState<boolean>();

  const renderLazyLoading = () => <div></div>;

  return (
    <div className='h-screen w-full bg-[#81C7E9] items-center flex justify-center'>
      {isLoading ? renderLazyLoading() : <ProfilesBook key={'profile-book'}/>}
    </div>
  );
};

export default CharacterProfiles;
