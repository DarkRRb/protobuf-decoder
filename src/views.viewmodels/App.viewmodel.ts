import { createSignal, Signal } from "solid-js";
import { ProtoBufNode } from "../utilities/n_protobuf_decode/node";
import { decode } from "../utilities/n_protobuf_decode/decoder";
import { hexToBytes } from "../utilities/hex_util";

export default class AppViewModel {
    private _hex: Signal<string> = createSignal("");

    private _tip: Signal<string> = createSignal("");

    private _nodes: Signal<ProtoBufNode[]> = createSignal(
        decode(
            hexToBytes(
                "09000000000000f83f150000c03f18b99497eefbffffffff0120f2b8dcc39a95c594e10128c7ebe8910c308ec7a3bce5eabaeb9e01388dd7d1a308409b8ec7f8cad5f5d63d4dc7353ac2518ee3885756ebd69e5d39cac5bd61721c77a8a91429e1680170007a076461726b72726282010200ff8a017309000000000000f83f150000c03f18b99497eefbffffffff0120f2b8dcc39a95c594e10128c7ebe8910c308ec7a3bce5eabaeb9e01388dd7d1a308409b8ec7f8cad5f5d63d4dc7353ac2518ee3885756ebd69e5d39cac5bd61721c77a8a91429e1680170007a076461726b72726282010200ff"
            )
        )
    );

    public get hex(): string {
        return this._hex[0]();
    }

    public set hex(value: string) {
        this._hex[1](value);
    }

    public get tip(): string {
        return this._tip[0]();
    }

    public set tip(value: string) {
        this._tip[1](value);
    }

    public get nodes(): ProtoBufNode[] {
        return this._nodes[0]();
    }

    public set nodes(value: ProtoBufNode[]) {
        this._nodes[1](value);
    }

    public subnodes(node: ProtoBufNode): ProtoBufNode[] | null {
        const [isSucceed, result] = node.tryAsMessage();
        return isSucceed ? result : null;
    }
}
