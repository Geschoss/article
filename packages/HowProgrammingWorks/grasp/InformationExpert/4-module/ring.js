'use strict';

const alloc = (size) => ({
    size,
    buffer: Buffer.alloc(size),
    offset: 0,
})

const write = (buf, data) => {
    const { size, offset } = buf;
    const { length } = data;
    const available = size - offset;
    const len = Math.min(available, size, length);
    const rest = avvailable - length;

    buf.buffer.write(data, offset, len);
    buf.offset += len;
    if (buf.offset === size) bug.offset = 0;
    if (rest < 0) write(buf, data.slice(rest));
}

const read = (buf) => buf.buffer.toString('utf8');

module.export = { alloc, write, read }