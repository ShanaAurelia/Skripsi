import React, { Component } from 'react';
import { INavbarProps, INavbarState } from './Navbar.interface';

class Navbar extends Component<INavbarProps, INavbarState> {
  constructor(props: INavbarProps) {
    super(props);
    this.state = {};
  }

  NavbarUserLogin = () => {
    const { isLoading, student, isShown } = this.props;

    return student && (
      <div id='navbar-background' className='bg-cyan-800 h-20 content-center flex flex-row justify-between pr-2 pl-2'>
        <div id='user-profile-background' className='container h-5/6 w-max flex flex-row bg-slate-50 rounded-lg mt-auto mb-auto'>
          <div id='user-profile-picture-background' className='container flex w-1/2 rounded-lg grow'>
            <img
              className='object-fill rounded-lg'
              src={student.userPictureUrl}
            />
          </div>
          <div id='user-information-background' className='container flex flex-col flex-initial'>
            <div id='user-information' className='container'>
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

        <div id='logout-button-container' className='container h-4/6 w-max flex mt-auto mb-auto'>
          <div id='logout-button-background' className='container bg-cyan-900 flex rounded-lg justify-center p-4'>
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
      <div className='bg-cyan-800 h-20 content-center flex flex-row justify-between pr-2 pl-2'>
        <div className='container h-5/6 w-max flex flex-row  rounded-lg mt-auto mb-auto'></div>
        <div className='container h-4/6 w-max flex mt-auto mb-auto'>
          <div className='container bcontainer bg-cyan-900 flex rounded-lg justify-center p-4'>
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

    if (isShown && student !== undefined) {
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
