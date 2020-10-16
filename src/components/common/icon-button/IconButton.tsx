// React
import React from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

// Styles
import './IconButton.scss';

/**
 * @function IconButton
 * @summary Icon Button Component
 * @description A button that contains just an icon.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const IconButton: React.FunctionComponent = () => {
    return (
        <button className="common-iconbutton">
            <FontAwesomeIcon icon={ faSmile } />
        </button>
    );
};

export default IconButton;