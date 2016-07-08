// Parse.Cloud.afterSave(Parse.User, function(request) {
// Parse.Cloud.useMasterKey();

// if (request.object.existed()) { // it existed before
//    } else { // it is new
//      var picture = request.get('picture')
//      request.
// }


//   query = new Parse.Query(Parse.Role);
//   query.equalTo("name", "normalUser");
//   query.first ( {
//     success: function(object) {

//       object.relation("users").add(request.user);

//       object.save();


//     },
//     error: function(error) {
//       throw "Got an error " + error.code + " : " + error.message;
//     }
//   });
// });

// Increment what user's tap on
Parse.Cloud.define("userTap", function(request, response) {
  Parse.Cloud.useMasterKey();
  // var user = new Parse.User();
  // var query = new Parse.Query("AppSettings");
  // query.equalTo("objectId", 'Ok9gUWM1tn');
  // query.first({
  //             useMasterKey: true,
  //             success: function(object) {
  //             object.increment("profileViews", 1);
  //             object.save();
  //             console.log('Profile views incremented for: ' + object.get('nickname') + ' : ' + request.params.userObjectId);
  //             response.success();
  //             },
  //             error: function(error) {
  //             console.error('Profile views NOT incremented: ' + error.code + ' :'  + error.message);
  //             response.error();
  //             }




                      Parse.Cloud.useMasterKey();
                      console.log('Starting User tapped: ' + request.params.tapped);
                      var query = new Parse.Query('AppSettings');
                      query.equalTo('objectId', 'Ok9gUWM1tn');
                      query.first({
                                  useMasterKey: true,
                                  success: function(object) {
                                  object.increment(request.params.tapped, 1);
                                  object.save();
                                  console.log('User tapped: ' + request.params.tapped);
                                  response.success();
                                  },
                                  error: function(error) {
                                  console.error('ERROR: User tapped: ' + error.code + ' :'  + error.message);
                                  response.error();
                                },

                                  });

                      });

// Increment user profile view count
Parse.Cloud.define('incrementProfileViews',
    function(request, response) {
      Parse.Cloud.useMasterKey();
      var user = new Parse.User();
      var query = new Parse.Query(Parse.User);
      query.equalTo("objectId", request.params.userObjectId);
      query.first({
                  useMasterKey: true,
                  success: function(object) {
                  object.increment("profileViews", 1);
                  object.save();
                  console.log('Profile views incremented for: ' + object.get('nickname') + ' : ' + request.params.userObjectId);
                  response.success();
                  },
                  error: function(error) {
                  console.error('Profile views NOT incremented: ' + error.code + ' :'  + error.message);
                  response.error();
                  }
                  });
});

// Increment user show reviews count
Parse.Cloud.define('incrementShowReviews',
    function(request, response) {
      Parse.Cloud.useMasterKey();
      var user = new Parse.User();
      var query = new Parse.Query(Parse.User);
      query.equalTo("objectId", request.params.userObjectId);
      query.first({
                  useMasterKey: true,
                  success: function(object) {
                  object.increment("showReviews", 1);
                  object.save();
                  console.log('Show reviews incremented for: ' + object.get('nickname') + ' : ' + request.params.userObjectId);
                  response.success();
                  },
                  error: function(error) {
                  console.error('Show reviews NOT incremented: ' + error.code + ' :'  + error.message);
                  response.error();
                  }
                  });
});

// Parse.Cloud.define('hello', function(req, res) {
//   res.success('Hi');
//   var fileLogger = new FileLoggerAdapter();
//   for (var i = 0; i < 10; i ++) {
//       fileLogger.info(i);
//   }
//
//   // Wait for the logs to flush before querying
//   setTimeout(function() {
//       fileLogger.query({size:2, order: 'desc'})
//           .then((res)=> {
//               console.log(res)
//           });
//   }, 100);
// });

Parse.Cloud.define("pushScores", function(request, response) {

Parse.Push.send({
  channels: [ "global" ],
  data: {
     alert: request.params.message,
     sound: 'default',
     pushType: 'scores',
     key: request.params.key
  }
}, {
  useMasterKey: true,
  success: function() {
  	console.log('Push successful.')
  }, error: function(err) {
    console.log(err);
  }
});

});

