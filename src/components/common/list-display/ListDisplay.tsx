// React
import React, { useContext } from 'react';

// Context
import { AppContext } from '../../../contexts/AppContext';

// Components
import IconButton from '../../common/icon-button/IconButton';

// Font Awesome
import { faGripHorizontal, faList, faBreadSlice } from '@fortawesome/free-solid-svg-icons';

// Styles
import './ListDisplay.scss';

/**
 * @function ListDisplay
 * @summary List Display Component
 * @description A component to toggle the appearance of a collection of items.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const ListDisplay: React.FunctionComponent = () => {
    return (
        <div className="common-listdisplay">
            <div className="common-listdisplay-buttons">
                <IconButton title="Tile View" icon={ faGripHorizontal } onClick={ () => console.log('Clicked Grid') } />
                <IconButton title="List View" icon={ faList } onClick={ () => console.log('Clicked List') } />
                <IconButton title="Breadcrumbs View" icon={ faBreadSlice } onClick={ () => console.log('Clicked Breadcrumbs') } />
            </div>
        </div>
    );
};

export default ListDisplay;