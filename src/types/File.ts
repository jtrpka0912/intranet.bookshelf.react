/**
 * @type FileType
 * @summary File Type
 * @description Definition of the file type
 * @author J.T.
 * @property { string } _id
 * @property { string } type
 * @property { string } name
 * @property { string } path
 * @property { string } cover
 * @property { boolean } didRead
 */
type FileType = {
    _id: string,
    type: string, // TODO: Might be an enum
    name: string,
    path: string,
    cover: string,
    didRead: boolean
};

export default FileType;