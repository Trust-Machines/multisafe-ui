export const truncateMiddle = (s: string, cut: number): string => {
    const l = s.length;
    return s.substring(0, cut) + "..." + s.substring(l - cut, l);
}