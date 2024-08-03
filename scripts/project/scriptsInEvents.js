


const scriptsInEvents = {

	async EventSheet1_Event2(runtime, localVars)
	{
		
		
		
		function func(){
		
		console.log("before");
		
		Telegram.WebApp.ready();
		const authData = Telegram.WebApp.initData;
		
		runtime.globalVars.authDataVar = authData;
		
		console.log("after");
		}
		window.func = func;
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

