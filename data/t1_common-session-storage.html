
//generate an unique id for each tab or new window
function generateGuid() {
    return Math.random().toString(36).substring(2, 15);
}

//check if non of sessionbrowserid existing then create new sesseionbrowserid.
if (sessionStorage.getItem("sessionBrowserId") == null )
{
	var strUrl = window.location.href.toLowerCase();
	sessionStorage.setItem("sessionBrowserId", generateGuid());
	//create new sessionStorage so we can use later on global-selected-doc to set doc-no field to empty
	//it only happens when user select File->New Window within current OMNN Screen.
	sessionStorage.setItem("isNewBrowser", "Y");
	//check if copy and paste link or book mark or new window then redirect to /omni/index.jsp	
	if (strUrl.indexOf("omni/index.jsp") == -1 
			&& strUrl.indexOf("omni/springboard.jsp") == -1 
			&& strUrl.indexOf("omni/login.jsp") == -1
			&& strUrl.indexOf("omni/dbschematable.jsp") == -1
			&& strUrl.indexOf("omni/mbs/mainlinescan") == -1)

	{
		
			window.location.href = "/omni/springboard.jsp";
	}
}

// Add sessionBrowserId as a custom request header to all ajax requests. 
$.ajaxSetup({
	beforeSend: function(xhr) {
		xhr.setRequestHeader('sessionBrowserId', sessionStorage.getItem('sessionBrowserId'));
	}
});



//create onbeforeunload event to send sessionBrowserId to server using Jquery/Ajax to servlet
if (window.addEventListener) {
	window.addEventListener("beforeunload", processAjaxServlet, false);
	window.addEventListener("load", initSession, false);
}
else if (window.attachEvent) {
	window.attachEvent("on" + "beforeunload", processAjaxServlet);
	window.attachEvent("on" + "load", initSession);
} 
else {
	window["on" + "beforeunload"] = processAjaxServlet;
	window["on" + "load"] = initSession;
}

if (typeof dwr != 'undefined')
{
	dwr.engine.setPreHook(processAjaxServlet) ;
}

function processAjaxServlet()
{
	
	var browserId = "";
	if (sessionStorage.getItem("sessionBrowserId") != null)
	{
		browserId = sessionStorage.getItem("sessionBrowserId");			
	}

	var inputdata  = { sessionBrowserId : browserId   }; 

	$(document).ready(function() {
		 $.ajaxSetup ({
		        async: false ,
		        // Disable caching of AJAX responses 
		        cache: false
		    });

		 $.ajax({  
			    type: 'POST',  
			    url:'/omni/HttpRequestAjaxServlet', 
			    data: inputdata,		   
			    success: function(result){  

			    }                
			  });  
	}); 
}


/* section for session time out */
//How frequently to check for session expiration in milliseconds
var sess_pollInterval = 60000;
//How many minutes the session is valid for
var sess_expirationMinutes = 120;
//How many minutes before the warning prompt
var sess_warningMinutes = 110;
 
var sess_intervalID;
var sess_lastActivity;

Date.prototype.getMonthName = function() {
      var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
      return monthNames[this.getMonth()];
 }

Date.prototype.getDayName = function() {
	var d = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	return d[this.getDay()];
}
 
function formatTimeOutDate(now)
{
	var hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
	var min = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
	var year = now.getFullYear();
	var monthName = now.getMonthName();
	var dayName = now.getDayName();
	return hour + ":" + min + " on " + dayName + ", " + now.getDate() + "-" + monthName + "-" + year;
}


function initSession() {
    sess_lastActivity = new Date();			
    sessSetInterval();
    $(document).bind('keypress.session', function (ed, e) {
        sessKeyPressed(ed, e);
    });
}
function sessSetInterval() {
    sess_intervalID = setInterval('sessInterval()', sess_pollInterval);
}
function sessClearInterval() {
    clearInterval(sess_intervalID);

}
function sessKeyPressed(ed, e) {
    sess_lastActivity = new Date();
}

function sessInterval() {
	var winWidth = 400;
	var winHeight = 200;
    var now = new Date();
	var returnVal = "";
    //get milliseconds of differneces
    var diff = now - sess_lastActivity;
    //get minutes between differences
    var diffMins = (diff / 1000 / 60);
    var url = "/OMNIStatic/dialogs/sessionTimeoutDialog.html";
   
    var warningFlag = true;
    if (diffMins >= sess_warningMinutes  && diffMins < sess_expirationMinutes) {
        //warn before expiring
        //stop the timer
        //sessClearInterval();
        //prompt for attention
    	warningFlag = false;
		var parameters = new Array();	
		var nowFormat =  formatTimeOutDate(now) ;
		parameters[0] = "Warning";
		parameters[1] = "It is '" + nowFormat +  "' ";
		parameters[2] = "If you are still using the OMNI Application, \nplease click OK with in the next 10 minutes to \ncontinue.  Otherwise, your session will expire and \nall unsaved documentation will be lost.";
		parameters[3] = "Your Session has expired due to 2 hours \nof inactivity.  Click OK and navigate to the \n'iDOC' home page to access OMNI.";
		returnVal = window.showModalDialog(url,parameters,"dialogWidth:" + winWidth + " px;dialogHeight:" + winHeight + "px;center:1;help:0;status:0");
		warningFlag = true;
		if (typeof returnVal == 'undefined') {
			 return false;
		} else if (returnVal != null && returnVal == 'OK') {

            now = new Date();
            diff = now - sess_lastActivity;
            diffMins = (diff / 1000 / 60);
            if (diffMins < sess_expirationMinutes) {
          //      sessLogOut();
          //  }
          //  else {
                initSession();
                sessSetInterval();
                sess_lastActivity = new Date();
            }
        }
		
        
    }
	//expired
	if (warningFlag && diffMins >= sess_expirationMinutes) {
		sessClearInterval();
		var parameters = new Array();	
		var nowFormat =  formatTimeOutDate(now) ;
		parameters[0] = "Expired";
		parameters[1] = "It is '" + nowFormat +  "' ";
		parameters[2] = "If you are still using the OMNI Application, \nplease click OK with in the next 10 minutes to \ncontinue.  Otherwise, your session will expire and \nall unsaved documentation will be lost.";
		parameters[3] = "Your Session has expired due to 2 hours \nof inactivity.  Click OK and navigate to the \n'iDOC' home page to access OMNI.";
		returnVal = window.showModalDialog(url,parameters,"dialogWidth:" + winWidth + " px;dialogHeight:" + winHeight + "px;center:1;help:0;status:0");

	}
}
    

    /* end section for session time out */
    
//defect 26250 Global - rollback changes made for CQ 25891
//With jQuery to disable global right click per defect 25891
//$(document).on({
 //   "contextmenu": function(e) {
       // alert("ctx menu button:", e.which); 

        // Stop the context menu
//        e.preventDefault();
//	}
//comment out for defect OMNI00026046
//,
//	"mousedown": function(e) { 
	    //console.log("normal mouse down:", e.which); 
		// e.metaKey = false;
	
 //		if ( e.ctrlKey && e.which == 1)
//		{
//			alert("CTRL + Click is disable.");
//			e.returnValue = false;
		
//		}
//		if ( e.shiftKey && e.which ==1)
//		{
//			alert("SHIFT + Click is disable.");
//			e.returnValue = false;
		
//		}
//		if (e.which ==2)
//		{
//			alert("Middle Click is disable.");
//			e.returnValue = false;

//		}

//				if(e.shiftKey) { 

//	}
	//,
	//"mouseup": function(e) { 
	 //   console.log("normal mouse up:", e.which); 
	//}


//});

