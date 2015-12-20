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
        },
        championshipExists: function(){
            var champ = Champions.findOne({'season':'2015'});
            return champ != undefined;
        },
        champSelected: function(params){
            var champ = Champions.findOne({'season':'2015'});
            if(champ.winner === undefined && params.hash.team === 'default')
                return 'selected';

            return champ.winner === params.hash.team ? 'selected' : '';
        },
        champScores: function(params) {
            var champ = undefined;
            champ = Champions.findOne({'season':'2015'});
            if(champ === undefined)
                return '';

            return params.hash.score === 'winning' ? champ.winningScore : champ.losingScore;
        },
        isActive: function() {
            var champ = undefined;
            champ = Champions.findOne({'season':'2015'});
            return champ === undefined ? '' : 'active';            
        }
    });
}
