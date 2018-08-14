/** Rounds a decimal to the specified number of significant digits
*/

function addUrlParam(url, param, value) {
     var a = document.createElement('a');
     a.href = url;
     a.search += a.search.substring(0,1) == "?" ? "&" : "?";
     a.search += encodeURIComponent(param);
     if (value)
         a.search += "=" + encodeURIComponent(value);
    return a.href;
}



function roundDecimal(num,decimalPlaces) {
	var toReturn = Math.round(num*Math.pow(10,decimalPlaces))/Math.pow(10,decimalPlaces);
	return toReturn;
}

function MM_goToURL() { //v3.0
	var i, args=MM_goToURL.arguments; document.MM_returnValue = false;
	for (i=0; i<(args.length-1); i+=2) eval(args[i]+".location='"+args[i+1]+"'");
}

function MM_preloadImages() { //v3.0
	var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
	var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
	var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
	if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
		document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
	else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);





function MM_showHideLayers() { //v6.0
	var i,p,v,obj,args=MM_showHideLayers.arguments;
	for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) {
		v=args[i+2];
		if (obj.style) {
			if (typeof(window.event) != "undefined") {// IE only
				obj.style.left = window.event.clientX+'px';
			}
			else { // FF - need to pass in Event as a parameter

			}
			obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v;

		}
		obj.visibility=v;
	}
}

/*
	Please keep the following lines visible, in recognition of my work...
	************************
	Author: Max Holman <max@blueroo.net>
	Date  : Sun, 21 Jan 2001
	************************
	This functions lets users type in letters to select an option in your SELECT form fields.
	Usually the browser only takes notice of single keystrokes and switches to the first Option that
	begins with that letter.
	This scripts buffers the users input and compares it against the OPTIONs in the SELECT field,
	choosing the closest match as you type
	Usage:	<select onkeypress="return shiftHighlight(event.keyCode, this);">
*/
var timerid     = null;
var matchString = "";
var mseconds    = 2000;	// Length of time before search string is reset
var currentTarget = null;

function shiftHighlight(keyCode,targ, disableOnChangeFiring) {
	var foundOption = false;
	if(currentTarget != targ) {
		if(timerid != null) {
			clearTimeout(timerid); // Clear the timeout
			matchString = "";
		}
	}
	currentTarget = targ;

	var keyVal      = String.fromCharCode(keyCode); // Convert ASCII Code to a string
	matchString = matchString + keyVal; // Add to previously typed characters

	var elementCnt  = targ.length - 1;	// Calculate length of array -1

	for (i = elementCnt; i > 0; i--) {
		selectText = targ.options[i].text.toLowerCase(); // convert text in SELECT to lower case

		if (selectText.substr(0,matchString.length) == 	matchString.toLowerCase()) {
			targ.options[i].selected = true; // Make the relevant OPTION selected
			foundOption = true;
		}
	}

	clearTimeout(timerid); // Clear the timeout
	timerid = setTimeout('matchString = ""',mseconds); // Set a new timeout to reset the key press string


	if(!disableOnChangeFiring) {
		if(foundOption && targ.onchange) {
			targ.onchange();
		}
	}

	return false; // to prevent IE from doing its own highlight switching
}

function multyTypeAhead(keyCode,targ) {

	var keyVal  = String.fromCharCode(keyCode); // Convert ASCII Code to a string
	matchString = matchString + keyVal; // Add to previously typed characters
        //alert("###matchString=["+matchString+"]");
	var elementCnt  = targ.length - 1;	// Calculate length of array -1
	//CQ15950 - track if we found a result already
	var foundMatch = false;

	for (i = 0; i <= elementCnt; i++) {
		selectText = targ.options[i].text.toLowerCase(); // convert text in SELECT to lower case
		targ.options[i].selected = false; // Make another OPTION deselected
		if (!foundMatch && (selectText.substr(0,matchString.length) == 	matchString.toLowerCase())) {
		       // alert("###selectText["+i+"]="+selectText);
			targ.options[i].selected = true; // Make the relevant OPTION selected
			targ.options[i].focus();
			//CQ15950 - need to keep searching the box, so we keep deselecting the other options
			//break;
			//CQ15950 - add that we found a match, so we don't keep matching the same phrase on more than one option
			foundMatch = true;
		}
	}

	clearTimeout(timerid); // Clear the timeout
	timerid = setTimeout('matchString = ""',mseconds); // Set a new timeout to reset the key press string

	return false; // to prevent IE from doing its own highlight switching
}

function focusElement(elementID) {
	var element = document.getElementById(elementID);

	if(element != null) {
		try{
			element.focus();
		} catch(e){
		}
	}
}

function showElement(elementID, display) {
	var element = document.getElementById(elementID);
	if (display == null)
		display='inline';

	if(element != null) {

		element.style.display=display;




			element.style.visibility='inherit';

	}
}


function hideElement(elementID) {
	var element = document.getElementById(elementID);

	if(element != null) {
		if (element.style.visibility != 'hidden')
		{
			element.style.display='none';

			element.style.visibility='hidden';
		}


	}
}
// BUG FIX FOR OMNI00001122

function customCompare(firstElement, secondElement)
{
  var retValue = 0;
  if (firstElement == null)
  {
      retValue = 0;
   }
   else if (secondElement == null)
   {
      retValue = -1;
   }
   else if (firstElement == null && secondElement == null)
   {
      retValue = 0;
   }

   if ( typeof(firstElement) == 'string' && typeof(secondElement) == 'string')
   {
       if ( firstElement.toLowerCase() < secondElement.toLowerCase())
       {
         retValue = -1;
       }
       else if ( firstElement.toLowerCase() > secondElement.toLowerCase())
       {
         retValue = 1;
       }
       else if (firstElement.toLowerCase() == secondElement.toLowerCase())
       {
       	  retValue = 0;
       }
   }

   return retValue;
}
function trimAll(sString)
{
while (sString.substring(0,1) == ' ')
{
sString = sString.substring(1, sString.length);
}
while (sString.substring(sString.length-1, sString.length) == ' ')
{
sString = sString.substring(0,sString.length-1);
}
return sString;
}
// END FIX
<!-- Original:  Phil Webb (phil@philwebb.com) -->
<!-- Web Site:  http://www.philwebb.com -->

<!-- This script and many more are available free online at -->
<!-- The JavaScript Source!! http://javascript.internet.com -->

function moveList(frbox, tobox) {
	var fbox = document.getElementById(frbox);
	var tbox = document.getElementById(tobox);
	var arrFbox = new Array();
	var arrTbox = new Array();
	var i;

	for (i = 0; i < tbox.options.length; i++) {
		arrTbox[i] = tbox.options[i];
	}

	var fLength = 0;
	var tLength = arrTbox.length;
	for(i = 0; i < fbox.options.length; i++) {
		if (fbox.options[i].selected && fbox.options[i].value != "") {
			arrTbox[tLength] = fbox.options[i];
			tLength++;
		} else {
			arrFbox[fLength] = fbox.options[i];
			fLength++;
		}
	}
	arrFbox.sort(optionCompare);
	arrTbox.sort(optionCompare);

	fbox.length = 0;
	tbox.length = 0;
	var c;
	for(c = 0; c < arrFbox.length; c++) {
		var no = new Option();
		no.text = arrFbox[c].text;
		no.value = arrFbox[c].value;
		no.defaultSelected = true;
		no.selected = false;
		if(no.value != null) {
			fbox[c] = no;
		}
	}

	for(c = 0; c < arrTbox.length; c++) {
		var no = new Option();
		no.text = arrTbox[c].text;
		no.value = arrTbox[c].value;
		no.defaultSelected = true;
		no.selected = false;
		if(no.value != null) {
			tbox[c] = no;
		}
	}
}

function optionCompare(option1, option2)
{
  var retValue = 0;
  if (option1 == null || option1.text)
  {
      retValue = 0;
   }
   else if (option2 == null || option2.text)
   {
      retValue = -1;
   }
   else if (option1 == null && option2 == null)
   {
      retValue = 0;
   }

   if ( typeof(option1.text) == 'string' && typeof(option2.text) == 'string')
   {
       if ( option1.text.toLowerCase() < option2.text.toLowerCase())
       {
         retValue = -1;
       }
       else if ( option1.text.toLowerCase() > option2.text.toLowerCase())
       {
         retValue = 1;
       }
       else if (option1.text.toLowerCase() == option2.text.toLowerCase())
       {
       	  retValue = 0;
       }
   }

   return retValue;
}

function getSelectedOptionIdFromList(objSelectList) {
	var num = objSelectList.options.length;
	for (var i = 0; i < num; i++) {
		if(objSelectList.options[i].selected) {
			return objSelectList.options[i].value;
		}
	}
	return "";
}

function getSelectedOptionTextFromList(objSelectList) {
	var num = objSelectList.options.length;
	for (var i = 0; i < num; i++) {
		if(objSelectList.options[i].selected) {
			return objSelectList.options[i].text;
		}
	}
	return "";
}

function selectOptionInList(objList, newSelectedId) {
	var len = objList.options.length;
	if (len > 0) {
		for (var i = 0; i < len; i++) {
			if(objList.options[i].value == newSelectedId) {
				objList.options[i].selected = true;
				break;
			}
		}
	}
}

function selectAllOptions(objList) {
	var len = objList.options.length;
	if (len > 0) {
		for (var i = 0; i < len; i++) {
			objList.options[i].selected = true;
		}
	}
}

function moveAllList(fromList,toList){
    selectAllOptions(document.getElementById(fromList));
    moveList(fromList, toList);
}



var currentOmniForm = null;
var hasCurrentOmniFormSubmitted = false;
var hasWarningMessageForFormChangedOccurred = false;

//CR 4395
function setCurrentForm(objForm) {
	currentOmniForm = objForm;
}

function onFormChangeInit(objForm) {
	if(objForm != null) {
		currentOmniForm = objForm;
		addEvent(window, 'load', addOnFormChangeListeners, false);

		//DISABLED: Works with onbeforeunload event
		//addEvent(currentOmniForm, 'submit', onSubmitEventHandler, false);
		//window.onbeforeunload = onBeforeUnloadEventHandler;
	} else {
		currentOmniForm = null;
	}
}

/**
* New method to replace the previous one (onFormChangeInit) which does a better job of handling the change events
*
* This implementation will add an onChange event to every
* element on the form instead of simply adding an onClick event to the form element itself.  The
* original implementation does not properly handle change events (ie. a user changes a text field and clicks outside
* of the form and submits the form)
*/
// This variable is to track how we initialized the form.  By initializing using this method,
// we no longer do complete DOM scans looking for changes, but rely on each elements onchange
// event listener to set isDirty appropriately.
var usedFormElementChangeInit = false;
function onFormElementChangeInit(form) {
	usedFormElementChangeInit = true;
	currentOmniForm = form;

	// This does not work for IExplorer. MSDN - "The submit method does not invoke the onsubmit event handler."
	//addEvent(form, 'submit', submitEvent, false);
	if (typeof form != 'undefined' && typeof form.elements != 'undefined') {
		
		var elems = getInputElements(form);
		
		for ( j=0;j< elems.length; j++ ) {
			var elem = elems[j];
			addEvent(elem, 'change', onElemChangeEvent, false);
		}
	}
}

