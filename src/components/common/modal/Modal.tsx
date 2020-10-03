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
    fade?: boolean
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

    // TODO: props set as any
    const overlayClasses = (props: any): string => {
        let classArray: string[] = ['common-modal-overlay'];

        classArray.push(isOpened ? 'opened' : 'closed');
        
        if(props.fade) classArray.push('fade');

        return classArray.join(' ');
    }

    return (
        <div className={ overlayClasses(props) }
            onClick={ () => toggleModal(!isOpened) }
        >
            <div className="common-modal-container" 
                onClick={ (e) => e.stopPropagation() }
            >
                <header className="common-modal-header">
                    <h2 className="common-modal-header-title">
                        { props.title ? props.title : 'Modal Title Here' }
                    </h2>
                    <FontAwesomeIcon icon={ faWindowClose } 
                        className="common-modal-header-close"
                        onClick={ () => toggleModal(!isOpened) }
                    />
                </header>
                
                <div className="common-modal-body">
                    { props.children }
                </div>

                <div className="common-modal-footer">
                    <Button>Button Here</Button>
                </div>
            </div>
        </div>
    )
};

export default Modal;