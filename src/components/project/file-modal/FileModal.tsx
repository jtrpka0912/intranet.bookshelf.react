// React
import React, { useContext, useEffect, useState } from 'react';

// Context
import { ShelfContext } from '../../contexts/ShelfContext';

// Components
import Modal from '../../common/modal/Modal';
import Button from '../../common/button/Button';
import Media from '../../common/media/Media';

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
     * @author J.T.
     */
    const onCloseFileModal = () => {
        setToActiveFile(null);
    }

    /**
     * @function onClickDownloadFile
     * @event onClick
     * @description Download the active file
     * @author J.T
     */
    const onClickDownloadFile = async () => {
        if(activeFile) {
            window.open(activeFile.path, 'Download');
        }
    }

    /**
     * @function renderFooter
     * @description Render the footer for the base modal
     * @author J.T.
     * @returns { React.ReactNode }
     */
    const renderFooter = () => {
        return (
            <React.Fragment>
                <Button onClick={ () => onClickDownloadFile() }>Download</Button>
            </React.Fragment>
        )
    }

    if(activeFile) {
        return (
            <Modal open={ isFileModalOpen }
                baseClass="shelf-filemodal"
                footer={ renderFooter() }
                title={ activeFile.name }
                size="large"
                slide
                onClose={ () => onCloseFileModal() }
            >
                <div className="shelf-filemodal__content">
                    <div className="shelf-filemodal__cover">
                        <Media src="https://via.placeholder.com/595x842" width="300" alt="Placeholder" title={ activeFile.name } />
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