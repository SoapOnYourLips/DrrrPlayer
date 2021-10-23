// ==UserScript==
// @name          Drrr Player
// @version       1.0.4
// @author        Astro
// @namespace     https://github.com/SoapOnYourLips
// @description   Another player for drrr.com chat
// @downloadUrl   https://raw.githubusercontent.com/SoapOnYourLips/DrrrScripts/main/Drrr.com_Player.user.js
// @updateUrl     https://raw.githubusercontent.com/SoapOnYourLips/DrrrScripts/main/Drrr.com_Player.user.js
// @match         *://drrr.com/room/*
// @grant         none
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

(() => {

    let room;
    let musicUrl;
    let drrrUrl = 'https://drrr.com/room/?ajax=1&api=json';

    $("head")
        .append(`<style>.aplayer-title{color:black}</style>`)
        .append(`<style>.aplayer-list-title{color:black}</style>`)
        .append(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.css">`)
        .append(`<script src="https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.0/APlayer.min.js"></script>`);

    $("body").append(`<div id="aplayer" style="position:fixed;left:0px;bottom:0px;min-width:400px;"></div>`);

    let updateTalks = () => {
        $.ajax({
            type: 'GET',
            url: drrrUrl,
            success: function(data) {
                room = data.room;
            }
        });
    }



    setTimeout(() => {

        updateTalks();

        setInterval(() => {

            updateTalks();

            if (room.np) {
                if (musicUrl !== room.np.url) {
                    musicUrl = room.np.url;
                
                    ap.list.add({
                        name: room.np.name,
                        artist: '♫•*¨*•.¸¸♪ (^_^♪)',
                        url: musicUrl,
                        cover:'https://i.redd.it/nqihs7yeb7261.jpg',
                    });

                    ap.on('error', () => ap.list.clear());

                    ap.skipForward();
                    ap.play();
                }
            }
        
        }, 2000);

        const ap = new APlayer({
            container: document.getElementById('aplayer'),
            fixed: true,
            loop: 'none',
            theme: '#3E3E44F0',
            lrcType: 0,
            volume: 0.2,
            audio: []
        });

        window.box.changeVolume(0);
        document.getElementById('musicBox').style.display = 'none';

    }, 2000);

})();
