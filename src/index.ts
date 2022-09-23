// @ts-ignore
import $ from 'jquery';
// @ts-ignore
import * as Str from 'core/str';
import { Config } from './types';


/**
 * The script initialization function.
 * 
 * @param {Config} config
 * @returns {void}
 */
const init = (config: Config) : void => {
    // Tests
    console.log(config.backgroundColor);
    Str.get_string('content_reuse', 'filter_h5pdownload').done((str: string) => {
        console.log(str)
    });

    const downloadButton = document.querySelector('.h5p-download');
    if (downloadButton) {
        return;
    }

    /**
     * Search the H5P element within the document.
     * 
     * @param {function}
     * @returns {number}
     */
    const searchElement: number = window.setInterval(() => {
        const element = document.querySelector('.h5p-player') as HTMLIFrameElement;
        if (element.parentElement) {
            handleH5Pelement(element.parentElement, config);
            clearInterval(searchElement);
        }
    }, 3000);
};

const handleH5Pelement = (h5pelement: HTMLElement, config: Config) : void => {
    createModal(config);
    const $h5pelement = $(h5pelement) as JQuery;

    const $button = createButton('button', 'h5p-download', 'DOWNLOAD');
    $h5pelement.append($button);

    // Fade the button in and out.
    $h5pelement.on('mouseenter', () => {
        $button.fadeIn();
    }).on('mouseleave', () => {
        $button.fadeOut();
    });
};

const createElement = (type: string, classes: string, text?: string|null) : JQuery => {
    const element = document.createElement(type) as HTMLElement;
    element.className = classes;
    element.innerHTML = text;
    return $(element);
}

const createButton = (type: string, classes: string, text?: string|null) : JQuery => {
    const element = document.createElement(type) as HTMLButtonElement;
    element.className = classes;
    element.innerHTML = text;
    return $(element);
}

const createModal = (config: Config) : void => {
    const $modalOverlay = createElement('div', 'download-overlay');
    const $modal = createElement('div', 'download-modal', config.licenceIntro);
    $modalOverlay.append($modal);
    // Append to the body
    //const body = document.querySelector('body') as HTMLBodyElement;
    //body.appendChild(modalOverlay);
}

export { init };
