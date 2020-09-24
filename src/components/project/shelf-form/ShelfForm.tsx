// React
import React, { useState } from 'react';

// Components
import Button from '../../common/button/Button';

// Styles
import './ShelfForm.scss';

/**
 * @interface ShelfFormProps
 * @summary Shelf Form Props
 * @description The props for the shelf form component
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @property { string } title - Label of the form
 * @property { string } buttonLabel - Button label
 */
interface ShelfFormProps {
    title?: string,
    buttonLabel?: string
};

/**
 * @function ShelfForm
 * @summary Shelf Form
 * @description A form to create/edit shelves
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @todo: Figure out how to set props for TypeScript
 * @returns { JSX }
 */
const ShelfForm: React.FunctionComponent<ShelfFormProps> = (props) => {
    return (
        <form className="shelf-form">
            <h3>{ props.title ? props.title : 'Shelf Title' }</h3>

            <label>
                <input type="text" placeholder="Name of Shelf" />
            </label>

            <label>
                <input type="checkbox" /> Show Directories
            </label>

            <label>
                <input type="checkbox" /> Multi-File
            </label>

            <Button type="submit" block={ true } rounded={ true }>
                { props.buttonLabel ? props.buttonLabel : 'Submit' }
            </Button>
        </form>
    );
};

export default ShelfForm;