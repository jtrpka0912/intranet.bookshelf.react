// React
import React, { CSSProperties } from 'react';

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

    const renderImage = (image: string) => {
        const styles: CSSProperties = {
            // Need the encodeURI to encode spaces
            backgroundImage: `url(${ encodeURI(image) })` as string
        };

        return (
            <div className="common-item__visual common-item__visual--image" style={ styles } />
        )
    };

    /**
     * @function renderIcon
     * @summary Render the icon
     * @author J.T.
     * @param { IconDefinition } icon 
     * @returns { React.ReactNode }
     */
    const renderIcon = (icon: IconDefinition) => {
        return (
            <div className="common-item__visual common-item__visual--icon">
                <FontAwesomeIcon icon={ icon } />
            </div>
        );
    };

    console.info('Props', props);

    return (
        <div className={ `common-item ${props.className}` } onClick={ props.onClick }>
            
            { props.image ? renderImage(props.image) : null }

            { props.icon ? renderIcon(props.icon) : renderIcon(faSmile) }

            <h3 className="common-item__name">{ props.children }</h3>
        </div>
    );
 };

 export default Item;