const User = require('../models/user');
const setUserInfo = require('../helpers').setUserInfo;
const setProfile = require('../helpers').setProfile;
// const Case = require('../models/case');
// const dcopy = require('deep-copy');

//= =======================================
// User Routes
//= =======================================
exports.viewProfile = function (req, res, next) {
  const userId = req.params.userId; 
  // console.log("req user", req.user);
  // console.log("req params", req.params);
  if (req.user._id.toString() !== userId) { return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); }
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(400).json({ error: 'No user could be found for this ID.' });
      return next(err);
    }

    const userToReturn = setProfile(user);

    return res.status(200).json({ user: userToReturn });
  });
};

exports.updateProfile = function (req, res, next){
  const userId = req.params.userId || req.session.passport.user;
  console.log("Req body:", req.body);
  const address = req.body.address;
  const phone = req.body.phone;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  if (req.user._id.toString() !== userId) { return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); }
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(400).json({ error: 'No user could be found for this ID.' });
      return next(err);
    }
    user.profile = { firstName, lastName, address, phone, email };
    user.save(function(err, user){
      if (err) {
        res.status(400).json({ error: 'Profile cannot be updated.' });
        return next(err);
      }
      console.log('Proflie updated!');
      // res.status(200).json({ cases: user.cases });
      res.status(200).json({ payload: setProfile(user) });
    });   

  });

};

exports.updateCase = function (req, res, next) {
  // console.log("post req body:", req.body);
  const isPlaintiff = req.body.party;
  const caseNumber = req.body.caseNumber;
  const caseType = req.body.caseType;
  const userId = req.params.userId || req.session.passport.user;
  const caseId = req.body._id || '';
  // const caseId = req.body.caseId;
  // const steps = req.body.steps;

  if (req.user._id.toString() !== userId) { return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); }
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(400).json({ error: 'No user could be found for this ID.' });
      return next(err);
    }

    //check if case already exists
    const myCase = user.cases.id(caseId);

    // const index = user.cases.findIndex((myCase) => {return myCase._id == caseId});
    if (myCase){
      myCase.set({ isPlaintiff, caseNumber, caseType});
      // user.cases[index].steps = steps;
    } else {
      user.cases.push({ isPlaintiff, caseNumber, caseType });
    }
    // console.log("Updated Case: ", myCase);
    user.save(function(err, user){
      if (err) {
        res.status(400).json({ error: 'Case cannot be saved.' });
        return next(err);
      }
      console.log('Sucessfully saved!');
      res.status(200).json({ payload: user.cases });
    })
    

  });
};

exports.updateChecklist = function (req, res, next) {
  console.log("update Checklist");
  const userId = req.params.userId || req.session.passport.user;
  const caseId = req.body.caseId;
  if (req.user._id.toString() !== userId) { return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); }
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(400).json({ error: 'No user could be found for this ID.' });
      return next(err);
    }

    //check if case already exists
    const myCase = user.cases.id(caseId);
    myCase.steps = req.body.steps;
    // myCase.save();
    // console.log("MyCase: ", myCase);
    // myCase.update();
    
    // console.log("Steps: ", myCase.steps);

    user.save(function(err, user){
      if (err) {
        res.status(400).json({ error: 'Case cannot be saved.' });
        return next(err);
      }
      console.log('Sucessfully saved!');
      // console.log("Data returned", user.cases);
      res.status(200).json({payload : myCase.steps});
    })
    

  });

}

exports.getChecklist = function (req, res, next) {
  console.log("get checklist");
  const userId = req.params.userId || req.session.passport.user;
  const caseId = req.params.caseId;
  if (req.user._id.toString() !== userId) { return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); }
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(400).json({ error: 'No user could be found for this ID.' });
      return next(err);
    }
    const myCase = user.cases.id(caseId);

      // console.log("User: ", user.cases);
      console.log('Sucessfully retrieved!');
      // res.status(200).json({ cases: user.cases });
      res.status(200).json({ payload: myCase.steps });
    });
    

};
//   const userId = req.params.userId;

exports.deleteCase = function (req, res, next) {
  console.log("delete case");
  const userId = req.params.userId || req.session.passport.user; 
  const caseId = req.params.caseId;
  console.log("caseId: ", caseId);
  if (req.user._id.toString() !== userId) { return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); }
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(400).json({ error: 'No user could be found for this ID.' });
      return next(err);
    }
    
  /*alternative to using user.cases.id(caseId).remove(). conditional $pull not supported in cosmos db*/
    //find index of case in array
    const caseIndex = user.cases.forEach((eachCase, i) => { if (eachCase._id == caseId) return i; } ) ;
    //remove case from array 
    user.cases.splice(caseIndex, 1);

    user.save(function(err, user){
      if (err) {
        res.status(400).json({ error: 'Case cannot be removed.' });
        return next(err);
      }
      console.log('Case removed!');
      // res.status(200).json({ cases: user.cases });
      res.status(200).json({ payload: user.cases });
    });   

  });
};
