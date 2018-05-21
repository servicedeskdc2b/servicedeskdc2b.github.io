$(document).foundation()

var DATALINK = "https://script.google.com/macros/s/AKfycbwsMqnbmvAVEfwymJ6Efv65FImjSMLSQrMhrR5CX70OsFZABt0d/exec";

function parseData() {
	var d = getDataFromTable();
	var json_in = {};
	json_out = {};

	d.then(function(result) {
		json_in = JSON.parse(result)["result"];

		var subjectName = [];
		var firstLvl = [];
		var secondLvl = [];
		var thirdLvl = [];
		var ind = 0;

		for (var i = 0; i < json_in.length; i++) {
			(!(subjectName.indexOf(json_in[i][0]) != -1)) ? subjectName.push(json_in[i][0]) : false
		}

		var flagValueFirst = json_in[0][0];
		var flagArrayFirst = [];

		for (var i = 0; i < json_in.length; i++) {
			if (json_in[i][0] != flagValueFirst && flagArrayFirst.length != 0) {
				firstLvl.push(flagArrayFirst);
				flagValueFirst = json_in[i][0];
				flagArrayFirst = [];
			}
			if (!(flagArrayFirst.indexOf(json_in[i][1]) != -1)) {
				flagArrayFirst.push(json_in[i][1]);
			}

		}
		firstLvl.push(flagArrayFirst);

		var flagValueSecond = json_in[0][2];
		var flagArraySecond = [];
		
		for (var i = 0; i < json_in.length; i++) {
			if (json_in[i][1] != flagValueSecond && flagArraySecond.length != 0) {
				secondLvl.push(flagArraySecond);
				flagValueSecond = json_in[i][1];
				flagArraySecond = [];
			}
			if (!(flagArraySecond.indexOf(json_in[i][2]) != -1)) {
				flagArraySecond.push(json_in[i][2]);
			}

		}
		secondLvl.push(flagArraySecond);

		var flagValueThird = json_in[0][3];
		var flagArrayThird = [];
		
		for (var i = 0; i < json_in.length; i++) {
			if (json_in[i][2] != flagValueThird && flagArrayThird.length != 0) {
				thirdLvl.push(flagArrayThird);
				flagValueThird = json_in[i][2];
				flagArrayThird = [];
			}
			if (!(flagArrayThird.indexOf(json_in[i][3]) != -1)) {
				flagArrayThird.push(json_in[i][3]);
			}

		}
		thirdLvl.push(flagArrayThird);

		var links = [];

		for (var i = 0; i < json_in.length; i++) {
			var flagLinks = [json_in[i][4], json_in[i][5], json_in[i][6], json_in[i][7], json_in[i][8]];
			links.push(flagLinks);
		}
		addMainPart(subjectName, firstLvl, secondLvl, thirdLvl, links);
	});
}

function addMainPart(subjectName, firstLvl, secondLvl, thirdLvl, links) {
	var mainPart = document.getElementById("subject-block");
	
	addSubjectPart(subjectName, firstLvl, secondLvl, thirdLvl, mainPart, links);
}

function addSubjectPart(subjectName, firstLvl, secondLvl, thirdLvl, element, links) {
	var subjectBtn = ""

	for (var i = 0; i < subjectName.length; i++) {
		subjectBtn = document.createElement("button");
		subjectBtn.type = "button";

		subjectBtn.innerHTML = subjectName[i] + "\n" + firstLvl[i].length;
		subjectBtn.id = "subject-" + i;
		subjectBtn.value = i;
		subjectBtn.className = "topic-part button";
		element.appendChild(subjectBtn, document.body.lastChild);
 	}

 	var subjectArray = document.querySelectorAll('.topic-part');

	subjectArray.forEach( function(elem, ind) {
		elem.addEventListener("click", function() {
			addFirstLvlList(subjectName[ind], elem.value, firstLvl, secondLvl, thirdLvl, links);

			subjectArray.forEach(function(e, i) {
				elem != e ? e.innerHTML = subjectName[i] + "\n" + firstLvl[i].length : false
			});
		});
	});
}


