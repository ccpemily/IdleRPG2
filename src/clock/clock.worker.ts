let timer = NaN;

self.onmessage = (msg) => {
    let {enabled, interval} = msg.data;
    if(enabled){
        timer = setInterval(self.postMessage, interval, [{}]);
    }
    else{
        clearInterval(timer);
    }
}