// React
import React, { createContext, useState } from 'react';

/**
 * @exports
 * @enum ListViews
 * @description The defined view types for directories, breadcrumbs, and the files components
 * @author J.T.
 * @property { string } Tile
 * @property { string } List
 * @property { string } Breadcrumb
 */
export enum ListViews {
    Tile = 'tile',
    List = 'list',
    Breadcrumb = 'breadcrumb'
};

/**
 * @type AppContextType
 * @summary Application Context Type
 * @description Definition of the application context type
 * @author J.T.
 * @property { boolean } isSideNavOpen
 * @property { ListView } breadcrumbView
 * @property { ListView } directoryView
 * @property { ListView } fileView
 * @property { function } toggleSideNav
 */
type AppContextType = {
    // State
    isSideNavOpen: boolean,
    breadcrumbView: ListViews,
    directoryView: ListViews,
    fileView: ListViews
    // Actions
    toggleSideNav: (state: boolean) => void,
    toggleBreadcrumbView: (state: ListViews) => void,
    toggleDirectoryView: (state: ListViews) => void,
    toggleFileView: (state: ListViews) => void
};

const defaultState: AppContextType = {
    isSideNavOpen: false,
    breadcrumbView: ListViews.Tile,
    directoryView: ListViews.Tile,
    fileView: ListViews.Tile,
    toggleSideNav: toggleSideNav => console.warn('toggleSideNav is not available (check context provider in heirarchy)'),
    toggleBreadcrumbView: toggleBreadcrumbView => console.warn('toggleBreadcrumbView is not available (check context provider in heirarchy)'),
    toggleDirectoryView: toggleDirectoryView => console.warn('toggleDirectoryView is not available (check context provider in heirarchy)'),
    toggleFileView: toggleFileView => console.warn('toggleFileView is not available (check context provider in heirarchy)')
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
 * @returns { React.ReactNode }
 */
const AppContextProvider = (props: AppContextProps) => {
    // States
    // TODO: Need to figure out how to toggle when clicking ANYWHERE outside of side navigation.
    const [isSideNavOpen, toggleSideNav] = useState(defaultState.isSideNavOpen);
    const [breadcrumbView, toggleBreadcrumbView] = useState(defaultState.breadcrumbView);
    const [directoryView, toggleDirectoryView] = useState(defaultState.directoryView);
    const [fileView, toggleFileView] = useState(defaultState.fileView);

    return (
        <AppContext.Provider value={{
            isSideNavOpen,
            breadcrumbView,
            directoryView,
            fileView,
            toggleSideNav,
            toggleBreadcrumbView,
            toggleDirectoryView,
            toggleFileView
        }}>
            { props.children }
        </AppContext.Provider>
    );
};

export default AppContextProvider;