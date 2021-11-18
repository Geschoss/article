const MIN_DELTA_SCROLL = 12;
const SHOW_VERTICAL_OFFSET = 120;

type Conf = {
    minDeltaScroll: number;
    verticalOffset: number;
};

const hideOnScroll = (
    callback,
    {
        verticalOffset = SHOW_VERTICAL_OFFSET,
        minDeltaScroll = MIN_DELTA_SCROLL,
    }: Conf
) => {
    let scrollTop = window.pageYOffset;

    const handleScroll = () => {
        const currentScrollTop = window.pageYOffset;
        const scrollDelta = currentScrollTop - scrollTop;
        scrollTop = currentScrollTop;

        if (scrollTop < verticalOffset) {
            callback(true);
        } else if (Math.abs(scrollDelta) >= minDeltaScroll) {
            callback(scrollDelta <= 0);
        }
    };

    document.addEventListener('scroll', handleScroll, {
        passive: true,
    });

    handleScroll();

    return () => document.removeEventListener('scroll', handleScroll);
};
