/**
 * @async
 * @function expectError
 * @description Throw an error if failed fetch
 * @author J.T.
 * @param { Response } res 
 * @param { string } errorMessage
 * @throws Error 
 */
export const expectError = (res: Response, errorMessage: string) => {
    if(res.status !== 200 && !res.ok) {
        throw new Error(errorMessage);
    }
}