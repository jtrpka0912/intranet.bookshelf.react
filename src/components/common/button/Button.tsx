// React
import React from 'react';

// Style
import './Button.scss';

/**
 * @interface ButtonProps
 * @description The acceptable props for the Button component
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @property { React.ReactNode } children
 * @property { any } type // TODO: type: any
 * @property { boolean } boolean
 * @property { boolean } boolean
 * @property { any } onClick // TODO: type:any
 */
interface ButtonProps {
    children: React.ReactNode,
    type: any,
    block?: boolean,
    rounded?: boolean,
    onClick?: any
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    /**
     * @function printClasses
     * @summary Print button classes
     * @description Print out the button classes depending on attributes
     * @author J. Trpka <jtrpka0912@gmail.com>
     * @param { any } type 
     * @param { boolean } block 
     * @param { boolean } rounded
     * @returns { string }
     */
    const printClasses = (props: ButtonProps) => {
        let classArray = ['btn'];

        if(props.block) classArray.push('btn-block');
        if(props.rounded) classArray.push('btn-rounded');

        // Return as a string
        return classArray.join(' ');
    }

    return (
        <button onClick={ props.onClick } type={ props.type } className={ printClasses(props) }>{ props.children }</button>
    )
};

export default Button;