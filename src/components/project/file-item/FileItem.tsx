// React
import React, { useContext } from 'react';

// Contexts
import { ListViews } from '../../contexts/AppContext';
import { ShelfContext } from '../../contexts/ShelfContext';

// Types
import FileType from '../../../types/File';

// Components
import Item from '../../common/item/Item';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * @interface FileItemProps
 * @description The acceptable props for the File Item component
 * @author J.T.
 * @property { FileType } file
 * @property { ListViews } display
 */
interface FileItemProps {
    file: FileType,
    display: ListViews
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

    const outputTitle = () => {
        if(props.file.didRead) {
            if(props.display === ListViews.Tile) {
                return (
                    <React.Fragment>
                        <FontAwesomeIcon icon={ faCheckCircle } /> { props.file.name }
                    </React.Fragment>
                );
            } else if(props.display === ListViews.List) {
                return (
                    <React.Fragment>
                        { props.file.name } <FontAwesomeIcon icon={ faCheckCircle } />
                    </React.Fragment>
                )
            } else {
                return null;
            }
        } else {
            return props.file.name;
        }
    }

    return (
        <Item className="shelf-fileitem"
            display={ props.display }
            image={ `http://localhost:3001/${ props.file.cover }` }
            icon={ faBook }    
            onClick={ () => setToActiveFile(props.file) }
        >{ outputTitle() }</Item>
    )
};

export default FolderItem;