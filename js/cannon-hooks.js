// hook events here...

$(function() {
  // load GUI components that require JS
  initializeGUI();

  loadSavedSettings(readSavedSettings());

  $("#button-status, #span-main-status").click(function() {
    clickStatusButton();
  });

  $("#button-settings-ok").click(function() {
    saveSettings()
  });

  $("#button-fire").click(function() {
    fireCannon()
  });

  window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });

});
