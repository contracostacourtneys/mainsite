const {SC_CHAT_API_KEY, GUARDIANSHIP_CHAT_API_KEY, GENERAL_CHAT_API_KEY} = process.env;

const apiai = require('apiai');
const aiSmallClaims = apiai(SC_CHAT_API_KEY);
const aiGuardianship = apiai(GUARDIANSHIP_CHAT_API_KEY);
const aiGeneral = apiai(GENERAL_CHAT_API_KEY);
const ais = {'Small Claims':{caseType: "Small Claims", bot: aiSmallClaims}, 'Guardianship': {caseType: "Guardianship", bot: aiGuardianship} }
const functions = require('./chatFunctions.js');
const fs = require('fs');
const opn = require('opn');
const path = require('path');
let ai, caseType;
/*set the ai temporarily to small claims agent only*/
// ai = aiSmallClaims;
//TEST_SmallClaims
// ai = apiai('1e399876a4544a4ba6f941e320b43ef7');
//Courntey_SmallClaims
ai = apiai('8fcfe02fdf5b42628700e6458795e6d4');

exports.selectCaseType = (req, res, callback) => {
    if (req.body.ai === false){
      //check existing case types
      switch (req.body.payload.message.toLowerCase()) {
        case "small claims":
          ai = aiSmallClaims;
          caseType = "Small Claims";
          break;
        case "guardianship":
          ai = aiGuardianship;
          caseType = "Guardianship";
          break;
        default:
          ai = aiGeneral;
          caseType = "General";
      }

    //machine learning goes here
    //either 1) the general inquiry bot which can be used to determine case types or 
    //2) a result of my own machine learning algo
    //either way the later calls will have to be a callback function for this
    }
    
    callback(req, res);
  };




exports.getMessageResponse = (req, res) => {
      {
        // console.log('/message', req.body);
        //to launch a webpage in user default browser
        if (req.body.url){
          opn(req.body.url);
          res.writeHead(200);
          res.end(JSON.stringify({speech:'Here you are! Let me know if you have more questions'}));
          return;
        }
        
        const options = {sessionId: req.body.id};

        //sends event request to api.ai and response to front end
        if (req.body.payload.type=='button'){
          const msg = req.body.payload.message;
          // console.log("dir ", __dirname);
          const events = JSON.parse(fs.readFileSync(path.join(__dirname, '../static_files/bot_buttons_and_events.json')));
          const ev = {};
          if (msg in events){
            // console.log(msg);
            ev.name=events[msg].name;
            ev.data=events[msg].data;
            // console.log(ev.name);
          }else{
            return;
          }
          
          console.log("event: ", ev);
          const request_to_ai = ai.eventRequest(ev, options);
          // console.log(request_to_ai);
          request_to_ai.on('response', (response_from_ai) => {
            console.log('Response:', response_from_ai);
            const code = response_from_ai.status.code;
            response_from_ai['caseType'] = caseType;
            // console.log(response_from_ai);
            res.writeHead(code);
            if (code == 200) {
              res.end(JSON.stringify(response_from_ai));
            }
            });
          request_to_ai.on('error', (error)=> {
            console.error("Error:", error)
          } );
          request_to_ai.end();
        }
        //send text request to api.ai 
        else if (req.body.payload.type=='text'){
          const request_to_ai = ai.textRequest(req.body.payload.message, options);
          request_to_ai.on('response', (response_from_ai)=>{
            // console.log('Response:', response_from_ai);
            const code = response_from_ai.status.code;
            response_from_ai['caseType'] = caseType;
            res.writeHead(code);
            if (code == 200){
              //send response object form api.ai to front end
              res.write(JSON.stringify(response_from_ai));
            }   
            res.end();
          });
          request_to_ai.on('error', (error)=> {
            console.error("Error:", error)
          } );
          request_to_ai.end();
          
        }
        //send voice request to api.ai
        // else{
        //   const request_to_ai = ai.voiceRequest(options);
        //   request_to_ai.on('response', (response_from_ai)=>{
        //     // console.log('Response:', response_from_ai);
        //     const code = response_from_ai.status.code;
        //     res.writeHead(code);
        //     if (code == 200){
        //       res.end(JSON.stringify(response_from_ai));
        //     }   
        //     res.end();
        //   });
        //   request_to_ai.on('error', (error)=> {
        //     console.error("Error:", error)
        //   } );
          
        //   //req.body.message is supposed to be a audio file path
        //   fs.readFile(req.body.payload.message, function(error, buffer) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     request_to_ai.write(buffer);
        //   }

        //   request_to_ai.end();
        //   });
          
        // }

      }
    };