// finds all enabled child form elements inside this parent object
function getInputElements(parent) {
	//CQ28461 - make the for-loop more efficient by not selecting types we don't want (ie. hidden, submit, image, etc...)
	var p = $(parent);
	var elems = p.find('input:enabled[type=text]');
	elems = $.merge(elems, p.find('input:enabled[type=checkbox]'));
	elems = $.merge(elems, p.find('input:enabled[type=radio]'));
	elems = $.merge(elems, p.find('input:enabled[type=file]'));
	elems = $.merge(elems, p.find('input:enabled[type=password]'));
	elems = $.merge(elems, p.find('select:enabled'));
	elems = $.merge(elems, p.find('textarea:enabled'));
	return $(elems);
}

function removeOnFormElementChangeListener(elementName){
	var elm = document.getElementById(elementName);
	if (elm != null) { // Fixed NPE
		if (elm.addEventListener) {
			elm.removeEventListener('change', onElemChangeEvent, false);
		}
		else if (elm.attachEvent) {
			elm.detachEvent('on' + 'change', onElemChangeEvent);
		}
	}
}

// Add Listener for capturing on form changes
function addOnFormChangeListeners(e) {
	addEvent(currentOmniForm, 'click', onFormChangeClickEvent, false);
}

function onSubmitEventHandler (evt) {
	hasCurrentOmniFormSubmitted = true;
}

function onBeforeUnloadEventHandler (evt) {
   if(hasCurrentOmniFormSubmitted != true) {
	  if(hasWarningMessageForFormChangedOccurred != true) {
		  if(hasFormBeenChanged()) {
			  var message = "** Your changes have not yet been saved **";
			  if (typeof evt == 'undefined') {
			    evt = window.event;
			  }
			  if (evt) {
			    evt.returnValue = message;
			  }
			  return message;
		  }
	  }
   }
}

	function onWindowClose()
	{
		if(window.screenLeft >screen.width){
			//browser is closed
			//alert("goodbye goober");
		}
		else{
			//	refresh
			window.refresh();
			}
	}

function onFormChangeClickEvent() {

	var objForm = currentOmniForm;

	if(objForm != null && objForm.isDirty != null) {
		if(objForm.isDirty.value != "true") {
			if(hasFormChanged(objForm)) {
				objForm.isDirty.value = 'true';
			}
		}
		//alert("onFormChangeClickEvent.isDirty="+objForm.isDirty.value);
	}
}

/** Dirty the form if a change has occured on the element*/
function onElemChangeEvent(event) {
	var elem = event.srcElement; // IExplorer
	if (elem == null)
		elem = event.target; // Firefox
	updateIsDirty(elem);
}

/** Updates isDirty on the currentOmniForm if the specified elem has changed. */
function updateIsDirty(elem) {
	if(currentOmniForm != null && currentOmniForm.isDirty != null) {
		if(currentOmniForm.isDirty.value != "true") {
			if(hasElemChanged(elem)) {
				currentOmniForm.isDirty.value = 'true';
				$(currentOmniForm.isDirty).trigger('change');
			}
		}
	}
}

//Add Event function
function addEvent(elm, evType, fn, useCapture)
{
	// cross browser event handling for IE 5+, NS6+ and Gecko
	if (elm.addEventListener)
	{
		elm.addEventListener(evType, fn, useCapture);
		return true;
	}
	else if (elm.attachEvent)
	{
		var r = elm.attachEvent('on' + evType, fn);
		return r;
	}
	else
	{
		elm['on' + evType] = fn;
	}
}

function hasFormBeenChanged() {
	var localForm = null;

	if(currentOmniForm != null) {
		localForm = currentOmniForm;
	}
	if(localForm != null) {

		if((localForm.isDirty && localForm.isDirty.value == 'true') || hasFormChanged(localForm) || hasElemChanged(document.activeElement)) {
			return true;
		}
	}
	return false;
}

/**
 * Checks if the form has been changed if so, displays confirm dialog
 */
