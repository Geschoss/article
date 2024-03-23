function loop(start, end, cb) {
    if (start >= end) {
        return;
    }
    cb(start);
    loop(start + 1, end, cb)
}


loop(1, 10, (value) => console.log(value))