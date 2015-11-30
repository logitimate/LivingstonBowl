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

    Template.admin.helpers({
        bowls : function(){
            console.log(Bowls.find().fetch())
            return Bowls.find().fetch();
        }
    })

    Template.admin.events({
        'click #addBowl': function(){
            var bowlName = $('#bowlName').val();
            var team1 = $('#team1').val();
            var team2 = $('#team2').val();
            var bowlDate = $('#bowlDate').val();
            var bowlGameEntry = {
                'bowlName' : bowlName,
                'team1' : team1,
                'team2' : team2,
                'bowlDate' : bowlDate
            };

            Meteor.call('addBowl', bowlGameEntry, function(error, result) {
                console.log(result);
                if (error) {
                    console.log(error);
                } else {
                    $('input').val('');
                    Meteor.myFunctions.newMessage("You added a bowl game!", 'success', 15);
                }
            });
        },
        'click .deleteBowl': function(e){
            var bowlName = $(e.currentTarget).closest('.card').find('.bowl-name').text();
            console.log(bowlName);
            Meteor.call('deleteBowl',bowlName)
        },
        'click .team-pick' : function(e){
            $(e.currentTarget).closest('.card-content').find('.selected').removeClass('selected')
            $(e.currentTarget).addClass('selected');
        }
    })

    

    Template.bowlPicks.helpers({
        bowls : function(){
            console.log(Bowls.find().fetch())
            return Bowls.find().fetch();
        }
    })

    Template.bowlPicks.events({
        'click .team-pick' : function(e){
            $(e.currentTarget).closest('.card-content').find('.selected').removeClass('selected')
            $(e.currentTarget).addClass('selected');
        }
    })
}
