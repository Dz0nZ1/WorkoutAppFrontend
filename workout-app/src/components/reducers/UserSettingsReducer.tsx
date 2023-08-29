import {User, UserSettingsAction, UserSettingsFunction} from "@/types";

export default function UserSettingsReducer(state: User, action: UserSettingsAction){
    switch (action.type){
        case UserSettingsFunction.CHANGE_EMAIL:
            return {...state, email: action.payload.email};
        case UserSettingsFunction.CHANGE_FIRST_NAME:
            return {...state, firstName: action.payload.firstName};
        default:
            return state;
    }
}