function addFirstLvlList(title, index, firstLvl, secondLvl, thirdLvl, links) {
	var grid = document.getElementById("first-lvl");
	var gridSecondLvl = document.getElementById("second-lvl");
	var gridThirdLvl = document.getElementById("third-lvl");
	grid.className = "show";
	gridSecondLvl.className = "hidden";
	gridThirdLvl.className = "hidden";
	grid.innerHTML = "";

	subjectTitle = document.createElement("div");
	subjectTitle.className = "title";
	subjectTitle.innerHTML = title;

	grid.appendChild(subjectTitle, document.body.lastChild);

	for (var i = 0; i < firstLvl[index].length; i++) {
		oneLvlPartButton = document.createElement("button");
		oneLvlPartButton.type = "button";

		var index = firstLvl.indexOf(firstLvl[index]);
		var elementId = 0;

		for (var j = 0; j < index; j++) {
			elementId += firstLvl[j].length;
		}

		oneLvlPartButton.id = "1lvl-" + (elementId + i);
		oneLvlPartButton.className = "button first-lvl grid-x";

		var name = document.createElement("div");
		name.className = "small-9 lvl-name";
		name.innerHTML = firstLvl[index][i];
		var number = document.createElement("div");
		number.innerHTML = secondLvl[elementId + i].length;
		number.className = "small-1 lvl-number";
		elementId = 0;

		oneLvlPartButton.appendChild(name, document.body.lastChild);
		oneLvlPartButton.appendChild(number, document.body.lastChild);
		grid.appendChild(oneLvlPartButton, document.body.lastChild);
	}

	var elementsArray = document.querySelectorAll('.first-lvl');

	elementsArray.forEach( function(elem, ind) {
		elem.addEventListener("click", function() {
			var firstLvlId = parseInt(elem.id.replace("1lvl-",""));
			firstLvlTitle = firstLvl[index][ind];
			addLvlTwoLvlPart(secondLvl, firstLvlId, elem.id, firstLvlTitle, thirdLvl, links, title);
		});
	});
}

function addLvlTwoLvlPart(secondLvl, index, id, title, thirdLvl, links, subjectName) {
	var gridFirstLvl = document.getElementById("first-lvl");
	gridFirstLvl.className = "hidden";

	var grid = document.getElementById("second-lvl");
	grid.className = "show";

	var backBtn = document.getElementById("back-first-lvl");
	backBtn.innerHTML = subjectName + " / ";
	backBtn.addEventListener("click", function() {
		gridFirstLvl.className = "show";
		grid.className = "hidden";
	});

	var secondLvlObjects = document.getElementById("second-lvl-objects");
	var elementId = 0;
	
	secondLvlObjects.innerHTML = "";
	secondLvlTitle = document.getElementById("second-lvl-title");
	secondLvlTitle.innerHTML = title;

	for (var i = 0; i < secondLvl[index].length; i++) {
		oneLvlPartButton = document.createElement("button");
		oneLvlPartButton.type = "button";

		var flag = secondLvl.indexOf(secondLvl[index]);

		for (var j = 0; j < flag; j++) {
			elementId += secondLvl[j].length
		}

		oneLvlPartButton.id = "2lvl-" + (elementId + i);
		oneLvlPartButton.className = "button second-lvl grid-x";

		var name = document.createElement("div");
		name.className = "small-9 lvl-name";
		name.innerHTML = secondLvl[index][i];
		var number = document.createElement("div");
		number.innerHTML = thirdLvl[elementId + i].length;
		number.className = "small-1 lvl-number";
		elementId = 0;

		oneLvlPartButton.appendChild(name, document.body.lastChild);
		oneLvlPartButton.appendChild(number, document.body.lastChild);
		secondLvlObjects.appendChild(oneLvlPartButton, document.body.lastChild);
	}
	grid.appendChild(secondLvlObjects, document.body.lastChild);

	var elementsArray = document.querySelectorAll('.second-lvl');

	elementsArray.forEach( function(elem, ind) {
		elem.addEventListener("click", function() {
			var secondLvlId = parseInt(elem.id.replace("2lvl-",""));
			secondLvlTitle = secondLvl[index][ind];
			addLvlThreeParts(thirdLvl, secondLvlId, elem.id, secondLvlTitle, links, subjectName, title);
		});
	});
}


