// React
import React, { createContext, useState } from 'react';

/**
 * @type AppContextType
 * @summary Application Context Type
 * @description Definition of the application context type
 * @author J.T.
 * @property { boolean } isSideNavOpen
 */
type AppContextType = {
    // State
    isSideNavOpen: boolean,
    // Actions
    toggleSideNav: (state: boolean) => void
};

const defaultState: AppContextType = {
    isSideNavOpen: false,
    toggleSideNav: toggleSideNav => console.warn('toggleSideNav is not available (check context provider in heirarchy)')
};

export const AppContext: React.Context<AppContextType> = createContext<AppContextType>(defaultState);

/**
 * @type AppContextProps
 * @summary Application context props
 * @description Define the structure the application context props
 * @author J.T.
 * @property { React.ReactNode } children
 */
type AppContextProps = {
    children: React.ReactNode
};

/**
 * @function AppContextProvider
 * @summary Application Context Provider
 * @description A state managed provider to hold all other application data.
 * @author J.T.
 * @param { AppContextProps } props 
 * @returns { JSX }
 */
const AppContextProvider = (props: AppContextProps) => {
    // States
    const [isSideNavOpen, toggleSideNav] = useState(defaultState.isSideNavOpen);
    // TODO: Need to figure out how to toggle when clicking ANYWHERE outside of side navigation.

    return (
        <AppContext.Provider value={{
            isSideNavOpen,
            toggleSideNav
        }}>
            { props.children }
        </AppContext.Provider>
    );
};

export default AppContextProvider;