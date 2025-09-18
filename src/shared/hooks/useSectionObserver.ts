import { useEffect } from "react";

// observe sections (refs array) and change current url to that section id + callback
export const useSectionObserver = (refs: React.RefObject<HTMLElement | null>[], setActive?: (id: string) => void) => {
    useEffect(() => {
        const visible = new Map<string, boolean>(); // shows all elements and their current visibility (could be two at once)

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => visible.set(entry.target.id, entry.isIntersecting)); // changing the {visible} map
            const r = Array.from(visible.entries()).reduce((acc, current) => current[1] ? current : acc); // getting the bottom visible
            window.history.replaceState(null, '', `${!r[1] ? window.location.pathname : `#${r[0]}`}`); // replacing the url
            setActive?.(r[0]); // calling the callback
        }, { threshold: 0 });

        refs.forEach(ref => ref.current && observer.observe(ref.current)); // observing all refs in our argument

        return () => observer.disconnect(); // cleanup
    }, [refs, setActive]);
}