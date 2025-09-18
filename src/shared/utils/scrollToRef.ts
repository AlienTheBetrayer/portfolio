export const scrollToRef = (r: React.RefObject<HTMLElement | null>, offsetY: number = 200) => {
    if(r.current) {
        const top = r.current.getBoundingClientRect().top + window.scrollY - offsetY;
        window.scrollTo({top: top, behavior: 'smooth' });
    }
}