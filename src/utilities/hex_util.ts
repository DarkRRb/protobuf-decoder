const hexes = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));

export const hexCheck = (hex: string) => {
    if ((hex.length & 0x01) !== 0) throw "hex must be an even length";
    if (!/^[0-9A-Za-z]*$/g.test(hex)) throw "hex can only contain 0-9, A-Z, a-z";
};

export const hexToBytes = (hex: string): Uint8Array => {
    const array = new Uint8Array(hex.length / 2);
    for (let i = 0; i < array.length; i++) {
        const j = i * 2;
        const hexByte = hex.slice(j, j + 2);
        const byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(byte) || byte < 0) throw new Error("Invalid byte sequence");
        array[i] = byte;
    }
    return array;
};

export const bytesToHex = (uint8a: Uint8Array): string => {
    let hex = "";
    for (const u of uint8a) {
        hex += hexes[u];
    }
    return hex;
};