function checkFormChanged(objForm) {

	var localForm;
	var showMessage = false;
	var recalcVariableDefined = false;
	if (objForm != null) {
		localForm = objForm;
	} else {
		localForm = currentOmniForm;
	}
	if (localForm != null) {
		<!-- Bug fix: OMNI00003444 -->
		if (localForm.needsRecalc) {
			if (localForm.needsRecalc.value == 'true') {
				var confirmMessage  = "If you have entered, updated or modified any data that will calculate or change the ERD, you must invoke the calculate process before leaving this page.\n";
				confirmMessage     += " ** Sentence calculations are not up-to-date **\n\n";
				confirmMessage     += "Click Cancel to return to the screen to recalculate before navigating from this page.\n\n";
				confirmMessage     += "Click OK to proceed without recalculating.";
				showMessage = true;
			}
			recalcVariableDefined = true;
		}
		if ((localForm.isDirty && localForm.isDirty.value == 'true') || (!recalcVariableDefined && hasFormChanged(localForm))) {
			//debug stuff
			//alert("localForm.isDirty: "+localForm.isDirty);
			//alert("localForm.isDirty.value: "+localForm.isDirty.value);
			//alert("recalcVariableDefined: "+recalcVariableDefined);
			//alert("hasFormChanged(localForm): "+hasFormChanged(localForm));

			var confirmMessage  = getIsDirtyConfirmMessage();
			showMessage = true;
		}
		if (showMessage == true) {
			hasWarningMessageForFormChangedOccurred = true;
			if (window.confirm(confirmMessage)) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	return true;
}

function getIsDirtyConfirmMessage() {
	var confirmMessage  = "Are you sure you want to navigate away from this page?\n";
	confirmMessage     += " ** Your changes have not yet been saved **\n\n";
	confirmMessage     += "Click Cancel to return to the screen to save changes before navigating from this page.\n\n";
	confirmMessage     += "Click OK to proceed without saving changes.";
	return confirmMessage;
}

/**
* Returns true if the element has a class named 'disabled'
*/
function hasDisabledClass(elem) {
      return $(elem).hasClass('disabled');      
}

  /**
   * function returns true if any edit control has been modified from its original (or last saved) settings
   */
  function hasFormChanged(objForm)
  {
  	if(objForm == null || usedFormElementChangeInit) { // Don't do DOM scan if we initialized the new way.
  		return false;
  	}

	var output = '';
	for (var i=0, j=objForm.length; i<j; i++) {
	  	if (hasElemChanged(objForm[i])) {
	  		return(true);
	  	}
	}
	return (false);
}

/* Set DEBUG_ISDIRTY to true to enable isDirty alerts */
function hasElemChanged(elem) {
	if (elem == null) {
		return false;
	}

	var myType = elem.type;
  	if (myType == 'checkbox' || myType == 'radio') {
		if (elem.checked != elem.defaultChecked) {
			if (typeof(DEBUG_ISDIRTY) != 'undefined' && DEBUG_ISDIRTY) {
				alert("elem.checked=" + elem.checked + ", elem.id=" + elem.id);
			}
	  		return(true);
		}
  	}
  	if (myType == 'hidden' || myType == 'password' || myType == 'text' || myType == 'textarea') {
  		// Defect 18860
  		if (elem.value != elem.defaultValue && elem.value != 'printWindow') {
			if (typeof(DEBUG_ISDIRTY) != 'undefined' && DEBUG_ISDIRTY) {
				alert("elem.value=" + elem.value + ", elem.defaultValue=" + elem.defaultValue + ", elem.id=" + elem.id + ", elem.name=" + elem.name + ", mytype=" + myType);
			}
	  		return(true);
		}
  	}
  	if (myType == 'select-one' || myType == 'select-multiple') {
		for (var k=0, l=elem.options.length; k<l; k++) {
	  		if (elem.options[k].selected != elem.options[k].defaultSelected) {
				if (typeof(DEBUG_ISDIRTY) != 'undefined' && DEBUG_ISDIRTY) {
					alert("elem.id.option != defaultSelected -> " + elem.id + ", optionText=" + elem.options[k].text + ", defaultValue=" + elem.options[k].defaultSelected + ", actualValue=" + elem.options[k].selected + ", Select.DefaultValue=" + elem.value);
				}
				return(true);
	  		}
		}
  	}
  	return(false);
}

// Change the element so is does not appear to have been changed.
// Leave the current value intact.
function maskElemChange(elem) {
	if (elem != null) {

		var myType = elem.type;
	  	if (myType == 'checkbox' || myType == 'radio') {
				elem.defaultChecked = elem.checked;
	  	} else
	  	if (myType == 'hidden' || myType == 'password' || myType == 'text' || myType == 'textarea') {
	  		// Defect 18860
	  		if ( elem.value != 'printWindow') {
	  			elem.defaultValue = elem.value;
			}
	  	} else
	  	if (myType == 'select-one' || myType == 'select-multiple') {
			for (var k=0, l=elem.options.length; k<l; k++) {
				elem.options[k].defaultSelected = elem.options[k].selected;
			}
	  	}
	}
}

function hasFormChangedIgnoreList(objForm, ignoreIds)
{
	if(objForm == null) {
  		return false;
  	}

	var output = '';
	for (var i=0, j=objForm.length; i<j; i++) {
	  	myType = objForm[i].type;
	  	if (myType == 'checkbox' || myType == 'radio') {
			if (objForm[i].checked != objForm[i].defaultChecked) {
				//alert("objForm[i].checked=" + objForm[i].checked + ", objForm[i].id=" + objForm[i].id);
				if (isIdInList(objForm[i].id,ignoreIds) == false)
				{
			  		return(true);
			  	}
			  	else
			  	{
			  		return(false);
			  	}
			}
	  	}
	  	if (myType == 'hidden' || myType == 'password' || myType == 'text' || myType == 'textarea') {
			if (objForm[i].value != objForm[i].defaultValue) {
				//alert("objForm[i].value=" + objForm[i].value + ", objForm[i].defaultValue=" + objForm[i].defaultValue + ", objForm[i].id=" + objForm[i].id + ", objForm[i].name=" + objForm[i].name + ", mytype=" + myType);
		  		if (isIdInList(objForm[i].id,ignoreIds) == false)
				{
			  		return(true);
			  	}
			  	else
			  	{
			  		return(false);
			  	}
			}
	  	}
	  	if (myType == 'select-one' || myType == 'select-multiple') {
			for (var k=0, l=objForm[i].options.length; k<l; k++) {
		  		if (objForm[i].options[k].selected != objForm[i].options[k].defaultSelected) {
		  			//alert("objForm[i].id.option != defaultSelected -> " + objForm[i].id + ", optionText=" + objForm[i].options[k].text + ", defaultValue=" + objForm[i].options[k].defaultSelected + ", actualValue=" + objForm[i].options[k].selected + ", Select.DefaultValue=" + objForm[i].value);
					if (isIdInList(objForm[i].id,ignoreIds) == false)
					{
			  		return(true);
			  		}
			  		else
			  		{
			  		return(false);
			  		}
		  		}
			}
	  	}
	}
	return (false);

}

/** function to be used to see if the idToCheck value is found in the list of ids **/
function isIdInList(idToCheck,listOfIds)
{

	var idCounter = 0;

	if (listOfIds == null) {
		return false;
	}

	for(idCounter=0; idCounter < listOfIds.length;idCounter++)
	{
		if (listOfIds[idCounter] == idToCheck)
		{
			return (true);
		}
	}
	return false;
}



/* Redirect the current window to specified url */
function redirect(strUrl){
	window.location=strUrl;
	return window;
}

var globalWindowName = new Array();

function openNewPrintWindow(strUrl, strNewWindowName) {

	return openNewWindow(strUrl, strNewWindowName, 1024, 768, 'yes', 'yes');
}

/* Create a new window */
function openNewWindow(strUrl, strNewWindowName, intWindowWidth, intWindowHeight, scroll, resizable) {

	/* create new window and give it focus */
	var newWindow;
    LeftPosition = (screen.width) ? (screen.width - intWindowWidth) / 2 : 40;
    TopPosition = (screen.height) ? (screen.height - intWindowHeight) / 2 : 40;
    //send sessionBrowserId to servlet before open new window
    processAjaxServlet();
    //defect 25829 IE Tabs - Print CFP Summary - Popup window does not update when clicking from other tabs
    //added session browser id to the window name to make it unique
    //defect 25867 OMNI - Cannot Open Offender Reports for Multiple DOC numbers inside OMNI In M34 CONV
	//if no name for new window don't add session storage id to strnewwindowname
    //defect 25893 added null check
    if (strNewWindowName != null && strNewWindowName.length > 0)
    {
    	newWindow = window.open(strUrl, strNewWindowName + sessionStorage.getItem("sessionBrowserId"), 'height='+ intWindowHeight +',width='+ intWindowWidth +',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable='+resizable+',toolbar=no,titlebar=no,location=no,status=yes,menubar=no,copyhistory=no,modal=yes');
    } else
	{
    	newWindow = window.open(strUrl, strNewWindowName, 'height='+ intWindowHeight +',width='+ intWindowWidth +',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable='+resizable+',toolbar=no,titlebar=no,location=no,status=yes,menubar=no,copyhistory=no,modal=yes');
	}


	globalWindowName[globalWindowName.length] = newWindow;
	//alert("setting global window name : " + newWindow.name);

	newWindow.focus();



    return newWindow;
}

/* Create a new window with custom features */
function openPopUpWindowWithFeatures(strUrl, strNewWindowName, strFeatures) {
    //send sessionBrowserId to servlet before open new window
    processAjaxServlet();
    //defect 25829 IE Tabs - Print CFP Summary - Popup window does not update when clicking from other tabs
    //added session browser id to the window name to make it unique
	//defect 25867 OMNI - Cannot Open Offender Reports for Multiple DOC numbers inside OMNI In M34 CONV
	//if no name for new window don't add session storage id to strnewwindowname
    //defect 25893 added null check
    if (strNewWindowName != null && strNewWindowName.length > 0)
    {
    	window.open(strUrl, strNewWindowName + sessionStorage.getItem("sessionBrowserId"), strFeatures).focus();
    } else
	{
    	window.open(strUrl, strNewWindowName, strFeatures).focus();
	}

}

/* Create a new window with custom features */
function openPopUpReturnWindow(strUrl, strNewWindowName, strFeatures) {
    //send sessionBrowserId to servlet before open new window
    processAjaxServlet();
    //defect 25829 IE Tabs - Print CFP Summary - Popup window does not update when clicking from other tabs
    //added session browser id to the window name to make it unique
  	//defect 25867 OMNI - Cannot Open Offender Reports for Multiple DOC numbers inside OMNI In M34 CONV
	//if no name for new window don't add session storage id to strnewwindowname
    //defect 25893 added null check
    if (strNewWindowName != null && strNewWindowName.length > 0)
    {
    	var returnWindow = window.open(strUrl, strNewWindowName + sessionStorage.getItem("sessionBrowserId"), strFeatures);
    } else
	{
    	var returnWindow = window.open(strUrl, strNewWindowName, strFeatures);
	}


	return returnWindow;
}
function globalHandleCloseWindow()
{
	//if(window.screenLeft >screen.width){
		for(var i = 0 ; i <= globalWindowName.length;i++)
		{
			//alert("closing window #: " + i);
			globalWindowName[i].close;
		}

	//}
}

function openModalDialog(windowURL,winWidth,winHeight) {
  return openModalDialog2(windowURL,self,winWidth,winHeight,'');
}

function openModalMessageDialog(windowURL,strMessage,winWidth,winHeight) {
  return openModalDialog2(windowURL,strMessage,winWidth,winHeight,';scroll:0;unadorned:0');
}

function openModalDialog2(windowURL,strMessage,winWidth,winHeight,addFlags) {
  addFlags = 'resizable=yes';
  var browserbot = 0;
  try { browserbot = parent.selenium.browserbot; } catch(e) {}
  if(window.showModalDialog && !browserbot) {
	    //send sessionBrowserId to servlet before open new window
	    processAjaxServlet();
	    return window.showModalDialog(windowURL, strMessage, "dialogWidth:" + winWidth + " px;dialogHeight:" + winHeight + "px;center:1;help:0;status:0;" + addFlags);
  } else { // mozilla modal window, doesn't work for firefox 2.0 or Selenium

  	return openNewWindow(windowURL,'Dialog',winWidth,winHeight,'no','yes');
  }
}

// CR 5158 - replacement for window.showModalDialog formally used for winID.
// Since this code is rolled back, the code is nothing more than an intermediate call to the real window.showModalDialog()
function wShowModalDialog(windowURL, arguments, features) {
	// CR5158
    //send sessionBrowserId to servlet before open new window
    processAjaxServlet();
	return window.showModalDialog(windowURL, arguments, features);
}

function closeWindow() {
  	  window.close();
}

/**
 * Opens a modal dialog with a disclaimer form where the user must either accept having read the disclaimer or cancel.
 * The displayed text is unique per Needs Domain. Also, certain domains (like Substance Abuse) require the application
 * log the activity in database (handled by the servlet).
 * 
 * The form is dynamic, querying a DisclaimerController that returns a json object of data to display.
 * 
 * @param staffId the id of the current user
 * @param docNb the id of the offender in context
 * @param ofnntyCd if specified, the need domain (which determines the text of the disclaimer)
 * @param screen if specified, the origin of this call.
 * @param onSuccessCallback a javascript function to run if the user presses "OK"
 * @param onCancelCallback a javascript function to run if the user presses "Cancel"
 */
function openDisclaimerDialog(docNb, ofnntyCd, screen, onSuccessCallback, onCancelCallback) {
	
	// retrieve json data from DisclaimerController (GET request) and populate a dialog box
	$.ajax({ 
		    method: "GET",
			dataType: "json", 
			url: "/omni/advcor/needs/disclaimer.json", 
			data: { "docNb": docNb, "ofnntyCd": ofnntyCd, "screen": screen},
			cache: false
		})
		.done( function( json, textStatus, jqXHR ) { 
			if (json.error) {
				// there was an error retrieving this JSON request from the server.
				var dialog = openDialog("Error", "There was an error retrieving the disclaimer text:<br/>" + json.error, function() {});
			}
			else {				
				// show disclaimer popup.  run callback only if OK was pressed.
				if (json.disclaimer) {
					$.disclaimerDialog(
						json.disclaimer,
						onSuccessCallback, 
						onCancelCallback
					);
				}
				 
				// if there is no disclaimer, or there is a disclaimer but the user has already acknowledged it, just run the callback.
				else  {
					if (onSuccessCallback) onSuccessCallback.call();
				}
			}
		})
		.fail( function( jqXHR, textStatus, errorThrown ) { 
			console.error("DisclaimerController invalid json response:" + jqXHR);
			console.error(errorThrown);
		})
		.always( function( jqXHR, textStatus, errorThrown ) {			
		});
}

/**
 * Create a CSS modal dialog (not a browser popup window) with Ok and Cancel buttons.
 * 
 * @param title The title of the dialog.
 * @param content The content to display in the main part of the dialog. May be html. Content is not excaped, nor should
 *            it be escaped since it is not user-generated data.
 * @param onOKPressed a callback function to run when "OK" is pressed.
 * @param onCancelPressed a callback function to run when "Cancel" is pressed.
 */
function openDialog(_title, _content, _onOKPressed, _onCancelPressed) {
	
	// create a temporary <div> to hold the popup (attached to end of <body>)
	var div = $('<div style="display: none;"></div>');
	div.html(_content); 
		
	// show the popup
	var dialog = div.dialog({
		title: _title,
		modal: true,
		minWidth: 400,
		buttons: [
			{
				text: "Ok",
				click: function() {
					$(this).dialog( "close" );
					if (_onOKPressed) _onOKPressed.call();
				}
			},
			
			{
				text: "Cancel",
				click: function() {
					$(this).dialog( "close" );
					if (_onCancelPressed) _onCancelPressed.call();
				}
			}
		],
		close: function() {
			// cleanup - removes the disclaimer <div> from the DOM.
			$(this).remove();
		}
	});
	
	return dialog.parent('div.ui-dialog');
}

function selectAllListCheckboxes(myForm, myName) {
	// NPE fix - not all browsers have a global event object - most pass the event to the handler.
	if (typeof event != 'undefined' && event.shiftKey){return false;} //bug#738
	var checkBoxSearchRegExp = new RegExp(myName + "\\d*");
	var elementsLength = document.forms[myForm].elements.length;
	if(elementsLength > 0) {
		for (var i = 0; i < elementsLength; i++) {
			var elementName = document.forms[myForm].elements[i].name;
			if (elementName != null && elementName.match(checkBoxSearchRegExp)) {
				document.forms[myForm].elements[i].checked = true;
			}
		}
	}
}

function clearAllListCheckboxes(myForm, myName) {

	if(event.shiftKey){return false;}//bug#738

	var checkBoxSearchRegExp = new RegExp(myName + "\\d*");
	var elementsLength = document.forms[myForm].elements.length;
	if(elementsLength > 0) {
		for (var i = 0; i < elementsLength; i++) {
			var elementName = document.forms[myForm].elements[i].name;
			if (elementName != null && elementName.match(checkBoxSearchRegExp)) {
				document.forms[myForm].elements[i].checked = false;
			}
		}
	}
}

/* used by chronosSearch; another version is in notification.js */
function countSelectedCheckboxes(myForm, myName) {
       	var elementsLength = document.forms[myForm].elements.length;
		var count = 0;
		var foundCheckBoxes = false;

		if(elementsLength > 0) {
			for (var i = 0; i < elementsLength; i++) {
				var elementName = document.forms[myForm].elements[i].name;

				if(elementName != null && elementName.match(myName)) {
					if(document.forms[myForm].elements[i].checked == true) {
						count++;
					}
					foundCheckBoxes = true;
				}
			}
		}

		if(count == 0 && foundCheckBoxes == false) {
			count = -1; // special case for when no results exist
		}

		return count;
	}

	/*
	 * Function: openOffenderSearchPopup()
	 * Purpose: Shows the staff address book for selecting position in Multiselect Mode.
	 *          Required set the Callback function:  for Example: myCallBackFunction(dataArray)
	 *          The dataArray is a 2 dimension Array.  Each row is individual staff record, the columns are
	 *          the fields for that record in the order: StaffName, StaffId, PositionId, OpeningId
	 *
	 * Arguments: callbackFunction = Call back function.  When the child window returns it will call this function.
	 * Returns: Nothing
	 **/
	function openOffenderSearchPopup(callbackFunction) {
	    var url = "/omni/records/offender/offenderSearchNoNavPopup.htm";
	    var result = openModalDialog(url, 1000, 600);

		if (result != null) {
					callbackFunction(result);
		}

	}


/*
 * Function: showStaffAddressBookMultiSelect()
 * Purpose: Shows the staff address book for selecting position in Multiselect Mode.
 *          Required set the Callback function:  for Example: myCallBackFunction(dataArray)
 *          The dataArray is a 2 dimension Array.  Each row is individual staff record, the columns are
 *          the fields for that record in the order: StaffName, StaffId, PositionId, OpeningId
 *
 * Arguments: dialogURL = Dialog URL to the address book, ie: /omni/common/dialogs/rolodexPopup.htm
 *            callbackFunction = Call back function.  When the child window returns it will call this function.
 * Returns: Nothing
 **/
function showStaffAddressBookMultiSelect(dialogURL, callbackFunction) {
  var winWidth = 900;
  var winHeight = 520;

  dialogURL = dialogURL + "?type=MULTISELECT";

  var ret = openModalDialog(dialogURL,winWidth,winHeight);
  if(ret != null) {
  	parseMultiSelectStaffReturnValues(ret, callbackFunction);
  }

}

/*
 * Function: parseMultiSelectStaffReturnValues()
 * Purpose: Parses data returned from showStaffAddressBookMultiSelect function(). MULTISELECT Version.
 *
 * Arguments: results = URI encoded data in key/value pairs.
 *            callbackFunction = The callback function to call for passing back the data.
 * Returns: Nothing
 **/
 function parseMultiSelectStaffReturnValues(results, callbackFunction) {

	// results come as a string and therefore needs to be parsed
	var staffArray = null;

	if(results != null && results.length > 0) {
		var keyValueArray = results.split("&");

		if(keyValueArray != null) {
			var recordCount = keyValueArray.length / 4;  // 4 fields per record

			staffArray = new Array(recordCount)
			for (i=0; i < staffArray.length; i++) {
				staffArray[i] = new Array(4);
			}


			var paramName = null;
			var paramId = null;
			var paramPositionId = null;
			var paramOpeningId = null;

			for(var i = 0, c = 1; i < keyValueArray.length; i++) {
				var dataArray = keyValueArray[i].split("=");

				if(dataArray.length == 2) {
					if(dataArray[0] == ("n" + (c - 1))) {
						paramName = decodeURI(dataArray[1]);
					} else if(dataArray[0] == ("i" + (c - 1))) {
						paramId = decodeURI(dataArray[1]);
					} else if(dataArray[0] == ("p" + (c - 1))) {
						paramPositionId = decodeURI(dataArray[1]);
					} else if(dataArray[0] == ("o" + (c - 1))) {
						paramOpeningId = decodeURI(dataArray[1]);
					}
				}

				if(((i + 1) % 4) == 0) {
					staffArray[c - 1][0] = paramName;
					staffArray[c - 1][1] = paramId;
					staffArray[c - 1][2] = paramPositionId;
					staffArray[c - 1][3] = paramOpeningId;

					paramName = null;
					paramId = null;
					paramPositionId = null;
					paramOpeningId = null;
					c++;
				}
			}
		}
	}

	if(callbackFunction) {
		callbackFunction(staffArray);
	}

	// update isDirty if the form changed.
	//onFormChangeClickEvent();
}


/*
 * Function: showStaffAddressBook()
 * Purpose: Shows the staff address book for selecting position.
 *          Requires callback function named:  staffAddressBookCallBack(paramStaffName, paramPositionId, paramOpeningId, identifier)
 *
 * Arguments: dialogURL = Dialog URL to the address book, ie: /omni/common/dialogs/rolodexPopup.htm
 *            identifier = A unique identifier name used in the callback function to identify which instance of the dialog is being used.
 *            staffAddressBookType = type of address book.  Options are "DEFAULT", "SELECT_STAFF".
 *            staffId = Staff Id
 *            positionId = position Id
 *            openingId = Opening Id
 *            fields = an array of element ids to populate on callback
 *            enableHistoricalStaffOnly = a boolean.  If true, will show a checkbox on the rolodex popup.
 *            isSimpleCallback - if true, the callbackFunction will accept a single data map parameter (just like a typical DWR success callback function).
 * Returns: Nothing
 **/
function showStaffAddressBook(dialogURL, callbackFunction, staffAddressBookType, staffId, positionId, openingId, fields, enableHistoricalStaffOnly, isSimpleCallback) {
  var winWidth = 900;
  var winHeight = 400;


  if(staffAddressBookType != null) {
  	dialogURL = dialogURL + "?type=" + staffAddressBookType;
  } else {
  	dialogURL = dialogURL + "?type=DEFAULT";
  }

  if(staffId != null) {
  	dialogURL = dialogURL + "&id=" + staffId;
  	if(positionId != null) {
  		dialogURL = dialogURL + "&pid=" + positionId;
  	}

  	if(openingId != null) {
  		dialogURL = dialogURL + "&oid=" + openingId;
  	}
  }

  if (enableHistoricalStaffOnly != null && enableHistoricalStaffOnly == 'true') {
	  dialogURL = dialogURL + "&enableHist=true";
  }

  var ret = openModalDialog(dialogURL,winWidth,winHeight);
  if(ret != null) {
  	parseStaffReturnValuesUsingCallback(ret, callbackFunction, isSimpleCallback, fields);
  }

}

/*
 * Function: parseStaffReturnValues()
 * Purpose: Parses data returned from showStaffAddressBook function().
 *
 * Arguments: results = URI encoded data in key/value pairs.
 *            identifier = A unique identifier name used in the callback function to identify which instance of the dialog is being used.
 * Returns: Nothing
 **/
 function parseStaffReturnValuesUsingCallback(results, callbackFunction, isSimpleCallback, fields) {

	var data = {};

	if(results != null && results.length > 0) {
		var keyValueArray = results.split("&");

		if(keyValueArray != null) {
			for(var i = 0; i < keyValueArray.length; i++) {
				var dataArray = keyValueArray[i].split("=");

				if(dataArray.length == 2) {
					if(dataArray[0] == "staffName") {
						data.staffName = decodeURI(dataArray[1]);
					} else if(dataArray[0] == "staffId") {
						data.staffId = decodeURI(dataArray[1]);
					} else if(dataArray[0] == "positionId") {
						data.positionId = decodeURI(dataArray[1]);
					} else if(dataArray[0] == "openingId") {
						data.openingId = decodeURI(dataArray[1]);
					} else if(dataArray[0] == "stfSqncNb") {
						data.stfSqncNb = decodeURI(dataArray[1]);
					} else if(dataArray[0] == "positionTitle") {
						data.positionTitle = decodeURI(dataArray[1]);
					} else if(dataArray[0] == "positionFacilityName") {
						data.facilityName = decodeURI(dataArray[1]);
					} else if(dataArray[0] == "positionFacilityId") {
						data.facilityId = decodeURI(dataArray[1]);
					} else if(dataArray[0] == "facilityRoleId") {
						data.facilityRoleId = decodeURI(dataArray[1]);
					} else if(dataArray[0] == "positionObtsNumber") {
						data.positionObtsNumber = decodeURI(dataArray[1]);
					} else if(dataArray[0] == "positionNumber") {
						data.positionNumber = decodeURI(dataArray[1]);
					} else if(dataArray[0] == "isHistorical") {
						data.isHistorical = decodeURI(dataArray[1]);
					}
				}
			}
		}

		if(callbackFunction != undefined) {
			if (isSimpleCallback != undefined && isSimpleCallback == 'true') {
				callbackFunction(data);
			}
			else {
				callbackFunction(data.staffName, data.staffId, data.positionId, data.openingId, data.positionTitle, data.positionObtsNumber, data.facilityId, data.facilityRoleId, data.facilityName, data.positionNumber);
			}
		}

		// Update the fields directly instead of having a callbackFunction (if the field elem IDs were passed in)
		if (fields != undefined) {
			if (fields.staffNameElemID != undefined) {
				var elem = document.getElementById(fields.staffNameElemID);
				if (elem  != undefined) {
					elem.value=data.staffName;
				}
				updateIsDirty(elem);
			}
			if (fields.staffIdElemID != undefined) {
				var elem = document.getElementById(fields.staffIdElemID);
				if (elem != undefined) {
					elem.value=data.staffId;
				}
				updateIsDirty(elem);
			}
			if (fields.positionIdElemID != undefined) {
				var elem = document.getElementById(fields.positionIdElemID);
				if (elem != undefined) {
					elem.value=data.positionId;
				}
				updateIsDirty(elem);
			}
			if (fields.openingIdElemID != undefined) {
				var elem = document.getElementById(fields.openingIdElemID);
				if (elem != undefined) {
					elem.value=data.openingId;
				}
				updateIsDirty(elem);
			}
			if (fields.stfSqncNbElemID != undefined) {
				var elem = document.getElementById(fields.stfSqncNbElemID);
				if (elem != undefined) {
					elem.value=data.stfSqncNb;
				}
				updateIsDirty(elem);
			}
			if (fields.historicalElemID != undefined) {
				var elem = document.getElementById(fields.historicalElemID);
				if (elem != undefined) {
					elem.value=data.isHistorical;
				}
				updateIsDirty(elem);
			}
		}

		// update isDirty if the form changed.
		//onFormChangeClickEvent();
	}

}


/*
 * Function: showSelectCauseDialog()
 * Purpose: Shows the select Cause Dialog for selecting the Offender Cause.
 *          Requires callbackFunction.  Example: myCallBackFunction(paramUid, paramPrefix, paramCauseNumber);
 *
 * Arguments: dialogURL = Dialog URL to the address book, ie: /omni/common/dialogs/rolodexPopup.htm
 *            callbackFunction = the callback function that this function we call when completed.
 *            docNumber = the DOC number of the offender
 * Returns: Nothing
 **/
function showSelectCauseDialog(dialogURL, callbackFunction, docNumber) {
  var winWidth = 500;
  var winHeight = 280;

  if(docNumber != null) {
	dialogURL = dialogURL + "?id=" + docNumber;
  }

  var ret = openModalDialog(dialogURL,winWidth,winHeight);
  parseSelectCauseReturnValues(ret, callbackFunction);
}

/*
 * Function: parseSelectCauseReturnValues()
 * Purpose: Parses data returned from showSelectCauseDialog function().
 *
 * Arguments: results = URI encoded data in key/value pairs.
 *            callBackFunction = the callback function used to pass the parameters back.
 * Returns: Nothing
 **/
function parseSelectCauseReturnValues(results, callBackFunction) {

	var paramUid = null;
	var paramPrefix = null;
	var paramCauseNumber = null;

	if(results != null && results.length > 0) {
		var keyValueArray = results.split("&");

		if(keyValueArray != null) {
			for(var i = 0; i < keyValueArray.length; i++) {
				var dataArray = keyValueArray[i].split("=");

				if(dataArray.length == 2) {
					if(dataArray[0] == "num") {
						paramCauseNumber = decodeURI(dataArray[1]);
					} else if(dataArray[0] == "uid") {
						paramUid = decodeURI(dataArray[1]);
					} else if(dataArray[0] == "pfx") {
						paramPrefix = decodeURI(dataArray[1]);
					}
				}
			}
		}
	}
	if(callBackFunction) {
		callBackFunction(paramUid, paramPrefix, paramCauseNumber);
	}
}

/*
 * Refreshes the Current Page.
 */
function refreshCurrentPage() {

	if(window.location.reload) {
		window.location.reload( false );
	} else if(window.location.replace) {
		window.location.replace( window.location.href );
	} else {
		window.location.href = window.location.href;
	}
}
/*
	rowCnt, when missing will default to 1

*/
function addRow(tblId, rowCnt, keepValue) {    // clone last 'rowCnt' rows (default=1) and modify their IDs
	var tblBody = document.getElementById(tblId).tBodies[0];
	if (!rowCnt) rowCnt = 1;	// default to '1'
	if (rowCnt > tblBody.rows.length) rowCnt = tblBody.rows.length;	// sanity check
	var firstNewRow = tblBody.rows.length;
	var copyRow = firstNewRow - rowCnt;
	var newRowNdx = firstNewRow / rowCnt;
	for ( ;copyRow < firstNewRow; copyRow++ ) {	// for each row, clone, massage & add to DOM!
		var newNode = tblBody.rows[copyRow].cloneNode(true);  // clone row
		var childs = newNode.getElementsByTagName("*");
		var rowSelectBoxId;
		var rowSelectBoxExists = false;
		for (x = 0; x < childs.length; x++) {	// for childs in row, massage ID etc
			if (childs[x].tagName == 'INPUT' || childs[x].tagName == 'SELECT' || childs[x].tagName == 'TEXTAREA' || childs[x].tagName == 'IMG' || childs[x].tagName == 'IMAGE') {
				var childType = "" + childs[x].type;
				childType = childType.toUpperCase();
				if ((childType == 'RADIO') && (childs[x].name.indexOf("[") == -1)) {
					childs[x].value = "" + newRowNdx;
					var newId = childs[x].id.replace(/\d+/,"" + newRowNdx);
					childs[x].id = newId;
					rowSelectBoxId = newId;
					rowSelectBoxExists = true;
				} else if (childType == 'CHECKBOX') {
					var newId = childs[x].id.replace(/\d+/,"" + newRowNdx);
					var newName = childs[x].name.replace(/\[\d+\]/,"[" + newRowNdx + "]");
					childs[x].id = newId;
					childs[x].name = newName;
					childs[x].checked = false;
				} else if(childs[x].tagName == 'IMG' || childs[x].tagName == 'IMAGE' || childs[x].tagName == 'SELECT') {
					var newId = childs[x].id.replace(/\d+/,"" + newRowNdx);
					var newName = childs[x].name.replace(/\[\d+\]/,"[" + newRowNdx + "]");
					childs[x].id = newId;
					childs[x].name = newName;
				} else {
					var newId = childs[x].id.replace(/\d+/,"" + newRowNdx);
					var newName = childs[x].name.replace(/\[\d+\]/,"[" + newRowNdx + "]");
					childs[x].id = newId;
					childs[x].name = newName;
					if(!keepValue){
						childs[x].value = "";
						childs[x].text = "";
					}
				}
			}	else if (childs[x].id) {	// massage existing IDs on all other tags
					childs[x].id = childs[x].id.replace(/\[\d+\]/,"[" + newRowNdx + "]");
			}
		}
		tblBody.appendChild(newNode);
		if (rowSelectBoxExists) {
			document.getElementById(rowSelectBoxId).checked = false;
		}
		//return newNode;  //we can't return here, as the loop may not be finished.
	}  // end for()
}

// NOT USED ANYMORE
//var _as_shutdownTimerID = null;
//var _as_timerRunning = false;
//var _as_autoSaveForm = null;
//
//var _AS_TIMEOUT_DURATION = 1000 * 20;
//
//function autoSaveInit(objForm, timeoutInMinutes) {
//	//alert("objForm=" + objForm);
//	if(objForm == null) {
//		return false;
//	} else {
//		_as_autoSaveForm = objForm;
//	}
//
//	if(timeoutInMinutes != null) {
//		_AS_TIMEOUT_DURATION = timeoutInMinutes * 60 * 1000;
//		// _AS_TIMEOUT_DURATION = 20 * 1000;
//	}
//	//alert("_AS_TIMEOUT_DURATION=" + _AS_TIMEOUT_DURATION);
//
//	// Set up resetting of the "timeout" when the user is interacting with the document.
//	//addEvent(window, 'mousedown', resetAutoSubmitTimer, false);
//	//addEvent(window, 'keydown', resetAutoSubmitTimer, false);
//
//	document.onmousedown = resetAutoSubmitTimer;
//	document.onkeydown = resetAutoSubmitTimer;
//
//	//alert("events added.");
//
//	startAutoSubmitTimer();
//
//
//}
//
///**
// * Starts the timer running which logs out the user after a period of inactivity.
// */
//function startAutoSubmitTimer()
//{
//	if (!_as_timerRunning)
//	{
//		_as_timerRunning = true;
//		_as_shutdownTimerID = setTimeout("timedOut()", _AS_TIMEOUT_DURATION);
//	}
//}
//
//function timedOut() {
//	var objForm = _as_autoSaveForm;
//
//	if(objForm != null) {
//		//alert("objForm.isDirty.value=" + objForm.isDirty.value + ", hasFormChanged(objForm)=" + hasFormChanged(objForm));
//		if((objForm.isDirty && objForm.isDirty.value == 'true') || hasFormChanged(objForm)) {
//			//alert('Form about to submit...');
//			if(window.formAutoSubmit) {
//				formAutoSubmit();
//			}
//		}
//	}
//}
//
///**
// * Resets the timer.This is called if the user does some action.
// *
// * @param e the event which triggers the method call (keypress, mousedown, etc.)
// */
//function resetAutoSubmitTimer(e) {
//	//alert("resetAutoSubmitTimer() called.");
//	if (_as_timerRunning) {
//		clearTimeout(_as_shutdownTimerID);
//		_as_timerRunning = false;
//	}
//	startAutoSubmitTimer();
//}

/*
 * Function: purgeSelectList(objSelectList)
 * Purpose: Remove each option for the <SELECT> List
 * Arguments: Object
 * Returns: Nothing
 **/
function purgeSelectList(objSelectList) {
	var num = objSelectList.options.length;
	for (var i = 0; i < num; i++) {
		objSelectList.options.remove(0);
	}
}

/*
 * Function: addOptionToSelectList(objSelectList, strText, strValue, blnAddTotheBeginning)
 * Purpose: adds an <OPTION> to a select list
 * Arguments: Object, String, String, Boolean
 * Returns: Nothing
 **/
function addOptionToSelectList(objSelectList, strText, strValue, blnAddTotheBeginning) {

	/* Create New Element */
	var newElement = document.createElement("OPTION");
	newElement.text = strText;
	newElement.value = strValue;

	/* add it to the options list */
	if (blnAddTotheBeginning) {
		objSelectList.options.add(newElement, 0);
	} else {
		objSelectList.options.add(newElement);
	}
}


<!-- Sort alphabetically or numerically START -->
// Quite Fast way of sorting big option lists
// IntSort: boolean - true = numerical sort; false = text sort
// UseVals: boolean - true = sort the option list based on its underlying value, as opposed to the displayed value
function SortList(Combo, IntSort, UseVals){

    var cmbText = new Array(Combo.options.length);
    var cmbItems;

    // get copy of
    for (x=0; x<cmbText.length; x++){
        cmbText[x]=(UseVals)?Combo.options[x].value + "{" + Combo.options[x].text:Combo.options[x].text + "{" + Combo.options[x].value;
        }
	//alert(cmbText);
	//cmbText.sort(customCompare);
    if (IntSort)
        cmbText.sort(ListCompareNums);
    else
        cmbText.sort(ListCompareText);

    //rebuild main list, but don't redimension it
    for (x=0; x<cmbText.length; x++){
        cmbItems = cmbText[x].split("{");
        Combo.options[x].text=(UseVals)?cmbItems[1]:cmbItems[0];
        Combo.options[x].value=(UseVals)?cmbItems[0]:cmbItems[1];
    }
}

// Compare functions used internally by the SortList routine
function ListCompareNums(a,b)
{
	if (a == null)
  	{
      return 0;
   	}
   	else if (b == null)
   	{
      return -1;
   	}
   	else if (a == null && b == null)
   	{
      	return 0;
   	}

    var la = parseInt(a.split("{")[0]);
    var lb = parseInt(b.split("{")[0]);
    if (la < lb) return -1;
    if (la > lb) return 1
    return 0;
}
function ListCompareText(a,b)
{
	if (a == null)
  	{
      return 0;
   	}
   	else if (b == null)
   	{
      return -1;
   	}
   	else if (a == null && b == null)
   	{
      	return 0;
   	}

	var la = a.split("{")[1];
	var lb = b.split("{")[1];
    la = stripToAlphaNumeric(la.toLowerCase());
    lb = stripToAlphaNumeric(lb.toLowerCase());
    if (la < lb) return -1;
    if (la > lb) return 1

    return 0;
}

function stripToAlphaNumeric(toStrip){
  	var re = new RegExp("[^0-9A-Za-z]", "g");
  	toStrip = toStrip.replace(re, "");
  	return toStrip;
}

<!-- Sort alphabetically or numerically END -->

function addSingleChronoEvent(docNb){
	if (docNb != undefined) {
		url = "/omni/chronos/chronosAddSingle.htm?docNb=" + docNb;
	} else {
		url = "/omni/chronos/chronosAddSingle.htm";
	}
	//fix for defect 9448 - resize the add chrono window (add 25 pixels to height) so buttons display.. change top position to 0
	//var popUpWindow = openPopUpWindowWithSizeTop('AddSingleChrono', '900', '725', '0');

	var width = '900';
	var height = '725';
	var top = '0';	
	
	//popUpWindow.document.location.href = url;
	//openModalDialog(url, 900, 725);	
	var popupWidth = (window.screen.width/2) - (400 + 10);
	var popupHeight = (window.screen.height/2) - (300 + 50);
    //send sessionBrowserId to servlet before open new window
    processAjaxServlet();
    //CQ 30473 IE11 - Chronos - Once Spell check completes, OMNI screen is displayed instead of 'Add New Chrono' pop-up window
    var popUpWindow =  window.open(url,"AddSingleChrono" + sessionStorage.getItem("sessionBrowserId"),"directories=no,height=" + height + ",left=" + popupWidth + ",location=no,menubar=0,resizable=0,screenX=" + popupWidth + ",screenY=" + popupHeight + ",scrollbars=yes,status=0,toolbar=0,top="+ top + ",width=" + width);
    popUpWindow.focus();
	return false;
}

 function addMultiChronoEvent(){	 
	//openModalDialog('/omni/chronos/chronosAddMultiple.htm', 900, 700);	
	var popUpWindow = openPopUpWindow('AddMultyChrono');
	//popUpWindow.document.location.href ="/omni/chronos/chronosAddMultiple.htm";
	
	var popupWidth = (window.screen.width/2) - (400 + 10);
	var popupHeight = (window.screen.height/2) - (300 + 50);
	var width = '900';
	var height = '700';
	
    //send sessionBrowserId to servlet before open new window
    processAjaxServlet();
    //CQ 30473 IE11 - Chronos - Once Spell check completes, OMNI screen is displayed instead of 'Add New Chrono' pop-up window
    var popUpWindow = window.open("/omni/chronos/chronosAddMultiple.htm","AddMultyChrono" + sessionStorage.getItem("sessionBrowserId"),"directories=no,height=" + height + ",left=" + popupWidth + ",location=no,menubar=0,resizable=0,screenX=" + popupWidth + ",screenY=" + popupHeight + ",scrollbars=yes,status=0,toolbar=0,top=" + popupHeight + ",width=" + width);
    popUpWindow.focus();
	return false;
 }

 function showDynamicDialog(url, winWidth, winHeight, strMessage, buttonOptions) {
 	 var args = new Array();
 	 args[0] = strMessage;
 	 for(var i = 1, j = 4; j < arguments.length; i++, j++) {
 	 	args[i] = arguments[j];
 	 }
     var ret = openModalDialog2(dialogURL,args,winWidth,winHeight,';resizable:0;');
 	 return ret;
 }

  function openPopUpWindowWithSizeTop(message, width, height, top) {
	var popupWidth = (window.screen.width/2) - (400 + 10);
	var popupHeight = (window.screen.height/2) - (300 + 50);
    //send sessionBrowserId to servlet before open new window
    processAjaxServlet();
    //defect 25829 IE Tabs - Print CFP Summary - Popup window does not update when clicking from other tabs
    //added session browser id to the window name to make it unique
    //defect 25867 OMNI - Cannot Open Offender Reports for Multiple DOC numbers inside OMNI In M34 CONV
	//if no name for new window don't add session storage id to strnewwindowname
    //defect 25893 added null check
    if (message != null && message.length > 0)
    {
    	return window.open("",message + sessionStorage.getItem("sessionBrowserId"),"directories=no,height=" + height + ",left=" + popupWidth + ",location=no,menubar=0,resizable=0,screenX=" + popupWidth + ",screenY=" + popupHeight + ",scrollbars=yes,status=0,toolbar=0,top="+ top + ",width=" + width);
    } else
	{
    	return window.open("",message,"directories=no,height=" + height + ",left=" + popupWidth + ",location=no,menubar=0,resizable=0,screenX=" + popupWidth + ",screenY=" + popupHeight + ",scrollbars=yes,status=0,toolbar=0,top="+ top + ",width=" + width);
	}


 }


 function openPopUpWindowWithSize(message, width, height) {
	var popupWidth = (window.screen.width/2) - (400 + 10);
	var popupHeight = (window.screen.height/2) - (300 + 50);
    //send sessionBrowserId to servlet before open new window
    processAjaxServlet();
    //defect 25829 IE Tabs - Print CFP Summary - Popup window does not update when clicking from other tabs
    //added session browser id to the window name to make it unique
    //defect 25867 OMNI - Cannot Open Offender Reports for Multiple DOC numbers inside OMNI In M34 CONV
	//if no name for new window don't add session storage id to strnewwindowname
    //defect 25893 added null check
    if (message != null && message.length > 0)
    {
    	return window.open("",message + sessionStorage.getItem("sessionBrowserId"),"directories=no,height=" + height + ",left=" + popupWidth + ",location=no,menubar=0,resizable=0,screenX=" + popupWidth + ",screenY=" + popupHeight + ",scrollbars=yes,status=0,toolbar=0,top=" + popupHeight + ",width=" + width);
    } else
	{
    	return window.open("",message,"directories=no,height=" + height + ",left=" + popupWidth + ",location=no,menubar=0,resizable=0,screenX=" + popupWidth + ",screenY=" + popupHeight + ",scrollbars=yes,status=0,toolbar=0,top=" + popupHeight + ",width=" + width);
	}

 }

 function openPopUpWindow(message) {
 	//use default popup windows size values
	return openPopUpWindowWithSize(message, "900", "700");
 }

 function disablePopUpClick() {
   alert("The link is disable in pop up window.");
 return false;
 }

 function disableLink(thisLink) {
 	if(thisLink != null) {
 		thisLink.onclick = voidAction;
 		thisLink.style.color='#cccc99';
 	}
 }


function getElementsOfTheClassName(name) {
	//alert(name);

	// Defect 12279
	//fix for 12647 - also check to make sure id is not empty string
	for(var index = 0; index < document.forms.length;   index++) {
		if(document.forms[index] != null && document.forms[index].id != null && document.forms[index].id != '') {
			//alert("disableSubmitButtons->"+document.forms[index].id)
			disableSubmitButtons(document.forms[index].id);
		}
	}

	var findStack = [], allel = document.getElementsByTagName("span");
	  var len = allel.length;
	  //alert(len);
		for(var a = 0; a<allel.length; a++) {
			if(allel[a].className == name){
				//alert("matched");
				getAll(allel[a]);
			}
		}
	return findStack;
}

//fix for defect 12707 - we are wrapping the location reset into a function so we can override the url.
function resetUrl(url) {
	//set the url
	//self.location=url;

	// CQ21618 setting the location does not work for model windows in IE (thou it does in FF)
	// The hacky fix for IE is to create an href anchor tag and programatically click the link
	var a = document.getElementById('_displayTableSubmit');
	if (a == null) {
		a = document.createElement('a');
		a.id = '_displayTableSubmit';
		document.getElementsByTagName('body')[0].appendChild(a);
	}
	if (a.click) { // click is an IE only method
		a.href = url;
		a.click();
	}
	else { // other browsers (which properly support modal windows) can simply set the location.
		self.location.href = url;
	}
}

function getAll(name){
	var e=name.getElementsByTagName('*');
	 for (var i=0;i<e.length;i++){
		 disableLink(e[i]);
 }
}


function processOmniLinkClick(thisLink, formElementId) {
	//alert(thisLink);
	//alert(formElementId.value);
	if(checkFormChanged(formElementId)) {
		disableLink(thisLink);
		return true;
	} else {
		return false;
	}
}

 /* Disables the button, used in onsubmit() event in the form.
    Overrides the onclick event.  This disables the submit button from
    submitting multiple times when the user is impatient and clicks
    the button several times. In this method, the parameter of the button gets submitted
    in the HTTP POST.  A simple ".disabled = true" for button doesn't send
    the key/value pair of the button in the HTTP POST Request.

    *note that useActionHandler is an optional parameter which defaults to true
  */
function disableSubmitButtons(formName,useActionHandler) {

 	var elem = null;
 	var setActionHandler = true;

	// to avoid changing every page in OMNI useActionHandler is an optional parameter which defaults to true
	if(typeof useActionHandler == 'boolean' && !useActionHandler) {
		setActionHandler = false;
	}

	for ( j=0;j< document.forms[formName].elements.length; j++ ) {
	elem = document.forms[formName].elements[j];

	    if(elem.type && (elem.type == 'submit' || elem.type == 'reset' || elem.type == 'button')) {

		if(setActionHandler) {
			elem.onclick = voidAction;
		} else {
			elem.disabled = true;
		}
		elem.style.color='#cccc99';
	    }
	}
}

function voidAction() {
	return false;
}



 /* Fix for 5660/10493.Disables the button, used in onsubmit() event in the form.
  */
function disableCountSubmitButtons(formName) {
 	var elem = null;


    for ( j=0;j< document.forms[formName].elements.length; j++ ) {
    	elem = document.forms[formName].elements[j];

	    if(elem.type && (elem.type == 'submit' || elem.type == 'reset' || elem.type == 'button')) {
	    	elem.disabled = true;
	    	elem.style.color='#cccc99';
	    }
	}
}
 /* Fix for 5660/10493.Enables the button, used in onsubmit() event in the form.
  */
function enableCountSubmitButtons(formName) {
 	var elem = null;


    for ( j=0;j< document.forms[formName].elements.length; j++ ) {
    	elem = document.forms[formName].elements[j];

	    if(elem.type && (elem.type == 'submit' || elem.type == 'reset' || elem.type == 'button')) {
	    	elem.disabled = false;
	    	elem.style.color='';
	    }
	}
}

 function disableElementsByPrefixName(prefix){
  for ( j=0; j < document.all.length;j++) {
     if ( document.all[j].title != null && document.all[j].title.indexOf(prefix)!=-1 && document.all[j].onclick != null){
     	//alert("disabling...."+document.all[j].onclick);
        document.all[j].onclick=disablePopUpClick;
        document.all[j].href="#";
 	document.all[j].disabled=true;
     }
  }
 }

	function disableGroup(formName, groupName, booleanDisabled) {
		for (var i=0; i < document.forms[formName].elements.length; i++) {
			if (document.forms[formName].elements[i].name == groupName) {
				document.forms[formName].elements[i].disabled = booleanDisabled;
			}
		}
	}

	/*
	  Pre condition:
	  Make sure the very first row of your table contains
	  an empty column as its last column.

	  Post condition:
	  Each newly added row will have a delete link in its last
	  column, when this link gets clicked, this row will be deleted
	  from the table.
	*/
	function appendRow(tableId, keepValue){
		var table = document.getElementById(tableId);
		// if the table is not visible, turn it to visible
		// and not actually add any row. The reason is that
		// during the delete row function, if there is one row
		// left in the table, that row is not actually deleted,
		// instead the table is turned to invisible, thus here
		// we just turn it back to visible when user starts to
		// add the first row again.
		if (table.style.display == null || table.style.display == 'none'){
			showHideElement(tableId);
			return false;
		}
		// table is visible
		if (table.style.display != null || table.style.display != 'none'){
			//alert("last row display value " + table.rows[table.rows.length-1].style.display);

			// last row is not visible, make it visible, not adding additional row
			if(table.rows[table.rows.length-1].style.display == 'none' || table.rows[table.rows.length-1].style.display ==null){
				table.rows[table.rows.length-1].style.display = '';
				return false;
			}
		}
		// add row as usual if last row is already visible.
		var totalRows = table.rows.length;
		if(keepValue){
			return addRow(tableId, 1, 'keepValue');
		}else{
			return addRow(tableId, 1, null);
		}

	}

	function addContentToLastCol(row){
		var col = row.cells[row.cells.length-1];
		var url = " <a href=\"#\" onclick=\'deleteOneRow(\"" + row.id + "\"" + ");\'>Delete</a> ";
		col.innerHTML=url;
		return false;
	}

	function deleteOneRow(rowId, isId, threshold, hideTable){
		var row = rowId;
		if(isId=='true'){
			var row = document.getElementById(rowId);
		}
		// parent table
		var parent = row.parentNode;

		// total rows left in the table before starts
		// doing show and hid operation, default is 2 rows
		var limit=2;
		if(threshold != null){
			limit = threshold;
		}
		// when there is only table header row and limit-1 table row left
		// clear all the cells in this sole table row
		if(parent.rows.length==limit){
			if(hideTable){
				// recursively find the table parent
				while(!(parent.tagName.toUpperCase()=='TABLE')){
					parent = parent.parentNode;
				}

				resetTableRowChildren(row);
				showHideElement(parent.id);
				return false;
			}else{
				// just show/hide the last row
				if(row.style.display == 'inline' ||row.style.display == ''){
					row.style.display = 'none'
				}else{
					row.style.display = 'inline';
				}
				resetTableRowChildren(row);
				return false;
			}

		}
		parent.removeChild(row);
		return false;
	}

	function resetTableRowChildren(row){
		for(var i=0; i<row.cells.length; i++){
			// each child node is a td element.
			for( var j=0; j<row.cells[i].childNodes.length; j++){
				if(row.cells[i].childNodes[j].tagName == 'INPUT'){
					row.cells[i].childNodes[j].value='';
				}

				// each child node is an option element
				if(row.cells[i].childNodes[j].tagName == 'SELECT'){
					for( var k=0; k<row.cells[i].childNodes[j].childNodes.length; k++){
						// need to implement resetting drop down list in IE
					}
				}
			}
		}
	}
	/*
	 Flip the display of the all elements (style.display=['none', 'inline'])
	 with specified id in the array
	*/
	function showHideElements(elementIds){
		for(i=0; i< elementIds.length; i++){
			showHideElement(elementIds[i]);
		}
	}

	/*
	 Flip the visibility of the element with specified id
	*/
	function showHideElement(elementId){
		var element = document.getElementById(elementId);
		if (element.style.display != null && element.style.display != 'none'){
            element.style.display = 'none';
		}
		else{
            element.style.display = 'inline';
		}
		return false;
	}

	// simulate mouse over hyperlink effect
	function mouseOvrTxtEffect(element){
		element.style.cursor = 'hand';
		element.style.textDecoration = 'none';
		// change the color to "hyperlink mouseover color"
		element.style.color='#000077';
	}

	// simulate mouse out hyperlink effect
	function mouseOutTxtEffect(element){
		element.style.cursor = 'pointer';
		element.style.textDecoration = 'underline';
		// change the color to usual hyperlink color
		element.style.color='#0000cd';
	}

	// obj is one of the children of the row
	// to be deleted
	// isId, whether the obj is the row id or row obj itself
	// threshold, number of rows left in the table before stop
	// deleting row and start hiding row.
	function deleteCurrentRow(obj, isId, threshold){
		var parent = obj.parentNode;
		while(parent.tagName != 'TR'){
			parent = parent.parentNode
		}
		deleteOneRow(parent,isId, threshold);
	}

	// return current date string in DD/MM/YYYY format
	function getCurrentDate(){
		var currTime = new Date();
		return leadingZero(currTime.getMonth() + 1) + "/" + leadingZero(currTime.getDate()) + "/" + currTime.getFullYear();
	}

	// Added encoding for "+" character, escape() function ignores it
	function urlEncodeString(str) {
		str = escape(str);
		str = str.replace(/\+/g,"%2b");
		return str;
	}
	//  function for suppressing form submission if enter is pressed
	//  when cursor in a input type="text"
    function killEnter(evt)
    {

        if(evt.keyCode == 13 || evt.which == 13)
        {
           return false;
        }
           return true;
     }
	function isNumeric(x) {
		var RegExp = /^(-)?(\d*)(\.?)(\d*)$/; // Note: this WILL allow a number that ends in a decimal: -452.
		// compare the argument to the RegEx
		// the 'match' function returns 0 if the value didn't match
		var str = x.toString();
		var result = str.match(RegExp);
		return result;
	}


	// Defect 6138
	function limitText(limitField, limitNum) {
    	if (limitField.value.length > limitNum) {
        	limitField.value = limitField.value.substring(0, limitNum);
        }
    }

	// Defect 9822
	// handleMouseover(), handleMouseout(), handleClick(), handleBlur() are used
	// to dynamically expand and contract drop down lists.  A <span> tag must
	// be used to contain the "openSet" attribute which determines whether the
	// drop down list is opened or not and the "hover" attribute which determines
	// whether the drop down list is hovered.
	//
	// Usage:  onmouseover, onmouseout, onblur for the select element contained
	// in the span tag.  onclick attribute should be set on the span tag.
	// See groupMoveSelectAdmitDetails.jsp for sample usage.
	function handleMouseover(ele, width)
	{
		ele.parentNode.setAttribute('hover', 'true');
		ele.style.width = width;
	}
	function handleMouseout(ele)
	{
		ele.parentNode.setAttribute('hover', 'false');
		if(ele.parentNode.getAttribute('openSet') == 'false')
		{
			ele.style.width = '';
		}
	}
	function handleBlur(ele)
	{
		ele.style.width = '';
		ele.parentNode.setAttribute('openSet', 'false');
		ele.parentNode.setAttribute('hover', 'false');
	}
	function handleClick(ele)
	{
		if(ele.getAttribute('openSet') == 'true') {
			if(ele.getAttribute('hover') == 'false')
			{
				ele.firstChild.style.width = '';
			}
			ele.setAttribute('openSet', 'false');
		} else {
			ele.setAttribute('openSet', 'true');
		}
	}
	//new function for CQ11146 - to help with collapsing the left menu
	function resetMarginLeft(elementID, marginSize) {
		var element = document.getElementById(elementID);

		if(element != null) {
			element.style.marginLeft=marginSize;

		}
	}

	function toggleSection(sectionControlName) {
    	var sectionExpander = document.getElementById(sectionControlName);
    	if (sectionExpander.value=='true') {
    		//document.getElementById(sectionControlName).style="zoom: 1; filter: alpha(opacity = 0);"
        	sectionExpander.value='false';
    	} else {
        	sectionExpander.value='true';
        	//document.getElementById(sectionControlName).style="zoom: 1; filter: alpha(opacity = 0);"
    	}
	}
	//CQ20335
	//This function is intended to be used on select list onkeyDOWN actions
	//The purpose is to override the browser controls which sends a 'Back' command.
	//This will now mimmick pressing ESC(which closes the select list options), and the select the default first option.
	//onkeydown="return nukeBackspace(this, event);"
	function nukeBackspace(el, event) {
		var e = event || window.event;
		if(e.keyCode==8){
			e.keyCode=27; // hack for IE - replace the event code
			if(el){
				if(el.tagName == "SELECT"){
					if(el.options[0]){
						el.options[0].selected = true;
						return false;  // other browsers, stop the event
					}
				}
			}
		}
		return true;
	}


	// Some handy array and string functions.
	Array.prototype.contains = function (element){
		//alert('in contains ' + element);
		for (var i = 0; i < this.length; i++) {
			if (this[i] == element){
				return true;
			}
		}
		return false;
	}

	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g,"");
	}

	String.prototype.ltrim = function() {
		return this.replace(/^\s+/,"");
	}

	String.prototype.rtrim = function() {
		return this.replace(/\s+$/,"");
	}

