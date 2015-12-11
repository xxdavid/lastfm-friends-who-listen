import { getLanguagePrefix } from './language';

export default function determineType() {
    var numberOfSlashes = location.pathname.match(/\//g).length;

    var subPageRegex = /.*\/\+\w/;
    if (location.pathname.search(subPageRegex) !== -1) {
        numberOfSlashes--;
    }

    if (getLanguagePrefix()) {
        numberOfSlashes--;
    }

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
