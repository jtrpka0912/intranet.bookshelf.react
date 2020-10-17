// React
import React from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

// Styles
import './Item.scss';

/**
 * @interface ItemProps
 * @summary Item Props
 * @description The acceptable props for the Item component
 * @author J.T.
 * @property { React.ReactNode } children
 * @property { IconDefinition } icon
 * @property { string } baseClass
 * @property { any } onClick
 */
 interface ItemProps {
    children: React.ReactNode,
    icon: IconDefinition,
    baseClass: string,
    onClick: any // TODO: Figure out what should be onClick
 };

 /**
  * @function Item
  * @summary Common Item Component
  * @description A common item component.
  * @author: J.T.
  * @param { ItemProps } props 
  * @returns { React.ReactNode }
  */
 const Item: React.FunctionComponent<ItemProps> = (props) => {
    // TODO: Should this be refactored to show as a list item?
    return (
        <div className={ `common-item ${props.baseClass}` }>
            <div className="common-item--icon" onClick={ props.onClick }>
                <FontAwesomeIcon icon={ props.icon } />
            </div>

            <h3 className="common-item--name">{ props.children }</h3>
        </div>
    );
 };

 export default Item;