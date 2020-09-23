// Types
import ShelfType from '../types/Shelf';

const shelfDummyData: ShelfType[] = [];

const shelfBooks: ShelfType = {
    id: '1',
    name: 'Book Shelf',
    root: '/foo/bar/book-shelf',
    showDirectories: true,
    multiFile: false
};

shelfDummyData.push(shelfBooks);

const shelfMagazines: ShelfType = {
    id: '2',
    name: 'Magazine Shelf',
    root: '/foo/bar/magazine-shelf',
    showDirectories: true,
    multiFile: false
};

shelfDummyData.push(shelfMagazines);

const shelfComicBooks: ShelfType = {
    id: '3',
    name: 'Comic Books Shelf',
    root: '/foo/bar/comic-books',
    showDirectories: false,
    multiFile: false
};

shelfDummyData.push(shelfComicBooks);

export default shelfDummyData;