// common-deferred-scripts.js
// Defect 9759
// Defect 10393
// changed for defect 11095 - only change the links in the 'page-link' span (replaces changes for 10393 and 9759)

// CQ22267 - displaytable.properties now includes a property, "basic.header", that permits custom table headers
// which makes this first block of static code moot.

// CQ21618 - DisplayTable's sortable column links are being missed in the below page-link logic
// Unfortunately, there is no displaytable.properties to configure the column sortable links
// So, we do a little DOM manipulation and move the anchor tag into a span tag to match the pagination links.
// This way, they will also get disabled when the page-link logic runs.
//var ths = document.getElementsByTagName("th");
//CQ22294 - change the variable name from 'i', as it is put in global scope, and messes with the groupMove screen. (which also has a variable named 'i' in global scope)
//for (var thsIndex=0; thsIndex < ths.length; thsIndex++) {
//	var className = "" + ths[thsIndex].className;
//	if (className.match(/sortable/)) {
//		var span = document.createElement('span');
//		span.className = 'page-link';
//		ths[thsIndex].appendChild(span);
//
//		var as = ths[thsIndex].getElementsByTagName('a');
//		for (var j=0; j<as.length; j++) {
//			span.appendChild(as[j]);
//		}
//	}
//}

//find all of the span elements in the document
var findStack = [], allel = document.getElementsByTagName("span");
var len = allel.length;
//alert(len);
for(var a = 0; a<allel.length; a++) {
	//match all of the spans that are type 'page-link' (pagination span for display tables)
	if(allel[a].className == 'page-link'){
		//alert("matched");
		var cells = allel[a].getElementsByTagName('a');
		var old;
		for (var eCount = 0; eCount < cells.length; eCount++) {
			//match all of the href tags within the 'page-link' span and replace the link with special javascript link disabling
			old = cells[eCount].getAttribute("href");
			// CQ23416 - URL had special characters (i.e. single quote ') that was breaking the link
			//Jan 7 2012 - changed from encodeURI to escape (according to w3 schools same function just covers more special chars)
			old = escape(old);
			//fix for defect 12707 - we are wrapping the location reset into a function so we can override the url.
			// For CQ26368 (CQ23416): Delimeted URL with double quotes because encoded single quote is decoded before being passed
			// to resetUrl() function causing string to be ended prematurely and generating javascipt error: Expected ')'
			cells[eCount].setAttribute("href", "javascript:getElementsOfTheClassName('page-link');resetUrl(\"" + old + "\");");
			
			old = cells[eCount].getAttribute("onclick");
			cells[eCount].setAttribute("onclick", "if (hasDisabledClass(this)) return false; " + old);
		}
	}
}



