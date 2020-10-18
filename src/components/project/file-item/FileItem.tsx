// React
import React from 'react';

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
 * @description A folder item represents a directory in the shelf.
 * @author J.T.
 * @return { React.ReactNode }
 */
const FolderItem: React.FunctionComponent<FileItemProps> = (props) => {
    return (
        <Item className={ `shelf-fileitem ${ props.className }` }
            icon={ faBook }    
            onClick={ () => console.log('Clicked file item') }
        >{ props.file.name }</Item>
    )
};

export default FolderItem;