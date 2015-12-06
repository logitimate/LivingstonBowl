if (Meteor.isClient) {
    Template.admin.rendered = function() {
        $('select').material_select();
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
                Meteor.myFunctions.newMessage("All fields are required to create bowl.", 'error', 5);
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
                        Meteor.myFunctions.newMessage("You added a bowl game!", 'success', 5);
                    }
                });
            }
        },
        'click .deleteBowl': function(e) {
            var bowlName = $(e.currentTarget).closest('.card').find('#name').text();
            Meteor.call('deleteBowl', bowlName)
        },
        'click .team-pick': function(e) {
            $(e.currentTarget).closest('.card-content').find('.selected').removeClass('selected');
            $(e.currentTarget).addClass('selected');
        },
        'click #submitWinners': function(e) {
            $.each($('.card-container'), function() {
                Meteor.call('addWinner', $(this).find('#name').text(), $(this).data('season'), $(this).find('.selected').find('.team').text());
            });
            Meteor.myFunctions.newMessage("Winners have been Submitted.", 'success', 5);
        }
    });
}
