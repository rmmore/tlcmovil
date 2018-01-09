/**
 * @author Ricardo Rosales Maldonado (rrosalem@everis.com)
 * @see http://stackoverflow.com/questions/24080018/download-file-from-a-asp-net-web-api-method-using-angularjs/24129082#24129082
 * 
 */
 
(function(angular) {
    'use strict';
	
    angular
        .module('core.download.services', [])
        .service('$downloadServices', $downloadServices);
		
	$downloadServices.$inject = [
		'$window'
	];

    function $downloadServices(
		$window
	) {
		
		var services = {
			blob: blob,
			download: download
		};
		
		return services;
		
		////////////
		
		function blob(arraybuffer, headers){
			
			var octetStreamMime = 'application/octet-stream';

			// Get the headers
			headers = headers();

			// Determine the content type from the header or default to "application/octet-stream"
			var contentType = headers['content-type'] || octetStreamMime;
		
			$window.Blob = $window.Blob;
			$window.BlobBuilder = $window.BlobBuilder || $window.MSBlobBuilder || $window.WebKitBlobBuilder || 
								$window.MozBlobBuilder;
			$window.URL = $window.URL || $window.webkitURL || $window.mozURL || $window.msURL;
				
			//var uInt8Array = new window.Uint8Array(arraybuffer);
				
			var blob;
			if ($window.Blob) {
				blob = new $window.Blob([arraybuffer], {
					type: contentType
				});
			} else {
				var bb = new $window.blobBuilder();
				bb.append(arraybuffer);
				blob = bb.getBlob(contentType);
			}
			
			return blob;
		}

        function download(data, headers, filename) {
			
			var blob = services.blob(data, headers);		

			// Get the headers
			headers = headers();

			// Get the filename from the x-filename header or default to "download.bin"
			filename = headers['x-filename'] || filename || 'download.bin';
			
            var success = trySaveBlob(blob, filename);

            if (!success) {
                // Get the blob url creator
                var urlCreator = $window.URL || $window.webkitURL || $window.mozURL || $window.msURL;
                if (urlCreator) {
                    success = tryWithLink(urlCreator, blob, filename);
					
                    if (!success) {
						success = tryWithLinkIphone(blob, filename);
						
						if (!success) {
							success = tryInWindow(urlCreator, blob);
						}
                    }
                }
            }

            return success;
        }

        function trySaveBlob(blob, filename) {
            try {
                // Try using msSaveBlob if supported
                //console.log('Trying saveBlob method ...');

                var navigator = $window.navigator;
                if (navigator.msSaveBlob) {
                    navigator.msSaveBlob(blob, filename);
                } else {
                    // Try using other saveBlob implementations, if available
                    var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                    if (saveBlob === undefined) {
                        throw 'Not supported';
                    }
                    saveBlob(blob, filename);
                }
                //console.log('saveBlob succeeded');
                return true;
            } catch (ex) {
                //console.log('saveBlob method failed with the following exception:');
                console.log(ex);
                return false;
            }
        }

        function tryWithLink(urlCreator, blob, filename) {
            // Try to use a download link
            var link = $window.document.createElement('a');
            if ('download' in link) {
                // Try to simulate a click
                try {
                    // Prepare a blob URL
                    //console.log('Trying download link method with simulated click ...');
                    link.setAttribute('href', urlCreator.createObjectURL(blob));

                    // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                    link.setAttribute('download', filename);

                    // Simulate clicking the download link
                    var event = $window.document.createEvent('MouseEvents');
                    event.initMouseEvent('click', true, true, window,
                        1, 0, 0, 0, 0,
                        false, false, false, false,
                        0, null);
                    link.dispatchEvent(event);
                    //console.log('Download link method with simulated click succeeded');
                    return true;
                } catch (ex) {
                    //console.log('Download link method with simulated click failed with the following exception:');
                    console.log(ex);
                    return false;
                }
            }
        }
		
		function tryWithLinkIphone(blob, filename){
            try {
				var reader = new FileReader();
				reader.onload = function (event) {
					var save = $window.document.createElement('a');
					save.href = event.target.result;
					save.target = '_blank';
					save.download = filename || 'archivo.dat';
					var clicEvent = new MouseEvent('click', {
						'view': $window,
							'bubbles': true,
							'cancelable': true
					});
					save.dispatchEvent(clicEvent);
					($window.URL || $window.webkitURL || $window.mozURL || $window.msURL).revokeObjectURL(save.href);
				};
				reader.readAsDataURL(blob);
			// var bdata = btoa(data);
		  // var datauri = 'data:application/xls;base64,' + bdata;
		  // window.location.href = datauri;
				return true;
			} catch (ex) {
				//console.log('Download link method with simulated click failed with the following exception:');
				console.log(ex);
				return false;
			}
		}

        function tryInWindow(urlCreator, blob) {
            // Fallback to window.location method
            try {
                // Prepare a blob URL
                // Use application/octet-stream when using window.location to force download
                //console.log('Trying download link method with window.location ...');
                $window.location = urlCreator.createObjectURL(blob);
                //console.log('Download link method with window.location succeeded');
				
                return true;
            } catch (ex) {
                //console.log('Download link method with window.location failed with the following exception:');
                console.log(ex);
                return false;
            }
        }

    }

}(angular));
