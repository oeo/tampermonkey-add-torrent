// ==UserScript==
// @name         qBittorrent Magnet Link Interceptor
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Intercept magnet links and add them to qBittorrent
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    function addTorrent(magnetLink) {
        const qbUrl = 'http://100.98.160.40:8090';
        const apiUrl = `${qbUrl}/api/v2/torrents/add`;

        const formData = new FormData();
        formData.append('urls', magnetLink);

        GM_xmlhttpRequest({
            method: 'POST',
            url: apiUrl,
            data: formData,
            onload: function(response) {
                if (response.status === 200) {
                    console.log('Torrent added successfully');
                    alert('Torrent added successfully');
                } else {
                    console.error(`Failed to add torrent. Status code: ${response.status}`);
                    alert(`Failed to add torrent. Status code: ${response.status}`);
                }
            },
            onerror: function(error) {
                console.error('Error:', error);
                alert('Error adding torrent');
            }
        });
    }

    function interceptMagnetLinks() {
        document.addEventListener('click', function(e) {
            const target = e.target.closest('a');
            if (target && target.href && target.href.startsWith('magnet:')) {
                e.preventDefault();
                e.stopPropagation();
                if (confirm('Do you want to add this magnet link to qBittorrent?')) {
                    addTorrent(target.href);
                }
            }
        }, true);
    }

    interceptMagnetLinks();
})();
