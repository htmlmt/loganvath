'use strict';

/*
 *  Scroll-triggered animations: http://joshbroton.com/hooking-up-to-the-window-onscroll-event-without-killing-your-performance/
 */

/*
 *  These and other non-jquery functions at https://github.com/joshbroton/you-dont-need-jquery/blob/master/demo/js/not-jquery.js
 *  Let's not use jQuery if at all possible. Thanks!
 */

Element.prototype.listen = function(event, callback) {
    if(this.attachEvent) {
        this.attachEvent("on" + event, function() {callback.call(this);});
    } else if(this.addEventListener) {
        this.addEventListener(event, callback, false);
    }
};

Element.prototype.addClass = function(className) {
    if(this.hasClass(className) == false) {
        this.className += ' ' + className;
    }
}

Element.prototype.removeClass = function(className) {
    if(this.hasClass(className)) {
        var rx = new RegExp('(\\s|^)' + className + '(\\s|$)', 'g');
        this.className = this.className.replace(rx, ' ');
    }
}

Element.prototype.hasClass = function(className) {
    var rx = new RegExp('(\\s|^)' + className + '(\\s|$)');

    if(this.className.match(rx)) {
        return true;
    }

    return false;
}

Element.prototype.toggleClass = function(className) {
    if(this.hasClass(className)) {
        this.removeClass(className);
    } else {
        this.addClass(className);
    }
}

function getById(id) {
    return document.getElementById(id);
}

/*
 *  Code for opening and closing sources drawer at the bottom of the page
 */
getById('sourcesToggle').listen('click', toggleSources);
getById('shareToggle').listen('click', toggleShare);
getById('staticEmbed').listen('click', showStatic);
getById('interactiveEmbed').listen('click', showInteractive);

function toggleSources() {
    getById('sources').removeClass('share-active');
    getById('sources').toggleClass('sources-active');
}

function toggleShare() {
    getById('sources').removeClass('sources-active');
    getById('sources').toggleClass('share-active');

    var embedCode = document.getElementById('embedCode');
    embedCode.style.height = (embedCode.scrollHeight + 2) + 'px';
}

function showStatic() {
    document.getElementById('embedCodeWrapper').style.display = 'none';
    document.getElementById('staticEmbedCodeWrapper').style.display = 'block';

    var embedCode = document.getElementById('staticEmbedCode');
    embedCode.style.height = (embedCode.scrollHeight + 2) + 'px';
}

function showInteractive() {
    document.getElementById('embedCodeWrapper').style.display = 'block';
    document.getElementById('staticEmbedCodeWrapper').style.display = 'none';

    var embedCode = document.getElementById('embedCode');
    embedCode.style.height = (embedCode.scrollHeight + 2) + 'px';
}

var embedCode = document.getElementById('embedCode');
embedCode.style.height = (embedCode.scrollHeight + 2) + 'px';

function responsiveElements() {
    if(Modernizr.mq('(max-width: 1000px)')) {
        var windowWidth = window.innerWidth;
        var fontSize = windowWidth/62.5;
        var html = document.querySelector("html");
        html.style.fontSize = '' + fontSize + 'px';
        var alligatorTail = document.getElementById('alligator--tail');
        var crocodileTail = document.getElementById('crocodile--tail');
        alligatorTail.style.width = '41%';
        crocodileTail.style.width = '41%';
    } else {
        var fontSize = 16
        var html = document.querySelector("html");
        html.style.fontSize = '' + fontSize + 'px';
        var windowWidth = window.innerWidth;
        var alligatorTail = document.getElementById('alligator--tail');
        var crocodileTail = document.getElementById('crocodile--tail');
        alligatorTail.style.width = '' + (((windowWidth - 1000) * 0.58) + 404) + 'px';
        crocodileTail.style.width = '' + (((windowWidth - 1000) * 0.55) + 404) + 'px';
        var alligatorHeight = alligatorTail.offsetHeight;
        var crocodileHeight = crocodileTail.offsetHeight;
        alligatorTail.style.top = '' + (37 - (alligatorHeight - 123) * 0.42) + 'px';
        crocodileTail.style.top = '' + (37 - (crocodileHeight - 123) * 0.42) + 'px';
    }
}

var resize;
window.onresize = function(){
    clearTimeout(resize);
    resize = setTimeout(responsiveElements(), 100);
};

function lights() {
    setTimeout(function() {
      var boxers = document.getElementById('boxers');
      boxers.src="./img/boxers-light_2x.png"
    }, 600);
    setTimeout(function() {
      var boxers = document.getElementById('boxers');
      boxers.src="./img/boxers_2x.png"
    }, 900);
    setTimeout(function() {
      var boxers = document.getElementById('boxers');
      boxers.src="./img/boxers-light_2x.png"
    }, 1000);
}

window.onload = setupDom;
window.onfocus = setupDom;

function setupDom() {
    responsiveElements();
    lights();
}