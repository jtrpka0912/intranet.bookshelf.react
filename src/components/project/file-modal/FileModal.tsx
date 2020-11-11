// React
import React, { useContext } from 'react';

// Context
import { AppContext } from '../../contexts/AppContext';
import { ShelfContext } from '../../contexts/ShelfContext';

// API
import { updateFileDidRead } from '../../../api/ebooksApi';
import { expectError } from '../../../api/api';

// Components
import Modal from '../../common/modal/Modal';
import Button from '../../common/button/Button';
import Media from '../../common/media/Media';

/**
 * @interface FileModalProps
 * @summary File Modal Props
 * @description The props for the File Modal component
 * @author J.T.
 * @property { boolean } open - Is the modal open
 * @property { function } onClickToggle - Toggle the modal open or close
 */
interface FileModalProps {
    open: boolean,
    onClickToggle: (isOpened: boolean) => void
}

/**
 * @function FileModal
 * @summary File Modal Component
 * @description A modal to show the details, and actions for a file item.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const FileModal: React.FunctionComponent<FileModalProps> = (props) => {
    // Context
    const { toggleToastMessage } = useContext(AppContext);
    const { files, activeFile, setToActiveFile } = useContext(ShelfContext);

    /**
     * @function onCloseFileModal
     * @description Close the file modal by unset the active file.
     * @author J.T.
     */
    const onCloseFileModal = () => {
        setToActiveFile(null);
        props.onClickToggle(false);
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
     * @async
     * @function toggleDidRead
     * @description Change the flag if the file has been read
     * @author J.T.
     * @param { boolean } didRead 
     */
    const toggleDidRead = async (didRead: boolean) => {
        console.info('Did Read?', didRead);

        try {
            if(activeFile) {
                const toggledFileResponse = await updateFileDidRead(activeFile, didRead);

                expectError(toggledFileResponse, 'Unable to change did read status');
    
                const toggledFileResponseJson = await toggledFileResponse.json();

                // Update the active file
                setToActiveFile(toggledFileResponseJson);

                // Find the index of the file where it resides in the array of files
                const foundFileIndex = files.findIndex((fileItem) => fileItem._id === toggledFileResponseJson._id);

                // Update the found file in the array.
                files[foundFileIndex] = toggledFileResponseJson;
            } else {
                throw new Error('There is no active file set');
            }
        } catch(error) {
            console.error('ShelfForm - onSubmitForm(): ', error);
            toggleToastMessage(error.message);
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
            <Modal open={ props.open }
                baseClass="shelf-filemodal"
                footer={ renderFooter() }
                title={ activeFile.name }
                size="large"
                slide
                onClose={ () => onCloseFileModal() }
            >
                <div className="shelf-filemodal__content">
                    <div className="shelf-filemodal__cover">
                        <Media src={ `http://localhost:3001/${activeFile.cover}` } width="300" alt="Placeholder" title={ activeFile.name } />
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
                                checked={ activeFile.didRead } 
                                onChange={ () => toggleDidRead(!activeFile.didRead) }
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