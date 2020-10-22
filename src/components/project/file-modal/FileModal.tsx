// React
import React, { useContext, useEffect, useState } from 'react';

// Context
import { ShelfContext } from '../../../contexts/ShelfContext';

// Components
import Modal from '../../common/modal/Modal';
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
    const [isFileModalOpen, toggleFileModal] = useState(false);
    
    useEffect(() => {
        if(activeFile) {
            toggleFileModal(true);
        } else {
            toggleFileModal(false);
        }
    }, [activeFile]);

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
            <Modal open={ isFileModalOpen }
                footer={ renderFooter() }
                title={ activeFile.name }
                size="large"
                slide={true} 
                onClose={ () => onCloseFileModal() }
            >
                <div className="shelf-filemodal__content">
                    <div className="shelf-filemodal__cover">
                        { /* TODO: Make a responsive media component (images, videos, iframes, etc...) */ }
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