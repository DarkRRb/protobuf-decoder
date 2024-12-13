import { decode } from "./decoder";
import { WireType } from "./wire_type";

type TryResult<T> = [isSucceed: false] | [isSucceed: true, result: T];

export abstract class ProtoBufNode {
    public fieldNumber: number;

    public wireType: WireType;

    public constructor(number: number, type: WireType) {
        this.fieldNumber = number;
        this.wireType = type;
    }

    public abstract tryAsInt32(): TryResult<number>;
    public abstract tryAsInt64(): TryResult<bigint>;
    public abstract tryAsUint32(): TryResult<number>;
    public abstract tryAsUint64(): TryResult<bigint>;
    public abstract tryAsSint32(): TryResult<number>;
    public abstract tryAsSint64(): TryResult<bigint>;
    public abstract tryAsFixed64(): TryResult<bigint>;
    public abstract tryAsSfixed64(): TryResult<bigint>;
    public abstract tryAsDouble(): TryResult<number>;
    public abstract tryAsString(): TryResult<string>;
    public abstract tryAsBytes(): TryResult<Uint8Array>;
    public abstract tryAsMessage(): TryResult<ProtoBufNode[]>;
    public abstract tryAsFixed32(): TryResult<number>;
    public abstract tryAsSfixed32(): TryResult<number>;
    public abstract tryAsFloat(): TryResult<number>;
}

export class BigIntProtoBufNode extends ProtoBufNode {
    private _value: bigint;

    public constructor(number: number, type: WireType, value: bigint) {
        super(number, type);
        this._value = value;
    }

    public tryAsInt32(): TryResult<number> {
        if (this.wireType !== WireType.VARINT) return [false];
        if (this._value > 4294967295) return [false];

        return [true, this._value > 2147483647 ? Number(this._value - 4294967296n) : Number(this._value)];
    }

    public tryAsInt64(): TryResult<bigint> {
        if (this.wireType !== WireType.VARINT) return [false];

        return [true, this._value > 9223372036854775807n ? this._value - 18446744073709551616n : this._value];
    }

    public tryAsUint32(): TryResult<number> {
        if (this.wireType !== WireType.VARINT) return [false];
        if (this._value > 4294967295) return [false];

        return [true, Number(this._value)];
    }

    public tryAsUint64(): TryResult<bigint> {
        if (this.wireType !== WireType.VARINT) return [false];

        return [true, this._value];
    }

    public tryAsSint32(): TryResult<number> {
        if (this.wireType !== WireType.VARINT) return [false];

        const uleft = this._value >> 1n;
        if (uleft > 4294967295) return [false];
        const left = uleft > 2147483647 ? Number(uleft - 4294967296n) : Number(uleft);
        const right = -Number(this._value & 1n);

        return [true, left ^ right];
    }

    public tryAsSint64(): TryResult<bigint> {
        if (this.wireType !== WireType.VARINT) return [false];

        const uleft = this._value >> 1n;
        const left = uleft > 9223372036854775807n ? uleft - 18446744073709551616n : uleft;
        const right = -(this._value & 1n);

        return [true, left ^ right];
    }

    public tryAsFixed64(): TryResult<bigint> {
        if (this.wireType !== WireType.I64) return [false];

        return [true, this._value];
    }

    public tryAsSfixed64(): TryResult<bigint> {
        if (this.wireType !== WireType.I64) return [false];

        return [true, this._value > 9223372036854775807n ? this._value - 18446744073709551616n : this._value];
    }

    public tryAsDouble(): TryResult<number> {
        if (this.wireType !== WireType.I64) return [false];

        const buf = new ArrayBuffer(8);
        const dataview = new DataView(buf);
        dataview.setBigUint64(0, this._value);

        return [true, dataview.getFloat64(0)];
    }

    public tryAsString(): [isSucceed: false] {
        return [false];
    }

    public tryAsBytes(): [isSucceed: false] {
        return [false];
    }

    public tryAsMessage(): [isSucceed: false] {
        return [false];
    }

    public tryAsFixed32(): TryResult<number> {
        if (this.wireType !== WireType.I32) return [false];

        return [true, Number(this._value)];
    }

    public tryAsSfixed32(): TryResult<number> {
        if (this.wireType !== WireType.I32) return [false];

        return [true, this._value > 2147483647 ? Number(this._value - 4294967296n) : Number(this._value)];
    }

    public tryAsFloat(): TryResult<number> {
        if (this.wireType !== WireType.I32) return [false];

        const buf = new ArrayBuffer(4);
        const dataview = new DataView(buf);
        dataview.setUint32(0, Number(this._value));

        return [true, dataview.getFloat32(0)];
    }
}

export class BytesProtoBufNode extends ProtoBufNode {
    private _value: Uint8Array;

    public constructor(number: number, type: WireType, value: Uint8Array) {
        super(number, type);
        this._value = value;
    }

    public tryAsInt32(): [isSucceed: false] {
        return [false];
    }

    public tryAsInt64(): [isSucceed: false] {
        return [false];
    }

    public tryAsUint32(): [isSucceed: false] {
        return [false];
    }

    public tryAsUint64(): [isSucceed: false] {
        return [false];
    }

    public tryAsSint32(): [isSucceed: false] {
        return [false];
    }

    public tryAsSint64(): [isSucceed: false] {
        return [false];
    }

    public tryAsBool(): [isSucceed: false] {
        return [false];
    }

    public tryAsFixed64(): [isSucceed: false] {
        return [false];
    }

    public tryAsSfixed64(): [isSucceed: false] {
        return [false];
    }

    public tryAsDouble(): [isSucceed: false] {
        return [false];
    }

    public tryAsString(): TryResult<string> {
        var result = "";
        for (var i = 0; i < this._value.length; i++) {
            result += String.fromCharCode(this._value[i]);
        }
        return [true, result];
    }

    public tryAsBytes(): TryResult<Uint8Array> {
        return [true, this._value];
    }

    public tryAsMessage(): [isSucceed: false] | [isSucceed: true, result: ProtoBufNode[]] {
        if (this.wireType !== WireType.LEN) return [false];

        try {
            return [true, decode(this._value)];
        } catch {
            return [false];
        }
    }

    public tryAsFixed32(): [isSucceed: false] {
        return [false];
    }

    public tryAsSfixed32(): [isSucceed: false] {
        return [false];
    }

    public tryAsFloat(): [isSucceed: false] {
        return [false];
    }
}
