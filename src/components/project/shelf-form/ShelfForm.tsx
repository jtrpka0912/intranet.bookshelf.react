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
    // States
    const [id, setId] = useState(0);
    const [nameOfShelf, setNameOfShelf] = useState('');
    const [pathOfShelf, setPathOfShelf] = useState('');
    const [showDirectories, toggleShowDirectories] = useState(false);
    const [multiFile, toggleMultiFile] = useState(false);

    /**
     * @function onSubmitForm
     * @summary Submit Form Event
     * @description Process the form data and send it to the server
     * @author J. Trpka <jtrpka0912@gmail.com>
     * @param { React.FormEvent } e 
     */
    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: Show error messages under form elements
        // TODO: Construct common form elements

        try {
            if(!nameOfShelf) throw Error('Name of shelf is required.');
            if(!pathOfShelf) throw Error('Path of shelf is required.');

            // TODO: Check if pathOfShelf is a valid file path.

            // Predefine the method first as POST unless there is an id set then PUT
            let method = id > 0 ? 'PUT' : 'POST';

            console.info('Method', method);

            const shelfFormResponse = await fetch('https://localhost:3003/api/v1/shelves/', {
                method: 'POST',
            });

            console.info('Shelf Response', shelfFormResponse);

            if(shelfFormResponse.status != 200 && !shelfFormResponse.ok) throw Error('Bad Request to Server');

            const shelfFormJson = await shelfFormResponse.json();

            console.info('Shelf Response JSON', shelfFormJson);
        } catch(err) {
            console.error('onSubmitForm Error: ', e);
        }
    }

    return (
        <form className="shelf-form" onSubmit={ onSubmitForm }>
            <h3>{ props.title ? props.title : 'Shelf Title' }</h3>

            <label>
                <input type="text"
                    name="name-of-shelf" 
                    placeholder="Name of Shelf" 
                    required 
                    onChange={ (e) => setNameOfShelf(e.target.value) }
                    value={ nameOfShelf } 
                />
            </label>

            { /* TODO: Need to figure out how to get a path prompt */ }
            <label>
                <input type="text" 
                    name="path-of-shelf"
                    placeholder="Path to Shelf Root" 
                    required 
                    onChange={ (e) => setPathOfShelf(e.target.value) }
                    value={ pathOfShelf }
                />
            </label>

            <label>
                <input type="checkbox"
                    name="show-directories"
                    checked={ showDirectories } 
                    onChange={ (e) => toggleShowDirectories(!showDirectories) }
                /> Show Directories
            </label>

            <label>
                <input type="checkbox" 
                    name="multi-file" 
                    checked={ multiFile } 
                    onChange={ (e) => toggleMultiFile(!multiFile) } /> Multi-File
            </label>

            <Button type="submit" block={ true } rounded={ true }>
                { props.buttonLabel ? props.buttonLabel : 'Submit' }
            </Button>
        </form>
    );
};

export default ShelfForm;