import { JSXElement, Match, Switch } from "solid-js";
import { hexCheck, hexToBytes } from "../utilities/hex_util";
import { decode } from "../utilities/n_protobuf_decode/decoder";
import { WireType } from "../utilities/n_protobuf_decode/wire_type";

import Input from "../components/Input";
import Button from "../components/Button";
import Tree from "../components/Tree";
import NodeAsInt32 from "../components/NodeAsInt32";
import NodeAsInt64 from "../components/NodeAsInt64";
import NodeAsUint64 from "../components/NodeAsUint64";

import AppViewModel from "../views.viewmodels/App.viewmodel";
import AppStyles from "../views.styles/App.styles";
import NodeAsSint64 from "../components/NodeAsSint64";
import NodeAsFixed64 from "../components/NodeAsFixed64";
import NodeAsSFixed64 from "../components/NodeAsSfixed64";
import NodeAsDouble from "../components/NodeAsDouble";
import NodeAsString from "../components/NodeAsString";
import NodeAsBytes from "../components/NodeAsBytes";
import NodeAsFixed32 from "../components/NodeAsFixed32";
import NodeAsSfixed32 from "../components/NodeAsSfixed32";
import NodeAsFloat from "../components/NodeAsFloat";

export default (): JSXElement => {
    const vm = new AppViewModel();

    const buttonClickHandler = () => {
        vm.tip = "";
        vm.hex = vm.hex.replaceAll(/\s+/g, "");

        try {
            hexCheck(vm.hex);
            vm.nodes = decode(hexToBytes(vm.hex));
        } catch (error) {
            vm.tip = `${error}`;
        }
    };

    return (
        <div class={AppStyles.Root}>
            <div class={AppStyles.Up}>
                <Input class={AppStyles.Input} value={vm.hex} on:change={(hex) => (vm.hex = hex)} />
                <div class={AppStyles.Middle} />
                <Button class={AppStyles.Button} on:click={buttonClickHandler}>
                    Decode
                </Button>
            </div>
            <div>{vm.tip}</div>
            <div style={{ "font-size": "0.8rem" }}>
                <Tree each={vm.nodes} subeach={vm.subnodes}>
                    {({ item, depth }) => (
                        <div class={AppStyles.TreeItemRoot}>
                            <div style={{ "flex-shrink": 0, width: `${depth}rem` }}></div>
                            <div>
                                {item.fieldNumber} {WireType[item.wireType]}
                            </div>
                            <Switch>
                                <Match when={item.wireType == WireType.VARINT}>
                                    <NodeAsInt32 node={item} />
                                    <NodeAsInt64 node={item} />
                                    <NodeAsUint64 node={item} />
                                    <NodeAsSint64 node={item} />
                                </Match>
                                <Match when={item.wireType == WireType.I64}>
                                    <NodeAsFixed64 node={item} />
                                    <NodeAsSFixed64 node={item} />
                                    <NodeAsDouble node={item} />
                                </Match>
                                <Match when={item.wireType == WireType.LEN}>
                                    <NodeAsString node={item} />
                                    <NodeAsBytes node={item} />
                                </Match>
                                <Match when={item.wireType == WireType.I32}>
                                    <NodeAsFixed32 node={item} />
                                    <NodeAsSfixed32 node={item} />
                                    <NodeAsFloat node={item} />
                                </Match>
                            </Switch>
                        </div>
                    )}
                </Tree>
            </div>
        </div>
    );
};
