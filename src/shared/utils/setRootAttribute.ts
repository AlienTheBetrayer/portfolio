export const setRootAttribute = (name: string, value: string) => {
    const root = document.documentElement;
    root.setAttribute(name, value);
} 