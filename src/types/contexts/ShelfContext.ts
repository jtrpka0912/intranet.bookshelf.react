// Types
import DirectoryType from '../Directory';
import FileType from '../File';

/**
 * @type ShelfContextType
 * @summary Shelf Context Type
 * @description Definition of the shelf context type
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @property { DirectoryType[] } breadcrumbs
 * @property { DirectoryType[] } directories
 * @property { FileType[] } files
 */
type ShelfContextType = {
    breadcrumbs: DirectoryType[],
    directories: DirectoryType[],
    files: FileType[]
};

export default ShelfContextType;