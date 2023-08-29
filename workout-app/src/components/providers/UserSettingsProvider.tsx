import {UserSettingsContext} from "@/components/contexts/UserSettingsContext";
import {useReducer} from "react";
import UserSettingsReducer from "@/components/reducers/UserSettingsReducer";
import {User} from "@/types";


export const UserSettingsProvider = ({children} : any) => {

    const initialUserSettings : User = {
        id: 99,
        firstName: "Nikola",
        lastName: "Lelekovic",
        email: "lelekovic777@gmail.colm"
    }

    // @ts-ignore
    const [state, dispatch] = useReducer(UserSettingsReducer, initialUserSettings)

    return (
        <UserSettingsContext.Provider value={{
            state, dispatch
        }}>
            {children}
        </UserSettingsContext.Provider>
    )
}