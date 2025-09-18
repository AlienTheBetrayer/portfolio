export const cssVar = (variable: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}