if (Meteor.isClient) {
    var champ = undefined;
    var champPick = undefined;
    var picks = undefined;

    Template.bowlPicks.helpers({
        loadData: function() {
            champ = Champions.findOne({'season':'2015'});
            champPick = Picks.findOne({'season':2015, 'owner':Meteor.userId(), 'championship':true});
            picks = Picks.find({'owner':Meteor.userId(), 'season':2015}); 
        },
        bowls: function() {
            return _.sortBy(Bowls.find({}).fetch(), function(bowl) {
                return new Date(bowl.date);
            });
        },
        isLocked: function() {
            var firstBowl = _.sortBy(Bowls.find({}).fetch(), function(bowl) {
                return new Date(bowl.date);
            })[0];
            var firstBowlDate = moment(firstBowl.date);
            var today = moment(new Date().toString());
            return firstBowlDate.isBefore(today) || firstBowlDate.isSame(today);
        },
        isPicked: function(params) {
            var pick = Picks.findOne({
                'name': params.hash.bowlName,
                'season': Number(params.hash.season),
                'owner': Meteor.userId()
            });
            if (pick.choice === params.hash.team)
                return 'selected';
            else
                return '';
        },
        isCorrect: function(params){
            var pick = Picks.findOne({'name': params.hash.bowlName, 'season': Number(params.hash.season), 'owner': Meteor.userId()});
            if(!pick || !pick.status)
                return 'cyan darken-1';
            else if (pick.status === 'win')
                return 'green accent-3';
            else if (pick.status === 'lose')
                return 'red darken-2';
        },
        playoffTeams: function(){
            if(champ === undefined)
                return [];
            else
                return [champ.team1, champ.team2, champ.team3, champ.team4];
        },
        championshipExists: function(){
            return champ != undefined;
        },
        championshipData: function(){
            return champPick;
        },
        selected: function(params){
            if(champPick === undefined && params.hash.team === 'default')
                return 'selected';

            return champPick.choice === params.hash.team ? 'selected' : '';
        },
        winCount: function() {
            return Picks.find({'owner': Meteor.userId(),'status':'win'}).count()
        },
        lossCount: function() {
            return Picks.find({'owner': Meteor.userId(),'status':'lose'}).count()
        },
        pickScores: function(params) {
            if(champPick === undefined)
                return '';

            return params.hash.score === 'winning' ? champPick.winningScore : champPick.losingScore;
        },
        isActive: function() {
            return champPick === undefined ? '' : 'active';            
        }
    });


}
