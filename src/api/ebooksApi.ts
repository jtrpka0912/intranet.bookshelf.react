import FileType from '../types/File';

const baseEndpoint = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/v1/ebooks`;

/**
 * @async
 * @function updateFileDidRead
 * @description Update the file's did read flag.
 * @author J.T.
 * @param { FileType } file 
 * @param { boolean } didRead
 * @returns { Response } 
 */
export const updateFileDidRead = async (file: FileType, didRead: boolean) => {
    const api = baseEndpoint + `/${file._id}/did-read`;

    return await fetch(api, {
        body: JSON.stringify({
            didRead
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH'
    });
}