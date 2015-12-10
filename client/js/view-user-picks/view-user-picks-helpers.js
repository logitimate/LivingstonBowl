 if (Meteor.isClient) {
    var champ = undefined;
    var champPick = undefined;
    var picks = undefined;

     Template.viewUserPicks.helpers({
        loadData: function(params) { 
            champ = Champions.findOne({'season':'2015'});
            champPick = Picks.findOne({'season':2015, 'championship':true, 'owner':params.hash.id});
            picks = Picks.find({'season': 2015, 'owner':params.hash.id}).fetch();
        },
        bowls: function() {
            return _.sortBy(Bowls.find({}).fetch(), function(bowl){
                return new Date(bowl.date);
            });
        },
        isPicked: function(params) {
            var pick = _.find(picks, function(pick){return pick.name === params.hash.name;});
            if(!pick)
                return '';
            if(pick.choice === params.hash.team)
                 return 'selected';
            else
                 return '';
        },
        isCorrect: function(params){
            var pick = _.find(picks, function(pick){
                return pick.name === params.hash.name;
            });
            if(!pick || !pick.status)
                return 'cyan darken-1';
            else if(pick.status === 'win')
                return 'green accent-4';
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
        selected: function(params){
            if(champPick === undefined && params.hash.team === 'default')
                return 'selected';
            else
                return champPick.choice === params.hash.team ? 'selected' : '';
        },
        champPickScores: function(params) {
            if(champPick === undefined)
                return '';

            return params.hash.score === 'winning' ? champPick.winningScore : champPick.losingScore;
        },
        winCount: function(params) {
            return Picks.find({'owner': params.hash.id,'status':'win'}).count()
        },
        lossCount: function(params) {
            return Picks.find({'owner': params.hash.id,'status':'lose'}).count()
        },
        isActive: function() {
            return champPick === undefined ? '' : 'active';            
        }
     })
 }