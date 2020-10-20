// React
import React, { useContext, useState } from 'react';

// Context
import { ShelfContext } from '../../../contexts/ShelfContext';

// Components
import Modal, { Size } from '../../common/modal/Modal';
import Button from '../../common/button/Button';

// Styles
import './FileModal.scss';

/**
 * @function FileModal
 * @summary File Modal Component
 * @description A modal to show the details, and actions for a file item.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const FileModal: React.FunctionComponent = () => {
    // Context
    const { activeFile, setToActiveFile } = useContext(ShelfContext);

    // State
    const [didRead, toggleDidRead] = useState(activeFile?.didRead);
    
    // If there is an active file; open the modal.
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

    /**
     * @function renderFooter
     * @description Render the footer for the base modal
     * @author J.T.
     * @returns { React.ReactNode }
     */
    const renderFooter = () => {
        return (
            <>
                <Button>Download</Button>
                <Button>Read</Button>
            </>
        )
    }

    if(activeFile) {
        return (
            <Modal open={ isModalOpen }
                footer={ renderFooter() }
                title={ activeFile.name }
                size={ Size.Large } 
                slide={true} 
                onClose={ () => onCloseFileModal() }
            >
                <div className="shelf-filemodal__content">
                    <div className="shelf-filemodal__cover">
                        <img src="https://via.placeholder.com/595x842" alt="Placeholder" title={ activeFile.name } />
                    </div>

                    <div className="shelf-filemodal__details">
                        <p className="shelf-filemodal__details__name">
                            <strong>Name:</strong> { activeFile.name }
                        </p>

                        <p className="shelf-filemodal__details__type">
                            <strong>Type:</strong> { activeFile.type }
                        </p>

                        <label>
                            <input type="checkbox"
                                checked={ didRead } 
                                onChange={ () => toggleDidRead(!didRead) }
                            /> Did Read?
                        </label>
                    </div>
                </div>
            </Modal>
        );
    } else {
        return null;
    }
};

export default FileModal;