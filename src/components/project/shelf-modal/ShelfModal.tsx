// React
import React, { useContext } from 'react';

// Context
import { ShelfContext } from '../../contexts/ShelfContext';

// Components
import Modal from '../../common/modal/Modal';
import ShelfForm from '../../project/shelf-form/ShelfForm';

/**
 * @function ShelfModal
 * @summary Shelf Modal Component
 * @description A modal to update or refresh the active shelf.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const ShelfModal: React.FunctionComponent = () => {
    const { activeShelf } = useContext(ShelfContext);

    // TODO: Close the modal after form submission

    if(activeShelf) {
        return (
            <Modal open={ true }
                title={ `Edit ${ activeShelf.name }` }
                size="small"
                fade
                onClose={ () => console.log('Goodbye form') }
            >
                <ShelfForm shelf={ activeShelf } buttonLabel="Edit Shelf" />
            </Modal>
        );
    } else {
        return null;
    }
}

export default ShelfModal;