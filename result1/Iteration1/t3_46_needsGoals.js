// Submits a form (using the optional data parameters), putting the results into the specified id.
function cm_ng_submit(refreshPlan, refreshFlags, elem, resultId, data, serializedData) {

	// identify the form containing this input element 
	var form = $(elem).closest("form");
	var id = form.attr('id');
	var params = form.serialize();
	if ($(elem).is('input.form-button')) {
		params = params + "&" + elem.name + "=" + elem.value;
	}
	if ($.isPlainObject(data)) {
		params = params + "&" + $.param(data);
	}
	if (serializedData != undefined) {
		params = params + "&" + serializedData;
	}
	
	// disable buttons within this form
	form.find("input[type='submit'], input[type='button']").attr('disabled', 'disabled');
	
	$.ajax({
		type: "POST",
		url: form[0].action,
		data: params,
		async: true,
		success: function(html, textStatus, jqXHR) {
			$("#" + resultId).empty().append(html).enableIsDirtyListeners();
			
			// Refresh the Case Management flags
			if (refreshFlags) {
				$('#cm_section .flag').trigger('refresh');
			}
			
			// Refresh the Progression Plan time line
			if (refreshPlan) {
				cm_ng_pp_refreshTimeline();
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			$("#" + resultId).empty().append(jqXHR.responseText);
		},
		complete: function(jqXHR, textStatus) {	
		}
	});
	
	return false;
}

function cm_ng_ad_toggleSection(collapsibleIcon, url, canEdit) {
	var icon = $(collapsibleIcon);
	var spinner = icon.parent().prev();
	var nextSection = icon.parent().parent().parent().parent().next().children("td");
	if (icon.hasClass('collapsed')) {
		var docNb = icon.data("docnb");
		var ofnntycd = icon.data("ofnntycd");
		openDisclaimerDialog(docNb, ofnntycd, "OTHER", function() {			
			cm_ng_ad_toggleSection_expand(collapsibleIcon, url, canEdit);
		});
	}
	else {
		icon.removeClass('expanded');
		icon.addClass('collapsed');
		nextSection.empty();
		spinner.addClass('invisible');
		
		// If collapsing, enable Asmnt Domain form elements, only if all sections are collapsed,
		// and only if the current user has permission.
		if ($("#cm_ng_ad_form .collapsible-icon.expanded").size() == 0 && canEdit) {	
			// refresh the domain section by clicking Cancel.
			$("#cm_ng_ad_form > form input[name='cancel']").click();
		}
	}
}

function cm_ng_ad_toggleSection_expand(collapsibleIcon, url, canEdit) {
	var icon = $(collapsibleIcon);
	var spinner = icon.parent().prev();
	var nextSection = icon.parent().parent().parent().parent().next().children("td");
	
	spinner.removeClass('invisible');
	icon.removeClass('collapsed');
	icon.addClass('expanded');
	
	// If expanding, disable all Asmnt Domain form elements (Current Focus, Priority, Barrier, Save/Cancel, etc)
	$(".cm_ng_ad_form, #cm_ng_ad_form > form input").prop('disabled', true);
	$(".cm_ng_ad_a").addClass("disabled");
	
	$.ajax({
		type: "GET",
		url: url,
		async: true,
		success: function(html, textStatus, jqXHR) {
			nextSection.empty().html(html)
		},
		error: function(html, textStatus, jqXHR) {
			nextSection.empty().html(html)
		},
		complete: function(html, textStatus, jqXHR) {
			nextSection.off('click');
			nextSection.on('click', function(event) { event.stopPropagation(); setLastAccessed(icon); })
			setLastAccessed(icon);
			spinner.addClass('invisible');

			$('html,body').animate({scrollTop: icon.parent().parent().parent().offset().top});
		}
	});
}

function cm_ng_openPrintWindow(elem) {
	var locationX = (window.screen.width/2) - (400 + 10);
	var locationY = (window.screen.height/2) - (300 + 50);
	var printWindow = openPopUpReturnWindow("","printWindow","directories=no,height=520,left=" + locationX + ",location=no,menubar=no,resizable=yes,screenX=" + locationX + ",screenY=" + locationY + ",scrollbars=yes,status=no,toolbar=no,top=" + locationY + ",width=1040");
	printWindow.focus();
	
	var form = $(elem).closest("form")[0];
	form.target = "printWindow" + sessionStorage.getItem("sessionBrowserId");
	var print = $('<input type="hidden" name="' + elem.name + '" value="' + elem.value + '"/>');
	print.appendTo($(form));
	form.submit();
	print.remove();
	form.target = "_parent";
	
	return false;
}

var cm_ng_pp_submitting = false;

// Submits the Progression Plan Form.
function cm_ng_pp_submitForm() {
	
	if (timeline != undefined) {
		// Get the form to submit
		var cmForm = $("#cm_ng_pp_form");
		
		// disable buttons within this form
		cmForm.find("input[type='submit']").attr('disabled', 'disabled');
	
		// Store the timeline start and end date/times for submission so we come back to where
		// we left on the timeline
		var range = timeline.getWindow();
		var startDateTimeString = range.start;
		var endDateTimeString = range.end;
		var timelineDivHeightString = $("#timeline").height();
		$('#cm_ng_pp_timelineStart').val(startDateTimeString);
		$('#cm_ng_pp_timelineEnd').val(endDateTimeString);
		$('#cm_ng_pp_timelineDivHeight').val(timelineDivHeightString);
	
		// Submit the form
		var cmForm = $("#cm_ng_pp_form");
		$.post(cmForm[0].action, cmForm.serialize(), function(html) {
			$("#cm_ng_pp_fs").empty().append(html);
			cm_ng_pp_submitting = false;
		});
	}
}

function cm_ng_pp_refreshTimeline() {
	$('#cm_ng_pp_pageMode').val('ViewTimelineMode');
	cm_ng_pp_submitForm();
}

// Submits Progression Plan to view/edit an existing entity (Custody, Program, or Note).
function cm_ng_pp_viewEditEntity(submitAction, entityType, entityId, pageMode) {
	// Make sure we're in ViewTimelineMode and we're not then just return
	//if ($('#cm_ng_pp_pageMode').val() !== 'ViewTimelineMode') {
	//	return;
	//}
	
	// short-circuit to prevent double clicking of buttons or links
	if (cm_ng_pp_submitting) {
		return;
	}
	cm_ng_pp_submitting = true;
	
	// Set hidden fields for action, entity and page mode
	$('#cm_ng_pp_submitAction').val(submitAction);
	$('#cm_ng_pp_entityType').val(entityType);
	$('#cm_ng_pp_entityId').val(entityId);
	$('#cm_ng_pp_pageMode').val(pageMode);
	
	// Submit the form
	cm_ng_pp_submitForm();
	
	// Go to the data entry section
	$('html, body').animate({scrollTop: $("#cm_ng_pp_entity_fs").offset().top}, 500);
}

// Submits Progression Plan to allow user to add new entity (Custody, Program or Entity)
function cm_ng_pp_addNewEntity(submitAction, entityType, pageMode) {
	// Make sure we're in ViewTimelineMode and we're not then just return
	if ($('#cm_ng_pp_pageMode').val() !== 'ViewTimelineMode') {
		return;
	}
	
	// Set hidden fields for action, entity and page mode
	$('#cm_ng_pp_submitAction').val(submitAction);
	$('#cm_ng_pp_entityType').val(entityType);
	$('#cm_ng_pp_pageMode').val(pageMode);

	// Submit the form
	cm_ng_pp_submitForm();
	
	// Scroll down to the data entry section
	$('html, body').animate({scrollTop: $("#cm_ng_pp_entity_fs").offset().top}, 500);
}

// Asks user if they are sure and if so submits form to delete entity
function cm_ng_pp_deleteEntity(submitAction, entityType, entityId) {
	// Word a confirmation question that appropriate for the entity
	var confirmationQuestion = "Are you sure you want to delete this ";
	if (entityType === 'CustodyEntityType') {
		confirmationQuestion = confirmationQuestion + "planned custody?";
	} else if (entityType === 'ProgramEntityType') {
		confirmationQuestion = confirmationQuestion + "planned program?";
	} else if (entityType === 'NoteEntityType') {
		confirmationQuestion = confirmationQuestion + "planning note?";
	}

	// Confirm with user before submitting
	if (confirm(confirmationQuestion)){
		// Set hidden fields for action, entity and page mode
		$('#cm_ng_pp_submitAction').val(submitAction);
		$('#cm_ng_pp_entityType').val(entityType);
		$('#cm_ng_pp_entityId').val(entityId);

		// Submit the form
		cm_ng_pp_submitForm();
		
		// Scroll back up to the progression plan
		$('html, body').animate({scrollTop: $("#cm_ng_pp_form").offset().top}, 0);
	}
}

// Submits Progression Plan to save an entity (Custody, Program or Entity). Entity may be either new or existing.
function cm_ng_pp_saveAddModify() {
	// short-circuit to prevent double clicking of buttons or links
	if (cm_ng_pp_submitting) {
		return;
	}
	cm_ng_pp_submitting = true;
	
	// Set the submit action to "SaveEntity"
	$('#cm_ng_pp_submitAction').val('SaveEntity');
	
	// Submit the form
	cm_ng_pp_submitForm();
		
	// Scroll back up to the progression plan
	if ($('#cm_ng_pp_pageMode').val() === 'ViewTimelineMode') {
		$('html, body').animate({scrollTop: $("#cm_ng_pp_form").offset().top}, 0);
	}
}

// Submits Progression Plan to cancel adding or editing an Entity and close data entry form
function cm_ng_pp_cancelAddModify() {
	// Check if anything has changed and if so confirm cancel with user
	var isDirty = false;
	$("#cm_ng_pp_form input[name='isDirty'], #cm_ng_pp_form input[name='isDirty']").each(function() {
		if (this.value === 'true') isDirty = true;
	});
	if (isDirty) {
		if (!confirm("Are you sure you want to cancel your changes?")) {
			return;
		}
	}
	
	// Set hidden fields for action, entity and page mode
	$('#cm_ng_pp_submitAction').val('UNKNOWN');
	$('#cm_ng_pp_entityType').val('UNKNOWN');
	$('#cm_ng_pp_pageMode').val('ViewTimelineMode');
	
	// Submit the form to cancel
	cm_ng_pp_submitForm();
		
	// Scroll back up to the progression plan
	$('html, body').animate({scrollTop: $("#cm_ng_pp_form").offset().top}, 0);
}

function openPopup(url, width, height, callback) {
	var retVal = openModalDialog(url, width, height);
	if (callback) callback.call();
}

// Objective Frequency radio group onChange event.  
// If radio group is deselected, hide recurrence section.
// If radio value == 1, show week LOV
// If radio value == 2, show month LOV
function cm_ng_strnobFreqTypNbOnChange(elem) {
	var ofnntyCd = elem.id.replace(/cm_ng_(\d+)_objctvs.*/, "$1");
	var index = elem.id.replace(/.*objctvs_(\d+)_strnob.*/, "$1");
	var value = (elem.type == 'radio') ? elem.value : 0;
	var checked = (elem.type == 'radio') ? elem.checked : false;
	if (checked) {
		// toggle display of recurrence LOV - based on radio selection, display the appropriate LOV
		$("#cm_ng_"+ofnntyCd+"_objctvs tr.row"+index+" span.rpmscoCd").setDisplayed(value == 1);
		$("#cm_ng_"+ofnntyCd+"_objctvs tr.row"+index+" span.rpmscdCd").setDisplayed(value == 2);
	}
	else {
		$("#cm_ng_"+ofnntyCd+"_objctvs tr.row"+index+" input[type='radio']").prop('checked', false);
	}
	
	// clear day LOVs and checkboxes
	$("#cm_ng_"+ofnntyCd+"_objctvs tr.row"+index+" select").val('')
	$("#cm_ng_"+ofnntyCd+"_objctvs tr.row"+index+" input[type='checkbox']").prop('checked', false);
	
	// toggle visibility of recurrence table - if radio is unchecked, hide the days of the weeks
	$("#cm_ng_"+ofnntyCd+"_objctvs tr.row"+index+" span.days").setVisible(checked && (value == 1 || value == 2));
	$("#cm_ng_"+ofnntyCd+"_objctvs tr.row"+index+" table").setVisible(checked && (value == 1 || value == 2));
}

/**
 * Opens up a details row in the Objective Consequence Summary table.
 * @param link the Details href link for reference
 * @param strnobId the pk of the TbStrngrNdsObjctv record.
 * @param expand a boolean indicating if the details should expand or collapse.
 */
function sa_oc_objctvsDetails(link, strnobId) {
	var selectedRow = $(link).closest('tr');
	var nextRow = selectedRow.next().find('td');
	nextRow.attr('id', 'sa_oc_strnobId_'+strnobId);
	if (link.innerHTML === 'Details') {
		$("#sa_oc_section a").addClass('disabled'); // disable all href in the displaytag table
		$(link).removeClass('disabled'); // except this "Hide" one
		$("#sa_oc_section a.refresh").removeClass('disabled'); // except the refresh link
		$("#sa_oc_objctvs").next().find("select").prop('disabled', true);
		
		// enable spinner
		var spinner = $(link).prev();
		spinner.addClass(selectedRow.attr('class')); // theme spinner for even or odd row	
		spinner.addClass('spinner-icon');
		
		// load dynamic content
		nextRow.load("/omni/advcor/needs/cnsqcAprvl.htm?strnobId="+strnobId,
			// on complete function
			function( response, status, xhr ) {
				if ( status == "error" ) { nextRow.html( response ); }
				spinner.removeClass();
				link.innerHTML = 'Hide';
			}
		);
	}
	else {
		// Refresh the displaytag list
		$("#sa_oc_section a.refresh").click();
	}
}

function sa_oc_submit(elem, resultId) {
	var form = $(elem).closest("form");
	var params = form.serialize();
	if ($(elem).is('input.form-button')) {
		params = params + "&" + elem.name + "=" + elem.value;
	}
	// disable buttons within this form
	form.find("input[type='submit']").attr('disabled', 'disabled');

	$.ajax({
		type: "POST",
		url: form[0].action,
		data: params,
		async: true,
		success: function(html, textStatus, jqXHR) {
			$("#" + resultId).empty().append(html).enableIsDirtyListeners();
			
			if ($("#sa_oc_section .omniMessages").size() > 1) {				
				$("#sa_oc_section .omniMessages")[0].innerHTML = $("#sa_oc_section .omniMessages")[1].innerHTML;
			}
			
			// Refresh the Case Management flags
			$('#cm_section .flag').trigger('refresh');
		},
		error: function(jqXHR, textStatus, errorThrown) {
			$("#" + resultId).empty().append(jqXHR.responseText);
		},
		complete: function(jqXHR, textStatus) {	
		}
	});
	
	return false;
}

/**
 * When either the Positive or Negative Objective Consequence Type changes, the Consequence Status must default
 * per the given level and the Request Status must reset.
 * @param ofnntyCd domain code 
 * @param index row index of the objective
 */
function consequenceOnChange(ofnntyCd, index) {
	// reset Request Status to None
	$('#cm_ng_' + ofnntyCd + '_objctvs_' + index + '_oneorqCd').val('1'); 
	$('#cm_ng_' + ofnntyCd + '_objctvs_' + index + '_oneorqCdLbl').html('None');

	var posStrncnCd = $('#cm_ng_' + ofnntyCd + '_objctvs_' + index + '_strnobPstvStrncnCd').val(); 
	var negStrncnCd = $('#cm_ng_' + ofnntyCd + '_objctvs_' + index + '_strnobNgtvStrncnCd').val(); 
	
	// default Consequence Status to Reviewed or Requested depending on level
	needsGoalsManager.getDefaultStatusCode(posStrncnCd, negStrncnCd, { 
		callback: function(strncsCd) { 
			$('#cm_ng_' + ofnntyCd + '_objctvs_' + index + '_strnobPstvStrncsCd').val(strncsCd); 
			$('#cm_ng_' + ofnntyCd + '_objctvs_' + index + '_strnobNgtvStrncsCd').val(strncsCd); 
		}, async:true 
	});
}

// CQ39416 - add a confirm dialog "Exit without saving?" when pressing Cancel to clear the form (which has nothing to do with exiting). 
function exitWithoutSaving() {
	if ($("#cm_ng_ad_form").find("input[name='isDirty']").val() === "true" && window.confirm("Exit without saving?")) {
		return true;
	} else {
		return false;
	}
}
