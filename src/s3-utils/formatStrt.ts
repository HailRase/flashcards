export const formatStr = (str: string, maxLen: number) => {
    if (str.length > maxLen + 3) {
        return str.substring(0, maxLen) + "...";
    }
    return str;
}