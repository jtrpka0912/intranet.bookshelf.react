/**
 * @type ShelfType
 * @summary Shelf Type
 * @description Definition of the shelf type
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @property { string } id
 * @property { string } name
 * @property { string } root
 * @property { boolean } showDirectories
 * @property { boolean } multiFile
 */
type ShelfType = {
    id: string,
    name: string,
    root: string,
    showDirectories: boolean,
    multiFile: boolean
};

export default ShelfType;