// React
import React, { CSSProperties } from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, IconDefinition } from '@fortawesome/free-solid-svg-icons';

/**
 * @interface ItemProps
 * @summary Item Props
 * @description The acceptable props for the Item component
 * @author J.T.
 * @property { React.ReactNode } children
 * @property { string } className
 * @property { string } display
 * @property { IconDefinition } icon
 * @property { string } image
 * @property { function } onClick
 */
 interface ItemProps {
    children: React.ReactNode,
    className: string,
    display: 'tile' | 'list' | 'breadcrumb',
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

    /**
     * @function wrapperClasses
     * @description Output the wrapper class selectors for the item component
     * @author J.T.
     * @returns { string }
     */
    const wrapperClasses = () => {
        // Set the base selector
        const baseSelector = 'common-item';
        let classArray = [baseSelector];

        // Set the display class selector
        classArray.push(`${baseSelector}--${props.display}`);

        // Then, if any, child class selectors
        if(props.className) classArray.push(props.className);

        return classArray.join(' ');
    }

    const displayView = () => {
        switch(props.display) {
            case 'tile':
                if(props.image) return renderImage(props.image);
                else if(props.icon) return renderIcon(props.icon);
                else return renderIcon(faSmile);
            case 'list':
                if(props.icon) return renderIcon(props.icon);
                else return renderIcon(faSmile);
        }
    }

    return (
        <div className={ wrapperClasses() } onClick={ props.onClick }>
            
            { displayView() }

            <h3 className="common-item__name">{ props.children }</h3>
        </div>
    );
 };

 export default Item;