function loadSlide(slideName) {
  slideData.map(item => {
    if (item.slideName == slideName) {
      viewer.open(item.imgLoc);
      video.src = item.videoLoc;
      document.getElementById("slideInfo").innerHTML = item.slideDescription;
      document
        .getElementById("videoTab")
        .getElementsByClassName("mydivheader")[0].innerHTML = item.videoTitle;
      document
        .getElementById("histology")
        .getElementsByClassName("mydivheader")[0].innerHTML = item.imgTitle;
      console.log("Successfully loaded new slide");
    }
  });

  // alert(
  //   "You clicked on slide " +
  //     slideName +
  //     " however we currently don't have that slide available"
  // );
}

function slidePosition() {
  if (this.currentTime > 2 && this.currentTime < 3) {
    moveViewPort(0.3, 0.3, 5);
  } else if (this.currentTime > 5 && this.currentTime < 6) {
    moveViewPort(0.7, 0.1, 2);
  } else if (this.currentTime > 10 && this.currentTime < 11) {
    moveViewPort(0.7, 0.19, 5);
  }
}

// do not change anything after this

var viewer = OpenSeadragon({
  id: "openseadragon",
  prefixUrl: "./openseadragon-bin-2.4.1/images/",
  tileSources: "./Histology slide A/histologyA/rim.xml"
});
var viewPort = viewer.viewport;

window.onload = function () {
  video = document.createElement("video");
  video.setAttribute("id", "Myvideo");
  video.setAttribute("controls", "controls");
  video.src = "./Histology slide A/videoA/Histology of the Kidney.mp4";
  video.addEventListener("timeupdate", slidePosition, false);
  document.getElementById("myVideo").appendChild(video);
  loadSlide("ye17");
};

function moveViewPort(posX, posY, zoomDeg) {
  viewPort.panTo(new OpenSeadragon.Point(posX, posY));
  viewPort.zoomTo(zoomDeg);
}

console.log(slideData);

// Make the DIV element draggable:
dragElement(document.getElementById("videoTab"));
dragElement(document.getElementById("histology"));
dragElement(document.getElementById("infoTab"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//function to output points on the slide
var update_points = setInterval(function () {
  console.log(
    "(x, y, zoom) is " +
    Math.round(viewPort.getCenter().x * 100) / 100 +
    ", " +
    Math.round(viewPort.getCenter().y * 100) / 100 +
    ", " +
    Math.round(viewPort.getZoom() * 100) / 100
  );
}, 3000);