window.onload = function()
{
	var links = document.getElementsByName("vmsexport_plaguin");
	
	for (i = 0; i < links.length; i++)
	{		
		var link = document.createElement('a');
		link.href = '#';
		link.textContent = 'link';
		link.addId = links[i].id;

		link.addEventListener('click', function(appIdElement)
		{
			showLabelContent(appIdElement);
		});

		links[i].innerHTML = '';
		links[i].appendChild(link);
		
	}
}

function showLabelContent(appIdElement)
{	
	var appId = appIdElement.currentTarget.addId;
	var dataLabel = document.getElementById("data_" + appId);

	chrome.storage.local.set({"esteri_data":dataLabel.value});	
	window.open("https://test.com/Outsourcing/ewafuxp/newApplication", '_blank');
}