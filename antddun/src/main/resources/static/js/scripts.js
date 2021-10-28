/*!
* Start Bootstrap - Blog Home v5.0.7 (https://startbootstrap.com/template/blog-home)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-blog-home/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

$(document).ready(function() {
    var tMax = 4000, // animation time, ms
        height = 700,
        speeds = [],
        r = [],
        target = 16545,
        reading = 12345,
        sTarget = target.toString(),
        sReading = reading.toString(),
        numberOutput = [],
        reels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        $reels,
        start;

    function init(){
        $reels = $('.reel').each(function(i, el){
            el.innerHTML = '<div class="reel-holder"><p>' + reels[i].join('</p><p>') + '</p></div><div class="reel-holder"><p>' + reels[i].join('</p><p>') + '</p></div><div class="reel-door">?</div>'
        });

        // Add user's meter reading to fake reel for comparison
        $('.fake-reel').each(function(i, el){
            el.innerHTML = sReading.charAt(i);
        });

        $('.lever').click(action);
    }

    function action(){
        if (start !== undefined) return;

        $('.reel-door').fadeOut(100);
        $('.lever').attr('disabled', true)
                   .addClass('button-inactive')
                   .text('Good luck!');
        for (var i = 0, len = sTarget.length; i < len; i += 1) {
            var intOffset = (parseInt(+sTarget.charAt(i) | 0)) * height / 10 - ((height / 10) * 2);
            numberOutput[i] = intOffset >= 0 ? intOffset : (height - (height / 10));
        }
        for (var j = 0; j < 5; ++j) {
            speeds[j] = Math.random() + .7;
            r[j] = (Math.random() * 10 | 0) * height / 10;
        }
        animate();
    }

    function animate(now){
        if (!start) start = now;
        var t = now - start || 0;

        for (var i = 0; i < 5; ++i)
            $reels[i].scrollTop = (speeds[i] / tMax / 2 * (tMax - t) * (tMax - t) + numberOutput[i]) % height | 0;
        if (t < tMax) {
            requestAnimationFrame(animate);
        } else {
            start = undefined;
            check();
        }
    }

    function check(){
        var matchedNumbers = 0;

        for (var i = 0, len = sTarget.length; i < len; i += 1) {
            var targetReading = sReading.charAt(i) | 0,
                targetInt = sTarget.charAt(i) | 0,
                reelClass = targetReading == targetInt ? 'match' : 'no-match';

            $('.reel:eq(' + i + '), .fake-reel:eq(' + i + ')').addClass(reelClass);
            targetReading == targetInt ? matchedNumbers ++ : null;
        }

        var announcement;

        if (matchedNumbers == 5) {
            announcement = 'You matched all 5 numbers! you win!!!';
        } else if (matchedNumbers == 1) {
            announcement = 'You matched 1 number. Better luck next time!';
        } else {
            announcement = 'You matched ' + matchedNumbers + ' numbers. Better luck next time!';
        }

        $('.js-announcement').text(announcement);

        $('.lever').text('-');
    }

  init();
});