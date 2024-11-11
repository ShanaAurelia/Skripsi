import React, { useContext, useState } from 'react';
import { ISkeletonProps} from './Skeleton.interface';
import { dummyStudent } from './Skeleton.constants';
import Navbar from '../../components/navbar/Navbar';
import { IStudent } from '../../constants/global.interfaces';
import { Outlet } from 'react-router-dom';

const Skeleton = (props: ISkeletonProps) => {
  // const [student, setStudent] = useState<IStudent>(dummyStudent)

  return (
    <div className='h-screen'>
      <div className=''>
        <Navbar
          isLoading={false}
          isShown={true}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default Skeleton;
