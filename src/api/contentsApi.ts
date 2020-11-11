import ShelfType from '../types/Shelf';
import DirectoryType from '../types/Directory';

const baseEndpoint = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/v1/contents`;

/**
 * @async
 * @function getContentsByShelf
 * @description Get the contents from a shelf.
 * @author J.T.
 * @param { ShelfType } shelf 
 * @returns { Response }
 */
export const getContentsByShelf = async (shelf: ShelfType) => {
    const apiEndpoint = baseEndpoint + `/shelf/${shelf._id}`;

    return await fetch(apiEndpoint);
}

/**
 * @async
 * @function getContentsByShelfAndFolder
 * @description Get the contents from a shelf and folder
 * @author J.T.
 * @param { ShelfType } shelf 
 * @param { DirectoryType } directory 
 */
export const getContentsByShelfAndFolder = async (shelf: ShelfType, directory: DirectoryType) => {
    const apiEndpoint = baseEndpoint + `/shelf/${shelf._id}/folder/${directory._id}`;

    return await fetch(apiEndpoint);
};