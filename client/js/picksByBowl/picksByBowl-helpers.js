if (Meteor.isClient) {
    Template.picksByBowl.rendered = function() {
        $('.modal-trigger').leanModal();
    };

    Template.picksByBowl.helpers({
        bowls: function() {
            return _.sortBy(Bowls.find({}).fetch(), function(bowl) {
                return new Date(bowl.date);
            });
        },
        picks: function(params) {
            var picks = Picks.find({
                'season': Number(params.hash.season),
                'name': params.hash.name,
                'choice': params.hash.team
            }).fetch();
            var x = JSON.stringify(_.map(picks, function(pick) {
                return Meteor.users.findOne({
                    '_id': pick.owner
                }).profile.name;
            }));
            console.log('team --> ', params.hash.team);
            console.log('results --> ', x);
            return x;
        },
        counts: function(params) {
            var picks = Picks.find({
                'season': Number(params.hash.season),
                'name': params.hash.name,
                'choice': params.hash.team
            }).fetch();
            return picks.length;
        },
        username: function(params) {
            var name = Meteor.users.find({
                _id: params.hash.owner
            }).fetch()[0].profile.name
            return name;
        },
        isWinner: function(params) {
            if(!params.hash.winner)
                return '';

            return params.hash.team === params.hash.winner ? 'green accent-4 white-text' : 'red darken-2 white-text';
        },
        playoffTeams: function(){
            var champ = Champions.findOne({'season':'2015'});
            if(champ === undefined)
                return [];
            else
                return champ;
        },
    });

    Template.teamPicksModal.helpers({
        teamPicks: function() {
            var picks = Session.get('picks');
            return picks;
        },

        team: function(){
            var team = Session.get('team');
            return team;
        }
    })
}
