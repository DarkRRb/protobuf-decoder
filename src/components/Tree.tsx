import { Accessor, createMemo, For, JSXElement, Show } from "solid-js";

type ItemInfo<T> = {
    item: T;
    depth: number;
    hasSub: boolean;
    index: Accessor<number>;
};

export default <T,>(props: {
    each: T[];
    subeach: (item: T) => T[] | null | undefined;
    children: (info: ItemInfo<T>) => JSXElement;
}): JSXElement => (
    <InnerTree each={props.each} subeach={props.subeach} depth={0}>
        {props.children}
    </InnerTree>
);

const InnerTree = <T,>(props: {
    each: T[];
    subeach: (item: T) => T[] | null | undefined;
    depth: number;
    children: (info: ItemInfo<T>) => JSXElement;
}): JSXElement => {
    const subs = createMemo(() => props.each.map((item) => props.subeach(item)));
    const hasSubs = createMemo(() => subs().map((item) => item != null && item != undefined));

    return (
        <For each={props.each}>
            {(item, index) => (
                <>
                    {props.children({ item, depth: props.depth, hasSub: hasSubs()[index()], index })}
                    <Show when={hasSubs()[index()]}>
                        <InnerTree each={subs()[index()]} subeach={props.subeach} depth={props.depth + 1}>
                            {props.children}
                        </InnerTree>
                    </Show>
                </>
            )}
        </For>
    );
};
