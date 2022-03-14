export function delay(duration) {
    if(!duration) {
        duration = random(1000, 3000);
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        },duration);
    })
}
export function random(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}