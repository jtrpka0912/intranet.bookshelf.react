/**
 * @type ShelfType
 * @summary Shelf Type
 * @description Definition of the shelf type
 * @author J.T.
 * @property { string } _id
 * @property { string } name
 * @property { string } root
 * @property { boolean } showDirectories
 * @property { boolean } multiFile
 */
type ShelfType = {
    _id: string,
    name: string,
    root: string,
    showDirectories: boolean,
    multiFile: boolean
};

export default ShelfType;