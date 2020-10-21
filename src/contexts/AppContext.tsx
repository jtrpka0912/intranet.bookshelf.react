// React
import React, { createContext, useEffect, useState } from 'react';

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
 * @exports
 * @enum ListSections
 * @description The list sections for the SHELF
 * @author J.T.
 * @property { string } Breadcrumb
 * @property { string } Directory
 * @property { string } File
 */
export enum ListSections {
    Breadcrumb = 'breadcrumb',
    Directory = 'directory',
    File = 'file'
};

/**
 * @type AppContextType
 * @summary Application Context Type
 * @description Definition of the application context type
 * @author J.T.
 * @property { boolean } isSideNavOpen
 * @property { string } toastMessage
 * @property { boolean } isToastOpen
 * @property { ListView } breadcrumbView
 * @property { ListView } directoryView
 * @property { ListView } fileView
 * @property { function } toggleSideNav
 * @property { function } switchBreadcrumbView
 * @property { function } switchDirectoryView
 * @property { function } switchFileView
 */
type AppContextType = {
    // State
    isSideNavOpen: boolean,
    toastMessage: string,
    isToastOpen: boolean,
    breadcrumbView: ListViews,
    directoryView: ListViews,
    fileView: ListViews
    // Actions
    toggleSideNav: (state: boolean) => void,
    toggleToastMessage: (message: string) => void,
    switchListView: (listSection: ListSections, listView: ListViews) => void,
};

const defaultState: AppContextType = {
    isSideNavOpen: false,
    toastMessage: '',
    isToastOpen: false,
    breadcrumbView: ListViews.Breadcrumb,
    directoryView: ListViews.Tile,
    fileView: ListViews.List,
    toggleSideNav: toggleSideNav => console.warn('toggleSideNav is not available (check context provider in heirarchy)'),
    toggleToastMessage: toggleToastMessage => console.warn('toggleToastMessage is not available (check context provider in heirarchy)'),
    switchListView: switchListView => console.warn('switchListView is not available (check context provider in heirarchy)')
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
    // Local Storage Keys
    const localStorageBreadcrumbListView: string = 'breadcrumbListView';
    const localStorageDirectoryListView: string = 'directoryListView';
    const localStorageFileListView: string = 'fileListView';

    // State Components
    // TODO: Need to figure out how to toggle when clicking ANYWHERE outside of side navigation.
    const [isSideNavOpen, toggleSideNav] = useState(defaultState.isSideNavOpen);
    const [toastMessage, setToastMessage] = useState(defaultState.toastMessage);
    const [isToastOpen, toggleToast] = useState(defaultState.isToastOpen);

    // State List Sections
    const [breadcrumbView, toggleBreadcrumbView] = useState(defaultState.breadcrumbView);
    const [directoryView, toggleDirectoryView] = useState(defaultState.directoryView);
    const [fileView, toggleFileView] = useState(defaultState.fileView);

    /**
     * @function toggleToastMessage
     * @description Set the toast message and then toggle it open
     * @author J.T.
     * @param { string } message
     */
    const toggleToastMessage = (message: string) => {
        // Open with a message
        setToastMessage(message);
        toggleToast(true);

        // Then close it in 5 seconds.
        setTimeout(() => {
            toggleToast(false);
        }, 5000);
    };

    useEffect(() => {
        /**
         * @function retrieveListViewStates
         * @description Retrieve the list view states from local storage to state
         * @author J.T.
         */
        const retrieveListViewStates = () => {
            // Retrieve the list view states from local storage, but converted to ListViews enum
            const retrieveBreadcrumbState: ListViews | null = localStorage.getItem(localStorageBreadcrumbListView) as ListViews;
            const retrieveDirectoryState: ListViews | null = localStorage.getItem(localStorageDirectoryListView) as ListViews;
            const retrieveFileState: ListViews | null = localStorage.getItem(localStorageFileListView) as ListViews;

            // Assign the list view states to ... state
            toggleBreadcrumbView(retrieveBreadcrumbState ? retrieveBreadcrumbState : defaultState.breadcrumbView);
            toggleDirectoryView(retrieveDirectoryState ? retrieveDirectoryState : defaultState.directoryView);
            toggleFileView(retrieveFileState ? retrieveFileState : defaultState.fileView);
        };

        retrieveListViewStates();
    }, []);

    /**
     * @function switchViewType
     * @description Toggle the list view for any of the list sections
     * @author J.T.
     * @param { ListSections } listSection
     * @param { ListViews } listView 
     */
    const switchListView = (listSection: ListSections, listView: ListViews) => {
        switch(listSection) {
            case ListSections.Breadcrumb:
                toggleBreadcrumbView(listView);
                localStorage.setItem(localStorageBreadcrumbListView, listView);
                break;
            case ListSections.Directory:
                toggleDirectoryView(listView);
                localStorage.setItem(localStorageDirectoryListView, listView);
                break;
            case ListSections.File:
                toggleFileView(listView);
                localStorage.setItem(localStorageFileListView, listView);
                break;
            default:
                break;
        }
    };

    return (
        <AppContext.Provider value={{
            isSideNavOpen,
            toastMessage,
            isToastOpen,
            breadcrumbView,
            directoryView,
            fileView,
            toggleSideNav,
            switchListView,
            toggleToastMessage,
        }}>
            { props.children }
        </AppContext.Provider>
    );
};

export default AppContextProvider;