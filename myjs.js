        var maximages;
        var currentimageID;
        
        function ShowPic(n) {
            var b;
            currentimageID = n;
           // get the thumbnail source
           var thumbsource = document.getElementById(n).getAttribute('src');
           thumbsource = thumbsource.replace("_T.jpg", "_W.jpg");
           thumbsource = thumbsource.replace("thumbnails", "webimages");
            document.getElementById('currentpic').setAttribute('src', thumbsource);
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
var touched = null;

function getTouches(evt) {
  return evt.touches;             // browser API
// || evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;
    touched = 1;
};                                                

function handleTouchMove(evt) {
    
}

function handleTouchEnd(evt) {
    if (! touched) return;
    
//    if ( ! xDown || ! yDown ) {
//        return;
//    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            NextImage(1);
        } else {
            /* right swipe */
           NextImage(-1);
        }                       
//   } else {
//        if ( yDiff > 0 ) {
            /* up swipe */ 
//        } else { 
            /* down swipe */
//        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;   
    touched = null;
};
