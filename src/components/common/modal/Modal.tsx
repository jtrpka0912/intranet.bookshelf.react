// React
import React, { useState } from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

// Components
import Button from '../button/Button';

// Styles
import './Modal.scss';

/**
 * @interface ModalProps
 * @description The acceptable props for the Modal component
 * @author J.T.
 * @property { React.ReactNode } children
 */
interface ModalProps {
    children: React.ReactNode,
    title?: string
}

/**
 * @function Modal
 * @summary Modal Skeleton Component
 * @description This is the base component for a modal
 * @author J.T.
 * @param { ModalProps } props 
 * @returns { JSX }
 */
const Modal: React.FunctionComponent<ModalProps> = (props) => {
    const [isOpened, toggleModal] = useState(true);
    return (
        <div className={ `shelves-modal-overlay ${isOpened ? 'opened' : 'closed'}` }>
            <div className="shelves-modal-container">
                <header className="shelves-modal-header">
                    <h2 className="shelves-modal-header-title">
                        { props.title ? props.title : 'Modal Title Here' }
                    </h2>
                    <FontAwesomeIcon icon={ faWindowClose } 
                        className="shelves-modal-header-close"
                        onClick={ () => toggleModal(!isOpened) }
                    />
                </header>
                
                <div className="shelves-modal-body">
                    { props.children }
                </div>

                <div className="shelves-modal-footer">
                    <Button>Button Here</Button>
                </div>
            </div>
        </div>
    )
};

export default Modal;