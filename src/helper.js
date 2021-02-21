function getRandomElement(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function getDisplayName(item) {
    return `${item.first_name} ${item.last_name}`;
}

export { getRandomElement, getDisplayName };