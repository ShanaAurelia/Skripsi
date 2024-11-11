import React, { useContext, useState } from 'react';
import { ISkeletonProps} from './Skeleton.interface';
import { dummyStudent } from './Skeleton.constants';
import Navbar from '../../components/navbar/Navbar';
import { IStudent } from '../../constants/global.interfaces';

const Skeleton = (props: ISkeletonProps) => {
  // const [student, setStudent] = useState<IStudent>(dummyStudent)

  return (
    <div className=' bg-cyan-500 z-50'>
      <div className='z-10'>
        <Navbar
          isLoading={false}
          isShown={true}
        />
      </div>
    </div>
  );
};

export default Skeleton;
