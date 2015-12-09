if (Meteor.isClient) {
    Template.scoreboard.helpers({
        'userPicks': function(e) {
            return bowlPicks.find({
                'owner': Meteor.userId(),
                'season': '2015'
            }).fetch();
        },
        'scores': function(e) {
            var users = [];
            var champ = Champions.findOne({'season':'2015'});
            _.each(Meteor.users.find().fetch(), function(value, index) {
                var picks = Picks.find({
                    'owner': value._id,
                    'season': 2015
                }).fetch();

                var wins = _.reduce(picks, function(count, pick) {
                    if (!pick['status'] || pick['status'] === 'lose')
                        return count;
                    else
                        return count + 1;
                }, 0);
    
                var champPick = Picks.findOne({'owner': value._id, 'season': 2015, 'championship' : true});
                if(champ && champPick && champ.winner == champPick.choice) {
                    wins = wins + 1;
                }

                var differences = 0;
                
                if(value._id != Meteor.userId()) {
                    var userPicks = Picks.find({
                        'owner': Meteor.userId()
                    }, {
                        'season': '2015'
                    }).fetch(); 
                    var picksChoices = _.map(picks, function(value, index){ return value.choice });
                    var userChoices = _.map(userPicks, function(value, index){ return value.choice});

                    differences = _.difference(picksChoices, userChoices).length;
                }

                users.push({
                    'id': value._id,
                    'name': value.profile.name,
                    'wins': wins,
                    'differences' : differences
                })
            });

            return _.map(_.sortBy(users, 'wins').reverse(), function(val, index) {
                val['index'] = index + 1;
                return val;
            });
        }
    });
}
