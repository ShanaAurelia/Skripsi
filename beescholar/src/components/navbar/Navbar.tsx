import React, { Component } from 'react';
import { INavbarProps, INavbarState } from './Navbar.interface';

class Navbar extends Component<INavbarProps, INavbarState> {
  constructor(props: INavbarProps) {
    super(props);
    this.state = {};
  }

  NavbarUserLogin = () => {
    const { isLoading, student, isShown } = this.props;

    return (
      <div className='bg-cyan-800 h-20 content-center flex flex-wrap justify-between pr-2 pl-2'>
        <div className='container h-16 w-1/6 flex flex-row bg-slate-50 rounded-lg'>
          <div className='container flex w-1/2 rounded-lg grow'>
            <img
              className='object-fill rounded-lg'
              src={student.userPictureUrl}
            />
          </div>
          <div className='container flex flex-col flex-initial'>
            <div className='container'>
              <h4 className='font-sans font-semibold line-clamp-1'>
                {student.name}
              </h4>
              <h5 className='font-sans font-normal text-xs line-clamp-1'>
                {student.userCode}
              </h5>
              <h6 className='font-sans font-normal text-xs line-clamp-1'>
                {student.academicCareer}
              </h6>
            </div>
          </div>
        </div>

        <div className='container h-14 w-1/12 flex'>
          <div className='container bg-cyan-900 flex rounded-lg justify-center'>
            <h3 className='font-sans font-semibold text-base content-center text-white'>
              Logout
            </h3>
          </div>
        </div>
      </div>
    );
  }

  NavbarNoUser = () => {
    return (
      <div className='bg-cyan-800 h-20 content-center w-screen flex flex-wrap justify-between'>
        <div className='container h-14 w-1/6 flex flex-row'></div>
        <div className='container h-14 w-1/12 flex mr-2'>
          <div className='container bg-cyan-900 flex rounded-lg justify-center'>
            <h3 className='font-sans font-semibold text-base content-center text-white'>
              Login
            </h3>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { isLoading, student, isShown } = this.props;

    if (isShown && student) {
      return this.NavbarUserLogin();
      // tampilan navigation bar ketika user sudah login
    } else if (isShown) {
      return this.NavbarNoUser();
      // Tampilan navigation bar ketika user belum login
    } else {
      return <></>;
      // Tampilan navigation bar di hide
    }
  }
}

export default Navbar;
