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
    const [isAnimating, animateModal] = useState(false);

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

        // Is the modal animating (going to open or close)
        if(isAnimating) {
            classArray.push(isOpened ? 'is-closing' : 'is-opening');
        }

        // Is the modal opened or closed
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

    /**
     * @function onClickAnimateModal
     * @event onClick
     * @description Animate the container and then toggle the overlay of the modal
     * @note Lot of the magic happen in the overlayClasses function
     * @author J.T.
     */
    const onClickAnimateModal = () => {
        const animationTime: number = 900; // Little less than one second

        // Lets close or open the modal with two steps
        animateModal(true); // Mark the animation as started
        
        if(isOpened) { // Close the modal
            // Wait for animation time to end then change modal status
            setTimeout(() => {
                animateModal(false); // No longer animating
                toggleModal(false); // Modal is finally closed
            }, animationTime);
        } else { // Open the modal
            toggleModal(true); // Open it immeditately
            animateModal(false); // Mark it done animating
        }
    }

    return (
        <div className={ overlayClasses(props) }
            onClick={ () => onClickAnimateModal() }
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
                        onClick={ () => onClickAnimateModal() }
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