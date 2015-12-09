if (Meteor.isClient) {
    Template.admin.rendered = function() {
        $('select').material_select();
        $('.modal-trigger').leanModal();
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year
            format: 'mm/d/yyyy',
        });
        $('.button-collapse').sideNav('hide');
    };

    Template.admin.events({
        'click #addBowl': function() {
            var bowlName = $('#bowlName').val();
            var team1 = $('#team1').val();
            var team2 = $('#team2').val();
            var bowlDate = $('#bowlDate').val();
            var season = $('#season').val();
            if (!(bowlName && team1 && team2 && bowlDate && season)) {
                Meteor.myFunctions.newMessage("All fields are required to create bowl.", 'error', 3);
            } else {
                var bowlGameEntry = {
                    'bowlName': bowlName,
                    'team1': team1,
                    'team2': team2,
                    'date': bowlDate,
                    'season': season
                };

                Meteor.call('addBowl', bowlGameEntry, function(error, result) {
                    if (error) {
                        console.log(error);
                    } else {
                        $('input').val('');
                        Meteor.myFunctions.newMessage("You added a bowl game!", 'success', 3);
                    }
                });
            }
        },
        'click .deleteBowl': function(e) {
            var bowlName = $(e.currentTarget).closest('.card').find('#name').text();
            console.log('bowlName --> ', bowlName);
            if(bowlName === 'Championship')
                Meteor.call('deleteChampionship');
            else
                Meteor.call('deleteBowl', bowlName);
        },
        'click .team-pick': function(e) {
            $(e.currentTarget).closest('.card-content').find('.selected').removeClass('selected');
            $(e.currentTarget).addClass('selected');
        },
        'click #submitWinners': function(e) {

            $.each($('.game-container'), function() {
                Meteor.call('addWinner', $(this).find('#name').text(), $(this).data('season'), $(this).find('.selected').find('.team').text());
            });
            var champ = Champions.findOne({'season':'2015'});
            champ['winner'] = $('#championshipPick').val();
            champ['winningScore'] = $('#winningScore').val(); 
            champ['losingScore'] = $('#losingScore').val(); 
            Champions.update({'_id':champ._id}, champ);
            var champPicks = Picks.find({'season':2015, 'choice':champ.winner}).fetch();
            _.each(champPicks, function(pick, index) {
                pick['status'] = 'win';
                Picks.update({'_id':pick._id}, pick);
            });

            Meteor.myFunctions.newMessage("Winners have been Submitted.", 'success', 3);
        }
    });

    Template.championshipModal.events({
        'click #submitChampion' : function() {
            var created = {
                'season' : '2015',
                'team1' : $('#playoffTeam1').val(),
                'team2' : $('#playoffTeam2').val(),
                'team3' : $('#playoffTeam3').val(),
                'team4' : $('#playoffTeam4').val()
            }
            Meteor.call('upsertChampion', created);

            $('#championshipModal').closeModal();
            Meteor.myFunctions.newMessage("Championship saved.", 'success', 3);
        } 
    });
}
