// React
import React, { createContext, useState } from 'react';

/**
 * @type AppContextType
 * @summary Application Context Type
 * @description Definition of the application context type
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @property { boolean } isDarkMode
 */
type AppContextType = {
    // Themes
    isDarkMode: boolean
};

const defaultState: AppContextType = {
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
    // TODO: Should I just bring in toggleDarkMode to context?
    const [isDarkMode, toggleDarkMode] = useState(defaultState.isDarkMode);

    return (
        <AppContext.Provider value={{ 
            isDarkMode
        }}>
            { props.children }
        </AppContext.Provider>
    )
};

export default AppContextProvider;