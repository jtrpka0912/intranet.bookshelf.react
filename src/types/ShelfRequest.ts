/**
 * @interface ShelfRequestType
 * @description The structure request body for creating or updating shelves.
 * @author J.T.
 * @property { string } id
 * @property { string } name
 * @property { string } root
 * @property { boolean } showDirectories
 * @property { boolean } multiFile
 */
interface ShelfRequestType {
    id?: string,
    name: string,
    root: string,
    showDirectories?: boolean,
    multiFile?: boolean
}

export default ShelfRequestType;