/** Will apply OPTION data to the SELECT HTML element identified by the formElementID.
 * If emptyOption is specified, it will be prepended to the list. */
function applyDwrToDropDown(formElementID, data, emptyOption, codeFieldName, descFieldName) {
	if (formElementID != null) {
		var codeName = (codeFieldName != null) ? codeFieldName : 'code';
		var descName = (descFieldName != null) ? descFieldName : 'desc';
	    DWRUtil.removeAllOptions(formElementID);
	    if (emptyOption != null && emptyOption != '') {
	    	DWRUtil.addOptions(formElementID, [{ code:'', desc:emptyOption }], 'code', 'desc');
	    }
	    if (data != null)
	    	DWRUtil.addOptions(formElementID, data, codeName, descName);
	}
}

/**
 * Will clear the value attribute for every element in the specified array
 *
 * @param elementArray
 *            a list of element IDs
 */
function clearElements(elementArray) {
	for (var i = 0; i < elementArray.length; i++) {
		var elem = document.getElementById(elementArray[i]);
		if (elem != null && elem != 'undefined'){
			var myType = elem.type;
		  	if (myType == 'checkbox' || myType == 'radio') {
		  		elem.checked = false;
		  	}
		  	else if (myType == 'select-one' || myType == 'select-multiple') {
		  		elem.selectedIndex = 0;
		  	}
		  	else {
		  		elem.value = '';
		  	}
		}
	}
}

