import React, { createContext, useState } from 'react';

/**
 * @type DirectoryType
 * @summary Directory Type
 * @description Definition of the directory type
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @property { string } id
 * @property { string } name
 * @property { string } path
 */
type DirectoryType = {
    id: string,
    name: string,
    path: string
};

/**
 * @type FileType
 * @summary File Type
 * @description Definition of the file type
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @property { string } id
 * @property { string } type
 * @property { string } name
 * @property { string } path
 * @property { string } cover
 * @property { boolean } didRead
 */
type FileType = {
    id: string,
    type: string, // TODO: Might be an enum
    name: string,
    path: string,
    cover: string,
    didRead: boolean
};

type ShelfContextType = {
    breadCrumbs: DirectoryType[],
    directories: DirectoryType[],
    files: FileType[]
};

const defaultState: ShelfContextType = {
    breadCrumbs: [],
    directories: [],
    files: []
};

export const ShelfContext: React.Context<ShelfContextType> = createContext<ShelfContextType>(defaultState);

type ShelfContextProps = {
    children: React.ReactNode
};

const ShelfContextProvider = (props: ShelfContextProps) => {
    const [breadCrumbs, setBreadCrumbs] = useState(defaultState.breadCrumbs);
    const [directories, setDirectories] = useState(defaultState.directories);
    const [files, setFiles] = useState(defaultState.files);

    return (
        <ShelfContext.Provider value={{ breadCrumbs, directories, files }}>
            { props.children }
        </ShelfContext.Provider>
    );
};

export default ShelfContextProvider;