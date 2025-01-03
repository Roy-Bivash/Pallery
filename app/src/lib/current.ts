import { CustomFetch } from "./customFetch";
import { UserType } from "@/@types/User";


async function getMe() {
    const { response, error } = await CustomFetch('/user');

    if (error) {
        return {
            success: false,
            user: null
        };
    }

    return {
        success: response.success || false,
        user: response.user,
        img_count: response.img_count,
    };
}

// This function check if the user is logged in
async function checkLoginStatus() {
    const { response, error } = await CustomFetch('/auth/isLoggedIn');
    
    // If there is an error or success is not true, return false
    if (error || !response?.success) {
        return false;
    }

    return true;
}


async function logOut(){
    const { response } = await CustomFetch('/auth/logout', {
        method: 'POST',
    });

    return response?.success || false;
}

export {
    getMe,
    checkLoginStatus,
    logOut
}