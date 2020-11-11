// React
import React, { useState, useContext } from 'react';

// Context
import { AppContext } from '../../contexts/AppContext';
import { ShelfContext } from '../../contexts/ShelfContext';

// API
import { createShelf, updateShelf, refreshShelf } from '../../../api/shelvesApi';

// Types
import ShelfType from '../../../types/Shelf';
import ShelfRequestType from '../../../types/ShelfRequest';

// Components
import Button from '../../common/button/Button';
import TextField from '../../common/textfield/TextField';
import CheckRadio from '../../common/check-radio/CheckRadio';
import { expectError } from '../../../api/api';

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

/**
 * @function ShelfForm
 * @summary Shelf Form
 * @description A form to create/edit shelves
 * @author J.T.
 * @returns { React.ReactNode }
 */
const ShelfForm: React.FunctionComponent<ShelfFormProps> = (props) => {
    // Context
    const { toggleToastMessage, toggleSpinLoader } = useContext(AppContext);
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
            toggleSpinLoader(true);
            const modifyShelf: boolean = id !== '' ? true : false;

            // Replace back slashes with forward slashes on the path, but make it discreet with the revisedPathOfShelf variable
            const revisedPathOfShelf = pathOfShelf.replace(/\\/g, '/'); // /\\/ looks for forward slashes, g means all instances

            // TODO: Check if pathOfShelf is a valid file path.
            if(!nameOfShelf) throw Error('Name of shelf is required.');
            if(!revisedPathOfShelf) throw Error('Path of shelf is required.');

            // Convert to a Shelf Request Type
            const requestBody: ShelfRequestType = {
                name: nameOfShelf,
                root: revisedPathOfShelf,
                showDirectories,
                multiFile
            };

            // If ID greater than 0 then we are modifying the shelf
            if(modifyShelf) {
                requestBody.id = id;
            }
            
            // Either create or update a shelf
            let response: Response;

            // Unless id is anything but 0
            if(requestBody.id !== undefined && modifyShelf) { // Need to check if id is also undefined
                response = await updateShelf(requestBody);
            } else {
                response = await createShelf(requestBody);
            }

            expectError(response, 'Bad Request to Server');

            const responseJson = await response.json();

            // Submit and retrieve the newly created shelf from the backend
            const shelf: ShelfType = responseJson;

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
                refreshShelf(shelf); // Retrieve the contents from the file system
            }

            // Finally set the created or updated shelf and then it'll fetch its contents from database.
            setToActiveShelf(shelf);
            toggleSpinLoader(false);
        } catch(error) {
            console.error('ShelfForm - onSubmitForm(): ', error);
            toggleToastMessage(error.message);
            toggleSpinLoader(false);
        }
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

            <Button type="submit" block rounded color="secondary">
                { props.buttonLabel ? props.buttonLabel : 'Submit' }
            </Button>
        </form>
    );
};

export default ShelfForm;