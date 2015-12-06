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
            var password = $('#passwordSignup').val();
            var confirmPass = $('#passwordConfirmation').val();
            if(password === confirmPass) {
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
            if(!(bowlName && team1 && team2 && bowlDate && season)) {
                Meteor.myFunctions.newMessage("All fields are required to create bowl.", 'error', 5);
            } else {
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
                        Meteor.myFunctions.newMessage("You added a bowl game!", 'success', 5);
                    }
                });
            }
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
               Meteor.call('addWinner', $(this).find('#name').text(), $(this).data('season'), $(this).find('.selected').find('.team').text());
            });
            Meteor.myFunctions.newMessage("Winners have been Submitted.", 'success', 5);
        }
    });

    

    Template.bowlPicks.helpers({
        bowls : function(){
            return Bowls.find({},{sort:{'date':1}}).fetch();
        },
        isNotLocked: function(){
            var firstBowl = Bowls.find({}, {sort: {date:1}, limit:1}).fetch();
            var firstBowlDate = firstBowl[0].date;
            var today = moment(new Date());
            return moment(firstBowlDate).isAfter(today);
        },
        isLocked: function(){
            var firstBowl = Bowls.find({}, {sort: {date:1}, limit:1}).fetch();
            var firstBowlDate = firstBowl[0].date;
            var today = moment(new Date());
            return !moment(firstBowlDate).isAfter(today);
        },
        isCorrect: function(params) {
            var pick = Picks.findOne({'name': params.hash.bowlName, 'season': Number(params.hash.season), 'owner': Meteor.userId()});

            if(params.hash.winner === undefined) {
                if(pick.choice === params.hash.team)
                    return 'picked';
                else 
                    return '';
            }
            else if(pick.choice === params.hash.winner && pick.choice === params.hash.team)
                return 'success';
            else if (pick.choice != params.hash.winner && pick.choice === params.hash.team)
                return 'fail';
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
                    'choice' : $(this).find('.selected').find('#pickText').text()
                })
            });
        }
    });

    Template.scoreboard.helpers({
        'userPicks' : function(e) {
            return bowlPicks.find({'owner':Meteor.userId(), 'season':'2015'}).fetch();
        },
        'scores' : function(e) {
            var users  = [];
            _.each(Meteor.users.find().fetch(), function(value, index){ 
                var picks = Picks.find({'owner':value._id},{'season':'2015'}).fetch();
                console.log(picks);
                var wins = _.reduce(picks, function(count, pick){ 
                    if(!pick['status'] || pick['status'] === 'lose')
                        return count;
                    else
                        return count + 1; 
                }, 0)
                users.push({'id':value._id, 'name': value.profile.name, 'wins': wins}) 
            });

            return _.map(_.sortBy(users, 'wins').reverse(), function(val, index){
                val['index'] = index + 1;
                return val;
            });
        }
    });

    Template.scoreboard.events({});
}
