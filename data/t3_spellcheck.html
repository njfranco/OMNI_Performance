/**
* Called by the spellcheck link on the narratives
* Invokes the MSWord spell check dialog
*/
function checkTextSpelling(formTextBox) {

	//retrieve the text they entered
	var initialValue = trim(formTextBox.value)
	if (initialValue != "") {
		
		var correctedValue = openCheckSpelling(initialValue);
		if (correctedValue == -1) {
			//text was already correct
			alert("No spelling errors found.");
		} else if (correctedValue == -2) {
			//problem creating the ole object
			alert("Please be sure that Microsoft Office is correctly installed and scripting of ActiveX controls is enabled (Tools -> Internet Options -> Security -> Custom Level -> [Enable] Initialize and script ActiveX controls not marked as safe)");
		} else {
			correctedValue = trim(correctedValue);
			if (correctedValue != initialValue) {
				//something was changed
				var max = formTextBox.maxLength;
				if (max != undefined && correctedValue.length > max) {
					formTextBox.value = correctedValue.slice(0, max);
					alert("Corrected text truncated due to size limitations for the field.");
				} else {
					formTextBox.value = correctedValue;
					alert("Spelling corrected.");
				}
				// CQ19823 - Dirty the form if the formTextBox was changed.
				// CQ27553 - For the pop-up form we need to check that the form is not null.
				if (currentOmniForm != null && typeof(currentOmniForm) != "undefined" && typeof(currentOmniForm.isDirty) != "undefined") {
					currentOmniForm.isDirty.value = 'true';
				}	
			} else {
				formTextBox.focus();
				//they didn't make any changes..
				alert("No changes made.");
			}
		}
	} else {
		//no text entered..
		alert("Please enter text to spell check.");
		formTextBox.focus();
	}
}

/* do spelling check */
function openCheckSpelling(TextValue) {
	var strReturnValue = "";
	var appWord;
	var objDocobject;

	try {
		appWord = new ActiveXObject("Word.Application");
	} catch(err) {
		//unable to create the object, not installed or they have activex scripting turned off
		strReturnValue = -2;
		return strReturnValue;
	}
	if (appWord.CheckSpelling(TextValue)) {
		//no spelling errors found
		strReturnValue = -1;
	} else {
		//position it off the screen so it doesn't flash up
		appWord.Top = -3000;
		
		appWord.WindowState = 2;
		appWord.Visible = true;
		appWord.Documents.Add();
		
		//make sure the app is in focus
		appWord.Activate();
		
		appWord.Selection.WholeStory();
		appWord.Selection.TypeText(TextValue);
		appWord.ActiveDocument.CheckSpelling();
		appWord.Selection.WholeStory();
		strReturnValue = appWord.Selection.Text;
		
	}
	//be sure to destroy the word reference
	appWord.Quit(false);
	appWord = null;
    return strReturnValue;
}

/**
* Removes leading and trailing whitespace from a string
*/
function trim(strText) {
	var newText = strText;
	while (isWhitespace(newText.substring(0,1))) {
		newText = newText.substring(1, newText.length);
	}
	while (isWhitespace(newText.substring(newText.length-1,newText.length))) {
		newText = newText.substring(0, newText.length-1);
	}
	return newText;
}

/**
* Returns true if the parameter is a whitespace character
*/
function isWhitespace(char) {
	if (char == ' ' || char == '\r' || char == '\n') {
		return true;
	} else {
		return false;
	}
}