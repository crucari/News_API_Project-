/*global $ APIKEY */
$(document).ready(function() {
	$.ajax({
		method: "GET",
		url: "https://newsapi.org/v2/sources",
		data: {
			category: "general",
			country: "us",
			language: "en",
			apiKey: APIKEY, 
		},
		success: function(data) {
			if (data.status === "ok") {
				console.log(data);
				for (var i = 0; i < data.sources.length; i++) {
					var source = document.createElement("OPTION");
					source.setAttribute("value", data.sources[i].id);
					source.innerHTML = data.sources[i].name;
					document.getElementById("selection").appendChild(source);
				}
			}
		}
	});
	$("#source").submit(function(event) {
		event.preventDefault();
		document.getElementById("headlines").innerHTML = "";
		$.ajax({
			method: "GET",
			url: "https://newsapi.org/v2/top-headlines",
			data: {
				// category: "general",
				sources: document.getElementById("selection").value,
				// country: "us",
				language: "en",
				apiKey: APIKEY, 
			},
			success: function(data) {
				if (data.status === "ok") {
					console.log(data);
					for (var i = 0; i < data.articles.length; i++) {
						var headline = document.createElement("li");
						var description = document.createElement("description");
						headline.setAttribute("class", "headlines");
						var link = data.articles[i].url;
						headline.innerHTML = '<a target="_blank" href= "' + link + '">' + data.articles[i].title + '</a>';
						description.innerHTML = data.articles[i].description;
						var retrieveArticle = document.createElement("button");
						retrieveArticle.setAttribute("id", i);
						retrieveArticle.addEventListener("click", function() {});
						document.getElementById("headlines").appendChild(headline);
						document.getElementById("headlines").appendChild(description);
						document.getElementById("top").innerHTML = "Top Headlines from " + data.articles[i].source.name + ":";
					}
				}
			}
		});
	});
});