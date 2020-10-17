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
 * @property { string } baseClass
 * @property { IconDefinition } icon
 * @property { any } onClick
 */
 interface ItemProps {
    children: React.ReactNode,
    className: string,
    icon: IconDefinition,
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
    return (
        <div className={ `common-item ${props.className}` }>
            <div className="common-item__icon" onClick={ props.onClick }>
                <FontAwesomeIcon icon={ props.icon } />
            </div>

            <h3 className="common-item__name">{ props.children }</h3>
        </div>
    );
 };

 export default Item;