 if (Meteor.isClient) {
     Template.home.rendered = function() {
         $('.modal-trigger').leanModal();
     };

     Template.home.events({
         'click #signup': function(event) {
             event.preventDefault();
             var password = $('#passwordSignup').val();
             var confirmPass = $('#passwordConfirmation').val();
             if (password === confirmPass) {
                 Accounts.createUser({
                     email: $('#emailSignup').val(),
                     password: password,
                     profile: {
                         name: $('#firstName').val() + ' ' + $('#lastName').val()
                     }
                 }, function(error) {
                     if (error) {
                         Meteor.myFunctions.newMessage(error.reason, "error", 10);
                     } else {
                        $('#signUpModal').closeModal();
                         Router.go("bowlPicks");
                     }
                 });
             } else
                 Meteor.myFunctions.newMessage("Passwords did not match.", "error", 10);
         },
         'click #login': function(event) {
             event.preventDefault();
             var email = $('#emailLogin').val();
             var password = $('#passwordLogin').val();
             console.log(email);
             console.log(password);
             Meteor.loginWithPassword({
                 email: email
             }, password, function(error) {
                 if (error) {
                     Meteor.myFunctions.newMessage(error.reason, "error", 10);
                     console.log(error.reason);
                 } else {
                    $('#loginModal').closeModal();
                     Router.go("bowlPicks");
                 }
             });
         }
     });

     Template.login.events({
         'keydown input': function(e) {
             if (e.keyCode === 13) {
                 $('#login').click();
             }
         }
     })

     Template.register.events({
         'keydown input': function(e) {
             if (e.keyCode === 13) {
                 $('#signup').click();
             }
         }
     })
 }
