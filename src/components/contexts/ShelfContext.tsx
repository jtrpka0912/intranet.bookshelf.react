// React
import React, { createContext, useState, useEffect, useContext } from 'react';

// Types
import ShelfType from '../../types/Shelf';
import DirectoryType from '../../types/Directory';
import FileType from '../../types/File';

// API
import { getContentsByShelf, getContentsByShelfAndFolder } from '../../api/contentsApi';
import { getShelves } from '../../api/shelvesApi';
import { expectError } from '../../api/api';


// Contexts
import { AppContext } from './AppContext';

/**
 * @type EbookResponse
 * @summary Ebook API Response
 * @description An eBook response from the server
 * @author J.T.
 * @property { DirectoryType[] } breadcrumbs
 * @property { DirectoryType[] } directories
 * @property { FileType[] } files
 */
type EbookResponse = {
    breadcrumbs: DirectoryType[],
    directories: DirectoryType[],
    files: FileType[]
};

/**
 * @type ShelfContextType
 * @summary Shelf Context Type
 * @description Definition of the shelf context type
 * @author J.T.
 * @property { ShelfType[] } shelves
 * @property { DirectoryType[] } breadcrumbs
 * @property { DirectoryType[] } directories
 * @property { FileType[] } files
 * @property { ShelfType | null } activeShelf
 * @property { DirectoryType | null } activeDirectory
 * @property { function } addOneToShelves
 * @property { function } setToActiveShelf
 * @property { function } setToActiveDirectory
 */
type ShelfContextType = {
    // Items
    shelves: ShelfType[],
    breadcrumbs: DirectoryType[],
    directories: DirectoryType[],
    files: FileType[],
    // Status
    activeShelf: ShelfType | null,
    activeDirectory: DirectoryType | null,
    activeFile: FileType | null,
    // Actions
    addOneToShelves: (shelf: ShelfType) => void,
    setToActiveShelf: (shelf: ShelfType) => void,
    setToActiveDirectory: (directory: DirectoryType) => void,
    setToActiveFile: (file: FileType | null) => void
};

const defaultState: ShelfContextType = {
    // Items
    shelves: [],
    breadcrumbs: [],
    directories: [],
    files: [],
    // Status
    activeShelf: null,
    activeDirectory: null,
    activeFile: null,
    // Actions
    addOneToShelves: addOneToShelves => console.warn('addOneToShelves is not available (check context provider in heirarchy)'),
    setToActiveShelf: setToActiveShelf => console.warn('setToActiveShelf is not available (check context provider in heirarchy)'),
    setToActiveDirectory: setToActiveDirectory => console.warn('setToActiveDirectory is not available (check context provider in heirarchy)'),
    setToActiveFile: setToActiveFile => console.warn('setToActiveDirectory is not available (check context provider in heirarchy)')
};

export const ShelfContext: React.Context<ShelfContextType> = createContext<ShelfContextType>(defaultState);

/**
 * @type ShelfContextProps
 * @summary Shelf context props
 * @description Define the structure the shelf context props
 * @author J.T.
 * @property { React.ReactNode } children
 */
type ShelfContextProps = {
    children: React.ReactNode
};

/**
 * @function ShelfContextProvider
 * @summary Shelf Context Provider
 * @description A state managed provider to hold all of the directories and files of the shelf (and current folder).
 * @author J.T.
 * @param { ShelfContextProps } props 
 * @returns { React.ReactNode }
 */
