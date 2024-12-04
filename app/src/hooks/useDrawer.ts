import { useState, useEffect } from 'react';

type DrawerState = {
    open: boolean;
    url: string;
    title: string;
};

let globalDrawerState: DrawerState = {
    open: false,
    url: '',
    title: '',
};

let listeners: Array<(state: DrawerState) => void> = [];

const updateListeners = () => {
    listeners.forEach((listener) => listener(globalDrawerState));
};

export const useDrawer = () => {
    const [drawerState, setDrawerState] = useState<DrawerState>(globalDrawerState);

    const openDrawer = (url: string, title: string) => {
        globalDrawerState = { open: true, url, title };
        updateListeners();
    };

    const closeDrawer = () => {
        globalDrawerState = { open: false, url: '', title: '' };
        updateListeners();
    };

    useEffect(() => {
        const listener = (state: DrawerState) => setDrawerState(state);
        listeners.push(listener);

        // Cleanup listener on unmount
        return () => {
        listeners = listeners.filter((l) => l !== listener);
        };
    }, []);

    return { drawerState, openDrawer, closeDrawer };
};
