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
const init = (config: Config): void => {
    // Tests
    console.log(config.backgroundColor);
    Str.get_string('content_reuse', 'filter_h5pdownload').done((str: string) => {
        console.log(str)
    });

    /**
     * Search the H5P element within the document.
     * 
     * @param {function}
     * @returns {number}
     */
    const searchElement: number = window.setInterval(() => {
        const element = document.querySelector('.h5p-player') as HTMLIFrameElement;
        if (element) {
            handleH5Pelement(element, config);
            clearInterval(searchElement);
        }
    }, 3000);
};

const handleH5Pelement = (element: HTMLIFrameElement, config: Config): void => {
    const modalOverlay = createElement('div', 'download-overlay');
    const modal = createElement('div', 'download-modal', config.licenceIntro);

    modalOverlay.appendChild(modal);
    const body = document.querySelector('body') as HTMLBodyElement;
    body.appendChild(modalOverlay);

    console.log(element);
};

const createElement = (type: string, classes: string, text?: string|null): HTMLElement => {
    const element = document.createElement(type) as HTMLDivElement;
    element.className = classes;
    element.innerHTML = text;
    return element;
}

export { init };
