import { createContext } from "react";
import { IStudent } from "../constants/global.interfaces";
import { DummyStudent } from "../constants/dummy.constants";

export const UserContext = createContext<IStudent | undefined>(undefined);
export const AuthenticationContext = createContext<any>(undefined);