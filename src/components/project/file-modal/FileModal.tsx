// React
import React, { useContext } from 'react';

// Context
import { ShelfContext } from '../../../contexts/ShelfContext';

// Components
import Modal, { Size } from '../../common/modal/Modal';

/**
 * @function FileModal
 * @summary File Modal Component
 * @description A modal to show the details, and actions for a file item.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const FileModal: React.FunctionComponent = () => {
    const { activeFile, setToActiveFile } = useContext(ShelfContext);
    let isModalOpen = false;

    if(activeFile) {
        isModalOpen = true;
    } else {
        isModalOpen = false;
    }

    /**
     * @function onCloseFileModal
     * @description Close the file modal by unset the active file.
     */
    const onCloseFileModal = () => {
        setToActiveFile(null);
    }

    return (
        <Modal open={ isModalOpen } 
            size={ Size.Large } 
            slide={true} 
            onClose={ () => onCloseFileModal() }
        >
            Hello World
        </Modal>
    );
};

export default FileModal;