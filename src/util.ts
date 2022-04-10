export const truncateMiddle = (s: string, cut: number): string => {
    const l = s.length;
    return s.substring(0, cut) + '...' + s.substring(l - cut, l);
}

export const capitalize = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
