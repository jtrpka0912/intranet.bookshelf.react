// React
import React, { useContext } from 'react';

// Context
import { ShelfContext } from '../../contexts/ShelfContext';

// Components
import Button from '../../common/button/Button';
import Modal from '../../common/modal/Modal';
import ShelfForm from '../../project/shelf-form/ShelfForm';

/**
 * @interface ShelfModalProps
 * @summary Shelf Modal Props
 * @description The props for the Shelf Modal components
 * @author J.T.
 * @property { boolean } open - Is the modal open
 * @property { function } onClickToggle - Toggle the modal open or close
 */
interface ShelfModalProps {
    open: boolean,
    onClickToggle: (state: boolean) => void
}

/**
 * @function ShelfModal
 * @summary Shelf Modal Component
 * @description A modal to update or refresh the active shelf.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const ShelfModal: React.FunctionComponent<ShelfModalProps> = (props) => {
    const { activeShelf, setToActiveShelf } = useContext(ShelfContext);

    /**
     * @function renderModalFooter
     * @description Render the modal footer
     * @author J.T.
     * @returns { React.ReactNode }
     */
    const renderModalFooter = () => {
        /**
         * @async
         * @function onClickRefreshShelf
         * @description Refresh the shelf to (de)populate items.
         * @author J.T.
         */
        const onClickRefreshShelf = async () => {
            if(activeShelf) {
                await fetch(`http://localhost:3001/api/v1/shelves/${ activeShelf._id }/refresh`);
                setToActiveShelf(activeShelf);
                // FIXME: Get it to animate the shelf modal
                props.onClickToggle(!props.open);
            }
        };

        return (
            <React.Fragment>
                <Button onClick={ () => onClickRefreshShelf() }>Refresh Shelf</Button>
            </React.Fragment>
        );
    }

    // TODO: Close the modal after form submission
    if(activeShelf) {
        return (
            <Modal open={ props.open }
                title={ `Edit ${ activeShelf.name }` }
                footer={ renderModalFooter() }
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
};

export default ShelfModal;