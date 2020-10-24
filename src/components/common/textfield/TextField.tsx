// React
import React from 'react';

/**
 * @interface TextFieldProps
 * @description The acceptable props for the text field component.
 * @author J.T.
 * @property { string } title
 * @property { string } type
 * @property { string } name
 * @property { string } placeholder
 * @property { boolean } required
 * @property { number } maxLength
 * @property { string } min
 * @property { string } max
 * @property { boolean } readOnly
 * @property { boolean } disabled
 * @property { string } value
 * @property { function } onChange
 */
interface TextFieldProps {
    title?: string,
    type?: 'text' | 'number' | 'tel' | 'email' | 'search' | 'url',
    name?: string,
    placeholder?: string,
    required?: boolean,
    maxLength?: number,
    min?: string,
    max?: string,
    readOnly?: boolean,
    disabled?: boolean,
    value?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
};

/**
 * @function TextField
 * @summary Text Field Component
 * @description A text field component.
 * @author J.T.
 * @param { TextFieldProps } props
 * @returns { React.ReactNode }
 */
const TextField: React.FunctionComponent<TextFieldProps> = (props) => {
    return (
        <label className="common-textfield" title={ props.title }>
            <input className="common-textfield__input" 
                type={ props.type } 
                name={ props.name }
                placeholder={ props.placeholder }
                required={ props.required }
                maxLength={ props.maxLength }
                min={ props.min }
                max= { props.max }
                readOnly={ props.readOnly }
                disabled={ props.disabled }
                value={ props.value }
                onChange={ props.onChange }
            />
        </label>
    );
};

TextField.defaultProps = {
    type: 'text'
};

export default TextField;