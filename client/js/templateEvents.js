if (Meteor.isClient) {
    Template.home.events({
        'click #signup': function(event) {
            event.preventDefault();
            var email = $('#emailSignup').val();
            var password = $('#passwordSignup').val();
            Accounts.createUser({
                email: email,
                password: password
            }, function(error) {
                if (error) {
                	Meteor.myFunctions.newMessage(error.reason, "error", 10);
                } else {
                    Router.go("bowlPicks");
                }
            });
        },
         'click #login': function(event) {
            event.preventDefault();
            var email = $('#emailLogin').val();
            var password = $('#passwordLogin').val();
            console.log(email);
            console.log(password);
            Meteor.loginWithPassword({email:email}, password, function(error) {
                if (error) {
                	Meteor.myFunctions.newMessage(error.reason, "error", 10);
                    console.log(error.reason);
                } else {
                    Router.go("bowlPicks");
                }
            });
        }
    });

    Template.login.events({
    	'keydown input' : function(e){
    		if(e.keyCode === 13){
    			$('#login').click();
    		}
    	}
    })

     Template.register.events({
    	'keydown input' : function(e){
    		if(e.keyCode === 13){
    			$('#signup').click();
    		}
    	}
    })

    Template.nav.events({
        'click .logout': function(event) {
            event.preventDefault();
            Meteor.logout();
            Router.go('/');
        }
    });
}
