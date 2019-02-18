// init speech recognition
var speechStart = function(event) {
  var last = event.results.length - 1;
  var term = event.results[last][0].transcript;
  console.log('Result received: ' + term + '.');
  axios.get('/search', {
      params: {
        q: term
      }
    })
    .then(function (response) {
      console.log(response);
      document.getElementById('gifSpeakImg').src = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

var speechEnd = function() {
  recognition.stop();
  console.log('Speech stopped');
}

var recognition = new webkitSpeechRecognition();
var speechRecognitionList = new webkitSpeechGrammarList();
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.onresult = speechStart;
recognition.onspeechend = speechEnd;

// init listeners
var keydown = false;
window.addEventListener("keydown", function(e) {
  if (e.keyCode == 32 && !keydown) {
    keydown = true;
    recognition.start();
    console.log('Ready to receive a command.');
  }
});

window.addEventListener("keyup", function(e) {
  if (e.keyCode == 32) {
    recognition.stop();
    keydown = false;
    console.log('Done receiving.');
  }
});
