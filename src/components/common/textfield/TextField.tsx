// React
import React from 'react';

// Styles
import './TextField.scss';

/**
 * @interface TextFieldProps
 * @description The acceptable props for the text field component.
 * @author J.T.
 * @property { string } type
 * @property { string } name
 * @property { string } placeholder
 * @property { boolean } required
 * @property { boolean } readOnly
 * @property { boolean } disabled
 * @property { string } value
 */
interface TextFieldProps {
    type?: string,
    name?: string,
    placeholder?: string,
    required?: boolean,
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
        <label className="common-textfield">
            <input className="common-textfield__input" 
                type={ props.type } 
                name={ props.name }
                placeholder={ props.placeholder }
                required={ props.required }
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