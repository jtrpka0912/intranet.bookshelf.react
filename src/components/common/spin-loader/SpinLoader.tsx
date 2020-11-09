// React
import React from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

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
    return (
        <div className="common-spinloader">
            <FontAwesomeIcon icon={ props.icon } />
        </div>
    )
};

SpinLoader.defaultProps = {
    icon: faSmile
}

export default SpinLoader;