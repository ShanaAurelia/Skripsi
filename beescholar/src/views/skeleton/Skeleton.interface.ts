import { IStudent } from '../../constants/global.interfaces';

export interface ISkeletonState {
  student: IStudent;
}

export interface ISkeletonProps {
  loginStudent(): void
  logoutStudent(): void
}
