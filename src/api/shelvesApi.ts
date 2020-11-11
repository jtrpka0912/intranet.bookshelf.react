const baseEndpoint = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/v1/shelf`;

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