/**
 * Will clear the value attribute for every child element specified by the identified element
 */
function clearAllElements(elem) {
	for (var i = 0; i < elem.childNodes.length; i++) {
		clearAllElements(elem.childNodes[i]);
	}
	if (elem != null) {
		var myType = elem.type;
	  	if (myType == 'checkbox' || myType == 'radio') {
	  		elem.checked = false;
	  	}
	  	else if (myType == 'hidden' || myType == 'password' || myType == 'text' || myType == 'textarea') {
	  		elem.value = '';
	  	}
	  	else if (myType == 'select-one' || myType == 'select-multiple') {
	  		elem.selectedIndex = 0;
	  	}
	}
}

/**
 * Sets the 'disabled' attribute of a form element.  At the same time, if a form element with the same ID exists
 * (suffixed with "_hddn"), the disabled attribute on the hidden form element will be set to the opposite as that of elementID.
 *
 * @param elementId an identifier of an HTML form element to disable/enable
 * @param disabled boolean to indicate if the form element is to be disabled or not
 * @param clear boolean to indicate if the form element should clear when disabled
 */
function disableElement(elementId, disabled, clear) {
	if (elementId != null && disabled != null) {
		var e = document.getElementById(elementId);
		e.disabled = disabled;
		if (clear == null || clear == true) {
			e.value = '';
		}

		// toggle the hidden element for the same field (disabled fields don't bind in Spring)
		var h = document.getElementById(elementId + '_hddn');
		if (h != null) {
			h.disabled = !disabled;
			h.value = e.value;
		}
	}
}

