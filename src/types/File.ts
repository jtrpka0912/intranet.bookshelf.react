/**
 * @type FileType
 * @summary File Type
 * @description Definition of the file type
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @property { string } id
 * @property { string } type
 * @property { string } name
 * @property { string } path
 * @property { string } cover
 * @property { boolean } didRead
 */
type FileType = {
    id: string,
    type: string, // TODO: Might be an enum
    name: string,
    path: string,
    cover: string,
    didRead: boolean
};

export default FileType;