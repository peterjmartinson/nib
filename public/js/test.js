let Key = function() {

  function sendKeyPress(keypress) {
    document.getElementById("cowport").innerHTML = keypress;
  }

  return {
    sendKeyPress: sendKeyPress
  };

};

window.key = new Key;