Parse.Cloud.define("pushUserMessage", function(request, response) {


  Parse.Push.send({
    channels: [ request.params.toUserId ],
    data: {
       alert: request.params.message,
       sound: 'default',
       pushType: 'message',
       key: request.params.key
    }
  }, {
    useMasterKey: true,
    success: function() {
    	console.log('Push: ' + request.params.message + 'for:  ' + request.params.toUserId)
    }, error: function(err) {
      console.log(err);
    }
  });

    // var toUserId = request.params.toUserId;
    // var fromUserId = request.params.fromUserId;
    // var message = request.params.pushData;
    // // if toUserId is not defined, then exit
    // if (!toUserId) { return; }
    //
    // // if formUser is equalTo toUser, then don't send the notifications
    // if (fromUserId === toUserId) { return; }
    //
    // var Installation = Parse.Object.extend('_Installation');
    // var pushQuery = new Parse.Query(Installation);
    // pushQuery.contains('channels', toUserId);
    //
    // console.log('Push Data ---------------------->');
    // console.log(message);
    // console.log('<---------------------- Push Data');
    //
    // if (!message) { return; }
    //
    // pushQuery.first().then(
    //     function(user){
    //         if (user){
    //             console.log('sendPush [' + toUserId + '] -> ' + message);
    //             try {
    //                 Parse.Push.send({
    //                     where: pushQuery,
    //                     data: {
    //                         alert: message
    //                     }
    //                 },
    //                 {
    //                     success: function () {
    //                         console.log('push was successful to  ' + 'user_' + toUserId);
    //                     },
    //                     error: function (error) {
    //                         console.log('push was error to ' + 'user_' +toUserId);
    //                     },
    //                     useMasterKey: true
    //                 }
    //             );
    //             } catch(error){
    //                 // be quite
    //             }
    //         }
    //     }
    // );
});
// Parse.Cloud.define("pushUserMessage", function(request, response) {
//
//   Parse.Cloud.useMasterKey();
//   var user = new Parse.User();
//   var query = new Parse.Query(Parse.User);
//   query.equalTo("objectId", request.params.userToPush);
//   query.first({
//               useMasterKey: true,
//               success: function(object) {
//               console.log('Found user for push: ' + object.get('nickname') + ' : ' + request.params.userToPush);
//
//
//
//
//               // Creates a pointer to _User with object id of userId
//             //  var targetUser = new Parse.User();
//             //  targetUser.id = request.params.userToPush;
//
//              var query = new Parse.Query(Parse.Installation);
//              query.equalTo('user', object);
//
//                 Parse.Push.send({
//                      where: query,
//                      data: {
//                          alert: request.params.message
//                      }
//                  }, {
//                  useMasterKey: true,
//                  success: function() {
//                      console.log('Sent message: ' + request.params.message + ' to user: ' + request.params.userToPush);
//                  },
//                  error: function(e) {
//                      console.log('error: Message Push: ' + e.code + ' msg: ' + e.message);
//                  }
//                  });
//
//
//
//               },
//               error: function(error) {
//               console.error('Could not find user for push: ' + error.code + ' :'  + error.message);
//               response.error();
//               }
//               });
// });
//
// Parse.Cloud.define("pushUserAtShow", function(request, response) {
//
// // Find users near a given location
// var userQuery = new Parse.Query(Parse.User);
// userQuery.withinMiles("geo", stadiumLocation, 1.0);
//
// // Find devices associated with these users
// var pushQuery = new Parse.Query(Parse.Installation);
// pushQuery.matchesQuery('user', userQuery);
//
// // Send push notification to query
// Parse.Push.send({
//   where: pushQuery,
//   data: {
//     alert: "Free hotdogs at the Parse concession stand!"
//   }
// }, {
//   success: function() {
//     // Push was successful
//   },
//   error: function(error) {
//     // Handle error
//   }
// });
//
//
// });


// // Increments number of messages in the chatroom a message is sent to
// Parse.Cloud.afterSave("Chat", function(request, response) {
//                       query = new Parse.Query("ChatRooms");
//                       query.get(request.object.get("roomId"), {
//                                 success: function(post) {
//                                 post.increment("numberOfMessages", 1);
//                                 post.set("lastUser", request.user);
//                                 post.set("lastMessageDate", new Date());
//                                 post.save();
//                                 response.success();
//                                 },
//                                 error: function(error) {
//                                 console.error("Got an error");
//                                 response.error();
//                                 }
//                                 });
//                       });

// // Delete all private chat messages -- called by deleteChat
// Parse.Cloud.define("deleteChatMessages", function(request, response) {

//                    var queryChat = new Parse.Query("Chat");
//                    queryChat.equalTo("roomId", request.params.roomId);
//                    queryChat.equalTo("belongsToUser", request.user);
//                    queryChat.find().then(function (users) {

//                                          //What do I do HERE to delete the posts?
//                                          users.forEach(function(user) {

//                                                        user.destroy({
//                                                                     success: function() {
//                                                                     // SUCCESS CODE HERE, IF YOU WANT


//                                                                     },
//                                                                     error: function(error) {
//                                                                     // ERROR CODE HERE, IF YOU WANT
//                                                                     //response.error();
//                                                                     }
//                                                                     });
//                                                        });
//                                          }, function (error) {
//                                          response.error();
//                                          });
//                    });

