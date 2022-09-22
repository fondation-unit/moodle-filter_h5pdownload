const init = (cfg: any) => {
    const search = setInterval(function() {
        const element = document.querySelector('.h5p-player');
        if (element) {
            modalHandling(document.querySelector('.h5p-player'), cfg);
            clearInterval(search);
        }
    }, 3000);
};

const modalHandling = (element: HTMLElement, cfg: any) => {
    console.log(element, cfg);
    element.style.display = 'none';
}

export { init };