/**
 * Fires an event on an element.  One can't just call elem.onChange() because there may be other listeners / methods attached to onChange
 * that the onChange() call would ignore.
 *
 * @param element DOM element to call event on
 * @param event the event type to fire (ie. 'change')

 * @see http://jehiah.cz/a/firing-javascript-events-properly
 */
function fireEvent(element,event){
	if (document.createEventObject){
		// dispatch for IE
		var evt = document.createEventObject();
		return element.fireEvent('on'+event,evt)
	}
    else{
	    // dispatch for firefox + others
	    var evt = document.createEvent("HTMLEvents");
	    evt.initEvent(event, true, true ); // event type,bubbling,cancelable
	    return !element.dispatchEvent(evt);
    }
}


// CQ22356 - make the addition of new L&I claim rows smoother.
// This function will append a new TR element to the end of the L&I Claims block
/**
 * Will clone the first TR node in a table and append it to the end of the table.  If regExPath is specified, will
 * update the ids and names of any child nodes.
 *   i.e., if regExPath = "tbMedLniClaimRows",
 *     "tbMedLniClaimRows[0].tbMedLniClaim.medlclDescTx" will update to
 *     "tbMedLniClaimRows[1].tbMedLniClaim.medlclDescTx"
 * The index will increment automatically based on the number of rows in the table.
 *
 * @return the index of the new row
 */
