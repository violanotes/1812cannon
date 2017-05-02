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
  var cannonTracker = 0

  // create a big queue of cannon sounds
  for (var i = 0; i < 25; i++) {
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

      if (cannonTracker > 20) {
        cannonQueue.push(cannonQueue[0].cloneNode());  // as sound is playing add another sound to the cannon queue.
      }
      cannonTracker = cannonTracker + 1
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
