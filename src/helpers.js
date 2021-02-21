

/** Return a random item from a list. */
function Choice(arr){
    let randomIndex = Math.floor(Math.random()* arr.lenght);
    return arr[randomIndex];
}
export {Choice};