function cloneRow(tableId, regExPath) {
	// Clone first row and append to end of table
	var tr = document.getElementById(tableId).getElementsByTagName("tbody")[0].firstChild;
	var newTr = tr.cloneNode(true); // clone node, duplicate child nodes
	var index = document.getElementById(tableId).getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
	document.getElementById(tableId).getElementsByTagName("tbody")[0].appendChild(newTr);

	// Bug in IE8: can't just replace the innerHTML on a TR, it'll drop half the TD of the first child node ... crazy.
	//   So, we iterate and update the child records instead of the parent.
	var nodes = newTr.getElementsByTagName("td");
	var newPath = regExPath + "[" + index + "]";
	var regex = new RegExp(regExPath + "\\[0\\]", "g");
	for (var i=0; i<nodes.length; i++) {
		nodes[i].innerHTML = nodes[i].innerHTML.replace(regex, newPath);
	}

	// reset new row values.
	clearAllElements(newTr);

	return index;
}
function disableAllInput(formId) {
	var form = document.getElementById(formId);
	for (var i=0;i<form.length;i++)
	  {
		if((form.elements[i] != null) &&
				(form.elements[i] != 'undefined') &&
				(form.elements[i].tagName == 'INPUT') &&
				(form.elements[i].type == 'radio') &&
				(form.elements[i].type != 'button') &&
				(form.elements[i].type != 'submit')
				) {
			form.elements[i].disabled = true;
		}

	  }
}
	
	//set the remaining characters
	function setRemainingText(fldNameId,limit,remNameId){
	     var remlbl= "Remaining Characters:";
	     var remObj=document.getElementById(remNameId);
	     if (remObj != null){
	      var fldObj=document.getElementById(fldNameId);
	      if (fldObj != null && fldObj.value.length > 0){
	          remObj.innerHTML= remlbl + (0 + limit  - (fldObj.value.length ));
	      }else{
	          remObj.innerHTML=remlbl + limit; 
	      }
	     }
	}

	//update the number of the remaining characters given in the 3rd paramter 
	function checkLengthRemainingOnKeyPress(obj, limit, remNameId) {
	    document.forms[currentForm].isDirty.value= 'true';
		var remlbl = "Remaining Characters:";  
		var remoObj = document.getElementById(remNameId);
		if (remoObj != null) {
			if (obj.value.length > limit) {
				remoObj.innerHTML = remlbl + 0;
			} else {
				remoObj.innerHTML = remlbl + (limit - obj.value.length);
			}
		}
	
		return true;
	}
	    	
	
  //force user to reduce number of character if exceedes a limit on input text area
	function checkLengthOnBlur(obj,limit){
		if (obj.value.length >  limit ){
			  obj.className="form-element-error";
			  obj.style.backgroundColor="yellow";
			  alert("You have exceeded the " + limit + " character limit, please edit");
			  obj.focus();
			  return false;
		}
		obj.style.backgroundColor="white";
		obj.className="form-element";
		return true;
	}

	//restricts number of characters entered and alert user while typing on text area
	function checkLengthOnKeyPress(obj,limit){
	    var keyPressed = event.keyCode;
	    switch (keyPressed){
	       case 8: //bksps
	       case 46: //delete
	    	   if (obj.value.length < limit + 2) {
	    		   obj.className="form-element";
	    		   obj.style.backgroundColor="white";
	    		   return true;
	    	   }
	    	   break;
	        default:
	    	   if (obj.value.length > limit + 1 ){
					obj.value = obj.value.substr(0,limit);
					obj.className="form-element-error";
					obj.style.backgroundColor="yellow";
					alert("You have reached the " + limit + " character limit.");
					obj.focus();
					return false;
				}
			   break;
	     }
		return true;
	}
	// CQ 32562
	//force user to reduce number of character if exceedes a limit on input text area
	function checkLimitOnBlur(obj, limit, reportingId){
		if(parseInt(document.getElementById(reportingId).innerText, 10) < 0 ){
			  obj.className="form-element-error";
			  obj.style.backgroundColor="yellow";
			  alert("You have exceeded the " + limit + " character limit, please edit");
			  obj.focus();
			  return false;
		}
		obj.style.backgroundColor="white";
		obj.className="form-element";
		return true;
	}
	// CQ 32562
	//restricts number of characters entered and alert user while typing on text area
	function checkLimitOnKeyDown(obj, limit, reportingId){
		var keyPressed = event.keyCode;
		var remainingCount = parseInt(document.getElementById(reportingId).innerText, 10);
		
		switch (keyPressed){
		// Skip key press that would not change the character remaining count for the text area.
			case 9: // Tab
			case 16: // Shift
			case 17: // Ctrl
			case 18: // Alt
			case 19: // Pause/Break
			case 20: // Caps Lock
			case 27: // Esc
			case 33: // Page Up
			case 34: // Page Down
			case 35: // End
			case 36: // Home
			case 37: // Left Arrow
			case 38: // Up Arrow
			case 39: // Right Arrow
			case 40: // Down Arrow
			case 44: // PrtScrn
			case 45: // Insert
			case 91: // Left Window Key Start
			case 92: // Right Window Key Start
			case 93: // Window Key Menu
			case 112: // F1
			case 113: // F2
			case 114: // F3
			case 115: // F4
			case 116: // F5
			case 117: // F6
			case 118: // F7
			case 119: // F8
			case 120: // F9
			case 121: // F10
			case 122: // F11
			case 123: // F12
			case 144: // Num Lock
			case 145: // Scroll Lock
			case 173: // Mute toggle
			case 174: // Volume Down
			case 175: // Volume Up
			case 12:  // Numkey pad '5' without numlock
			case 172: // Browser
			case 180: // Mail
			case 182: // Computer
			case 183: // Calculator
			case 177: // Skip Back
			case 179: // Play/Pause
			case 176: // Skip Forward
			case 181: // Music
				return true;
				break;
       		case 8: //bksps
       		case 46: //delete
    		   	return true;
    		   	break;
    	   	default:
    	   		if(remainingCount < 0) {
    				return false;
    			}
    	   		break;
    	}
		return true;
}
	// CQ 32562
	// Validation for number of characters entered in om:textarea
	// Use in onkeyup event for a om:textarea
	function checkLimitOnKeyUp(obj, limit, reportingId){
		var remainingCount = parseInt(document.getElementById(reportingId).innerText, 10);
		var text;
		
		text = obj.textContent;
		var someArray = text.split(/\n/);
		//window.alert(someArray.length);
		//window.alert(text.length);
		if((text.length + someArray.length - 1) > limit) {

			// Show error only once after it was highlighted yellow.
			if(obj.style.backgroundColor != "yellow") {
	   			// Clear the remaining character count to prevent checkLimitOnBlur() from showing
	   			// another alert box right after the user clicks ok on the alert box in this function.
				document.getElementById(reportingId).innerText = '0';

				alert("You have exceeded the " + limit + " character limit, please edit");

				obj.className="form-element-error";
				obj.style.backgroundColor="yellow";
				obj.focus();
	   			// Restore the remaining character count now that the checkLimitOnBlur() has already been called
	   			document.getElementById(reportingId).innerText = remainingCount;
			}
			
		} else {
			obj.className="form-element";
		   	obj.style.backgroundColor="white";
		}
		
		
		return true;
	}
	
	// CR 6367
	function confirmDelete(message) {
		if(message == null || message == '') {
		 	message = 'Are you sure you want to delete this record?';
		}

		if (confirm(message))
		{
			return true;
		}else{
			return false;
			}
		}
	
	function openVipMessage(message)
	{
		var winWidth = 420;
		var winHeight = 240;
		var url = "/OMNIStatic/dialogs/vipMessageDialog.html";
		var parameters = new Array();	
		parameters[0] = message;
		window.showModalDialog(url,parameters,"dialogWidth:" + winWidth + " px;dialogHeight:" + winHeight + "px;center:1;help:0;status:0;location=no,menubar=0,resizable=0");
	}

	// CQ 34195 
	function GetURLParameter(sParam)
	{
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++) 
	    {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam) 
	        {
	            return sParameterName[1];
	        }
	    }
	}
	function SetFieldEmptyById(Id)
	{
        if (document.getElementById(Id) != null) 
        {	
        	document.getElementById(Id).value = "";
        }
	}
