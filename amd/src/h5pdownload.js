define(['jquery', 'core/url', 'core/str'], function($, Url, Str) {
    let bgColor = '',
        txtColor = '',
        titleTxt = '',
        licenceToUse = '',
        downloadText = 'Download',
        copyText = 'Copy',
        closeText = 'Close',
        licenceIntro = '',
        licenceName = '',
        licenceShortname = '',
        licenceUrl = '',
        reuseConditions = '';

    return {
        init: function(cfg) {
            const self = this;

            // Set variables.
            Str.get_string('content_reuse', 'filter_h5pdownload').done((str) => titleTxt = '<h4>' + str + '</h4>');
            Str.get_string('licence_to_use', 'filter_h5pdownload').done((str) => licenceToUse = str);
            Str.get_string('download', 'core').done((str) => downloadText = str);
            Str.get_string('copy', 'core').done((str) => copyText = str);
            Str.get_string('close', 'core').done((str) => closeText = str);

            bgColor = cfg.backgroundColor;
            txtColor = cfg.textColor;
            licenceIntro = cfg.licenceIntro;
            licenceName = cfg.licenceName;
            licenceShortname = cfg.licenceShortname;
            licenceUrl = cfg.licenceUrl;
            reuseConditions = cfg.reuseConditions;

            // Get the H5P DOM elements.
            $h5ps = $('.h5p-placeholder, .h5p-iframe-wrapper');
            $h5ps.each(function(index) {
                self.hoverElement($($h5ps[index]));
            });
        },

        hoverElement: function(element) {
            const self = this;
            element.on("mouseenter", function() {
                const src = element.find(".h5p-iframe").attr("src");
                const h5pUrlPart = src.split("embed.php?url=")[1].split(".h5p")[0];

                if (h5pUrlPart.length > 0) {
                    const downloadLink = decodeURIComponent(h5pUrlPart) + ".h5p";

                    $openOverlay = $('<button class="h5p-download">').append(self.addImage('download', downloadText, 'icon'));
                    $openOverlay.on('click', function() {
                        self.createOverlay(downloadLink);
                    });

                    if (!element.find(".h5p-download").length) {
                        element.append($openOverlay);
                    }

                    element.find(".h5p-download").fadeIn();
                }
            });

            element.on("mouseleave", function() {
                element.find(".h5p-download").fadeOut();
            });
        },

        createOverlay: function(downloadLink) {
            $closeOverlay = $('<div class="close-modal"></div>')
                .html(this.addImage('times', closeText, 'icon'));
            $closeOverlay.on('click', function() {
                $('body').find('.download-overlay').remove();
            });

            const ccDiv = $('<div/>');
            ccDiv.attr('class', 'mt-2');

            const ccHref = $('<a/>');
            ccHref.attr('href', licenceUrl);
            ccHref.attr('target', "_blank");

            ccHref.append(this.addImage('cc/cc', 'CC image', 'modal-icon'));
            ccHref.append(this.addImage('cc/by', 'BY image', 'modal-icon'));
            ccHref.append(this.addImage('cc/nc', 'NC image', 'modal-icon'));
            ccDiv.append(ccHref);


            $copy = $('<button class="btn"></button>')
                .on('click', function() { navigator.clipboard.writeText(licenceShortname) })
                .prepend(this.addImage('copy', copyText, 'icon'));

            let $column1Html1 = $('<p>', {
                html: licenceIntro + ' <a href="'+ licenceUrl +'" target="_blank">' + licenceName + '</a>.'
            }).append(ccDiv);

            let $licenceArea = $('<div>', {
                class: "licence",
                style: "background-color:"+ bgColor +";color:"+ txtColor,
                html: '<span>' + licenceToUse + ' : ' + licenceShortname + '</span>'
            }).append($copy);
        
            let $column1Html2 = $('<p>', {
                html: '<p>' + reuseConditions + '</p>'
            }).append($licenceArea);

            let column2Html = $('<a>', {
                text: downloadText,
                title: downloadText,
                class: 'btn btn-secondary',
                href: downloadLink
            }).prepend(this.addImage('download', downloadText, 'icon'));

            $content = $('<div/>');
            $content.attr('class', 'content');

            $column1 = $('<div/>');
            $column1.attr('class', 'column');
            $column1.html($column1Html1).append($column1Html2);

            $column2 = $('<div/>');
            $column2.attr('class', 'column');
            $column2.html(column2Html);

            $content.append($column1);
            $content.append($column2);

            $modal = $('<div class="download-modal">').html(titleTxt).append($content).append($closeOverlay);
            $overlay = $('<div class="download-overlay">').append($modal);

            $('body').append($overlay);
        },

        addImage: function(img, title, className) {
            const icon = $('<img/>');
            icon.attr('alt', title);
            icon.attr('title', title);
            icon.attr('class', className);
            icon.attr('src', Url.imageUrl(img, 'filter_h5pdownload'));
            return icon;
        }
    };
});