function addLvlThreeParts(thirdLvl, index, id, title, links, subjectName, firstLvlName) {
	var revealLvlThird = document.getElementById("third-lvl");
	var thirdLvlObjects = document.getElementById("third-lvl-objects");

	var gridSecondLvl = document.getElementById("second-lvl");
	gridSecondLvl.className = "hidden";

	var grid = document.getElementById("third-lvl");
	grid.className = "show";

	var backBtn = document.getElementById("back-second-lvl");
	backBtn.innerHTML = subjectName + " / " + firstLvlName + " / ";
	backBtn.addEventListener("click", function() {
		gridSecondLvl.className = "show";
		grid.className = "hidden";
	});

	var elementId = 0;
	
	thirdLvlObjects.innerHTML = "";
	thirdLvlTitle = document.getElementById("third-lvl-title");
	thirdLvlTitle.innerHTML = "";
	thirdLvlTitle.innerHTML = title;

	for (var i = 0; i < thirdLvl[index].length; i++) {
		thirdLvlPart = document.createElement("div");

		var flag = thirdLvl.indexOf(thirdLvl[index]);
		var elementId = 0;

		for (var j = 0; j < flag; j++) {
			elementId += thirdLvl[j].length
		}

		thirdLvlPart.id = "3lvl-" + (elementId + i);
		thirdLvlPart.className = "third-lvl grid-x";

		thirdLvlTitle = document.createElement("div");
		thirdLvlTitle.innerHTML = thirdLvl[index][i];
		thirdLvlTitle.className = "small-6 third-title";

		thirdLvlPart.appendChild(thirdLvlTitle, document.body.lastChild);
		thirdLvlObjects.appendChild(thirdLvlPart, document.body.lastChild);
		addLinks(links, elementId + i, thirdLvlPart.id);
	}
	revealLvlThird.appendChild(thirdLvlObjects, document.body.lastChild);
}

function addLinks(links, index, id) {
	var revealLvlThird = document.getElementById(id);
	var linksLabel = document.createElement("div");
	linksLabel.className = "links-label small-6";

	if (links[index][0].length != 0) {
		var sd1 = document.createElement("link");
		sd1.innerHTML = "1 линия";
		sd1.href = links[index][0];
		sd1.className ="button link-btn sd-one small-2 columns";
		linksLabel.appendChild(sd1, document.body.lastChild);
	}

	if (links[index][1].length != 0) {
		var sd2 = document.createElement("link");
		sd2.innerHTML = "2 линия";
		sd2.href = links[index][1];
		sd2.className ="button link-btn sd-two small-2 columns";
		linksLabel.appendChild(sd2, document.body.lastChild);
	}

	if (links[index][2].length != 0) {
		var agent = document.createElement("link");
		agent.innerHTML = "Агент";
		agent.href = links[index][2];
		agent.className ="button link-btn agent small-2 columns";
		linksLabel.appendChild(agent, document.body.lastChild);
	}

	var dateDiv = document.createElement("div");
	var options = {
	  year: 'numeric',
	  month: 'long',
	  day: 'numeric'
	};

	var stringDate = links[index][3];
	if (stringDate.length != 0) {
		var date = new Date(stringDate).toLocaleString("ru", options);
		dateDiv.innerHTML = date;
	} else {
		dateDiv.innerHTML = "В работе";
	}
	dateDiv.className ="date-label small-2 columns";
	linksLabel.appendChild(dateDiv, document.body.lastChild);

	var linksArray = [];
	sd1 != null ? linksArray.push(sd1) : false
	sd2 != null ? linksArray.push(sd2) : false
	agent != null ? linksArray.push(agent) : false

	linksArray.forEach( function(elem, ind) {
		elem.addEventListener("click", function() {
			window.open(elem.href);
		});
	});
	
	revealLvlThird.appendChild(linksLabel, document.body.lastChild);
}

function getDataFromTable() {
	return new Promise(function(resolve, reject) {
	    var xhr = new XMLHttpRequest();
	    xhr.onload = function() {
	      resolve(this.responseText);
	    };
	    xhr.onerror = reject;
	    xhr.open('GET', DATALINK);
	    xhr.send();
	});
}

parseData();