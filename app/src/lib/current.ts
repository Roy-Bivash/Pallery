import { CustomFetch } from "./customFetch";

async function getMe(){
    const { response, error } = await CustomFetch('/auth/me');

    if(error){
        return {
            success: false,
            user: null
        };
    }

    return {
        success: response.success || false,
        user: response.user || null
    }
}

async function logOut(){
    const { response } = await CustomFetch('/auth/logout', {
        method: 'POST',
    });

    return response?.success || false;
}

export {
    getMe,
    logOut
}