// // Delete a private chat room - then calls deleteChatMessages
// Parse.Cloud.define("deleteChat", function(request, response) {

//                    var queryChatMaster = new Parse.Query("Messages");
//                    queryChatMaster.equalTo("roomId", request.params.roomId);
//                    queryChatMaster.equalTo("belongsToUser", request.user);
//                    queryChatMaster.find().then(function (users) {

//                                                //What do I do HERE to delete the posts?
//                                                users.forEach(function(user) {

//                                                              user.destroy({
//                                                                           success: function() {
//                                                                           // SUCCESS CODE HERE, IF YOU WANT
//                                                                           Parse.Cloud.run('deleteChatMessages', { roomId: request.params.roomId }, {
//                                                                                           success: function(ratings) {
//                                                                                           // ratings should be 4.5
//                                                                                           },
//                                                                                           error: function(error) {
//                                                                                           }
//                                                                                           });

//                                                                           },
//                                                                           error: function(error) {
//                                                                           // ERROR CODE HERE, IF YOU WANT
//                                                                           //response.error();
//                                                                           }
//                                                                           });
//                                                              });
//                                                }, function (error) {
//                                                response.error();
//                                                });
//                    });

// // Admin functions
Parse.Cloud.afterSave("feedback", function(request, response) {
                      Parse.Cloud.useMasterKey();

                      if (request.object.existed()) { // it existed before

                      } else { // it is new

                      var query = new Parse.Query("AppSettings");
                      query.first({
                                  success: function(object) {
                                  object.increment("feedback", 1);
                                  object.save();
                                  Parse.Push.send({
                                                  channels: [ "admin" ],
                                                  data: {
                                                  alert: "New Feedback Received"
                                                  }
                                                  }, { success: function() {
                                                  // success!
                                                  }, error: function(err) {
                                                  console.log(err);
                                                  }
                                                  });

                                  response.success();
                                  },
                                  error: function(error) {
                                  console.error('Got an error ' + error.code + ' : ' + error.message);
                                  response.error();
                                  },
                                  useMasterKey: true
                                  });

                      }

                      });

Parse.Cloud.afterSave("photos", function(request, response) {
                      Parse.Cloud.useMasterKey();

                      if (request.object.existed()) { // it existed before

                      } else { // it is new

                      var userSubmitted = request.object.get("isUserSubmitted");
                      if (userSubmitted) {
                      var query = new Parse.Query("AppSettings");
                      query.first({
                                  success: function(object) {
                                  object.increment("photos", 1);
                                  object.save();
                                  Parse.Push.send({
                                                  channels: [ "admin" ],
                                                  data: {
                                                  alert: "New cover photo for review"
                                                  }
                                                  }, { success: function() {
                                                  // success!
                                                  }, error: function(err) {
                                                  console.log(err);
                                                  }
                                                  });

                                  response.success();
                                  },
                                  error: function(error) {
                                  console.error('Got an error ' + error.code + ' : ' + error.message);
                                  response.error();
                                  }
                                  });
                      }
                      }


                      });

Parse.Cloud.afterSave("reportUsers", function(request, response) {
                      Parse.Cloud.useMasterKey();

                      if (request.object.existed()) { // it existed before
                      } else { // it is new

                      var query = new Parse.Query("AppSettings");
                      query.first({
                                  success: function(object) {
                                  object.increment("usersReported", 1);
                                  object.save();
                                  Parse.Push.send({
                                                  channels: [ "admin" ],
                                                  data: {
                                                  alert: "A user has been reported"
                                                  }
                                                  }, { success: function() {
                                                  // success!
                                                  }, error: function(err) {
                                                  console.log(err);
                                                  }
                                                  });

                                  response.success();
                                  },
                                  error: function(error) {
                                  console.error('Got an error ' + error.code + ' : ' + error.message);
                                  response.error();
                                  }
                                  });


                      }

                      });

Parse.Cloud.afterSave("problems", function(request, response) {
                      Parse.Cloud.useMasterKey();

                      if (request.object.existed()) { // it existed before
                      } else { // it is new

                      var type = request.object.get("type");
                      var query = new Parse.Query("AppSettings");
                      query.first({
                                  success: function(object) {
                                  object.increment("problems", 1);
                                  object.save();
                                  Parse.Push.send({
                                                  channels: [ "admin" ],
                                                  data: {
                                                  alert: type + " reported"
                                                  }
                                                  }, { success: function() {
                                                  // success!
                                                  }, error: function(err) {
                                                  console.log(err);
                                                  }
                                                  });

                                  response.success();
                                  },
                                  error: function(error) {
                                  console.error('Got an error ' + error.code + ' : ' + error.message);
                                  response.error();
                                  }
                                  });

                      }

                      });


