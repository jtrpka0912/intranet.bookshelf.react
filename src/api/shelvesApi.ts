import ShelfRequestType from '../types/ShelfRequest';

const baseEndpoint = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/v1/shelves`;

/**
 * @async
 * @function getShelves
 * @description Get all available shelves
 * @author J.T.
 * @returns { Response }
 */
export const getShelves = async () => {
    return await fetch(baseEndpoint);
};

/**
 * @async
 * @function createShelf
 * @description Create the shelf
 * @author J.T.
 * @param { ShelfRequestType } requestBody 
 * @returns { Response }
 */
export const createShelf = async (requestBody: ShelfRequestType) => {
    return await fetch(baseEndpoint, {
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    });
};

/**
 * @async
 * @function updateShelf
 * @description Update the shelf
 * @author J.T.
 * @param { ShelfRequestType } requestBody 
 * @returns { Response }
 */
export const updateShelf = async (requestBody: ShelfRequestType) => {
    const api = baseEndpoint + `/${requestBody.id}`;

    return await fetch(api, {
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT'
    });
}