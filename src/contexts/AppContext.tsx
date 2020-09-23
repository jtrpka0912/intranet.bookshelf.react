// React
import React, { createContext, useState } from 'react';

// Types
import ShelfType from '../types/Shelf';
import DirectoryType from '../types/Directory';

// Dummy Data
import shelfData from '../data/shelves';

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
    currentShelf: ShelfType | null,
    currentFolder: DirectoryType | null,
    // Themes
    isDarkMode: boolean
    // TODO: Maybe have the slider nav status here
};

const defaultState: AppContextType = {
    // Shelves
    availableShelves: shelfData,
    currentShelf: null,
    currentFolder: null,
    // Themes
    isDarkMode: false
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
    const [isDarkMode, toggleDarkMode] = useState(defaultState.isDarkMode);

    return (
        <AppContext.Provider value={{ availableShelves, currentShelf, currentFolder, isDarkMode }}>
            { props.children }
        </AppContext.Provider>
    )
}

export default AppContextProvider;