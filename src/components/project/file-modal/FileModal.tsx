// React
import React from 'react';

// Types
import FileType from '../../../types/File';

// Components
import Modal, { Size } from '../../common/modal/Modal';

const FileModal: React.FunctionComponent = () => {
    return (
        <Modal opened={ true } size={ Size.Large } slide={true}>
            <p>Hello World</p>
        </Modal>
    );
};

export default FileModal;