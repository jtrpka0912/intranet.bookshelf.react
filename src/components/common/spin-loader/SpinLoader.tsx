// React
import React, { useContext } from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../contexts/AppContext';

/**
 * @interface SpinLoaderProps
 * @description The props for the Spin Loader component
 * @author J.T.
 * @property { IconDefinition } icon
 */
interface SpinLoaderProps {
    icon?: IconDefinition
}

/**
 * @function SpinLoader
 * @summary Spin Loader Component
 * @description An overlay component that indicates something is processing for a duration of time.
 * @author J.T.
 * @param { SpinLoaderProps } props 
 * @returns { React.ReactNode }
 */
const SpinLoader: React.FunctionComponent<SpinLoaderProps> = (props) => {
    const { isSpinLoader } = useContext(AppContext);
    
    return (
        <div className={ `common-spinloader ${ isSpinLoader ? 'common-spinloader--open' : 'common-spinloader--close' }` }>
            <FontAwesomeIcon className="common-spinloader__icon" icon={ props.icon ? props.icon : faSmile } />
        </div>
    )
};

export default SpinLoader;