//


/**
 * @type {Transform<I,O>}
 */
export class Transform {
    /**
     * @param  {ReadableStream} rs
     * @return {Transform<I,O>}
     */
    static start(rs) {
        const pipe = new Transform();
        const reader = rs.getReader();

        reader.read().then(function handleRS({done,value}) {
            if (done) {
                return pipe.read(undefined, true);
            }
            else {
                for (const b of value) {
                    pipe.read(b, false);
                }
                return reader.read().then(handleRS);
            }
        });

        return pipe;
    }
    constructor() {
        this._pipe_next = null;
        this._pipe_top = this;
    }
    /**
     * @param  {<I>} data
     * @param  {Boolean} done
     */
    async read(data, done) {
        this.write(await data, done);
    }
    /**
     * @param  {<O>} data
     * @param  {Boolean} done
     */
    async write(data, done) {
        if (this._pipe_next !== null) {
            this._pipe_next.read(data, done);
        }
    }
    /**
     * @param  {Transform<O,?>} ts
     * @return {Transform<O,?>}
     */
    pipe(ts) {
        this._pipe_next = ts._pipe_top;
        ts._pipe_top = this._pipe_top;
        return ts;
    }
}

export const stringify = new (class TransformStringify extends Transform {
    read(data, done) {
        this.write(String.fromCharCode(data), done);
    }
})();

export const logger = new (class TransformLogger extends Transform {
    read(data, done) {
        console.log(data);
        this.write(data, done);
    }
});