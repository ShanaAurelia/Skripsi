import React, { Component, useContext } from 'react';
import { INavbarProps, INavbarState } from './Navbar.interface';
import './Navbar.css';
import { AuthenticationContext, UserContext } from '../../config/Context';

const Navbar = (props: INavbarProps) => {
  const NavbarUserLogin = () => {
    const student = useContext(UserContext);

    const redirect = (to: string) => {
      return window.location.replace(`/${to}`);
    };

    return (
      student && (
        <div
          id='navbar-background'
          className='nav-background'>
          <div
            id='user-profile-background'
            className='container h-5/6 w-max flex flex-row bg-slate-50 rounded-lg mt-auto mb-auto'>
            <div
              id='user-profile-picture-background'
              className='container flex w-1/2 rounded-lg grow'>
              <img
                className='object-fill rounded-lg'
                src={student.userPictureUrl}
              />
            </div>
            <div
              id='user-information-background'
              className='container flex flex-col flex-initial'>
              <div
                id='user-information'
                className='container'>
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

          <div
            id='logout-button-container'
            className='nav-log-container'>
            <button
              id='home-button-background'
              className='nav-log-button-background mr-5'
              onClick={() => redirect('home')}>
              <h3 className='nav-log-button-text'>Home</h3>
            </button>
            <button
              id='logout-button-background'
              className='nav-log-button-background'
              onClick={props.logoutStudent}>
              <h3 className='nav-log-button-text'>Logout</h3>
            </button>
          </div>
        </div>
      )
    );
  };

  const NavbarNoUser = () => {
    return (
      <div className='nav-background'>
        <div className='container h-5/6 w-max flex flex-row  rounded-lg mt-auto mb-auto'></div>
        <div className='nav-log-container'>
          <button
            className='nav-log-button-background'
            onClick={props.loginStudent}>
            <h3 className='nav-log-button-text'>Login</h3>
          </button>
        </div>
      </div>
    );
  };

  const student = useContext(UserContext);

  if (props.isShown && student !== undefined) {
    return NavbarUserLogin();
    // tampilan navigation bar ketika user sudah login
  } else if (props.isShown) {
    return NavbarNoUser();
    // Tampilan navigation bar ketika user belum login
  } else {
    return <></>;
    // Tampilan navigation bar di hide
  }
};

export default Navbar;
