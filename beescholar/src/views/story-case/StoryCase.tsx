import React, { Component } from 'react';
import { ITemplateProps } from './StoryCase.interface';
import StorycaseBook from '../../components/storycase-book/Storycase_Book';

const StoryCase = () => {
  return (
    <div className='h-screen w-full bg-[#014769] items-center flex justify-center'>
      <StorycaseBook />
    </div>
  );
};

export default StoryCase;
