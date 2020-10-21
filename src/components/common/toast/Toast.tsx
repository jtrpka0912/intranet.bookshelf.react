// React
import React from 'react';

// Styles
import './Toast.scss';

/**
 * @function Toast
 * @summary Toast Component
 * @description A toast message popup to alert messages to the user.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const Toast: React.FunctionComponent = () => {
    return (
        <div className="common-toast">
            <div className="common-toast__content">
                Hello World
            </div>
        </div>
    );
};

export default Toast;