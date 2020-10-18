// React
import React from 'react';

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
    return (
        <Modal open={ false } 
            size={ Size.Large } 
            slide={true} 
            onClose={ () => console.log('To close') }
        >
            Hello World
        </Modal>
    );
};

export default FileModal;