// Types
import ShelfType from '../types/Shelf';

/**
 * @async
 * @function retrieveAvailableShelves
 * @description Retrieve all of the shelves from the database
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @throws Error
 * @returns ShelfType[]
 */
export const retrieveAvailableShelves = async () => {
    const response = await fetch('http://localhost:3001/api/v1/shelves');

    if(response.status !== 200 && !response.ok) {
        throw Error('Unable to retrieve response');
    }

    const responseJSON: any[] = await response.json();

    // TODO: Need a better way to map the data
    let shelfArray: ShelfType[] = [];
    
    for(let shelfData of responseJSON) {
        let shelf: ShelfType = {
            _id: shelfData._id,
            name: shelfData.name,
            root: shelfData.root,
            showDirectories: shelfData.showDirectories,
            multiFile: shelfData.multiFile
        };

        shelfArray.push(shelf);
    }
    
    return shelfArray;
};

// TODO: Add the POST/PUT functionality