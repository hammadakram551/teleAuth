


const scriptsInEvents = {

	async EventSheet1_Event2(runtime, localVars)
	{
		
		
		
		function func(){
			 let authToken = ""
		
		    const authStatus = document.getElementById('auth-status');
		    const authDataDiv = document.getElementById('auth-data');
			const currentScoreSpan = document.getElementById('current-score');
			let currentScore = 0;
		
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
		        authToken = data.token; // Save the token for later use
		//         userId = data.userId; // Save the userId for later use
		
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
		
		
		
		
		
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

