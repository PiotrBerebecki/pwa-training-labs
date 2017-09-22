/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var app = (function() {
    'use strict';

    function logResult(result) {
        console.log(result);
    }

    function logError(error) {
        console.log('Looks like there was a problem: \n', error);
    }

    // TODO 2.1a
    if (!('fetch' in window)) {
        console.log('Fetch API not found, try including the polyfill');
        return;
    }

    function fetchJSON() {
        fetch('examples/animals.json') // 1
            .then(validateResponse) // 2
            .then(readResponseAsJSON) // 3
            .then(logResult) // 4
            .catch(logError);
    }

    // TODO 2.3
    function validateResponse(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    // TODO 2.4
    function readResponseAsJSON(response) {
        return response.json();
    }

    //  TODO 3a
    function showImage(responseAsBlob) {
        var container = document.getElementById('container');
        var imgElem = document.createElement('img');
        container.appendChild(imgElem);
        var imgUrl = URL.createObjectURL(responseAsBlob);
        imgElem.src = imgUrl;
    }

    // TODO 3b
    function readResponseAsBlob(response) {
        return response.blob();
    }

    // TODO 3c
    function fetchImage() {
        fetch('examples/kitten.jpg')
            .then(validateResponse)
            .then(readResponseAsBlob)
            .then(showImage)
            .catch(logError);
    }

    //  TODO 4a
    function showText(responseAsText) {
        var message = document.getElementById('message');
        message.textContent = responseAsText;
    }

    // TODO 4b
    function readResponseAsText(response) {
        return response.text();
    }

    // TODO 4c
    function fetchText() {
        fetch('examples/words.txt')
            .then(validateResponse)
            .then(readResponseAsText)
            .then(showText)
            .catch(logError);
    }

    // TODO 5.1
    function headRequest() {
        fetch('examples/words.txt', {
            method: 'HEAD',
        })
            .then(validateResponse)
            .then(logSize)
            .then(readResponseAsText)
            .then(logResult)
            .catch(logError);
    }

    // TODO 5.2
    function logSize(response) {
        console.log(response.headers.get('content-length'));
        return response;
    }

    /* NOTE: Never send unencrypted user credentials in production! */
    function postRequest() {
        // TODO 6.2
        // TODO 6.3
        var formData = new FormData(document.getElementById('myForm'));
        fetch('http://localhost:5000/', {
            method: 'POST',
            body: formData,
        })
            .then(validateResponse)
            .then(readResponseAsText)
            .then(logResult)
            .catch(logError);
    }

    // Don't worry if you don't understand this, it's not part of the Fetch API.
    // We are using the JavaScript Module Pattern to enable unit testing of
    // our functions.
    return {
        readResponseAsJSON: readResponseAsJSON,
        readResponseAsBlob: readResponseAsBlob,
        readResponseAsText: readResponseAsText,
        validateResponse: validateResponse,
        fetchJSON: fetchJSON,
        fetchImage: fetchImage,
        fetchText: fetchText,
        headRequest: headRequest,
        postRequest: postRequest,
    };
})();
