if (Meteor.isClient) {
    Template.bowlPicks.helpers({
        bowls: function() {
            return _.sortBy(Bowls.find({}).fetch(), function(bowl){
                return new Date(bowl.date);
            });
        },
        isLocked: function() {
            var firstBowl = Bowls.find({}, {
                sort: {
                    date: 1
                },
                limit: 1
            }).fetch();
            var firstBowlDate = moment(firstBowl[0].date);
            var today = moment(new Date());
            return firstBowlDate.isBefore(today) || firstBowlDate === today;
        },
        isPicked: function(params) {
            var pick = Picks.findOne({'name': params.hash.bowlName, 'season': Number(params.hash.season), 'owner': Meteor.userId()});
            if(pick.choice === params.hash.team)
                return 'selected';
            else
                return '';
        },
        isCorrect: function(params){
            var pick = Picks.findOne({'name': params.hash.bowlName, 'season': Number(params.hash.season), 'owner': Meteor.userId()});
            console.log(pick);
            if(!pick || !pick.status)
                return 'cyan darken-1';
            else if(pick.status === 'win')
                return 'green accent-3';
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
        championshipData: function(){
            return Picks.findOne({'owner':Meteor.userId(), 'season':2015, 'championship':true});
        },
        selected: function(params){
            var champPick = Picks.findOne({'season':2015, 'owner':Meteor.userId(), 'championship':true});
            if(champPick === undefined && params.hash.team === 'default')
                return 'selected';

            return champPick.choice === params.hash.team ? 'selected' : '';
        }
    });
}
