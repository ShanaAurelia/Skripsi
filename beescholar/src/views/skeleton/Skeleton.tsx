import React, { Component } from 'react';
import { ISkeletonProps, ISkeletonState } from './Skeleton.interface';
import { dummyStudent } from './Skeleton.constants';
import Navbar from '../../components/navbar/Navbar';

class Skeleton extends Component<ISkeletonProps, ISkeletonState> {
  constructor(props: ISkeletonProps) {
    super(props);
    this.state = {
      student: dummyStudent,
    };
  }

  render() {
    const { student } = this.state;
    return (
      <div className=' bg-cyan-500 z-50'>
        <div className='z-10'>
        <Navbar
          isLoading={false}
          isShown={true}
          student={student}
        />
        </div>
      </div>
    );
  }
}

export default Skeleton;
