import UserPage from "@/pages/users";
import {UserSettingsProvider} from "@/components/providers/UserSettingsProvider";
import UpdateUserSettingsPage from "@/pages/users/update-user-settings";

export default function HomePage() {

    return (
        <>
            <UserSettingsProvider>
                <UserPage/>
                <br/>
                <hr/>
                <UpdateUserSettingsPage/>
            </UserSettingsProvider>
        </>
    )
}