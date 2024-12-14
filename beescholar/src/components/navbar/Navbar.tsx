import React, { Component, useContext } from 'react';
import { INavbarProps, INavbarState } from './Navbar.interface';
import './Navbar.css';
import { useAuth } from '../../config/Context';
import { dummyStudent } from '../../views/skeleton/Skeleton.constants';
import { useNavigate } from 'react-router-dom';
import { GetUserData } from '../../config/Utilities';

const Navbar = (props: INavbarProps) => {
  const contextData = useAuth();
  var _savedUser;
  if(window.localStorage.getItem('user-beescholar') !== null){
    _savedUser = GetUserData();
    contextData.checkExistingUser(_savedUser)
  }
  const student = _savedUser? _savedUser:contextData.user;
  const navigate = useNavigate();
  const NavbarUserLogin = () => {
    return (
      student && (
        <div
          id='navbar-background'
          className='nav-background'>
          <div
            id='user-profile-background'
            className='h-5/6 w-2/12 flex flex-row bg-[#E0E0E0] rounded-lg mt-auto mb-auto shadow-md shadow-black'>
            <div
              id='user-profile-picture-background'
              className='flex rounded-lg w-1/4'>
              <img
                className='object-fill rounded-lg'
                src={student.userPictureUrl}
              />
            </div>
            <div
              id='user-information-background'
              className='flex flex-col w-1/2 justify-center items-center'>
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

          <div id='candidate-points-container'
            className='flex flex-col justify-evenly w-1/4 bg-[#F39F33] items-center rounded-lg shadow-md shadow-black h-3/4'>
              <div id='cp-title' className='w-full h-1/3 justify-center items-center'>
                <h2 className='font-bold text-2xl text-center text-white'> My Candidate Points </h2>
              </div>
              <div id='candidate-points' className='flex flex-row '>
                <h2 className='font-bold text-xl text-center text-white'>{student.candidatePoints || 0}</h2>
                <p className='font-medium text-base text-white text-center mt-1'>pts</p>
              </div>
            </div>

          <div
            id='logout-button-container'
            className='nav-log-container'>
            {contextData.isStarted && (
              <button
                id='home-button-background'
                className='nav-log-button-background mr-5'
                onClick={() => navigate('/game/')}>
                <h3 className='nav-log-button-text'>HOME</h3>
              </button>
            )}
            <button
              id='logout-button-background'
              className='nav-log-button-background'
              onClick={contextData.logout}>
              <h3 className='nav-log-button-text'>LOGOUT</h3>
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
            onClick={() => contextData.login(dummyStudent.email)}>
            <h3 className='nav-log-button-text'>LOGIN</h3>
          </button>
        </div>
      </div>
    );
  };

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
