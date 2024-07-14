
var currentUtterance; // Global variable to hold the current utterance

function speak(text) {
    // Check if the browser supports speech synthesis
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        if (currentUtterance) {
            window.speechSynthesis.cancel();
        }

        // Create a new SpeechSynthesisUtterance instance
        currentUtterance = new SpeechSynthesisUtterance(text);
        
        // Set the language to Indian English
        currentUtterance.lang = 'en-IN'; // Language: Indian English
        currentUtterance.pitch = 1;      // Pitch (0 to 2)
        currentUtterance.rate = 1.1;       // Rate (0.1 to 10)
        currentUtterance.volume = 1;     // Volume (0 to 1)
        
        // Speak the utterance
        window.speechSynthesis.speak(currentUtterance);
    } else {
        console.log("Speech synthesis is not supported in this browser.");
    }
}

async function getResponse() {
    const name = document.getElementById("name").value;
    const problem = document.getElementById("problem").value;

    const responseDiv = document.getElementById("response");
    responseDiv.innerHTML = "Loading...";

    const response = await fetch(
      "https://govindji.onrender.com/getResponse",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, problem }),
      }
    );

    const text = await response.text();
    speak(text)
    responseDiv.innerHTML = text;
}

// Add the event listener to cancel speech on page unload
window.addEventListener("beforeunload", () => {
    if (currentUtterance) {
        window.speechSynthesis.cancel();
    }
});
