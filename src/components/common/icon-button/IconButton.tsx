// React
import React from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faSmile } from '@fortawesome/free-solid-svg-icons';

// Styles
import './IconButton.scss';

/**
 * @interface IconButtonProps
 * @description The acceptable props for the Icon Button component
 * @author J.T.
 * @property { IconButtonProps } icon
 * @property { any } onClick // TODO: type: any
 */
interface IconButtonProps {
    icon: IconDefinition,
    onClick: any
};

/**
 * @function IconButton
 * @summary Icon Button Component
 * @description A button that contains just an icon.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const IconButton: React.FunctionComponent<IconButtonProps> = (props) => {
    return (
        <button className="common-iconbutton" onClick={ props.onClick }>
            <FontAwesomeIcon icon={ props.icon ? props.icon : faSmile } />
        </button>
    );
};

export default IconButton;