        var maximages;
        var currentimageID;
        
        function ShowPic(n) {
            var b;
            currentimageID = n;
           // get the thumbnail source
           var thumbsource = document.getElementById(n).getAttribute('src');
           // if source contains (V), it is a video
           if (thumbsource.indexOf("(V)") > 0) {
               // create the video file
               var videofile = thumbsource.replace("_T.jpg",".mp4");
               videofile = videofile.replace("thumbnails", "webimages");
               document.getElementById("innerframe").innerHTML = "<video id='currentvid' width='320' height='240' controls autoplay> <source src='" + videofile + "' type='video/mp4'>Your browser does not support the video tag.</video>";
               
            } else {
                    thumbsource = thumbsource.replace("_T.jpg", "_W.jpg");
                    thumbsource = thumbsource.replace("thumbnails", "webimages");
                    
                    document.getElementById("innerframe").innerHTML = "<img id='currentpic' src='" + thumbsource + "' alt='no photo'>";
                    //document.getElementById('currentpic').setAttribute('src', thumbsource);
           }
            // put the alt text into the caption
            var altcap = document.getElementById(n).getAttribute('alt');
            document.getElementById('logo').innerHTML = altcap;
            
        }
        function InitImages(n){
            maximages = n;
            ShowPic(1);
        }
        function NextImage(n) {
            var newID;
            // get the next image name
            newID = currentimageID + n;
            if (newID > maximages) newID = 1;
            if (newID < 1) newID = maximages;
            ShowPic(newID);
        }
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);

var xDown = null;                                                        
var yDown = null;
var xUp = null;                                                        
var yUp = null;
var touched = null;

function getTouches(evt) {
  return evt.touches;             // browser API
// || evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];   
    // ignore touches that start in nav area
    if (firstTouch.clientX < 230) return;
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;
    xUp = xDown;
    yUp = yDown;
};                                                

function handleTouchMove(evt) {
    // track finger movement
    xUp = evt.touches[0].clientX;                                    
    yUp = evt.touches[0].clientY;    
}

function handleTouchEnd(evt) {
    if ( !xDown || !xUp  || !yUp || !yDown) {
        // abort the whole swipe
        xDown = null;
        yDown = null;
        xUp = null;
        yUp = null;
        return;
    }

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 50 ) {
            /* left swipe with de-glitch */ 
            NextImage(1);
        } else  if (xDiff < -50 ){
            /* right swipe with de-glitch */
           NextImage(-1);
        }                       
//   } else {
//        if ( yDiff > 0 ) {
            /* up swipe */ 
//        } else { 
            /* down swipe */
//        }                                                                 
    }
    //document.getElementById('logo').innerHTML = 'xDown: ' + xDown + 'Xup: ' + xUp;
    /* reset values */
        xDown = null;
        yDown = null;
        xUp = null;
        yUp = null;
};
