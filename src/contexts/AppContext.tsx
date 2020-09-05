// React
import React, { createContext, useState } from 'react';

// Types
import ShelfType from '../types/Shelf';

/**
 * @type AppContextType
 * @summary Application Context Type
 * @description Definition of the application context type
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @property { ShelfType] } currentShelf
 * @property { boolean } isDarkMode
 */
type AppContextType = {
    currentShelf: ShelfType,
    // Add any additional theming options
    isDarkMode: boolean
    // TODO: Maybe have the slider nav status here
};

const defaultState: AppContextType = {
    currentShelf: null,
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
    const [currentShelf, setShelf] = useState(defaultState.currentShelf);
    const [isDarkMode, toggleDarkMode] = useState(defaultState.isDarkMode);

    return (
        <AppContext.Provider value={{ currentShelf, isDarkMode }}>
            { props.children }
        </AppContext.Provider>
    )
}

export default AppContextProvider;