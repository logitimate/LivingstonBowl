if (Meteor.isClient) {
    Template.bowlPicks.events({
        'click .team-pick': function(e) {
            $(e.currentTarget).closest('.card-content').find('.selected').removeClass('selected');
            $(e.currentTarget).addClass('selected');
        },
        'click #submitPicks': function(e) {
            if ($('.card-container').find('.selected').length == 0) {
                console.log('true');
                Meteor.myFunctions.newMessage('You must select all the winners before submitting.', 'error', 10);
                return false;
            }

            $.each($('.card-container'), function() {
                Meteor.call('savePick', {
                    'owner': Meteor.userId(),
                    'season': $(this).data('season'),
                    'name': $(this).find('#name').text(),
                    'choice': $(this).find('.selected').find('#pickText').text()
                })
            });
        }
    });
}
