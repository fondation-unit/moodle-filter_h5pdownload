// @ts-ignore
import * as jQuery from 'jquery';
// @ts-ignore
import * as Str from 'core/str';

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
    let testTxt = '';
    Str.get_string('content_reuse', 'filter_h5pdownload').done((str: string) => {
        console.log(str)
    });
    console.log(element, cfg.textColor, testTxt);
    element.style.display = 'none';
}

export { init };
