'use strict';

module.exports = function (bytes) {

    return PDFJS.getDocument(bytes)
        .then(function (pdf) {
            return pdf.getPage(1);
        })
        .then(function (page) {

            var scale = 1.5;
            var viewport = page.getViewport(scale);

            var canvas = document.createElement('canvas');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            var context = canvas.getContext('2d');

            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            return page.render(renderContext)
                .then(function () {
                    return canvas.toDataURL()
                });
        });


};