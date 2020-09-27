// React
import React, { createContext, useState, useEffect } from 'react';

// Types
import ShelfType from '../types/Shelf';
import DirectoryType from '../types/Directory';

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

    useEffect(() => {
        /**
         * @async
         * @function retrieveAvailableShelves
         * @description Retrieve all of the shelves from the database
         * @author J. Trpka <jtrpka0912@gmail.com>
         * @throws Error
         * @returns ShelfType[]
         */
        const retrieveAvailableShelves = async () => {
            const response = await fetch('http://localhost:3001/api/v1/shelves');

            if(response.status !== 200 && !response.ok) {
                throw Error('Unable to retrieve response');
            }

            const responseJSON: any[] = await response.json();

            // TODO: Need a better way to map the data
            let shelfArray: ShelfType[] = [];
            
            for(let shelfData of responseJSON) {
                let shelf: ShelfType = {
                    _id: shelfData._id,
                    name: shelfData.name,
                    root: shelfData.root,
                    showDirectories: shelfData.showDirectories,
                    multiFile: shelfData.multiFile
                };

                shelfArray.push(shelf);
            }
            
            setAvailableShelves(shelfArray);
        };
        
        try {
            retrieveAvailableShelves();
        } catch(err) {
            console.error('AppContext useEffect', err);
        }
    }, []); // Pass any variables that useEffect should check each time the component gets re-rendered.

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
};

export default AppContextProvider;