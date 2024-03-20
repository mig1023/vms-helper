window.onload = function()
{
	chrome.storage.local.get(["esteri_data"], function (dataValue)
	{
		if ((dataValue["esteri_data"] === "null") || (dataValue["esteri_data"] === undefined))
		{
			return;
		}
		else
		{
			pushData();
		}
	});
}

function pushData()
{
	chrome.storage.local.get(["esteri_data"], function (dataValue)
	{	
		var appId = pushCopypast(dataValue);	
		chrome.storage.local.set({ "esteri_data": "null" });
		
		var practica = document.getElementById('ewafuxp-outcome-param-alphanumeric-idPratica');
		makeHttpRequest(practica.value, appId);
	});
}

function pushCopypast(dataValue)
{
	var line = dataValue["esteri_data"];
	
	if ((line === "null") || (line === undefined))
	{
		alert ("Нет данных для передачи. Возможно, скрипт уже отработал.")
		return;
	}
	
	var arr = line.split('|');
	
	var id = "ERR";

	for (let n = 0; n < arr.length; n += 2)
	{	
		var element_id = arr[n];
		var element_value = arr[n+1];
		
		if (element_id == "ID")
		{		
			id = element_value;
			continue;
		}
		else if (element_id == "VisaTypeID")
		{
			var visto_tipologiaVisto=document.getElementById('visto-tipologiaVisto');
			var option = document.createElement("option");
			
			if (element_value == 'TU')
			{	
				option.text = "TOURISM";
				option.value = "TU";
				visto_tipologiaVisto.add(option);
				visto_tipologiaVisto.value="TU";	
			}
			else if (element_value == 'AF')
			{	
				option.text = "COMMERCIAL AFFAIRS";
				option.value = "AF";
				visto_tipologiaVisto.add(option);
				visto_tipologiaVisto.value="AF";
			}

			continue;
		}
		
		var inputToInsert = document.getElementById(element_id);
		
		if (inputToInsert == null)
			continue;
		
		if (inputToInsert.value == '')
			inputToInsert.value = element_value;
	}
	
	return id;
}

function makeHttpRequest(practica, appId)
{
	fetchResource('https://test.com/link_schengen.htm?practica='+practica+'&appid='+appId, practica, function() {});
}

function fetchResource(input, practica, init)
{
	return new Promise((resolve, reject) =>
	{
		chrome.runtime.sendMessage({input, init}, messageResponse =>
		{
			const [response, error] = messageResponse;
			
			if (response === null)
			{
				reject(error);
			}
			else
			{
				alert("Плагин отработал\nПрактика " + practica);
				
				const body = response.body ? new Blob([response.body]) : undefined;
				
				resolve(new Response(body,
				{
					status: response.status,
					statusText: response.statusText,
				}));
			}
		});
	});
}