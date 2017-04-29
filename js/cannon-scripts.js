// try declaring events...

// actions

function initializeGUI() {
  // Don't use the slider implementation for now
  // $('#slider-volume').slider({
  //   formatter: function(value) {
  //     return 'Current value: ' + value;
  //   }
  // });
}

function readSavedSettings() {
  // try to read cookies:
  // return defaults where no cookies found
  var settings = getDefaultSettings()

  if ($.cookie("volume") !== undefined) settings["volume"] = $.cookie("volume")
  if ($.cookie("enabled") !== undefined) settings["enabled"] = $.cookie("enabled") !== "false"

  return settings
}

function getDefaultSettings() {
  return {volume: 20, enabled: true}
}

function writeSavedSettings(settings) {
  console.log("saving settings: " + JSON.stringify(settings))
  $.cookie("volume", settings["volume"])
  $.cookie("enabled", settings["enabled"])
}

function clearSavedSettings() {

}

function loadSavedSettings(settings) {
  // create or modify global variable
  globalSettings = settings

  afterLoadSavedSettings()
}

function afterLoadSavedSettings() {
  // set initial state of stateful elements
  console.log("read settings: " + JSON.stringify(globalSettings))

  // volume setting
  setInitialVolumeDOM(globalSettings["volume"])

  // status setting
  setStatusGUI(globalSettings["enabled"])
  setInitialStatusDOM(globalSettings["enabled"])


}

function setInitialVolumeDOM(volume) {
  $("#slider-volume").attr("value", volume)
}

function setVolumeDOM(volume) {
  $("#slider-volume").attr("value", volume)
}

function setStatusGUI(enabled) {
  // enabled setting
  if (enabled) {

    $("#button-fire").removeClass("disabled")

    $("#icon-main-status").removeClass("glyphicon-ban-circle")
    $("#icon-main-status").removeClass("glyphicon-flash")
    $("#icon-main-status").addClass("glyphicon-flash")
    $("#icon-main-status").css("color", "red");

    $("#icon-settings-status").removeClass("glyphicon-ban-circle")
    $("#icon-settings-status").removeClass("glyphicon-flash")
    $("#icon-settings-status").addClass("glyphicon-flash")
    $("#icon-settings-status").css("color", "red");

    $("#text-settings-status").text("Enabled")
    $("#text-main-status").text("Enabled")
    $("#button-status").text("Click to Disable")
  } else {

    $("#button-fire").addClass("disabled")

    $("#icon-main-status").removeClass("glyphicon-ban-circle")
    $("#icon-main-status").removeClass("glyphicon-flash")
    $("#icon-main-status").addClass("glyphicon-ban-circle")
    $("#icon-main-status").css("color", "#555");

    $("#icon-settings-status").removeClass("glyphicon-ban-circle")
    $("#icon-settings-status").removeClass("glyphicon-flash")
    $("#icon-settings-status").addClass("glyphicon-ban-circle")
    $("#icon-settings-status").css("color", "#555");

    $("#text-settings-status").text("Disabled")
    $("#text-main-status").text("Disabled")
    $("#button-status").text("Click to Enable")
  }
}

function setInitialStatusDOM(enabled) {
  $("#checkbox-status").prop("checked", enabled)
  console.log("checkbox attr: " + $("#checkbox-status").attr("checked"))
  console.log("checkbox prop: " + $("#checkbox-status").prop("checked"))
}

function setStatusDOM(enabled) {
  $("#checkbox-status").prop("checked", enabled)
}

function fireCannon() {

  if ($("#checkbox-status").prop("checked")) {
    beforeFireCannon()

    // do stuff
    console.log("fireCannon()")

    afterFireCannon()
  }
}

function beforeFireCannon() {

}

function afterFireCannon() {

}

function clickStatusButton() {
  setStatusDOM(!$("#checkbox-status").prop("checked"))
  console.log("clickStatusButton finished setStatusDOM(): " + $("#checkbox-status").prop("checked"))
  $("#checkbox-status").prop("checked") ? enableCannon() : disableCannon()
}

function disableCannon() {
  console.log("disableCannon()")
  setStatusGUI(false)
}

function afterDisableCannon() {

}

function enableCannon() {
  console.log("enableCannon()")
  setStatusGUI(true)
}

function afterEnableCannon() {

}

function afterChangeVolume() {

}

function afterChangeAnySetting() {

}

function saveSettings() {
  beforeSaveSettings()

  // do stuff
  var settings = getCurrentSettings()
  writeSavedSettings(settings)

  afterSaveSettings()
}

function getCurrentSettings() {
  var settings = {}
  settings["volume"] = $("#slider-volume").val()
  settings["enabled"] = $("#checkbox-status").prop("checked")
  console.log("current settings: " + JSON.stringify(settings))

  return settings;
}

function beforeSaveSettings() {

}

function afterSaveSettings() {
  // confirm cookies:
  loadSavedSettings(readSavedSettings())
}

function cancelSettings() {

}

function beforeCancelSettings() {

}

function afterCancelSettings() {

}

function beforeShowSettings() {

}

function afterShowSettings() {

}

function beforeShowMainFromSettings() {

}

function afterShowMainFromSettings() {

}
