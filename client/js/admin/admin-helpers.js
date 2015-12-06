if (Meteor.isClient) {
    Template.admin.helpers({
        bowls: function() {
            return Bowls.find().fetch();
        },
        isWinner: function(params) {
            var game = Bowls.findOne({
                'bowlName': params.hash.name,
                'season': '' + params.hash.season
            });
            if (game.winner === params.hash.team)
                return 'selected';
            else {
                return '';
            }
        }
    });
}
