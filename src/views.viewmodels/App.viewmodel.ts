import { createSignal, Signal } from "solid-js";
import { ProtoBufNode } from "../utilities/n_protobuf_decode/node";

export default class AppViewModel {
    private _hex: Signal<string> = createSignal("");

    private _tip: Signal<string> = createSignal("");

    private _nodes: Signal<ProtoBufNode[]> = createSignal([]);

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
