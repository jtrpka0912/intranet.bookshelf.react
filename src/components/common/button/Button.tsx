// React
import React from 'react';

/**
 * @interface ButtonProps
 * @description The acceptable props for the Button component
 * @author J.T.
 * @property { React.ReactNode } children
 * @property { string } type
 * @property { string } color
 * @property { boolean } boolean
 * @property { boolean } boolean
 * @property { function } onClick
 */
interface ButtonProps {
    children: React.ReactNode,
    type?: 'button' | 'reset' | 'submit',
    color?: 'primary' | 'secondary' | 'ternary' | 'dark' | 'light',
    block?: boolean,
    rounded?: boolean,
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

/**
 * @function Button
 * @summary Button Component
 * @description A button component for the site.
 * @author J.T.
 * @param { ButtonProps } props 
 * @returns { React.ReactNode }
 */
const Button: React.FunctionComponent<ButtonProps> = (props) => {

    /**
     * @function printClasses
     * @summary Print button classes
     * @description Print out the button classes depending on attributes
     * @author J.T.
     * @param { any } type 
     * @param { boolean } block 
     * @param { boolean } rounded
     * @returns { string }
     */
    const printClasses = (props: ButtonProps) => {
        let classArray = ['common-button'];

        if(props.block) classArray.push('common-button--block');
        if(props.rounded) classArray.push('common-button--rounded');
        if(props.color) classArray.push(`common-button--${props.color}`);

        // Return as a string
        return classArray.join(' ');
    }

    return (
        <button type={ props.type ? props.type : 'button' }
            onClick={ props.onClick } 
            className={ printClasses(props) }
        >{ props.children }</button>
    )
};

Button.defaultProps = {
    type: 'button',
    color: 'primary'
};

export default Button;