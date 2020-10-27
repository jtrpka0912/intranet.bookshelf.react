// React
import React, { useState, useContext } from 'react';

// Context
import { AppContext } from '../../contexts/AppContext';
import { ShelfContext } from '../../contexts/ShelfContext';

// Types
import ShelfType from '../../../types/Shelf';

// Components
import Button from '../../common/button/Button';
import TextField from '../../common/textfield/TextField';
import CheckRadio from '../../common/check-radio/CheckRadio';

/**
 * @interface ShelfFormProps
 * @summary Shelf Form Props
 * @description The props for the shelf form component
 * @author J.T.
 * @property { ShelfType } shelf - The shelf to edit
 * @property { string } buttonLabel - Button label
 */
interface ShelfFormProps {
    shelf?: ShelfType,
    buttonLabel?: string
};

interface ShelfRequestBody {
    id?: string,
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

    const defaultProps = {
        id: props.shelf ? props.shelf._id : '',
        name: props.shelf ? props.shelf.name : '',
        path: props.shelf ? props.shelf.root : '',
        showDirectories: props.shelf ? props.shelf.showDirectories : false,
        multiFile: props.shelf ? props.shelf.multiFile : false,
        showDirectoriesReadOnly: props.shelf && props.shelf.multiFile ? true : false
    }

    // States
    const [id, setId] = useState(defaultProps.id);
    const [nameOfShelf, setNameOfShelf] = useState(defaultProps.name);
    const [pathOfShelf, setPathOfShelf] = useState(defaultProps.path);
    const [showDirectories, toggleShowDirectories] = useState(defaultProps.showDirectories);
    const [multiFile, toggleMultiFile] = useState(defaultProps.multiFile);
    const [isShowDirectoriesReadOnly, toggleShowDirectoriesReadOnly] = useState(defaultProps.showDirectoriesReadOnly);

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
            const modifyShelf: boolean = id !== '' ? true : false;

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
            if(modifyShelf) {
                requestBody.id = id;
            }

            // Set this at POST at start
            let method = 'POST';

            // Unless id is set above 0 then set method to PUT
            if(requestBody.id !== undefined && modifyShelf) { // Need to check if id is also undefined
                method = 'PUT';
            }

            // Submit and retrieve the newly created shelf from the backend
            const response = await sendShelfRequest(requestBody, method);
            const shelf: ShelfType = response;

            // Clear the form data
            setId('');
            setNameOfShelf('');
            setPathOfShelf('');
            toggleShowDirectories(false);
            toggleMultiFile(false);
            toggleShowDirectoriesReadOnly(false);

            // If new shelf then add to current listing.
            if(!modifyShelf) {
                addOneToShelves(shelf);
            }

            setToActiveShelf(shelf);
            
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
     * @param { ShelfRequestBody } requestBody - Request body object
     * @param { string } method - Type of request to server
     * @returns { JSON }
     */
    const sendShelfRequest = async (requestBody: ShelfRequestBody, method: string) => {
        const apiEndPoint: string = `http://localhost:3001/api/v1/shelves/${ method === 'PUT' ? requestBody.id : '' }`;

        // TODO: Figure out how to be secured (https)
        const shelfFormResponse = await fetch(apiEndPoint, {
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

            <Button type="submit" block rounded>
                { props.buttonLabel ? props.buttonLabel : 'Submit' }
            </Button>
        </form>
    );
};

export default ShelfForm;