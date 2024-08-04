


const scriptsInEvents = {

	async EventSheet1_Event4(runtime, localVars)
	{



function func(){
const currentScoreSpan = document.getElementById('current-score');
    let currentScore = 0;
	 let authToken = "";

    const authStatus = document.getElementById('auth-status');
    const authDataDiv = document.getElementById('auth-data');
// 	const currentScoreSpan = document.getElementById('current-score');
// 	let currentScore = 0;

console.log("before");

// Telegram.WebApp.ready();
// const authData = Telegram.WebApp.initData;

runtime.globalVars.authDataVar = window.authData;
authDataDiv.innerText = "authData "+window.authData;
console.log("after");


fetch('https://popular-hyena-proven.ngrok-free.app/auth/telegramAuth', { // Update this URL to your backend endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      // credentials: 'include',
      body: new URLSearchParams({ data: window.authData }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        authStatus.innerText = 'Authorization failed!';
        console.error('Authorization failed:', data.error);
		alert('Authorization failed:', data.error)
      } else {
        authStatus.innerText = 'Authorization succeeded!';
//         gameDiv.style.display = 'block';
        console.log('Authorization succeeded:', data);
        window.authToken = data.token;
		authToken = data.token;// Save the token for later use
        window.userId = data.userId; // Save the userId for later use

        // Display the token for debugging purposes
        alert('JWT Token: ' + authToken);
        console.log('JWT Token:', authToken);

        // Update the current score
        currentScore = data.currentScore;
        currentScoreSpan.innerText = currentScore;
      }
    })
    .catch(error => {
      authStatus.innerText = 'Error during authorization.';
      console.error('Error:', error);
	  alert('error:', error)
    });


}
window.func = func;


    function submitScore() {
	let authToken = window.authToken;
	let user_id = window.userId;
	runtime.globalVars.authToken = window.authToken;
	const currentScoreSpan = document.getElementById('current-score');
    let currentScore = 0;
      alert("userId: ",user_id," And JWT is ",window.authToken);
      fetch('https://popular-hyena-proven.ngrok-free.app/balance/submit', {
        method: 'POST', // Ensure this is a POST request
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ user_id, score: 400 }), // Include userId
        // credentials: 'include' // Ensure cookies are sent with the request
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error updating score:', data.error);
		  alert('Error updating score:', data.error);
        } else {
          console.log('Score updated successfully:', data);
          alert('Score updated successfully! JWT Token: ' + authToken);
          console.log('JWT Token used for updating score:', authToken);
          
          // Re-fetch the updated score from the backend
          fetch('https://popular-hyena-proven.ngrok-free.app/balance/score', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${authToken}` }
          })
          .then(response => response.json())
          .then(scoreData => {
            currentScore = scoreData[0]?.scores || 0;
            currentScoreSpan.innerText = currentScore;
          })
          .catch(error => {
		  console.error('Error fetching updated score:', error)
		  alert('Error fetching updated score:', error, "And jwt is:",window.authToken)});
        }
      })
      .catch(error => {
        console.error('Error submitting score:', error);
        alert('Error submitting score. Please try again.');
      });
    }


window.submitScore = submitScore;



function getScore(){
let authToken = window.authToken;
let currentScore = 0;
alert("fetching Scores and JWT is ", window.authToken," And globalAuth is: ",runtime.globalVars.authToken);
          fetch('https://popular-hyena-proven.ngrok-free.app/balance/score', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${window.authToken}` }
          })
          .then(response => response.json())
          .then(scoreData => {
            currentScore = scoreData[0]?.scores || 0;
//             currentScoreSpan.innerText = currentScore;
			alert("Score is ", currentScore);
          })
          .catch(error => console.error('Error fetching updated score:', error));
}

window.getScore = getScore

	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

