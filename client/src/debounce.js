export function debounce(func, timeout) {
    let timer;
    return (...args) => {
        if(!timer) {
            func();
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = undefined;
        }, timeout)
    }
}