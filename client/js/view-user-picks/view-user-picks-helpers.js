 if (Meteor.isClient) {
     Template.viewUserPicks.helpers({
        bowls: function() {
            return _.sortBy(Bowls.find({}).fetch(), function(bowl){
                return new Date(bowl.date);
            });
        },
        isPicked: function(params) {
            var pick = Picks.findOne({'name': params.hash.name, 'season': Number(params.hash.season), 'owner': params.hash.owner});
            if(!pick)
                return '';
            if(pick.choice === params.hash.team)
                 return 'selected';
            else
                 return '';
        },
        isCorrect: function(params){
            var pick = Picks.findOne({'name': params.hash.name, 'season': Number(params.hash.season), 'owner': params.hash.owner});
            if(!pick || !pick.status)
                return 'cyan darken-1';
            else if(pick.status === 'win')
                return 'green accent-4';
            else if (pick.status === 'lose')
                return 'red darken-2';
        },
        playoffTeams: function(){
            var champ = Champions.findOne({'season':'2015'});
            var json = [champ.team1, champ.team2, champ.team3, champ.team4];
            console.log('json --> ', json);
            return json;
        },
        championshipExists: function(){
            return Champions.find({'season':'2015'}).fetch().length > 0;
        },
        selected: function(params){
            var champPick = Picks.findOne({'season':2015, 'owner':params.hash.owner, 'championship':true});
            if(champPick === undefined && params.hash.team === 'default')
                return 'selected';

            return champPick.choice === params.hash.team ? 'selected' : '';
        }
     })
 }