// React
import React, { useState, useContext } from 'react';

// Components
import Button from '../../common/button/Button';

// Context
import { ShelfContext } from '../../../contexts/ShelfContext';

// Types
import ShelfType from '../../../types/Shelf';

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

interface ShelfRequestBody {
    id?: number,
    name: string,
    root: string,
    showDirectories?: boolean,
    multiFile?: boolean
}

/**
 * @function ShelfForm
 * @summary Shelf Form
 * @description A form to create/edit shelves
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @todo: Figure out how to set props for TypeScript
 * @returns { JSX }
 */
const ShelfForm: React.FunctionComponent<ShelfFormProps> = (props) => {
    // Context
    const { addToShelves, setToActiveShelf } = useContext(ShelfContext);

    // States
    const [id, setId] = useState(0);
    const [nameOfShelf, setNameOfShelf] = useState('');
    const [pathOfShelf, setPathOfShelf] = useState('');
    const [showDirectories, toggleShowDirectories] = useState(false);
    const [multiFile, toggleMultiFile] = useState(false);
    const [isShowDirectoriesReadOnly, toggleShowDirectoriesReadOnly] = useState(false);

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
            // TODO: Check if pathOfShelf is a valid file path.
            // TODO: If multiFile is true then showDirectories need to be true too
            if(!nameOfShelf) throw Error('Name of shelf is required.');
            if(!pathOfShelf) throw Error('Path of shelf is required.');

            // Convert to a Shelf Request Body
            const requestBody: ShelfRequestBody = {
                name: nameOfShelf,
                root: pathOfShelf,
                showDirectories,
                multiFile
            };

            // If ID greater than 0 then we are modifying the shelf
            if(id > 0) {
                requestBody.id = id;
            }

            const response = await getServerResponse(requestBody);
            const shelf: ShelfType = response;

            // Do actions depending on type of action for shelf
            if(id > 0) {
                // Modifying the shelf
                // TODO: Not sure what to do after modifying a shelf
            } else {
                // Creating a shelf
                addToShelves(shelf);
                setToActiveShelf(shelf);
            }
            
        } catch(err) {
            console.error('onSubmitForm Error: ', e);
        }
    }

    /**
     * @async
     * @function getServerResponse
     * @description Send a request to the server to either create or update a shelf.
     * @author J. Trpka <jtrpka0912@gmail.com>
     * @param { ShelfRequestBody } requestBody
     * @returns { JSON }
     */
    const getServerResponse = async (requestBody: ShelfRequestBody) => {
        // Set this at POST at start
        let method = 'POST';

        // Unless id is set above 0 then set method to PUT
        if(requestBody.id !== undefined && requestBody.id > 0) { // Need to check if id is also undefined
            method = 'PUT';
        }

        // TODO: Figure out how to be secured (https)
        const shelfFormResponse = await fetch('http://localhost:3001/api/v1/shelves/', {
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            },
            method
        });

        if(shelfFormResponse.status !== 200 && !shelfFormResponse.ok) throw Error('Bad Request to Server');

        return await shelfFormResponse.json();
    }

    const onChangeMultiFile = () => {
        console.group('onChangeMultiFile');
        const newMultiFileState = !multiFile;
        console.info('New MultiFile State', newMultiFileState);

        // If multifile is enabled then show directories must be enabled as well
        if(newMultiFileState) {
            console.log('Checked');
            // Checked: show directories need to be enabled and set as readonly
            toggleShowDirectories(true);
            toggleShowDirectoriesReadOnly(true);
        } else {
            console.log('Not Checked');
            // Unchecked: show directories must not be read only
            toggleShowDirectoriesReadOnly(false);
        }

        toggleMultiFile(newMultiFileState);
        console.groupEnd();
    }

    return (
        <form className="shelf-form" onSubmit={ onSubmitForm }>
            <input type="hidden" name="id" value={ id } />

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

            <label title={ isShowDirectoriesReadOnly ? 'If multifile is enabled then show directories must be enabled as well.' : undefined }>
                <input type="checkbox"
                    name="show-directories"
                    checked={ showDirectories } 
                    readOnly={ isShowDirectoriesReadOnly }
                    disabled={ isShowDirectoriesReadOnly }
                    onChange={ () => toggleShowDirectories(!showDirectories) }
                /> Show Directories
            </label>

            <label>
                <input type="checkbox" 
                    name="multi-file" 
                    checked={ multiFile } 
                    onChange={ () => onChangeMultiFile() } /> Multi-File
            </label>

            <Button type="submit" block={ true } rounded={ true }>
                { props.buttonLabel ? props.buttonLabel : 'Submit' }
            </Button>
        </form>
    );
};

export default ShelfForm;