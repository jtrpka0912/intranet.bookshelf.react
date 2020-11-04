// React
import React from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

/**
 * @interface ItemProps
 * @summary Item Props
 * @description The acceptable props for the Item component
 * @author J.T.
 * @property { React.ReactNode } children
 * @property { string } baseClass
 * @property { IconDefinition } icon
 * @property { string } image
 * @property { function } onClick
 */
 interface ItemProps {
    children: React.ReactNode,
    className: string,
    icon?: IconDefinition,
    image?: string,
    onClick: () => void
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

    /**
     * @function renderIcon
     * @summary Render the icon
     * @author J.T.
     * @param { IconDefinition } icon 
     * @returns { React.ReactNode }
     */
    const renderIcon = (icon: IconDefinition) => {
        return (
            <div className="common-item__icon">
                <FontAwesomeIcon icon={ icon } />
            </div>
        );
    }

    /**
     * @function renderVisual
     * @description Either render an image or an icon (either given or a default)
     * @author J.T.
     * @returns { React.ReactNode }
     */
    const renderVisual = () => {
        if(props.image) {
            return null;
        } else if(props.icon) {
            return renderIcon(props.icon);
        } else {
            // Render a default icon if all else fails
            return renderIcon(faSmile);
        }
    }

    return (
        <div className={ `common-item ${props.className}` } onClick={ props.onClick }>
            
            { renderVisual() }

            <h3 className="common-item__name">{ props.children }</h3>
        </div>
    );
 };

 export default Item;