Parse.Cloud.afterSave(Parse.User, function(request, response) {
                      Parse.Cloud.useMasterKey();

                      if (request.object.existed()) { // it existed before
                      } else { // it is newaf
                      Parse.Push.send({
                                      channels: [ "admin" ],
                                      data: {
                                      alert: "New user signed up for Corpsboard."
                                      }
                                      }, { success: function() {
                                      // success!
                                      }, error: function(err) {
                                      console.log(err);
                                      }
                                      });

                      }

                      });


// var moment = require("moment");

// Parse.Cloud.define("registerActivity", function(request, response) {
//                    var user = request.user;
//                    user.set("lastLogin", new Date());
//                    user.save().then(function (user) {
//                                     response.success();
//                                     }, function (error) {
//                                     console.log(error);
//                                     response.error(error);
//                                     });
//                    });

Parse.Cloud.define("getOnlineUsers", function(request, response) {
                   var userQuery = new Parse.Query(Parse.User);
                   var activeSince = moment().subtract("minutes", 10).toDate();
                   userQuery.greaterThan("lastLogin", activeSince);
                   userQuery.find().then(function (users) {
                                         response.success(users);
                                         }, function (error) {
                                         response.error(error);
                                         });
                   });


// // STORE
// // Returns all store objects to the client
// Parse.Cloud.define("getStoreObjects", function(request, response) {

//                    Parse.Cloud.useMasterKey();
// //
// //                   //First, check to see if the store is open
// //                   var queryOpen = new Parse.Query("admin");
// //                   queryOpen.first({
// //                               success: function(object) {
// //                               myObject = object("storeOpen");
// //                               console.log(myObject);
// //                               },
// //                               error: function(error) {
// //                               console.log("There was an error");
// //                               }
// //                               });
// //
// //
// //

//                    var query = new Parse.Query("Store");
//                    query.limit(1000)
//                    query.find({
//                               success: function(results) {

//                               var status = "Found " + results.length + " items in the store";
//                               response.success(results);

//                               },

//                               error: function() {

//                               status = "No items exist in the store ";
//                               response.error(status);
//                               }
//                               });
//                    });

// Parse.Cloud.define("getItemsInCart", function(request, response) {

//                    Parse.Cloud.useMasterKey();
//                    var query = new Parse.Query("Orders");
//                    query.equalTo("status", "CART");
//                    query.equalTo("user", request.user);
//                    var user = request.user;

//                    query.find({
//                               success: function(results) {

//                               var status = "Found " + results.length + " items in the users cart";
//                               response.success(results);

//                               },

//                               error: function() {

//                               status = "No items exist in the users cart ";
//                               response.error(status);
//                               }
//                               });
//                    });

// // Returns all category objects to the client (Apparel, Instruments, Gifts, etc)
// Parse.Cloud.define("getStoreCategories", function(request, response) {

//                    Parse.Cloud.useMasterKey();
//                    var query = new Parse.Query("Banners");
//                    query.equalTo("type", "STORECATEGORY");
//                    query.equalTo("hidden", false);
//                    query.ascending("order");
//                    query.find({
//                               success: function(results) {

//                               var status = "Found " + results.length + " categories in the store";
//                               response.success(results);

//                               },

//                               error: function() {

//                               status = "No categories exist in the store ";
//                               response.error(status);
//                               }
//                               });
//                    });

// // Returns all store banner objects to the client
// Parse.Cloud.define("getStoreBanners", function(request, response) {

//                    Parse.Cloud.useMasterKey();
//                    var query = new Parse.Query("Banners");
//                    query.equalTo("type", "STORE");
//                    query.equalTo("hidden", false);
//                    query.ascending("order");
//                    query.find({
//                               success: function(results) {

//                               var status = "Found " + results.length + " banners for the store";
//                               response.success(results);

//                               },

//                               error: function() {

//                               status = "No banners exist for the store ";
//                               response.error(status);
//                               }
//                               });
//                    });

//Parse.Cloud.define("isStoreOpen", function(request, response) {
//                      Parse.Cloud.useMasterKey();
//
//                   var adminObject = Parse.Object.extend("admin");
//                   var query = new Parse.Query(adminObject);
//                   query.get("IjplBNRNjj", {
//                             success: function(results) {
//                                var open = gameScore.get("storeOpen");
//                             response.success({"result": open});
//                             },
//                             error: function(object, error) {
//                             // The object was not retrieved successfully.
//                             // error is a Parse.Error with an error code and message.
//                             }
//                             });
//                      });
//
//function checkIfStoreIsOpen(currentUser, selfFriendid, callback) {
//    var query = new Parse.Query("Connections");
//    query.equalTo("Connection", currentUser);
//    query.find({
//               success: function(results) {
//               callback(results);
//               },
//               error: function(error) {
//               callback(error);
//               }
//               });
//};
