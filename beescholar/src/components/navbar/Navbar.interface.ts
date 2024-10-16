import { IStudent } from '../../constants/global.interfaces';

export interface INavbarState {}

export interface INavbarProps {
  student?: IStudent;
  isLoading: boolean;
  isShown: boolean;
}
