"use strict";
/******************************************************************************************/
/* Name:       app.js                                                                     */
/*                                                                                        */
/* Purpose:    Main application for Chat bot                                              */
/*                                                                                        */
/* Edit history:                                                                          */
/*                                                                                        */
/* 15May2018 RC Initial development                                                       */
/* 04Jun2018 JW ITSVCS 194: Write user activity to transaction logs                       */
/* 05Jul2018 JW RW-66: Fix CORS/NTLM conflict in Firefox                                  */
/*                                                                                        */
/******************************************************************************************/
var dotenv     = require('dotenv').config();
var rpn        = require("request-promise-native");
var	express    = require('express');
var	bodyParser = require('body-parser');
var http       = require('http');
var AssistantV1 = require('watson-developer-cloud/assistant/v1');

/*************************************************************/
/* Set up express                                            */
/*************************************************************/
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));



  var assistant = new AssistantV1({
	version: '2018-09-20',
   username: 'b8ab9a7a-c861-40d4-8829-de9365d12e32',
   password: 'wORYjtOYuTf0',
   url: 'https://gateway-fra.watsonplatform.net/assistant/api',
   headers: {
	 'X-Watson-Learning-Opt-Out': 'true'
   }
   });
 

  
/*************************************************************/
/* Create express server                                     */
/*************************************************************/
http.createServer(app).listen(process.env.PORT, '0.0.0.0', function() {
  ts("app:main",'server starting on: ' + process.env.PORT);
});

/*************************************************************/
/* POST for client to interact with server                   */
/*************************************************************/
app.post('/api/bot', function(req, res) {
	
	ts("app:post","Received POST from client");
	ts("app:post","Workspace Id = " + req.body.workspace_id);

	
	
	// var routerServiceOptions = {
    //    method: "POST",
    //    uri: "https://gateway-fra.watsonplatform.net/assistant/api/v1/workspaces/",
	//    body: {
	// 	 workspace_id: '',
    //      context: {},   
    //      input: {}    
    //    },
    //    json: true // Automatically stringifies the body to JSON
    // };

    /*****************************************************************************/
    /* Take what we receive from the client and place it in the params structure */
	/* so that we can send it to Watson.                                         */
    /*****************************************************************************/
    // if (req.body) {
	// 	ts("app:post","Request body from client: " + JSON.stringify(req.body));
	// 	routerServiceOptions.body.workspace_id = req.body.workspace_id;
    //   if (req.body.input) {
    //     routerServiceOptions.body.input = req.body.input;
    //   }

    //   if (req.body.context) {
    //     routerServiceOptions.body.context = req.body.context;
	// 	routerServiceOptions.body.context.counter = routerServiceOptions.body.context.counter + 1;
    //   }
	//   else {
	// 	ts("app:post","No context yet");
			
	//   }	  
	// }
	let workspace_id;
	let input;
	let context;

	if (req.body) {
		// ts("app:post","Request body from client: " + JSON.stringify(req.body));
		workspace_id = req.body.workspace_id;
      if (req.body.input) {
        input = JSON.stringify(req.body.input);
      }

      if (req.body.context) {
        context = req.body.context;
		// routerServiceOptions.body.context.counter = routerServiceOptions.body.context.counter + 1;
      }
	  else {
		ts("app:post","No context yet");
			
	  }	  
	}

	console.log('req parameters ====>>>>>', input,context,workspace_id);
	
	
	assistant.message({
		workspace_id:'63440c23-89e1-40f7-bd9c-98c560cd354d', // hard coded workspace id
		input: {'text': input},
		context: context
	  },
		function (err, result, response) {
		  if (err) {
			console.log('error:======>>>>>>', err);
		  } else {
			
			console.log(response.body);
			return res.status(200).send(response);
		  }
		}
	  );

    // ts("app:post", "Sending to Watson: " + JSON.stringify(routerServiceOptions));

    /*****************************************************************************/
    /* Send params structure to Watson                                           */
    /*****************************************************************************/
	// rpn(routerServiceOptions)
	//   .then(function(routerWatsonResponse) {
	// 	 ts("app.post", "Good response from Watson for " + JSON.stringify(routerWatsonResponse));
	// 	 return res.status(200).send(routerWatsonResponse);
	//   })	
	//   .catch(function(err) {
	// 	 ts("app.post", "Problem with Watson call");
	// 	 ts("app.post", err);
	// 	 return res.status(500).send("Problem with writing transaction log entry");
	//   });

}); 
/***************************************************************/
/* Accept post requests with ratings                           */
/***************************************************************/
app.post('/api/v1/ratings', function (req, res) {
  console.log("tande:app.js:post/ratings ==> Incoming POST");
  
  ratingsServicePostOptions.body.rating = req.body.rating;
  ratingsServicePostOptions.body.clickCount = req.body.clickCount;
  //ratingsServicePostOptions.body.mudId = req.ntlm.UserName;
  ratingsServicePostOptions.body.Application = "Travel and Expense";
  
  console.log(ratingsServicePostOptions);
  
  rpn(ratingsServicePostOptions)
	 .then(function(ratingsResponse) {
		console.log("tande:app.js:post ==> Good response from server side ratings on Post");
		res.status(201).send(ratingsResponse.toString());
	 })	
	 .catch(function(err) {
		console.log("tande:app.js:post ==> Problem with writing rating entry on Post");
		ldapServiceOptions.uri = ldapServiceOptions.originalUri;
		console.log(err);
		return res.status(500).send("Problem with writing rating entry on Post");
	 });
});

/***************************************************************/
/* Accept patch requests for adding comments for ratings       */
/***************************************************************/
app.patch('/api/v1/ratings', function (req, res) {
  console.log("tande:app.js:patch/ratings ==> Incoming PATCH");

  ratingsServicePatchOptions.body.comments = req.body.comments;
  ratingsServicePatchOptions.body.ObjectIdHexString = req.body.ObjectIdHexString;
  ratingsServicePatchOptions.body.Application = "Travel and Expense";

  
  rpn(ratingsServicePatchOptions)
	 .then(function(ratingsResponse) {
		console.log("tande:app.js:patch ==> Good response from server side ratings on Patch");
		res.status(204).send("Good update");
	 })	
	 .catch(function(err) {
		console.log("tande:app.js:patch ==> Problem with writing rating entry on Patch");
		ldapServiceOptions.uri = ldapServiceOptions.originalUri;
		console.log(err);
		return res.status(500).send("Problem with writing rating entry on Patch");
	 });
  
});


// assistant.method(params,
// 	function (err, response) {
// 	  // The error will be the first argument of the callback
// 	  if (err.code == 404) {
// 		// Handle Not Found (404) error
// 	  } else if (err.code == 413) {
// 		// Handle Request Too Large (413) error
// 	  } else {
// 		console.log('Unexpected error: ', err.code);
// 		console.log('error:', err);
// 	  }
// 	});

/**********************************************************************************/
/* Name:    ts                                                                    */
/*                                                                                */
/* Purpose: Logging function.                                                     */
/*                                                                                */
/**********************************************************************************/
function ts(module, msg) {
    console.log(new Date().toISOString() + " " + module + " ==> " + msg);
}



