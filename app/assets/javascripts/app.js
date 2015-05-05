'use strict';

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

$(window).resize(function(){
    $(".main--fold").css("height", $(window).height() * 1.2);
    if (Modernizr.mq('(max-width: 584px)')) {
        $(".header--nav-player").css("margin-top", "-" + $(".header--nav-player").height() * .85 + "px");
        $(".nav-player--toggle").text("▼");
        navOpen = false;
    } else {
        $(".header--nav-player").css("margin-top", "0px");
        $(".nav-player--toggle").text("▲");
        navOpen = true;
    }
});

$(document).on("page:load", function(){
    $(".main--fold").css("height", $(window).height() * 1.2);
    $(".header--nav-player").css("margin-top", "-" + $(".header--nav-player").height() * .85 + "px");
});

$(document).ready(function(){
    if (Modernizr.mq('(max-width: 584px)')) {
        $(".header--nav-player").css("margin-top", "-" + $(".header--nav-player").height() * .85 + "px");
    }
    
    var navOpen = false;
    
    $(".nav-player--toggle").click(function(){
        if (navOpen == true) {
            $(".header--nav-player").css("margin-top", "-" + $(".header--nav-player").height() * .85 + "px");
            $(".nav-player--toggle").text("▼");
            navOpen = false;
        } else {
            $(".header--nav-player").css("margin-top", "0px");
            $(".nav-player--toggle").text("▲");
            navOpen = true;
        }
    });
    
    $(".main--fold").css("height", $(window).height());
    
    setTimeout(function(){
        $(".main--fold").css("height", $(window).height() - ($(window).height() * .15));
    }, 2000);
    
    $("#concerts").click(function(){
        $('html, body').animate({
            scrollTop: $(".main--concerts").offset().top - $('.body--header').height()
        }, 750);
    })
    
    $("#news").click(function(){
        $('html, body').animate({
            scrollTop: $(".main--news").offset().top - $('.body--header').height()
        }, 750);
    })
    
    $("#merch").click(function(){
        $('html, body').animate({
            scrollTop: $(".main--merch").offset().top - $('.body--header').height()
        }, 750);
    })
    
    $("#contact").click(function(){
        $('html, body').animate({
            scrollTop: $(".main--contact").offset().top - $('.body--header').height()
        }, 750);
    })
    
    $(".header--title").click(function(){
        $(".nav--link").css("font-weight", "normal");
        $(".nav--link").css("color", "#384948");
        $('html, body').animate({
            scrollTop: 0
        }, 750);
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
        
        console.log(currentTrack);
        
        var currentTrackTitle = document.getElementsByClassName("song--title-" + currentTrack.getAttribute("id") + "")[0];
        var nextTrackTitle = document.getElementsByClassName("song--title-" + nextTrack.getAttribute("id") + "")[0];
        
        if($('#play').is(':visible')) {
            currentTrack.pause();
            currentTrack.currentTime = 0
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
            currentTrack.currentTime = 0;
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
            currentTrack.pause();
            currentTrack.currentTime = 0;
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