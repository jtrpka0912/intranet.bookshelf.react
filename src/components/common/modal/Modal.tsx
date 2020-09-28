// React
import React from 'react';

// Styles
import './Modal.scss';

/**
 * @interface ModalProps
 * @description The acceptable props for the Modal component
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @property { React.ReactNode } children
 */
interface ModalProps {
    children: React.ReactNode
}

/**
 * @function Modal
 * @summary Modal Skeleton Component
 * @description This is the base component for a modal
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @param { ModalProps } props 
 * @returns { JSX }
 */
const Modal: React.FunctionComponent<ModalProps> = (props) => {
    return (
        <div className="shelves-modal-overlay hidden">
            <div className="shelves-modal-body">
                { props.children }
            </div>
        </div>
    )
};

export default Modal;