const ShelfContextProvider = (props: ShelfContextProps) => {
    // Contexts
    const { toggleToastMessage } = useContext(AppContext);

    // Local Storage Keys
    const localStorageActiveShelfName: string = 'activeShelf';
    const localStorageActiveDirectoryName: string = 'activeDirectory';

    // States
    const [shelves, setShelves] = useState(defaultState.shelves);
    const [breadcrumbs, setBreadcrumbs] = useState(defaultState.breadcrumbs);
    const [directories, setDirectories] = useState(defaultState.directories);
    const [files, setFiles] = useState(defaultState.files);
    const [activeShelf, setActiveShelf] = useState(defaultState.activeShelf);
    const [activeDirectory, setActiveDirectory] = useState(defaultState.activeDirectory);
    const [activeFile, setActiveFile] = useState(defaultState.activeFile);
    
    /**
     * @function addOneToShelves
     * @description Add a shelf to the shelves state.
     * @author J.T.
     * @param { ShelfType } shelf 
     */
    const addOneToShelves = (shelf: ShelfType) => {
        setShelves([...shelves, shelf]);
    }

    /**
     * @function setToActiveShelf
     * @description Set a shelf to be the active shelf (and display its items)
     * @author J.T.
     * @param { ShelfType } shelf
     */
    const setToActiveShelf = (shelf: ShelfType) => {
        // Set the active shelf to local storage
        localStorage.setItem(localStorageActiveShelfName, JSON.stringify(shelf));
        localStorage.removeItem(localStorageActiveDirectoryName); // Unset the active directory

        // Then set to state
        setActiveShelf(shelf);
        setActiveDirectory(null); // Clear the active directory

        // Then retrieve the breadcrumbs, directories, and files
        retrieveShelfContents(shelf);
    }

    /**
     * @function setToActiveDirectory
     * @description Set the directory to be the current folder in the active shelf (and display its items)
     * @author J.T.
     * @param { DirectoryType } directory 
     */
    const setToActiveDirectory = (directory: DirectoryType) => {
        // Set the active directory to local storage
        localStorage.setItem(localStorageActiveDirectoryName, JSON.stringify(directory));

        // Then set to state
        setActiveDirectory(directory);

        // Then retrieve the breadcrumbs, directories, and files (assuming there is an activeShelf)
        try {
            if(activeShelf) {
                retrieveShelfContents(activeShelf, directory);
            } else {
                throw Error('No active shelf was set');
            }
        } catch(error) {
            console.error('ShelfContext - setToActiveDirectory()', error);
            toggleToastMessage(error);
        }
    }

    /**
     * @function setToActiveFile
     * @description Set the file to active for the file modal
     * @author J.T.
     * @param { FileType } file 
     */
    const setToActiveFile = (file: FileType | null) => {
        // Set the active file
        setActiveFile(file);
    };

    /**
     * @async
     * @function retrieveShelfContents
     * @description Retrieve the shelves contents
     * @author J.T.
     * @param { ShelfType } shelf 
     * @param { DirectoryType } directory 
     */
    const retrieveShelfContents = async (shelf: ShelfType, directory?: DirectoryType) => {
        try{
            let response: Response;

            if(directory) {
                response = await getContentsByShelfAndFolder(shelf, directory);
            } else {
                response = await getContentsByShelf(shelf);
            }

            expectError(response, 'Unable to get response to retrieve contents.');

            // Retrieve the data
            const responseJSON: EbookResponse = await response.json();

            // Check if data is there
            if(responseJSON.breadcrumbs && responseJSON.directories && responseJSON.files) {
                const breadcrumbs: DirectoryType[] = responseJSON.breadcrumbs;
                const directories: DirectoryType[] = responseJSON.directories;
                const files: FileType[] = responseJSON.files;

                setBreadcrumbs(breadcrumbs);
                setDirectories(directories);
                setFiles(files);
            }
        } catch (error) {
            console.error('ShelfContext - retrieveShelfContents()', error);
            toggleToastMessage(error.message);
        }
    };

    useEffect(() => {
        /**
         * @function retrieveLocalStorageActiveShelf
         * @description Retrieve, if any, the last active shelf prior to refreshing
         * @author J.T.
         * @returns { ShelfType | null }
         */
        const retrieveLocalStorageActiveShelf = (): ShelfType | null => {
            const lastActiveShelfJSON: string | null = localStorage.getItem(localStorageActiveShelfName);

            // Check if there is any value in active shelf
            if(lastActiveShelfJSON) {
                const lastActiveShelf: ShelfType = JSON.parse(lastActiveShelfJSON);
                setActiveShelf(lastActiveShelf);

                return lastActiveShelf;
            }

            return null;
        }

        /**
         * @function retrieveLocalStorageActiveDirectory
         * @description Retrieve, if any, the last active directory prior to refreshing
         * @author J.T.
         * @note Instead of null; set it to undefined so it acts as if the variable doesn't exist for the retrieve shelf contents function
         * @returns { DirectoryType | undefined }
         */
        const retrieveLocalStorageActiveDirectory = (): DirectoryType | undefined => {
            const lastActiveDirectoryJSON: string | null = localStorage.getItem(localStorageActiveDirectoryName);

            // Check if there is any value in active directory
            if(lastActiveDirectoryJSON) {
                const lastActiveDirectory: DirectoryType = JSON.parse(lastActiveDirectoryJSON);
                setActiveDirectory(lastActiveDirectory);
                return lastActiveDirectory;
            }

            return undefined;
        }

        /**
         * @async
         * @function retrieveAvailableShelves
         * @description Retrieve all of the shelves from the database
         * @author J.T.
         * @note Should this be stand alone?
         * @throws Error
         * @returns ShelfType[]
         */
        const retrieveAvailableShelves = async () => {
            const response = await getShelves();

            expectError(response, 'Unable to retrieve response');

            const responseJSON: any[] = await response.json();
            let shelfArray: ShelfType[] = responseJSON;
            setShelves(shelfArray);
        };
        
        try {
            // Apparently the state variables will not be recognized even after retrieval and setting to state.
            const currentShelf: ShelfType | null = retrieveLocalStorageActiveShelf();
            const currentDirectory: DirectoryType | undefined = retrieveLocalStorageActiveDirectory();

            // Do not need to retrieve the shelves state
            retrieveAvailableShelves();

            // Check if any current shelf
            if(currentShelf) {
                retrieveShelfContents(currentShelf, currentDirectory);
            }
        } catch(error) {
            console.error('AppContext useEffect', error.message);
            toggleToastMessage(error.message);
        }
    }, []); // Pass any variables that useEffect should check each time the component gets re-rendered.

    return (
        <ShelfContext.Provider value={{ 
            shelves, 
            breadcrumbs, 
            directories, 
            files,
            activeShelf,
            activeDirectory,
            activeFile,
            addOneToShelves,
            setToActiveShelf,
            setToActiveDirectory,
            setToActiveFile
        }}>
            { props.children }
        </ShelfContext.Provider>
    );
};

export default ShelfContextProvider;