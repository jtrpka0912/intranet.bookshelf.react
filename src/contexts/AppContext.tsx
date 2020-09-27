// React
import React, { createContext, useState, useEffect } from 'react';

// Types
import ShelfType from '../types/Shelf';
import DirectoryType from '../types/Directory';

// Services
import { retrieveAvailableShelves } from '../services/Shelves';

/**
 * @type AppContextType
 * @summary Application Context Type
 * @description Definition of the application context type
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @property { ShelfType] } currentShelf
 * @property { boolean } isDarkMode
 */
type AppContextType = {
    // Shelves
    availableShelves: ShelfType[],
    addToAvailableShelves: (shelf: ShelfType) => void,
    currentShelf: ShelfType | null,
    setToCurrentShelf: (shelf: ShelfType) => void,
    currentFolder: DirectoryType | null,
};

const defaultState: AppContextType = {
    // Shelves
    availableShelves: [],
    addToAvailableShelves: availableShelves => console.warn('addToAvailableShelves is not available (check context provider in heirarchy)'), // Not sure what to put in here
    currentShelf: null,
    setToCurrentShelf: currentShelf => console.warn('setToCurrentShelf is not available (check context provider in heirarchy)'), // Again, not sure what to put in here
    currentFolder: null,
};

export const AppContext: React.Context<AppContextType> = createContext<AppContextType>(defaultState);

/**
 * @type AppContextProps
 * @summary Application context props
 * @description Define the structure the application context props
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @property { React.ReactNode } children
 */
type AppContextProps = {
    children: React.ReactNode
};

/**
 * @function AppContextProvider
 * @summary Application Context Provider
 * @description A state managed provider to store the current shelf being used and any themed-related properties.
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @param { AppContextProps } props 
 * @returns { JSX }
 */
const AppContextProvider = (props: AppContextProps) => {
    // TODO: Convert to reducers later on
    const [availableShelves, setAvailableShelves] = useState(defaultState.availableShelves);
    const [currentShelf, setCurrentShelf] = useState(defaultState.currentShelf);
    const [currentFolder, setCurrentFolder] = useState(defaultState.currentFolder);

    const addToAvailableShelves = (shelf: ShelfType) => {
        setAvailableShelves([...availableShelves, shelf]);
    }

    const setToCurrentShelf = (shelf: ShelfType) => {
        setCurrentShelf(shelf);
    }

    return (
        <AppContext.Provider value={{ 
            availableShelves, 
            addToAvailableShelves, 
            currentShelf,
            setToCurrentShelf,
            currentFolder
        }}>
            { props.children }
        </AppContext.Provider>
    )
}

export default AppContextProvider;