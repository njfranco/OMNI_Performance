//"'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//" Script Title       : 
//"                      
//" Script Date        : Tue Aug 14 12:16:13 2018
//"                       
//"'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

function Recording_OG01()
{
	web.setUser('DOC1.WA.LCL\\svcwautestuser01doc1', 
		lr.decrypt('5b732a7d951814be827889f48baf'), 
		'{ServerName}:80');

	web.url(
		{
			name : 'index.jsp', 
			url : 'http://{ServerName}/omni/index.jsp', 
			targetFrame : '', 
			resource : 0, 
			recContentType : 'text/html', 
			referer : '', 
			snapshot : 't1.inf', 
			mode : 'HTML', 
			extraRes :  [
				{url : '../OMNIStatic/images/menu-top/bubble-bg-2-line.gif'},
				{url : '../OMNIStatic/images/menu-top/bubble-bg-3-line.gif'},
				{url : '../OMNIStatic/images/menu-top/bubble-bg-1-line.gif'},
				{url : '../OMNIStatic/images/menu-top/bubble-bg-5-line.gif'},
				{url : '../OMNIStatic/images/menu-top/css-bg-on.jpg'},
				{url : '../OMNIStatic/images/menu-top/logged-in-bg.jpg'},
				{url : '../OMNIStatic/images/menu-top/css-bg-off.jpg'},
				{url : '../OMNIStatic/images/menu-left/img-noarrow.gif'}
			]
		}
	);

	web.submitData(
		{
			name : 'HttpRequestAjaxServlet', 
			action : 'http://{ServerName}/omni/HttpRequestAjaxServlet', 
			method : 'POST', 
			targetFrame : '', 
			referer : 'http://{ServerName}/omni/index.jsp', 
			snapshot : 't2.inf', 
			mode : 'HTML', 
			itemData :  [
				{name : 'sessionBrowserId', value : '61l27un0ab6s'}
			]
		}
	);

	web.submitData(
		{
			name : 'docNumberSearch.htm', 
			action : 'http://{ServerName}/omni/common/docNumberSearch.htm', 
			method : 'POST', 
			targetFrame : '', 
			recContentType : 'text/html', 
			referer : 'http://{ServerName}/omni/index.jsp', 
			snapshot : 't3.inf', 
			mode : 'HTML', 
			itemData :  [
				{name : 'docSearchNumber', value : '888912'},
				{name : 'go', value : 'Go'}
			],
			extraRes :  [
				{url : '/OMNIStatic/images/menu-top/bubble-bg-2-line.gif', referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm'},
				{url : '/OMNIStatic/images/menu-top/bubble-bg-3-line.gif', referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm'},
				{url : '/OMNIStatic/images/menu-top/bubble-bg-1-line.gif', referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm'},
				{url : '/OMNIStatic/images/menu-top/logged-in-bg.jpg', referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm'},
				{url : '/OMNIStatic/images/menu-top/bubble-bg-5-line.gif', referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm'},
				{url : '/OMNIStatic/images/menu-left/img-noarrow.gif', referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm'},
				{url : '/OMNIStatic/images/menu-top/css-bg-off.jpg', referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm'},
				{url : '/OMNIStatic/images/icons/red-flag.gif', referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm'},
				{url : '/OMNIStatic/images/menu-top/css-bg-on.jpg', referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm'},
				{url : '/OMNIStatic/images/buttons/button-plus-gray.gif', referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm'},
				{url : '/OMNIStatic/images/buttons/button-plus-15pt.gif', referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm'}
			]
		}
	);

	web.url(
		{
			name : 'offenderCPHeader.htm', 
			url : 'http://{ServerName}/omni/advcor/csPln/offenderCPHeader.htm?persCallback=&persCheckIsDirty=true&inctvCallback=&inctvCheckIsDirty=true&ccOnClick=%24(\'%23sc_section\').trigger(\'header%3Aexpand\')%3B+return+false%3B&waOnClick=%24(\'%23sc_section\').trigger(\'header%3Aexpand\')%3B+return+false%3B&scOnClick=%24(\'%23sc_section\').trigger(\'header%3Aexpand\')%3B+return+false%3B&readOnly=false&isPrint=&nrtvHstryPage=', 
			targetFrame : '', 
			resource : 0, 
			recContentType : 'text/html', 
			referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm', 
			snapshot : 't4.inf', 
			mode : 'HTML'
		}
	);

	web.customRequest(
		{
			name : 'needsGoalsManager.getCaseManagementFlag.dwr', 
			url : 'http://{ServerName}/omni/dwr/call/plaincall/needsGoalsManager.getCaseManagementFlag.dwr', 
			method : 'POST', 
			targetFrame : '', 
			resource : 0, 
			recContentType : 'text/javascript', 
			referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm', 
			snapshot : 't5.inf', 
			mode : 'HTML', 
			encType : 'text/plain', 
			body : 'callCount=1\npage=/omni/advcor/csPln/offenderCasePlan.htm\nhttpSessionId=0000RB5n8xbz4SM78VlY4AgAc9l:-1\nscriptSessionId=B3244967231977F37FEB8D3626875B7E291\nc0-scriptName=needsGoalsManager\nc0-methodName=getCaseManagementFlag\nc0-id=0\nc0-param0=string:888912\nbatchId=0\n'
		}
	);

	web.submitData(
		{
			name : 'HttpRequestAjaxServlet_2', 
			action : 'http://{ServerName}/omni/HttpRequestAjaxServlet', 
			method : 'POST', 
			targetFrame : '', 
			referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm', 
			snapshot : 't6.inf', 
			mode : 'HTML', 
			itemData :  [
				{name : 'sessionBrowserId', value : '61l27un0ab6s'}
			]
		}
	);

	web.submitData(
		{
			name : 'persGoalNrtv.htm', 
			action : 'http://{ServerName}/omni/advcor/csPln/persGoalNrtv.htm', 
			method : 'POST', 
			targetFrame : '', 
			recContentType : 'text/html', 
			referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm', 
			snapshot : 't7.inf', 
			mode : 'HTML', 
			itemData :  [
				{name : 'readOnly', value : 'false'},
				{name : 'isPrint', value : ''},
				{name : 'nrtvHstryPage', value : ''}
			]
		}
	);

	web.submitData(
		{
			name : 'inctvNrtv.htm', 
			action : 'http://{ServerName}/omni/advcor/csPln/inctvNrtv.htm', 
			method : 'POST', 
			targetFrame : '', 
			recContentType : 'text/html', 
			referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm', 
			snapshot : 't8.inf', 
			mode : 'HTML', 
			itemData :  [
				{name : 'readOnly', value : 'false'},
				{name : 'isPrint', value : ''},
				{name : 'nrtvHstryPage', value : ''}
			]
		}
	);

	web.url(
		{
			name : 'contacts.htm', 
			url : 'http://{ServerName}/omni/advcor/cntc/contacts.htm?bannerView=true&editing=false', 
			targetFrame : '', 
			resource : 0, 
			recContentType : 'text/html', 
			referer : 'http://{ServerName}/omni/advcor/csPln/offenderCasePlan.htm', 
			snapshot : 't9.inf', 
			mode : 'HTML'
		}
	);

	return 0;
}

