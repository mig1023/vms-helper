
	window.onload = function() {
		
		chrome.storage.local.get(["esteri_data"],function (dataValue){
			
			if ((dataValue["esteri_data"] === "null") || (dataValue["esteri_data"] === undefined)) {
				
				return;
			}
			else {
				var practica = document.getElementById('ewafuxp-outcome-param-alphanumeric-idPratica');
				window.location.replace("https://test.com/Outsourcing/ewafuxp/alphanumeric/update?idPratica=" + practica.value);
			}
		});
	}