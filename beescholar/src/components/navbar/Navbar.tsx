import React, { Component, useContext, useEffect, useState } from 'react';
import { INavbarProps, INavbarState } from './Navbar.interface';
import './Navbar.css';
import '../../constants/global.css'
import { useAuth } from '../../config/Context';
import { dummyStudent } from '../../views/skeleton/Skeleton.constants';
import { useNavigate } from 'react-router-dom';
import { GetUserData } from '../../config/Utilities';
import { Modal } from '@mui/material';

const Navbar = (props: INavbarProps) => {
  const contextData = useAuth();
  var _savedUser;
  if (window.localStorage.getItem('user-beescholar') !== null) {
    _savedUser = GetUserData();
    contextData.checkExistingUser(_savedUser);
  }
  const student = _savedUser ? _savedUser : contextData.user;
  const navigate = useNavigate();
  
  const NavbarUserLogin = () => {
    return (
      student && (
        <div
          id='navbar-background'
          className='nav-background'>
          <div
            id='user-profile-background'
            className='h-5/6 w-max flex flex-row bg-[#E0E0E0] rounded-lg mt-auto mb-auto shadow-md shadow-black pr-5'>
            <div
              id='user-profile-picture-background'
              className='flex rounded-lg w-max'>
              <img
                className='object-fill rounded-lg'
                src={student.profilePicture}
              />
            </div>
            <div
              id='user-information-background'
              className='flex flex-col w-max justify-center items-center ml-2'>
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
            id='candidate-points-container'
            className='flex flex-col justify-evenly w-1/4 bg-[#F39F33] items-center rounded-lg shadow-md shadow-black h-3/4'>
            <div
              id='cp-title'
              className='w-full h-1/3 justify-center items-center'>
              <h2 className='font-bold text-2xl text-center text-white'>
                {' '}
                My Candidate Points{' '}
              </h2>
            </div>
            <div
              id='candidate-points'
              className='flex flex-row '>
              <h2 className='font-bold text-xl text-center text-white'>
                {student.totalPoint || 0}
              </h2>
              <p className='font-medium text-base text-white text-center mt-1'>
                pts
              </p>
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
  // contextData.login(dummyStudent.email)}
  const NavbarNoUser = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const auth = useAuth();

    useEffect(() => {
      setEmail("");
      setPassword("");
      setIsOpenModal(false);
    }, [])

    const handleLogin = () => {
      setEmail("");
      setPassword("");
      setTimeout(() => {
        contextData.login(email);
      }, 500);
    };

    const handleChangeEmail = (input: string) => {
      setEmail(input);
    };

    const handleChangePassword = (input: string) => {
      setPassword(input);
    };

    return (
      <div className='nav-background'>
        <div className='container h-5/6 w-max flex flex-row  rounded-lg mt-auto mb-auto'></div>
        <div className='nav-log-container'>
          <button
            className='nav-log-button-background'
            onClick={() => setIsOpenModal(true)}>
            <h3 className='nav-log-button-text'>LOGIN</h3>
          </button>
          <Modal
            open={isOpenModal}
            disableScrollLock={true}>
            <div
              id='modal-container'
              className='w-full h-full justify-center items-center flex'>
              <div
                id='modal-box'
                className='w-1/4 h-1/2 items-center flex flex-col bg-white rounded-lg justify-between'>
                <div
                  id='welcome-text'
                  className='w-full h-1/4 text-center mt-5'>
                  <h2 className='text-2xl font-semibold text-black tracking-wide'>
                    Welcome to Beescholar
                  </h2>
                  <p className='text-md font-normal text-gray-500'>
                    Please enter your credentials here
                  </p>
                </div>
                <div
                  id='input-box'
                  className='w-full h-1/2 flex flex-col items-center'>
                  <div
                    id='email-input-box'
                    className='w-2/3 h-min'>
                    <h5 className='text-lg font-semibold text-black tracking-wide'>
                      Email
                    </h5>
                    <input
                      type='text'
                      className='border-black border-2 w-full pl-2'
                      value={email}
                      onChange={(e) => handleChangeEmail(e.target.value)}
                    />
                  </div>
                  <div
                    id='password-input-box'
                    className='w-2/3 h-min'>
                    <h5 className='text-lg font-semibold text-black tracking-wide'>
                      Password
                    </h5>
                    <div
                      id='password-show'
                      className='flex flex-row relative'>
                      <input
                        type={'password'}
                        className='border-black border-2 w-full pl-2'
                        value={password}
                        onChange={(e) => handleChangePassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div
                  id='button-container'
                  className='w-full h-1/4 flex justify-evenly items-center flex-row'>
                  <button
                    className='beescholar-error-button p-2 font-semibold tracking-wide rounded-md'
                    onClick={() => setIsOpenModal(false)}>
                    Cancel
                  </button>
                  <button
                    className='beescholar-button p-2 font-semibold tracking-wide rounded-md'
                    onClick={() => {handleLogin()}}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </Modal>
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
