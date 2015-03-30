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

$(document).ready(function(){
    $("#concerts").click(function(){
      $("body").removeClass();
      $("body").addClass("concerts");
    })
    
    $("#news").click(function(){
      var body = document.body;
      $("body").removeClass();
      $("body").addClass("news");
    })
    
    $("#merch").click(function(){
      var body = document.body;
      $("body").removeClass();
      $("body").addClass("merch");
    })
    
    $("#contact").click(function(){
      var body = document.body;
      $("body").removeClass();
      $("body").addClass("contact");
    })
    
    $(".logan").click(function(){
      var body = document.body;
      $("body").removeClass();
      $("body").addClass("home");
    })
  
    $("#pause").hide();
    
    var trackOne = document.getElementById('1');
    trackOne.addClass('current-track');
    var songTitleOne = document.getElementsByClassName('song--title-1')[0];
    songTitleOne.style.display = "inline-block";
    
    $("#play").click(function() {
        $("#pause").show();
        $("#play").hide();
        var track = document.getElementsByClassName('current-track')[0];
        track.play();
    });
  
    $("#next").on("click", function(){
        var currentTrack = document.getElementsByClassName('current-track')[0];
        
        if (currentTrack.nextSibling.nextSibling === null) {
            var nextTrack = document.getElementsByClassName('track')[0];
        } else {
            var nextTrack = currentTrack.nextSibling.nextSibling;
        }
        
        var currentTrackTitle = document.getElementsByClassName("song--title-" + currentTrack.getAttribute("id") + "")[0];
        var nextTrackTitle = document.getElementsByClassName("song--title-" + nextTrack.getAttribute("id") + "")[0];
        
        if($('#play').is(':visible')) {
            currentTrackTitle.style.display = "none";
            nextTrackTitle.style.display = "inline-block";
            currentTrack.removeClass('current-track');
            nextTrack.addClass('current-track');
        } else {
            $("#pause").show();
            $("#play").hide();
            currentTrackTitle.style.display = "none";
            nextTrackTitle.style.display = "inline-block";
            currentTrack.pause();
            currentTrack.currentTime = 0
            nextTrack.play();
            currentTrack.removeClass('current-track');
            nextTrack.addClass('current-track');
            nextTrack.play();
        }
    });
  
    $("#previous").on("click", function(){
        var currentTrack = document.getElementsByClassName('current-track')[0];
        
        if (currentTrack.previousSibling.previousSibling.hasClass('wrapper') === true) {
            var tracks = document.getElementsByClassName('track');
            var previousTrack = tracks[tracks.length - 1];
        } else {
            var previousTrack = currentTrack.previousSibling.previousSibling;
        }
        
        var currentTrackTitle = document.getElementsByClassName("song--title-" + currentTrack.getAttribute("id") + "")[0];
        var previousTrackTitle = document.getElementsByClassName("song--title-" + previousTrack.getAttribute("id") + "")[0];
        
        if($('#play').is(':visible')) {
            currentTrackTitle.style.display = "none";
            previousTrackTitle.style.display = "inline-block";
            currentTrack.removeClass('current-track');
            previousTrack.addClass('current-track');
        } else {
            $("#pause").show();
            $("#play").hide();
            currentTrackTitle.style.display = "none";
            previousTrackTitle.style.display = "inline-block";
            currentTrack.pause();
            currentTrack.currentTime = 0
            previousTrack.play();
            currentTrack.removeClass('current-track');
            previousTrack.addClass('current-track');
            previousTrack.play();
        }
    });
  
    $("#pause").on("click", function(){
      $("#pause").hide();
      $("#play").show();
      var track = document.getElementsByClassName('current-track')[0];
      track.pause();
    });
});