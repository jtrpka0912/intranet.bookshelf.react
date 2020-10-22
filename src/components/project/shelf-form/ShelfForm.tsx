// React
import React, { useState, useContext } from 'react';

// Context
import { ShelfContext } from '../../../contexts/ShelfContext';

// Types
import ShelfType from '../../../types/Shelf';

// Components
import Button from '../../common/button/Button';
import TextField from '../../common/textfield/TextField';
import CheckRadio from '../../common/check-radio/CheckRadio';

// Styles
import './ShelfForm.scss';
import { AppContext } from '../../../contexts/AppContext';

/**
 * @interface ShelfFormProps
 * @summary Shelf Form Props
 * @description The props for the shelf form component
 * @author J.T.
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
 * @author J.T.
 * @returns { React.ReactNode }
 */
const ShelfForm: React.FunctionComponent<ShelfFormProps> = (props) => {
    // Context
    const { toggleToastMessage } = useContext(AppContext);
    const { addOneToShelves, setToActiveShelf } = useContext(ShelfContext);

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
     * @author J.T.
     * @param { React.FormEvent } e 
     */
    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Replace back slashes with forward slashes on the path, but make it discreet with the revisedPathOfShelf variable
            const revisedPathOfShelf = pathOfShelf.replace(/\\/g, '/'); // /\\/ looks for forward slashes, g means all instances

            // TODO: Check if pathOfShelf is a valid file path.
            if(!nameOfShelf) throw Error('Name of shelf is required.');
            if(!revisedPathOfShelf) throw Error('Path of shelf is required.');

            // Convert to a Shelf Request Body
            const requestBody: ShelfRequestBody = {
                name: nameOfShelf,
                root: revisedPathOfShelf,
                showDirectories,
                multiFile
            };

            // If ID greater than 0 then we are modifying the shelf
            if(id > 0) {
                requestBody.id = id;
            }

            // Submit and retrieve the newly created shelf from the backend
            const response = await sendShelfRequest(requestBody);
            const shelf: ShelfType = response;

            // Clear the form data
            setNameOfShelf('');
            setPathOfShelf('');
            toggleShowDirectories(false);
            toggleMultiFile(false);
            toggleShowDirectoriesReadOnly(false);

            // Do actions depending on type of action for shelf
            if(id > 0) {
                // Modifying the shelf
                // NOTE: Not sure what to do after modifying a shelf
            } else {
                // Creating a shelf
                addOneToShelves(shelf);
                setToActiveShelf(shelf);
            }
            
        } catch(error) {
            console.error('ShelfForm - onSubmitForm(): ', error);
            toggleToastMessage(error.message);
        }
    }

    /**
     * @async
     * @function sendShelfRequest
     * @description Send a request to the server to either create or update a shelf.
     * @author J.T.
     * @param { ShelfRequestBody } requestBody
     * @returns { JSON }
     */
    const sendShelfRequest = async (requestBody: ShelfRequestBody) => {
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

    /**
     * @function onChangeMultiFile
     * @event onChange
     * @description If the multi-file checkbox is checked then show directories need to be set
     * @author J.T.
     */
    const onChangeMultiFile = () => {
        const newMultiFileState = !multiFile;

        // If multifile is enabled then show directories must be enabled as well
        if(newMultiFileState) {
            // Checked: show directories need to be enabled and set as readonly
            toggleShowDirectories(true);
            toggleShowDirectoriesReadOnly(true);
        } else {
            // Unchecked: show directories must not be read only
            toggleShowDirectoriesReadOnly(false);
        }

        toggleMultiFile(newMultiFileState);
    }

    return (
        <form className="shelf-form" onSubmit={ onSubmitForm }>
            <input type="hidden" name="id" value={ id } />

            <h3>{ props.title ? props.title : 'Shelf Title' }</h3>

            <TextField type="text"
                placeholder="Name of Shelf *"
                required
                value={ nameOfShelf }
                onChange={ (e) => setNameOfShelf(e.target.value) }
            />

            { /* TODO: Need to figure out how to get a path prompt */ }
            <TextField type="text" 
                placeholder="Path to Shelf Root *"
                required
                onChange={ (e) => setPathOfShelf(e.target.value) }
                value={ pathOfShelf }
            />

            <CheckRadio type="checkbox" 
                title={ isShowDirectoriesReadOnly ? 'If multifile is enabled then show directories must be enabled as well.' : undefined }
                label="Show Directories"
                checked={ showDirectories } 
                readOnly={ isShowDirectoriesReadOnly }
                disabled={ isShowDirectoriesReadOnly }
                onChange={ () => toggleShowDirectories(!showDirectories) }
            />

            <CheckRadio type="checkbox" 
                label="Multi-File"
                checked={ multiFile } 
                onChange={ () => onChangeMultiFile() }
            />

            <Button type="submit" block={ true } rounded={ true }>
                { props.buttonLabel ? props.buttonLabel : 'Submit' }
            </Button>
        </form>
    );
};

export default ShelfForm;