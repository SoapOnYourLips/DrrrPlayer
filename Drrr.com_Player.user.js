// ==UserScript==
// @name          Drrr Player
// @version       1.0.0
// @author        Astro
// @namespace     https://github.com/SoapOnYourLips
// @description   Another player for drrr.com chat
// @downloadUrl   https://raw.githubusercontent.com/SoapOnYourLips/DrrrScripts/main/Drrr.com_Player.js
// @match         *://drrr.com/room.*
// ==/UserScript==

(() => {
    $("head")
        .append(`<style>.aplayer-title{color:black}</style>`)
        .append(`<style>.aplayer-list-title{color:black}</style>`)
        .append(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.css">`)
        .append(`<script src="https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.0/APlayer.min.js"></script>`);

    $("body").append(`<div id="aplayer" style="position:fixed;left:0px;bottom:0px;min-width:400px;"></div>`);

    let json;
    let musicUrl;
    let drrrUrl = 'https://drrr.com/room/?ajax=1&api=json';

    let updateTalks = () => {
        $.ajax({
            type: 'GET',
            url: drrrUrl,
            success: function(data) {
                json = data;
            }
        });
    }



    setTimeout(() => {
    
        updateTalks();
    
        setInterval(() => {

            updateTalks();

            if (json.room.talks[0].type === 'music') {
                if (musicUrl !== json.room.np.url) {
                    musicUrl = json.room.np.url;

                    ap.list.add({
                        name: json.room.np.name,
                        artist: '♫•*¨*•.¸¸♪ (^_^♪)',
                        url: json.room.np.url,
                        cover:'https://i.redd.it/nqihs7yeb7261.jpg',
                    });

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
)}();
