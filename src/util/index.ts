export const truncateMiddle = (s: string, cut: number): string => {
    const l = s.length;
    return s.substring(0, cut) + '...' + s.substring(l - cut, l);
}

export const capitalize = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export const randStr = (): string => {
    return Math.random().toString(36).replace('0.', '').toString();
}

export const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export const hexToAscii = (hex: string): string => {
    let r = [];
    for (let i = 0; i < hex.length - 1; i += 2) {
        r.push(String.fromCharCode(parseInt(hex.charAt(i) + hex.charAt(i + 1), 16)));
    }
    return r.join('');
}