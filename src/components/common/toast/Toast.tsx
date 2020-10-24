// React
import React, { useContext } from 'react';

// Contexts 
import { AppContext } from '../../../contexts/AppContext';

/**
 * @function Toast
 * @summary Toast Component
 * @description A toast message popup to alert messages to the user.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const Toast: React.FunctionComponent = () => {
    const { toastMessage, isToastOpen } = useContext(AppContext);

    return (
        <div className={ `common-toast ${ isToastOpen ? 'common-toast--opened' : 'common-toast--closed' }` }>
            <div className="common-toast__content">
                { toastMessage }
            </div>
        </div>
    );
};

export default Toast;