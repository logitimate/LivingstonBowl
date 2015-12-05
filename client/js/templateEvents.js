if (Meteor.isClient) {
    Template.home.rendered = function(){
         $('.modal-trigger').leanModal();
    };

    Template.admin.rendered = function(){
        $('select').material_select();
    };


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
            return Bowls.find().fetch();
        },
        isWinner : function (params) {
            var game = Bowls.findOne({'bowlName' : params.hash.name, 'season' : '' + params.hash.season});
            if(game.winner === params.hash.team)
                return 'selected';
            else {
                console.log('else');
                return '';
            }
        }
    });

    Template.admin.events({
        'click #addBowl': function(){
            var bowlName = $('#bowlName').val();
            var team1 = $('#team1').val();
            var team2 = $('#team2').val();
            var bowlDate = $('#bowlDate').val();
            var season = $('#season').val();
            var bowlGameEntry = {
                'bowlName' : bowlName,
                'team1' : team1,
                'team2' : team2,
                'date' : bowlDate,
                'season' : season
            };

            Meteor.call('addBowl', bowlGameEntry, function(error, result) {
                if (error) {
                    console.log(error);
                } else {
                    $('input').val('');
                    Meteor.myFunctions.newMessage("You added a bowl game!", 'success', 15);
                }
            });
        },
        'click .deleteBowl': function(e){
            var bowlName = $(e.currentTarget).closest('.card').find('#name').text();
            Meteor.call('deleteBowl',bowlName)
        },
        'click .team-pick': function(e){
            $(e.currentTarget).closest('.card-content').find('.selected').removeClass('selected');
            $(e.currentTarget).addClass('selected');
        },
        'click #submitWinners': function(e) {
            $.each($('.card-container'), function(){
                console.log($(this).data());
               Meteor.call('addWinner', $(this).find('#name').text(), $(this).data('season'), $(this).find('.selected').find('.team').text());
            });
        }
    });

    

    Template.bowlPicks.helpers({
        bowls : function(){
            return Bowls.find().fetch();
        },
        isCorrect: function(params) {
            var pick = Picks.findOne({'name': params.hash.bowlName, 'season': Number(params.hash.season), 'owner': Meteor.userId()});

            if(params.hash.winner === undefined)
                return '';
            if(pick.winner === params.hash.winner && pick.winner === params.hash.team)
                return 'success';
            else if (pick.winner != params.hash.winner && pick.winner === params.hash.team)
                return 'fail';
            else
                return '';
        }
    });

    Template.bowlPicks.events({
        'click .team-pick' : function(e){
            $(e.currentTarget).closest('.card-content').find('.selected').removeClass('selected');
            $(e.currentTarget).addClass('selected');
        },
        'click #submitPicks' : function(e) {
            if ($('.card-container').find('.selected').length == 0) {
                console.log('true');
                Meteor.myFunctions.newMessage('You must select all the winners before submitting.', 'error', 10);
                return false;
            }

            $.each($('.card-container'), function() {
                Meteor.call('savePick', {
                    'owner' : Meteor.userId()   ,
                    'season' : $(this).data('season'),
                    'name' : $(this).find('#name').text(),
                    'winner' : $(this).find('.selected').find('#pickText').text()
                })
            });
        }
    });
}
