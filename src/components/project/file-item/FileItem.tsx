// React
import React, { useContext } from 'react';

// Contexts
import { ShelfContext } from '../../../contexts/ShelfContext';

// Types
import FileType from '../../../types/File';

// Components
import Item from '../../common/item/Item';

// Font Awesome
import { faBook } from '@fortawesome/free-solid-svg-icons';

// Styles
import './FileItem.scss';

/**
 * @interface FileItemProps
 * @description The acceptable props for the File Item component
 * @author J.T.
 * @property { string } className
 * @property { FileType } file
 */
interface FileItemProps {
    className?: string,
    file: FileType
};

/**
 * @function FileItem
 * @summary File Item Component
 * @description A file item that represents a book in the shelf.
 * @author J.T.
 * @return { React.ReactNode }
 */
const FolderItem: React.FunctionComponent<FileItemProps> = (props) => {
    const { setToActiveFile } = useContext(ShelfContext);

    return (
        <Item className={ `shelf-fileitem ${ props.className }` }
            icon={ faBook }    
            onClick={ () => setToActiveFile(props.file) }
        >{ props.file.name }</Item>
    )
};

export default FolderItem;