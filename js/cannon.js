// global variable cannon
cannon = (function() {
  var cannonAudio = new Audio("audio/cannon4.wav")  // resource
  cannonAudio.volume = 0.5  // default volume

  // set up audio queue
  var cannonQueue = [cannonAudio]
  var cannonTracker = 0

  // create a big queue of cannon sounds
  for (var i = 0; i < 25; i++) {
    cannonQueue.push(cannonQueue[0].cloneNode())
  }

  var load = function(callback) {
    $(cannonAudio).bind("canplaythrough", function() {
      callback()
    })
    cannonAudio.preload = 'auto'
    cannonAudio.load()
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
