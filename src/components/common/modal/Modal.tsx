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
 * @exports
 * @enum Size
 * @description: The defined sizes for the modal;
 * @author J.T.
 * @property { string } Small
 * @property { string } Medium
 * @property { string } Large
 */
export enum Size {
    Small = 'small',
    Medium = 'medium',
    Large = 'large'
};

/**
 * @interface ModalProps
 * @description The acceptable props for the Modal component
 * @author J.T.
 * @property { React.ReactNode } children
 * @property { string } title
 * @property { boolean } fade
 * @property { boolean } slide
 * @property { Size } size
 */
interface ModalProps {
    children: React.ReactNode,
    title?: string
    fade?: boolean
    slide?: boolean
    size?: Size
}

/**
 * @function Modal
 * @summary Modal Skeleton Component
 * @description This is the base component for a modal
 * @author J.T.
 * @param { ModalProps } props 
 * @returns { React.ReactNode }
 */
const Modal: React.FunctionComponent<ModalProps> = (props) => {
    const [isOpened, toggleModal] = useState(false);

    /**
     * @function overlayClasses
     * @summary Overlay Element Classes
     * @description The classes to output for the overlay element from props.
     * @author J.T.
     * @param { ModalProps } props 
     * @returns string
     */
    const overlayClasses = (props: ModalProps): string => {
        let classArray: string[] = ['common-modal-overlay'];

        classArray.push(isOpened ? 'opened' : 'closed');

        // Need to check if fade and slide are not disabled
        const fade = props.fade;
        const slide = props.slide;

        if(!fade && !slide) classArray.push('no-effects');
        if(fade) classArray.push('fade');
        if(slide) classArray.push('slide');

        return classArray.join(' ');
    }

    /**
     * @function containerClasses
     * @summary Container Element Classes
     * @description The classes to output for the container element from props.
     * @author J.T.
     * @param { ModalProps } props 
     * @returns string
     */
    const containerClasses = (props: ModalProps): string => {
        let classArray: string[] = ['common-modal-container'];

        // If no size defined then assign it medium
        if(!props.size) {
            classArray.push(Size.Medium);
        } else {
            classArray.push(props.size);
        }

        return classArray.join(' ');
    }

    return (
        <div className={ overlayClasses(props) }
            onClick={ () => toggleModal(!isOpened) }
        >
            <div className={ containerClasses(props) } 
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