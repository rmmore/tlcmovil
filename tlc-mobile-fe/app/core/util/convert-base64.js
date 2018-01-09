/**
 * @author Rolando Paredes Alzamora (rparedea@everis.com)
 * 
 *  Function que convierte imagen en formato base64
 */
'use strict';

/*
 * Function para obtener imagen en base64
 * @parm url       : url donde se encuentra la imagen
 *       callback  : function(dataUri){}
 */
function getDataUriBase64(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
}