import {createContext} from "react";
import {UserSettingsContextProps} from "@/types";

export const UserSettingsContext = createContext<UserSettingsContextProps | null>(null)