export const mediaQuery = (query: string) => { 
    return window.matchMedia(query).matches;
}