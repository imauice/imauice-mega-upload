exports.checkMimeType = async (type) => {
    let extension;
    switch (type) {
        case 'image/jpg':
            extension = '.jpg';
            break;
        case 'image/png':
            extension = '.png';
            break;
        case 'image/apng':
            extension = '.apng'
            break;
        case 'image/avif':
            extension = '.avif';
            break;
        case 'image/gif':
            extension = '.gif';
            break;
        case 'image/webp':
            extension = '.webp';
            break;
        case 'image/svg+xml':
            extension = '.svg'
            break;
        default:
            extension = '.jpg'
    }
    return extension;
}