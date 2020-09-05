// React
import React, { createContext, useState } from 'react';

// Types
import DirectoryType from '../types/Directory';
import FileType from '../types/File';

/**
 * @type ShelfContextType
 * @summary Shelf Context Type
 * @description Definition of the shelf context type
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @property { DirectoryType[] } breadcrumbs
 * @property { DirectoryType[] } directories
 * @property { FileType[] } files
 */
type ShelfContextType = {
    breadcrumbs: DirectoryType[],
    directories: DirectoryType[],
    files: FileType[]
};

const defaultState: ShelfContextType = {
    breadcrumbs: [],
    directories: [],
    files: []
};

export const ShelfContext: React.Context<ShelfContextType> = createContext<ShelfContextType>(defaultState);

/**
 * @type ShelfContextProps
 * @summary Shelf context props
 * @description Define the structure the shelf context props
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @property { React.ReactNode } children
 */
type ShelfContextProps = {
    children: React.ReactNode
};

/**
 * @function ShelfContextProvider
 * @summary Shelf Context Provider
 * @description A state managed provider to hold all of the directories and files of the shelf (and current folder).
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @param { ShelfContextProps } props 
 * @returns { JSX }
 */
const ShelfContextProvider = (props: ShelfContextProps) => {
    const [breadcrumbs, setBreadcrumbs] = useState(defaultState.breadcrumbs);
    const [directories, setDirectories] = useState(defaultState.directories);
    const [files, setFiles] = useState(defaultState.files);

    return (
        <ShelfContext.Provider value={{ breadcrumbs, directories, files }}>
            { props.children }
        </ShelfContext.Provider>
    );
};

export default ShelfContextProvider;