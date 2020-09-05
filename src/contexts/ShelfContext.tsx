// React
import React, { createContext, useState } from 'react';

// Types
import ShelfContextType from '../types/contexts/ShelfContext';

const defaultState: ShelfContextType = {
    breadcrumbs: [],
    directories: [],
    files: []
};

export const ShelfContext: React.Context<ShelfContextType> = createContext<ShelfContextType>(defaultState);

type ShelfContextProps = {
    children: React.ReactNode
};

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