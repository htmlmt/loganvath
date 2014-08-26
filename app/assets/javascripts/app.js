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
    $("#pause").hide();
    
    var trackOne = $("#track_one_audio")[0];
    var trackTwo = $("#track_two_audio")[0];
    var trackThree = $("#track_three_audio")[0];
    var trackFour = $("#track_four_audio")[0];
    var trackFive = $("#track_five_audio")[0];
    var trackSix = $("#track_six_audio")[0];
    var trackSeven = $("#track_seven_audio")[0];
    var trackEight = $("#track_eight_audio")[0];
  
    $("#play").click(function(){
      if ( $(".track_one_list").hasClass("playing_now") ) {
        trackOne.play();
      } else if ( $(".track_two_list").hasClass("playing_now") ) {
        trackTwo.play();
      } else if ( $(".track_three_list").hasClass("playing_now") ) {
        trackThree.play();
      } else if ( $(".track_four_list").hasClass("playing_now") ) {
        trackFour.play();
      } else if ( $(".track_five_list").hasClass("playing_now") ) {
        trackFive.play();
      } else if ( $(".track_six_list").hasClass("playing_now") ) {
        trackSix.play();
      } else if ( $(".track_seven_list").hasClass("playing_now") ) {
        trackSeven.play();
      } else if ( $(".track_eight_list").hasClass("playing_now") ) {
        trackEight.play();
      } else if ( $(".track_one_list").hasClass("view") ) {
        $(".track_one_list").removeClass("view");
        $(".track_one_list").addClass("playing_now");
        trackOne.play();
      } else if ( $(".track_two_list").hasClass("view")) {
        $(".track_two_list").removeClass("view");
        $(".track_two_list").addClass("playing_now");
        trackTwo.play();
      } else if ( $(".track_three_list").hasClass("view")) {
        $(".track_three_list").removeClass("view");
        $(".track_three_list").addClass("playing_now");
        trackThree.play();
      } else if ( $(".track_four_list").hasClass("view")) {
        $(".track_four_list").removeClass("view");
        $(".track_four_list").addClass("playing_now");
        trackFour.play();
      } else if ( $(".track_five_list").hasClass("view")) {
        $(".track_five_list").removeClass("view");
        $(".track_five_list").addClass("playing_now");
        trackFive.play();
      } else if ( $(".track_six_list").hasClass("view")) {
        $(".track_six_list").removeClass("view");
        $(".track_six_list").addClass("playing_now");
        trackSix.play();
      } else if ( $(".track_seven_list").hasClass("view")) {
        $(".track_seven_list").removeClass("view");
        $(".track_seven_list").addClass("playing_now");
        trackSeven.play();
      } else if ( $(".track_eight_list").hasClass("view")) {
        $(".track_eight_list").removeClass("view");
        $(".track_eight_list").addClass("playing_now");
        trackEight.play();
      };
      $("#play").hide();
      $("#pause").show();
    });
  
    $("#next").on("click", function(){
      if ( $(".track_one_list").hasClass("playing_now") ) {
        trackOne.pause();
        trackOne.currentTime = 0;
        $(".track_one_list").removeClass("playing_now");
        $(".track_two_list").addClass("playing_now");
        $("#song--title").text("\“Luxury Plot\”");
        $("#play").hide();
        $("#pause").show();
        trackTwo.play();
      } else if ( $(".track_two_list").hasClass("playing_now") ) {
        trackTwo.pause();
        trackTwo.currentTime = 0;
        $(".track_two_list").removeClass("playing_now");
        $(".track_three_list").addClass("playing_now");
        $("#song--title").text("\“Better Man or Ghost\”");
        $("#play").hide();
        $("#pause").show();
        trackThree.play();
      } else if ( $(".track_three_list").hasClass("playing_now") ) {
        trackThree.pause();
        trackThree.currentTime = 0;
        $(".track_three_list").removeClass("playing_now");
        $(".track_four_list").addClass("playing_now");
        $("#song--title").text("\“Forever Your Curse\”");
        $("#play").hide();
        $("#pause").show();
        trackFour.play();
      } else if ( $(".track_four_list").hasClass("playing_now") ) {
        trackFour.pause();
        trackFour.currentTime = 0;
        $(".track_four_list").removeClass("playing_now");
        $(".track_five_list").addClass("playing_now");
        $("#song--title").text("\“The Sidewalk\”");
        $("#play").hide();
        $("#pause").show();
        trackFive.play();
      } else if ( $(".track_five_list").hasClass("playing_now") ) {
        trackFive.pause();
        trackFive.currentTime = 0;
        $(".track_five_list").removeClass("playing_now");
        $(".track_six_list").addClass("playing_now");
        $("#song--title").text("\“Kentucky\”");
        $("#play").hide();
        $("#pause").show();
        trackSix.play();
      } else if ( $(".track_six_list").hasClass("playing_now") ) {
        trackSix.pause();
        trackSix.currentTime = 0;
        $(".track_six_list").removeClass("playing_now");
        $(".track_seven_list").addClass("playing_now");
        $("#song--title").text("\“Top Shelf\”");
        $("#play").hide();
        $("#pause").show();
        trackSeven.play();
      } else if ( $(".track_seven_list").hasClass("playing_now") ) {
        trackSeven.pause();
        trackSeven.currentTime = 0;
        $(".track_seven_list").removeClass("playing_now");
        $(".track_eight_list").addClass("playing_now");
        $("#song--title").text("\“This Far From Home\”");
        $("#play").hide();
        $("#pause").show();
        trackEight.play();
      } else if ( $(".track_eight_list").hasClass("playing_now") ) {
        trackEight.pause();
        trackEight.currentTime = 0;
        $(".track_eight_list").removeClass("playing_now");
        $(".track_one_list").addClass("playing_now");
        $("#song--title").text("\“Still Be Me\”");
        $("#play").hide();
        $("#pause").show();
        trackOne.play();
      } else if ( $(".track_one_list").hasClass("view") ) {
        $(".track_one_list").removeClass("view");
        $(".track_two_list").addClass("view");
        $("#song--title").text("\“Luxury Plot\”");
      } else if ( $(".track_two_list").hasClass("view") ) {
        $(".track_two_list").removeClass("view");
        $(".track_three_list").addClass("view");
        $("#song--title").text("\“Better Man or Ghost\”");
      } else if ( $(".track_three_list").hasClass("view") ) {
        $(".track_three_list").removeClass("view");
        $(".track_four_list").addClass("view");
        $("#song--title").text("\“Forever Your Curse\”");
      } else if ( $(".track_four_list").hasClass("view") ) {
        $(".track_four_list").removeClass("view");
        $(".track_five_list").addClass("view");
        $("#song--title").text("\“The Sidewalk\”");
      } else if ( $(".track_five_list").hasClass("view") ) {
        $(".track_five_list").removeClass("view");
        $(".track_six_list").addClass("view");
        $("#song--title").text("\“Kentucky\”");
      } else if ( $(".track_six_list").hasClass("view") ) {
        $(".track_six_list").removeClass("view");
        $(".track_seven_list").addClass("view");
        $("#song--title").text("\“Top Shelf\”");
      } else if ( $(".track_seven_list").hasClass("view") ) {
        $(".track_seven_list").removeClass("view");
        $(".track_eight_list").addClass("view");
        $("#song--title").text("\“This Far From Home\”");
      } else if ( $(".track_eight_list").hasClass("view") ) {
        $(".track_eight_list").removeClass("view");
        $(".track_one_list").addClass("view");
        $("#song--title").text("\“Still Be Me\”");
      }
    });
  
    $("#previous").on("click", function(){
      if ( $(".track_one_list").hasClass("playing_now") ) {
        trackOne.pause();
        trackOne.currentTime = 0;
        $(".track_list").removeClass("playing_now");
        $(".track_seven_list").addClass("playing_now");
        trackSeven.play();
      } else if ( $(".track_two_list").hasClass("playing_now") ) {
        trackTwo.pause();
        trackTwo.currentTime = 0;
        $(".track_list").removeClass("playing_now");
        $(".track_one_list").addClass("playing_now");
        trackOne.play();
      } else if ( $(".track_three_list").hasClass("playing_now") ) {
        trackThree.pause();
        trackThree.currentTime = 0;
        $(".track_list").removeClass("playing_now");
        $(".track_two_list").addClass("playing_now");
        trackTwo.play();
      } else if ( $(".track_four_list").hasClass("playing_now") ) {
        trackFour.pause();
        trackFour.currentTime = 0;
        $(".track_list").removeClass("playing_now");
        $(".track_three_list").addClass("playing_now");
        trackThree.play();
      } else if ( $(".track_five_list").hasClass("playing_now") ) {
        trackFive.pause();
        trackFive.currentTime = 0;
        $(".track_list").removeClass("playing_now");
        $(".track_four_list").addClass("playing_now");
        trackFour.play();
      } else if ( $(".track_six_list").hasClass("playing_now") ) {
        trackSix.pause();
        trackSix.currentTime = 0;
        $(".track_list").removeClass("playing_now");
        $(".track_five_list").addClass("playing_now");
        trackFive.play();
      } else if ( $(".track_seven_list").hasClass("playing_now") ) {
        trackSeven.pause();
        trackSeven.currentTime = 0;
        $(".track_list").removeClass("playing_now");
        $(".track_six_list").addClass("playing_now");
        trackSix.play();
      }  else {
        trackEight.pause();
        trackEight.currentTime = 0;
        $(".track_list").removeClass("playing_now");
        $(".track_seven_list").addClass("playing_now");
        trackSeven.play();
      }
      $("#play").hide();
      $("#pause").show();
    });
  
    $("#pause").on("click", function(){
      trackOne.pause();
      trackTwo.pause();
      trackThree.pause();
      trackFour.pause();
      trackFive.pause();
      trackSix.pause();
      trackSeven.pause();
      trackEight.pause();
      $("#pause").hide();
      $("#play").show();
    });

    $(trackOne).on('ended', function() {
       playing = false;
       $("#next").click();
    });
    $(trackTwo).on('ended', function() {
       playing = false;
       $("#next").click();
    });
    $(trackThree).on('ended', function() {
       playing = false;
       $("#next").click();
    });
    $(trackFour).on('ended', function() {
       playing = false;
       $("#next").click();
    });
    $(trackFive).on('ended', function() {
       playing = false;
       $("#next").click();
    });
    $(trackSix).on('ended', function() {
       playing = false;
       $("#next").click();
    });
    $(trackSeven).on('ended', function() {
       playing = false;
       $("#next").click();
    });
    $(trackSeven).on('ended', function() {
       playing = false;
       $("#next").click();
    });
    $(trackEight).on('ended', function() {
       playing = false;
       $("#next").click();
    });
    
});