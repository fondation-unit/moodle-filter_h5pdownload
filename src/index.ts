import { Config } from './types';
// @ts-ignore
import $ from 'jquery';
// @ts-ignore
import * as Str from 'core/str';
// @ts-ignore
import * as Url from 'core/url';


const PLUGIN_NAME = 'filter_h5pdownload';


/**
 * The script initialization function.
 * 
 * @param {Config} config
 * @returns {void}
 */
const init = (config: Config) : void => {
    // Tests
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
    const $h5pelement = $(h5pelement) as JQuery<HTMLElement>;
    config.downloadURL = getDownloadURL($(h5pelement));
    console.log(config.downloadURL);
    const $button = createDownloadButton('button', 'h5p-download', config);
    $h5pelement.append($button);

    // Fade the button in and out.
    $h5pelement.on('mouseenter', () => {
        $button.fadeIn();
    }).on('mouseleave', () => {
        $button.fadeOut();
    });
};

const createElement = (type: string, classes: string, text?: string|null) : JQuery<HTMLElement> => {
    const element = document.createElement(type) as HTMLElement;
    element.className = classes;
    element.innerHTML = text || '';
    return $(element);
}

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
}

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

    const leftContent = `
        ${config.licenceIntro} 
        <a href="${config.licenceUrl}" target="_blank">${config.licenceName}</a>.
        <div class="licence" style="background-color:${config.backgroundColor};color:${config.textColor}">
            <span>${config.licenceToUse} : ${config.licenceName}</span>
        </div>
    `;

    const $rightContent = $('<a>', {
        text: config.downloadText,
        title: config.downloadText,
        class: 'btn btn-secondary',
        href: decodeURI(config.downloadURL)
    }).prepend(
        createImage(config.downloadText, 'icon', null, 'download')
    );

    const $textLeft = createElement('p', '', leftContent);
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
}

const createDownloadButton = (type: string, classes: string, config: Config) : JQuery<HTMLElement> => {
    const element = document.createElement(type) as HTMLButtonElement;
    element.className = classes;
    $(element).append(createImage(config.downloadText, 'icon', null, 'download'));
    $(element).on('click', () => {
        createModal(config);
    });
    return $(element);
}

const getDownloadURL = (element: JQuery<HTMLElement>) : string => {
    let src = element.find(".h5p-iframe").attr("src");
    if (src) {
        if (src.length > 0 && src != 'about:blank') {
            return decodeURIComponent(src.split("embed.php?url=")[1].split(".h5p")[0] + '.h5p');
        }
    } else {
        src = element.find(".h5p-player").attr("src");
        if (src.length > 0 && src != 'about:blank') {
            return decodeURIComponent(src.split(".h5p")[0].split("embed.php?url=")[1] + '.h5p');
        }
    }
    return '';
}


export { init };

