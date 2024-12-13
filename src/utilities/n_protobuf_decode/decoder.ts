import { BigIntProtoBufNode, BytesProtoBufNode, ProtoBufNode } from "./node";
import { Uint8ArrayReader } from "./reader";
import { WireType } from "./wire_type";

export const decode = (bytes: Uint8Array): ProtoBufNode[] => {
    const nodes: ProtoBufNode[] = [];

    const reader = new Uint8ArrayReader(bytes);

    while (!reader.isEof()) {
        const tag = reader.readVarint();
        const number = Number(tag >> 3n);
        const type = Number(tag & 0b0000_0111n) as WireType;

        switch (type) {
            case WireType.VARINT: {
                nodes[nodes.length] = new BigIntProtoBufNode(number, type, reader.readVarint());
                break;
            }
            case WireType.I64: {
                nodes[nodes.length] = new BigIntProtoBufNode(number, type, reader.readI64());
                break;
            }
            case WireType.LEN: {
                nodes[nodes.length] = new BytesProtoBufNode(number, type, reader.readLen());
                break;
            }
            case WireType.I32: {
                nodes[nodes.length] = new BigIntProtoBufNode(number, type, reader.readI32());
                break;
            }
            default: {
                throw `Unknown WireType(${type})`;
            }
        }
    }
    return nodes;
};
