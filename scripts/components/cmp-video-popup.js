jQuery(document).ready(function(){

	jQuery(function( $ ){

        
        if( $('.video-play').length ){
            $.getScript("https://www.youtube.com/player_api", function(){});
        }

        $( ".video-play" ).each(function(index) {
            $(this).on("click", function(){
                var video_id = $(this).children('#video-id').val();
                $( 'body' ).addClass('open-popup');
                
                jQuery(this).colorbox({
                    className : 'youtube-overlay',
                    width: '100%',
                    height: '100%',
                    opacity: 1,
                    html : '<div id="youtube-player"></div>', 
                    close: '<div class="close-icon"></div>', 
                    overlayClose: true,
                    transition: 'fade',
                    speed: 0,
                    reposition:	true,
                    onComplete: function() {     
                       player = new YT.Player('youtube-player', {
                            playerVars: {autoplay:1, playsinline: 1},
                            videoId: video_id,
                            events: {
                                'onStateChange': function(event){
                                    if(event.data == 0) {
                                        $(window).colorbox.close();
                                    }
                                },
                                'onReady': onPlayReady
                            }
                        });
                        $("#cboxWrapper, #cboxContent, #cboxLoadedContent").on("click", function(){
                            $( 'body' ).removeClass('open-popup');
                            $(window).colorbox.close();
                        }).children().on("click", function (e) {
                            e.stopPropagation();
                        });
                    },
                    onCleanup:function(){
                        player.destroy();
                        $( 'body' ).removeClass('open-popup');
                        $("#cboxWrapper").unbind();
                    }
                    
                });

            });
        });   

        $( ".video-play.out-site" ).each(function(index) {
            $(this).on("click", function(){
                var video_id = $(this).children('#video-id').val();
                var video_title = $(this).children('#video-title').val();
                var video_bg = $(this).children('#video-bg').val();

                $( 'body' ).addClass('open-popup');
                
                jQuery(this).colorbox({
                    title: video_title,
                    className : 'video-modal',
                    opacity: 1,
                    width: '100%',
                    height: '100%',
                    html : '<div id="youtube-player"></div>', 
                    close: '<div class="close-icon"></div>', 
                    overlayClose: true,
                    transition: 'fade',
                    speed: 0,
                    reposition:	true,
                    onComplete: function() {     
                       player = new YT.Player('youtube-player', {
                            playerVars: {autoplay:1, playsinline: 1},
                            videoId: video_id,
                            events: {
                                'onStateChange': function(event){
                                    if(event.data == 0) {
                                        $(window).colorbox.close();
                                    }
                                },
                                'onReady': onPlayReady
                            }
                        });
                        $('#cboxTitle').insertBefore('#cboxLoadedContent');
                        $('#cboxContent').css('background-image', 'url('+video_bg+')');
                        $("#cboxWrapper, #cboxContent, #cboxLoadedContent").on("click", function(){
                            $( 'body' ).removeClass('open-popup');
                            $(window).colorbox.close();
                        }).children().on("click", function (e) {
                            e.stopPropagation();
                        });
                    },
                    onCleanup:function(){
                        player.destroy();
                        $( 'body' ).removeClass('open-popup');
                        $("#cboxWrapper").unbind();
                    }
                });

            });
        });   

        $( ".media-play" ).each(function(index) {
            $(this).on("click", function(){
                
                var mediaurl = $(this).children('input').val();
                $('.media-box').children('.media-video').children('video').children('source').attr('src', mediaurl);
                
                $( 'body' ).addClass('open-popup');
                
                jQuery(this).colorbox({
                    className : 'youtube-overlay',
                    width: '100%',
                    height: '100%',
                    opacity: 1,
                    html : '<div id="youtube-player"></div>', 
                    close: '<div class="close-icon"></div>', 
                    overlayClose: true,
                    transition: 'fade',
                    speed: 0,
                    reposition:	true,
                    onComplete: function() {     
                        $('.media-video').appendTo(".media-player"); 
                        $('.player-box')[0].play();

                        $("#cboxWrapper, #cboxContent, #cboxLoadedContent").on("click", function(){
                            $( 'body' ).removeClass('open-popup');

                            $(window).colorbox.close();
                        }).children().on("click", function (e) {
                            e.stopPropagation();
                        });
                    },
                    onCleanup:function(){
                        $('#colorbox .media-video .player-box')[0].currentTime = 0;
                        $('#colorbox .media-video .player-box')[0].pause();
                        $('#colorbox .media-video').appendTo($('.media-box'));
                        $(this).children('.media-box').children('video').children('source').attr('src', '');
                        $( 'body' ).removeClass('open-popup');
                        $("#cboxWrapper").unbind();
                    }
                    
                });

            });
        });   
	});
    function onPlayReady(event) {
        //event.target.mute();
        event.target.playVideo();
    }

});
