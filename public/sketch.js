// Make sure you move your mouse around

// Open this sketch up 2 times to send video back and forth

//connect to the server
//console.log("we are connected!!")

let socket = io();

socket.on('connected', ()=> {
    console.log("Socket Connected!!!");
    // socket.emit('joined');
});

// socket.on('joined',()=>{
//   console.log("get joined signal");
// });

let myVideo;
let otherVideo;
let myCanvas;

function setup() {
  myCanvas = createCanvas(400, 400);
  myVideo = createCapture(VIDEO);
  myVideo.muted = true;
  myVideo.hide();

  //let ssp = new SimpleSimplePeer(this,"CANVAS",myCanvas);
  // Work-around a bug introduced by using the editor.p5js.org and iFrames.  Hardcoding the room name.
  let p5l = new p5LiveMedia(this,"CANVAS",myCanvas, "p5LiveMediaPeerTestFun");
  p5l.on('stream', gotStream);
}

function draw() {
  background(220);

  image(myVideo,0,0,width,height);
  ellipse(mouseX,mouseY,50,50);

  // Do the threshold 1 time in setup
  loadPixels();
  for (let i = 0; i < pixels.length; i+=4) {
    let r = pixels[i];
    let g = pixels[i+1];
    let b = pixels[i+2];

    if (r+b+g > 200) {
      pixels[i] = 255;
      pixels[i+1] = 255;
      pixels[i+2] = 255;
    } else {
      pixels[i] = 0;
      pixels[i+1] = 0;
      pixels[i+2] = 0;
    }
  }
  updatePixels();


}

// We got a new stream!
function gotStream(stream) {
  // This is just like a video/stream from createCapture(VIDEO)
  otherVideo = stream;
  //otherVideo.id is the unique identifier for this peer
  //otherVideo.hide();
}
