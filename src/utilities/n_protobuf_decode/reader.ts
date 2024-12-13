export class Uint8ArrayReader {
    private _bytes: Uint8Array;

    private _offset = 0;

    constructor(bytes: Uint8Array) {
        this._bytes = bytes;
    }

    public isEof() {
        return this._offset >= this._bytes.length;
    }

    public readVarint() {
        const [result, length] = this.peekVarint();
        this._offset += length;
        return result;
    }

    public peekVarint(): [result: bigint, length: number] {
        let result = 0n;
        for (let i = this._offset; i < this._bytes.length; i++) {
            const current = this._bytes[i];
            result += BigInt(current & 0b0111_1111) << BigInt(7 * (i - this._offset));
            if (current >> 7 == 0) return [result, i - this._offset + 1];
        }
        throw "Index out of range";
    }

    public readI64() {
        const result = this.peekI64();
        this._offset += 8;
        return result;
    }

    public peekI64() {
        if (this._offset + 8 >= this._bytes.length) throw "Index out of range";

        let result = 0n;
        for (let i = this._offset; i < this._offset + 8; i++) {
            const current = this._bytes[i];
            result += BigInt(current) << BigInt(8 * (i - this._offset));
        }
        return result;
    }

    public readLen() {
        const [lenLength, length] = this.peekVarint();
        const result = this._bytes.subarray(this._offset + length, this._offset + length + Number(lenLength));
        this._offset += length + Number(lenLength);
        return result;
    }

    public readI32() {
        const result = this.peekI32();
        this._offset += 4;
        return result;
    }

    public peekI32() {
        if (this._offset + 4 >= this._bytes.length) throw "Index out of range";

        let result = 0n;
        for (let i = this._offset; i < this._offset + 4; i++) {
            const current = this._bytes[i];
            result += BigInt(current) << BigInt(8 * (i - this._offset));
        }
        return result;
    }
}
