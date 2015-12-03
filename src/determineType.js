export default function determineType() {
    var numberOfSlashes = location.pathname.match(/\//g).length;

    var subPageRegex = /.*\/\+\w/;
    if (location.pathname.search(subPageRegex) !== -1) {
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
