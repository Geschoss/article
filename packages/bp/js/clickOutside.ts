const clickOutside = (node: HTMLDivElement, callback: () => void) => {
    function handleClickOutside(event) {
        if (!node.contains(event.target)) {
            callback();
        }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
};
