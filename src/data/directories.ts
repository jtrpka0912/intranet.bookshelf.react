// Datatype
import DirectoryType from '../types/Directory';

const directories: DirectoryType[] = [];

const directoryOne: DirectoryType = {
    _id: '1',
    name: 'O\' Reilly',
    path: '/path/to/oreilly'
};

directories.push(directoryOne);

const directoryTwo: DirectoryType = {
    _id: '2',
    name: 'Wiley',
    path: '/path/to/wiley'
};

directories.push(directoryTwo);

const directoryThree: DirectoryType = {
    _id: '3',
    name: 'Packt',
    path: '/path/to/packt'
};

directories.push(directoryThree);

export default directories;