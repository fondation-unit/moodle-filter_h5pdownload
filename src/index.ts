// @ts-ignore
import * as jQuery from 'jquery';
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

const handleH5Pelement = (element: HTMLElement, config: Config) : void => {
    createModal(config);

    const button = createElement('button', 'h5p-download', 'DOWNLOAD');
    element.appendChild(button);

    console.log(element);
};

const createElement = (type: string, classes: string, text?: string|null) : HTMLElement => {
    const element = document.createElement(type) as HTMLElement;
    element.className = classes;
    element.innerHTML = text;
    return element;
}

const createModal = (config: Config) : void => {
    const modalOverlay = createElement('div', 'download-overlay');
    const modal = createElement('div', 'download-modal', config.licenceIntro);
    modalOverlay.appendChild(modal);
    // Append to the body
    //const body = document.querySelector('body') as HTMLBodyElement;
    //body.appendChild(modalOverlay);
}

export { init };
