if (Meteor.isClient) {
    Template.bowlPicks.rendered = function () {
        $('.button-collapse').sideNav('hide');
    };
    
    Template.bowlPicks.events({
        'click .team-pick': function(e) {
            $(e.currentTarget).closest('.card-content').find('.selected').removeClass('selected');
            $(e.currentTarget).addClass('selected');
        },
        'click #submitPicks': function(e) {
            if ($('.game-container').find('.selected').length < $('.game-container').length) {
                Meteor.myFunctions.newMessage('You must select all the winners before submitting.', 'error', 5);
                return false;
            }
            if(!$('#championshipPick').val() || !$('#winningScore').val() || !$('#losingScore').val()) {
                Meteor.myFunctions.newMessage('You must select a champ before submitting.', 'error', 5);
                return false;
            }

            $.each($('.game-container'), function() {
                var name = $(this).find('#name').text();
                var season = $(this).data('season');
                var choice = $(this).find('.selected').find('#pickText').text();
                if(!choice)
                    choice = $(this).find('.success').find('#pickText').text() != undefined ? $(this).find('.success').find('#pickText').text() : $(this).find('.fail').find('#pickText').text();
                var pick = undefined;
                Meteor.call('getPick', name, season, Meteor.userId(), function(error, result){
                    if(error) {
                        Meteor.myFunctions.newMessage('Picks failed to save.', 'error', 3);
                    }
                    else {
                        var pick = result;
                        if(!pick) {
                            Meteor.call('savePick', {
                                'owner': Meteor.userId(),
                                'season': season,
                                'name': name,
                                'choice': choice
                            })
                        } else {
                            pick['choice'] = choice;
                            Meteor.call('updatePick', pick);
                        }
                    }
                });
            });

            Meteor.call('savePick', {
                'owner':Meteor.userId(),
                'championship': true,
                'season': 2015,
                'name': 'championship',
                'choice': $('#championshipPick').val(),
                'winningScore': $('#winningScore').val(),
                'losingScore': $('#losingScore').val()
            })
            clearTextFields();


            Meteor.myFunctions.newMessage('Picks were saved successfully.', 'success', 3);
        }
    });
}

var clearTextFields = function(){
    $('#championshipPick').val('');
    $('#winningScore').val('');
    $('#losingScore').val('');
};
