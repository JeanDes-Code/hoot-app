export const dateParser = (num) => {
    let options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };
    let timeStamp = Date.parse(num);
    // @ts-ignore
    let date = new Date(timeStamp).toLocaleDateString('fr-FR', options);

    return date.toString();
};

export const timeStampParser = (num) => {
    let options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    // @ts-ignore
    let date = new Date(num).toLocaleDateString('fr-FR', options);

    return date.toString();
};

export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
};
