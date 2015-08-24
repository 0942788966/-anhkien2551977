console.log("hello");

var audio; 
var audio_text;
var audio_toggle

window.onload = function() {
  audio = document.getElementById("audio_widget");
  audio_toggle = document.getElementById("mute");
  audio_text = document.getElementById("mute_text");

  audio.loop = true;
  audio.play();

  audio_toggle.onclick = function() {
    if (audio.paused) {
      audio.play();
      audio_text.textContent = "Mute";

    } else {
      audio.pause();
      audio_text.textContent = "Unmute";
    }
  };

}