exports.getWebhookResponse = (req, res)=>{
    console.log('/webhook', req.body);
    
    const action = req.body.result.action;
    // let response = {};
    //response is the argument passed into this function, 
    //res is the argument passed into the outer most function above
    const respondToAPI = (response)=>{
      response['caseType'] = caseType;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response));
      return;
    };
    switch (action){
      case 'small_claims.court_lookup':
      //this appears to be sync
        console.log("court_lookup chosen");
        functions.small_claims_court_lookup(req.body.result.parameters, respondToAPI);
        // console.log('Response Object:', response);
        // res.setHeader('Content-Type', 'application/json');
        // res.end(JSON.stringify(response));       
        // response.displayText = response.speech;
        break;
      case 'small_claims.sue_gov.resources':
        console.log("small claims sue gov resources chosen");
        response = functions.small_claims_sue_gov_resource(req.body.result.parameters);
        // console.log('Response Object:', response);
        break;
        
      case 'LL_agent_of_service_lookup':
      //this is async!
        console.log("LL_agent_of_service_lookup chosen");
        // const callback = (res) => {return res;};
        functions.agent_of_service_lookup(req.body.result.contexts, 'LPLLC', respondToAPI);//set callback to send response to api.ai      
        // console.log('Response Object:', response);
        break;
        
      case 'CORP_agent_of_service_lookup':
      //this is async!
        console.log("CORP_agent_of_service_lookup chosen");
        // const callback = (res) => {return res;};
        functions.agent_of_service_lookup(req.body.result.contexts, 'CORP', respondToAPI);//set callback to send response to api.ai     
        // console.log('Response Object:', response);
        break;
      
      default:
        console.log("Error: no such function exists.");
    }   
    
    
  };



/*

const Conversation = require('../models/conversation'),
  Message = require('../models/message'),
  User = require('../models/user');


exports.getConversations = function (req, res, next) {
  // Only return one message from each conversation to display as snippet
  Conversation.find({ participants: req.user._id })
    .select('_id')
    .exec((err, conversations) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      // Set up empty array to hold conversations + most recent message
      const fullConversations = [];
      conversations.forEach((conversation) => {
        Message.find({ conversationId: conversation._id })
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: 'author',
            select: 'profile.firstName profile.lastName'
          })
          .exec((err, message) => {
            if (err) {
              res.send({ error: err });
              return next(err);
            }
            fullConversations.push(message);
            if (fullConversations.length === conversations.length) {
              return res.status(200).json({ conversations: fullConversations });
            }
          });
      });
    });
};

exports.getConversation = function (req, res, next) {
  Message.find({ conversationId: req.params.conversationId })
    .select('createdAt body author')
    .sort('-createdAt')
    .populate({
      path: 'author',
      select: 'profile.firstName profile.lastName'
    })
    .exec((err, messages) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      return res.status(200).json({ conversation: messages });
    });
};

exports.newConversation = function (req, res, next) {
  if (!req.params.recipient) {
    res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
    return next();
  }

  if (!req.body.composedMessage) {
    res.status(422).send({ error: 'Please enter a message.' });
    return next();
  }

  const conversation = new Conversation({
    participants: [req.user._id, req.params.recipient]
  });

  conversation.save((err, newConversation) => {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    const message = new Message({
      conversationId: newConversation._id,
      body: req.body.composedMessage,
      author: req.user._id
    });

    message.save((err, newMessage) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      return res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
    });
  });
};

exports.sendReply = function (req, res, next) {
  const reply = new Message({
    conversationId: req.params.conversationId,
    body: req.body.composedMessage,
    author: req.user._id
  });

  reply.save((err, sentReply) => {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    return res.status(200).json({ message: 'Reply successfully sent!' });
  });
};
*/