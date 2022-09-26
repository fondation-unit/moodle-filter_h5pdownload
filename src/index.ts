import { Config, H5PIntegrationContent } from './types';
// @ts-ignore
import $ from 'jquery';
// @ts-ignore
import * as Str from 'core/str';
// @ts-ignore
import * as Url from 'core/url';


const PLUGIN_NAME = 'filter_h5pdownload';
const SEARCH_TIMER = 3000;


/**
 * The script initialization function.
 * 
 * @param {Config} config
 * @returns {void}
 */
const init = (config: Config) : void => {
    // Set the config strings.
    Str.get_string('content_reuse', 'filter_h5pdownload').done((str: string) => config.modalTitle = str);
    Str.get_string('licence_to_use', 'filter_h5pdownload').done((str: string) => config.licenceToUse = str);
    Str.get_string('download', 'core').done((str: string) => config.downloadText = str);
    Str.get_string('copy', 'core').done((str: string) => config.copyText = str);
    Str.get_string('close', 'core').done((str: string) => config.closeText = str);

    const downloadButton = document.querySelector('.h5p-download');
    if (downloadButton) {
        return;
    }

    /**
     * Search the existing H5P element within the document.
     * Useful for the slow loading time of some H5P layouts.
     * 
     * @param {function}
     * @returns {number}
     */
    const searchElement: number = window.setInterval(() => {
        const mod_h5pactivity = document.querySelector('.h5p-player') as HTMLIFrameElement|null;
        const mod_hvp = document.querySelector('.h5p-iframe-wrapper') as HTMLElement|null;

        if (mod_h5pactivity !== null && mod_h5pactivity.parentElement !== null) {
            handleH5Pelement(mod_h5pactivity.parentElement, config);
            clearInterval(searchElement);
        }

        if (mod_hvp !== null) {
            handleH5Pelement(mod_hvp.parentElement, config);
            clearInterval(searchElement);
        }
    }, SEARCH_TIMER);
};

/**
 * Add the download button over the H5P element.
 * 
 * @param {HTMLElement} h5pelement
 * @param {Config} config
 * @returns {void}
 */
const handleH5Pelement = (h5pelement: HTMLElement, config: Config) : void => {
    const $h5pelement = $(h5pelement) as JQuery<HTMLElement>;
    config.downloadURL = getDownloadURL($(h5pelement), config);
    const $button = createDownloadButton('button', 'h5p-download', config);
    $h5pelement.append($button);

    // Fade the button in and out.
    $h5pelement.on('mouseenter', () => {
        $button.fadeIn();
    }).on('mouseleave', () => {
        $button.fadeOut();
    });
};

/**
 * Create a new element.
 * 
 * @param {string} type
 * @param {string} classes
 * @param {strin|null} text
 * @returns {JQuery<HTMLElement>}
 */
const createElement = (type: string, classes: string, text?: string|null) : JQuery<HTMLElement> => {
    const element = document.createElement(type) as HTMLElement;
    element.className = classes;
    element.innerHTML = text || '';
    return $(element);
};

/**
 * Create a new image element.
 * 
 * @param {string} title
 * @param {string} classes
 * @param {string|null} src
 * @param {string|null} filename
 * @returns {JQuery<HTMLElement>}
 */
const createImage = (title: string, classes: string, src?: string|null, filename?: string|null) : JQuery<HTMLElement> => {
    const $icon = $('<img/>');
    $icon.attr('alt', title)
        .attr('title', title)
        .attr('class', classes)
        .attr('src', src);
    if (!src) {
        $icon.attr('src', Url.imageUrl(filename, PLUGIN_NAME));
    }
    return $icon;
};

/**
 * Create the modal element.
 * 
 * @param {Config} config
 * @returns {void}
 */
const createModal = (config: Config) : void => {
    // The modal surrounding overlay.
    const $modalOverlay = createElement('div', 'download-overlay');
    // The modal container.
    const $modal = createElement('div', 'download-modal');
    // The modal closing button.
    const $closeButton = createElement('div', 'close-modal').append(
        createImage('closeText', 'icon', null, 'times')
    ).on('click', () => {
        $modalOverlay.remove();
    });

    const leftContent = createLicenceInfos(config);
    const $rightContent = $('<a>', {
        text: config.downloadText,
        title: config.downloadText,
        class: 'btn btn-secondary',
        href: decodeURI(config.downloadURL)
    }).prepend(
        createImage(config.downloadText, 'icon', null, 'download')
    );

    const $textLeft = createElement('p', '').append(leftContent);
    const $columnLeft = createElement('div', 'column').append($textLeft);
    const $columnRight = createElement('div', 'column')
    config.downloadURL ? $columnRight.append($rightContent) : null;

    const $modalContent = createElement('div', 'content')
        .append($columnLeft)
        .append($columnRight);

    $modal.html(`<h4>${config.modalTitle}</h4>`)
          .append($modalContent)
          .append($closeButton);
    $modalOverlay.append($modal);

    // Append to the body
    const body = document.querySelector('body') as HTMLBodyElement;
    $(body).append($modalOverlay);
};

/**
 * Generate the licence informations block to render.
 * 
 * @param {Config} config
 * @returns {string}
 */
const createLicenceInfos = (config: Config) : string => {
    if (config.licenceTarget) {
        const $licenceElement = $('#' + config.licenceTarget);
        if ($licenceElement && $licenceElement.attr('href')) {
            // Get the licence infos.
            config.licenceName = $licenceElement.data('name');
            config.licenceUrl = $licenceElement.attr('href');
            config.licenceImage = $licenceElement.find('img').attr('src');
        }
    }

    return `
        ${config.licenceIntro} 
        <a href="${config.licenceUrl}" target="_blank">
            ${config.licenceName}
            <img src="${config.licenceImage}" class="licence-image" alt="${config.licenceName}">
        </a>
        <div class="licence" style="background-color:${config.backgroundColor};color:${config.textColor}">
            <span>${config.licenceToUse} : ${config.licenceName}</span>
        </div>
    `;
};

/**
 * Create the download button.
 * 
 * @param {string} types
 * @param {string} classes
 * @param {Config} config
 * @returns {JQuery<HTMLElement>}
 */
const createDownloadButton = (type: string, classes: string, config: Config) : JQuery<HTMLElement> => {
    const element = document.createElement(type) as HTMLButtonElement;
    element.className = classes;
    $(element).append(createImage(config.downloadText, 'icon', null, 'download'));
    $(element).on('click', () => {
        createModal(config);
    });
    return $(element);
};

/**
 * Retrieve the H5P file URL.
 * 
 * @param {JQuery<HTMLElement>} element
 * @returns {string}
 */
const getDownloadURL = (element: JQuery<HTMLElement>, config: Config) : string => {
    if (config.isHVP) {
        const hvpobject = window.H5PIntegration as any;
        const hvpcontents = Object.values(hvpobject['contents'])[0] as H5PIntegrationContent;
        const exportUrl = hvpcontents['exportUrl'] as string;
        return decodeURIComponent(exportUrl);
    }

    let src = element.find(".h5p-iframe").attr("src");
    if (src && src.length > 0 && src != 'about:blank') {
        return decodeURIComponent(src.split("embed.php?url=")[1].split(".h5p")[0] + '.h5p');
    } else {
        src = element.find(".h5p-player").attr("src");
        if (src && src.length > 0 && src != 'about:blank') {
            return decodeURIComponent(src.split(".h5p")[0].split("embed.php?url=")[1] + '.h5p');
        }
    }

    return '';
};


export { init };
