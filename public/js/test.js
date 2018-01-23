(function() {
  var Key = function() {

    function sendKeyPress(keypress) {
      document.getElementById("cowport").innerHTML = keypress;
    }

    return {
      sendKeyPress: sendKeyPress
    }

  }

}())
