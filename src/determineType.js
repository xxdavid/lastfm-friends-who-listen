import { getBasePath } from './path'

export default function determineType() {
    var numberOfSlashes = getBasePath().match(/\//g).length;

    switch (numberOfSlashes) {
        case 2:
            return 'artist';
        case 3:
            return 'album';
        case 4:
            return 'song';
        default:
            return null;
    }
}
