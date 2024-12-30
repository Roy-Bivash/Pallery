import { CustomFetch } from "./customFetch";

async function logOut(){
    const { response } = await CustomFetch('/auth/logout', {
        method: 'POST',
    });

    return response?.success || false;
}

export {
    logOut
}