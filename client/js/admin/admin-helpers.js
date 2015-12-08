if (Meteor.isClient) {
    Template.admin.helpers({
        bowls: function() {
            return _.sortBy(Bowls.find({}).fetch(), function(bowl){
                return new Date(bowl.date);
            });
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
        },
        playoffTeams: function(){
            var champ = Champions.findOne({'season':'2015'});
            var json = [champ.team1, champ.team2, champ.team3, champ.team4];
            return json;
        }
    });
}
