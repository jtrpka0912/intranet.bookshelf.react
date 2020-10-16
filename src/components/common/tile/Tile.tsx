// React
import React from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

// Styles
import './Tile.scss';

/**
 * @interface TileProps
 * @summary Tile Props
 * @description The acceptable props for the Tile component
 * @author J.T.
 * @property { React.ReactNode } children
 * @property { IconDefinition } icon
 * @property { string } baseClass
 * @property { any } onClick
 */
 interface TileProps {
    children: React.ReactNode,
    icon: IconDefinition,
    baseClass: string,
    onClick: any // TODO: Figure out what should be onClick
 };

 /**
  * @function Tile
  * @summary Common Tile Component
  * @description A common tile component with a (font awesome) icon.
  * @author: J.T.
  * @param { TileProps } props 
  * @returns { React.ReactNode }
  */
 const Tile: React.FunctionComponent<TileProps> = (props) => {
    return (
        <div className={ `common-tile-wrapper ${props.baseClass}` }>
            <div className="common-tile-icon" onClick={ props.onClick }>
                <FontAwesomeIcon icon={ props.icon } />
            </div>

            <h3 className="common-tile-name">{ props.children }</h3>
        </div>
    )
 };

 export default Tile;