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

function responsiveElements() {
    if(Modernizr.mq('(max-width: 1280px) and (min-width: 584px)')) {
        var windowWidth = window.innerWidth;
        var fontSize = windowWidth/80.1;
        var html = document.querySelector("html");
        html.style.fontSize = '' + fontSize + 'px';
    } else if(Modernizr.mq('(max-width: 584px)')) {
        var windowWidth = window.innerWidth;
        var fontSize = windowWidth/80.1;
        var html = document.querySelector("html");
        html.style.fontSize = '' + fontSize + 'px';
    } else {
        var fontSize = 16
        var html = document.querySelector("html");
        html.style.fontSize = '' + fontSize + 'px';
        var windowWidth = window.innerWidth;
    }
}

var resize;
window.onresize = function(){
    clearTimeout(resize);
    resize = setTimeout(responsiveElements(), 100);
};

window.onload = setupDom;
window.onfocus = setupDom;

function setupDom() {
    responsiveElements();
}

