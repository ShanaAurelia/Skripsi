import React, { useContext, useEffect, useState } from 'react';
import { ISkeletonProps} from './Skeleton.interface';
import { dummyStudent } from './Skeleton.constants';
import Navbar from '../../components/navbar/Navbar';
import { IStudent } from '../../constants/global.interfaces';
import { Outlet } from 'react-router-dom';

const Skeleton = (props: ISkeletonProps) => {
  // const [student, setStudent] = useState<IStudent>(dummyStudent)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  return (
    <div className='h-screen'>
      <div className=''>
        <Navbar
          isLoading={false}
          isShown={true}
        />
      </div>
      {screenWidth > screenHeight ? <Outlet /> : (<div> Sorry for your inconvenience. Please use Landscape orientation for best experience. If you're already on Landscape orientation and still see this page, please refresh the page. </div>)}
      {/* <Outlet />  added orientation validation*/}
    </div>
  );
};

export default Skeleton;
