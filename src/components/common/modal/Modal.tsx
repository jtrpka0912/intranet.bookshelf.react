// React
import React, { useEffect, useState } from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

/**
 * @interface ModalProps
 * @description The acceptable props for the Modal component
 * @author J.T.
 * @property { React.ReactNode } children
 * @property { string } baseClass - The base class for the body element
 * @property { React.ReactNode } footer - Footer content
 * @property { boolean } opened - Is the modal open
 * @property { string } title - Title of the modal
 * @property { boolean } fade - Fade Animation
 * @property { boolean } slide - Slide Animation
 * @property { string } size - Small, Medium, or Large
 * @property { function } onClose - Additional Closing Function
 */
interface ModalProps {
    children: React.ReactNode,
    baseClass?: string,
    footer?: React.ReactNode,
    open: boolean,
    title?: string
    fade?: boolean
    slide?: boolean
    size?: 'small' | 'medium' | 'large',
    onClose?: () => void
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
    const [isModalOpened, toggleModal] = useState(false);
    const [isAnimating, animateModal] = useState(false);

    useEffect(() => {
        // Switch the modal open or close
        // TODO: Get this to animate.
         toggleModal(props.open);
    }, [props.open]);

    /**
     * @function overlayClasses
     * @summary Overlay Element Classes
     * @description The classes to output for the overlay element from props.
     * @author J.T.
     * @param { ModalProps } props 
     * @returns string
     */
    const overlayClasses = (props: ModalProps): string => {
        const baseSelector: string = 'common-modal__overlay';
        let classArray: string[] = [baseSelector];

        // Is the modal animating (going to open or close)
        if(isAnimating) {
            classArray.push(isModalOpened ? `${baseSelector}--is-closing` : `${baseSelector}--is-opening`);
        }

        // Is the modal opened or closed
        classArray.push(isModalOpened ? `${baseSelector}--opened` : `${baseSelector}--closed`);

        // Need to check if fade and slide are not disabled
        const fade = props.fade;
        const slide = props.slide;

        if(!fade && !slide) classArray.push(`${baseSelector}--no-effects`);
        if(fade) classArray.push(`${baseSelector}--fade`);
        if(slide) classArray.push(`${baseSelector}--slide`);

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
        const baseSelector: string = 'common-modal__container';
        let classArray: string[] = [baseSelector];

        // If no size defined then assign it medium
        if(!props.size) {
            classArray.push(`${baseSelector}--medium`);
        } else {
            classArray.push(`${baseSelector}--${props.size}`);
        }

        return classArray.join(' ');
    }

    /**
     * @function onClickClosingModal
     * @event onClick
     * @description Close the modal.
     * @note Lot of the magic happen in the overlayClasses function
     * @author J.T.
     */
    const onClickClosingModal = () => {
        closeAnimation();
        if(props.onClose) props.onClose(); // Allow other modal types to do any closing actions
    }

    /**
     * @function closeAnimation
     * @description Set up the closing animation for the modal
     * @author J.T.
     */
    const closeAnimation = () => {
        const animationTime: number = 900; // Little less than one second

        // Lets close or open the modal with two steps
        animateModal(true); // Mark the animation as started
        
        // Check if the modal is open
        if(isModalOpened) {
            // Wait for animation time to end then change modal status
            setTimeout(() => {
                animateModal(false); // No longer animating
                toggleModal(false); // Modal is finally closed
            }, animationTime);
        }
    }

    return (
        <div className={ overlayClasses(props) }
            onClick={ () => onClickClosingModal() }
        >
            <div className={ containerClasses(props) } 
                onClick={ (e) => e.stopPropagation() }
            >
                <header className="common-modal__header">
                    <h2 className="common-modal__header__title">
                        { props.title ? props.title : 'Modal Title Here' }
                    </h2>
                    <FontAwesomeIcon icon={ faWindowClose } 
                        className="common-modal__header__close"
                        onClick={ () => onClickClosingModal() }
                    />
                </header>
                
                <div className={ `common-modal__body ${ props.baseClass }` }>
                    { props.children }
                </div>

                <footer className="common-modal__footer">
                    { props.footer ? props.footer : null }
                </footer>
            </div>
        </div>
    )
};

export default Modal;