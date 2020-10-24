// React
import React from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faSmile } from '@fortawesome/free-solid-svg-icons';

/**
 * @interface IconButtonProps
 * @description The acceptable props for the Icon Button component
 * @author J.T.
 * @property { IconButtonProps } icon
 * @property { string } title
 * @property { boolean } active
 * @property { string } size
 * @property { function } onClick
 */
interface IconButtonProps {
    icon: IconDefinition,
    title?: string,
    active?: boolean,
    size?: 'small' | 'medium' | 'large',
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
};

/**
 * @function IconButton
 * @summary Icon Button Component
 * @description A button that contains just an icon.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const IconButton: React.FunctionComponent<IconButtonProps> = (props) => {
    
    /**
     * @function iconButtonClasses
     * @description Modifier classes for the icon button wrapper
     * @author J.T.
     * @returns { string }
     */
    const iconButtonClasses = () => {
        const baseClass = 'common-iconbutton';
        let classArray = [baseClass];

        classArray.push(`${baseClass}--${props.size}`);
        if(props.active) classArray.push(`${baseClass}--active`);

        return classArray.join(' ');
    }

    return (
        <button className={ iconButtonClasses() } 
            title={ props.title } 
            onClick={ props.onClick }
        >
            <FontAwesomeIcon icon={ props.icon } />
        </button>
    );
};

IconButton.defaultProps = {
    icon: faSmile,
    active: false,
    size: 'medium'
};

export default IconButton;