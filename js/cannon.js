// global variable cannon
cannon = (function() {
  var cannonAudio = new Audio()  // resource
  cannonAudio.volume = 0.5  // default volume

  if (!!(cannonAudio.canPlayType && cannonAudio.canPlayType('audio/wav;').replace(/no/, ''))) {
    console.log("can play wav")
    cannonAudio.src = "audio/cannon4.wav"
  } else if(!!(cannonAudio.canPlayType && cannonAudio.canPlayType('audio/mpeg;').replace(/no/, ''))) {
    console.log("can play mpeg")
    cannonAudio.src = "audio/cannon4.mp3"
  } else {
    showBrowserUnsupported()
  }

  // browser-unsupported-message


  // set up audio queue
  var cannonQueue = [cannonAudio]
  var cannonCount = 50
  var cannonTracker = 0

  // create a big queue of cannon sounds
  for (var i = 0; i < cannonCount; i++) {
    cannonQueue.push(cannonQueue[0].cloneNode())
  }

  var load = function(callback) {
    $(cannonAudio).bind("canplaythrough", function() {
      cannonAudio.volume = currentSettings["volume"] / 100
      callback()
    })
    $(cannonAudio).bind("onloadeddata", function() {
      cannonAudio.volume = currentSettings["volume"] / 100
      callback()
    })
    cannonAudio.preload = 'auto'
    try {
      cannonAudio.load()
    } catch (e) {
      showBrowserUnsupported()
      $("#debug-text").append("ERROR: " + e)
    }
  }

  var fire = function() {
    if (currentSettings["enabled"] == true) {
      cannonQueue[cannonTracker].play();  // play sound

      cannonTracker === cannonCount - 1 ?
        cannonTracker = 0 : cannonTracker = cannonTracker + 1
    }
  }

  var changeVolume = function(volume) {
    for (var i = 0; i < cannonQueue.length; i++) {
      console.log("setting audio item " + i + " to volume " + (volume / 100));
      cannonQueue[i].volume = volume / 100;
    }
  }

  var returnObject = {
    "fire": fire,
    "changeVolume": changeVolume,
    "load": load
  }
  return returnObject
})()
