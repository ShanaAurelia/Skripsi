import React, { Component } from 'react';
import { INavbarProps, INavbarState } from './Navbar.interface';
import './Navbar.css';

class Navbar extends Component<INavbarProps, INavbarState> {
  constructor(props: INavbarProps) {
    super(props);
    this.state = {};
  }

  NavbarUserLogin = () => {
    const { isLoading, student, isShown } = this.props;

    return student && (
      <div id='navbar-background' className='nav-background'>
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

        <div id='logout-button-container' className='nav-log-container'>
          <div id='logout-button-background' className='nav-log-button-background'>
            <h3 className='nav-log-button-text'>
              Logout
            </h3>
          </div>
        </div>
      </div>
    );
  }

  NavbarNoUser = () => {
    return (
      <div className='nav-background'>
        <div className='container h-5/6 w-max flex flex-row  rounded-lg mt-auto mb-auto'></div>
        <div className='nav-log-container'>
          <div className='nav-log-button-background'>
            <h3 className='nav-log-button-text'>
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
