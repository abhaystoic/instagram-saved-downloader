//  Create image from blob (createObjectURL)
function imageFromBlob( blob ){ 
    const img = new Image();
    img.onload = () => URL.revokeObjectURL(img.src);
    img.src = URL.createObjectURL(blob);    
    return img;
}

//  Alternate version adding promise to xhr
//  if you would like to trigger xhr.send() yourself.
function xhrBlob(url){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';        
    xhr.promise = new Promise((resolve, reject) => {
        xhr.onload  = () => resolve(xhr.response);
        xhr.onerror = () => reject(xhr.statusText);  
    });
    xhr.load = ( onsuccess = () => {}, onerror = () => {} ) => { 
        xhr.promise.then(onsuccess).catch(onerror);
        xhr.send();
        return xhr;
    }
    return xhr;
}

var name2 = 0;


function loopAndDownload() {
    console.log('loopAndDownload');
    imgs = document.getElementsByClassName('x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3');
    console.log('Downloading ' + imgs.length);
    Array.from(imgs).forEach((element) => {
        name2 = name2 + 1;
        //  Using load callbacks
        xhrBlob(element.src)
        .load( 
            //  on sussess
            blob => {
                // document.body.appendChild( imageFromBlob(blob) );      
                // Download the blob using a <a> element.
                let a = document.createElement('a');
                a.style = "display: none";
                document.body.appendChild(a);
                let url = URL.createObjectURL(blob);
                a.setAttribute('href', url);
                a.setAttribute('download', name2);
                a.click();
                //release the reference to the file by revoking the Object URL
                window.URL.revokeObjectURL(url);
            },
            //  on error
            error => {
                console.log('Could not load image');
            }
        );
    });
    window.scrollBy(0, 1000);
}


var timesRun = 0;
var interval = setInterval(() => {
    timesRun += 1;
    console.log('timesRun == ' + timesRun);
    if(timesRun === 400){
        clearInterval(interval);
    }
    loopAndDownload();
}, 16000);