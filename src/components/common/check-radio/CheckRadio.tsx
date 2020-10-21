// React
import React from 'react';

// Styles
import './CheckRadio.scss';

/**
 * @interface CheckRadioProps
 * @description The acceptable props for the checkbox and radio button component
 * @author J.T.
 * @property { string } label
 * @property { string } title
 * @property { string } type
 * @property { string } name
 * @property { boolean } checked
 * @property { boolean } readOnly
 * @property { boolean } disabled
 * @property { function } onChange
 */
interface CheckRadioProps {
    label?: string,
    title?: string,
    type?: 'checkbox' | 'radio',
    name?: string,
    checked?: boolean,
    readOnly?: boolean,
    disabled?: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * @function CheckRadio
 * @summary Checkbox and Radio button component
 * @description A simple checkbox and radio button component
 * @author J.T.
 * @param { CheckRadioProps } props
 * @returns { string }
 */
const CheckRadio: React.FunctionComponent<CheckRadioProps> = (props) => {
    return (
        <label className="common-checkradio" title={ props.title }>
            <input className="common-checkradio__input"
                type="checkbox"
                name={ props.name }
                checked={ props.checked }
                readOnly={ props.readOnly }
                disabled={ props.disabled }
                onChange={ props.onChange }
            /> { props.label }
        </label>
    )
};

CheckRadio.defaultProps = {
    type: 'checkbox'
}

export default CheckRadio;