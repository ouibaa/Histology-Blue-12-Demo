function loadSlide() {
  viewer.open(slideData.imgLoc);
  video.src = slideData.videoLoc;
  document.getElementById("slideInfo").innerHTML = slideData.slideDescription;
  console.log("Successfully loaded new slide");
};

function slidePosition() {
  timingList.map(item => {
    var timeData = item[1].split(",").map(Number)
    // console.log(timeData)
    console.log(this.currentTime)
    if (Math.abs(this.currentTime - timeData[0]) < 1.5) {
      moveViewPort(timeData[1], timeData[2], timeData[3]);
    }
  })
}

// do not change anything after this

var viewer = OpenSeadragon({
  id: "openseadragon",
  prefixUrl: "./openseadragon-bin-2.4.1/images/",
  tileSources: ""
});
var viewPort = viewer.viewport;

window.onload = function () {
  video = document.createElement("video");
  video.setAttribute("id", "videoPlayer");
  video.setAttribute("controls", "controls");
  video.addEventListener("timeupdate", slidePosition, false);
  document.getElementById("slideVideo").appendChild(video);
  loadSlide();
};

function moveViewPort(posX, posY, zoomDeg) {
  viewPort.panTo(new OpenSeadragon.Point(posX, posY));
  viewPort.zoomTo(zoomDeg);
}

console.log(slideData);
var timingData = slideData['slideTimings'][0].split("&").map(Number)
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

var timingList = Object.keys(slideData.slideTimings).map(function (key) {
  return [Number(key), slideData.slideTimings[key]];
});