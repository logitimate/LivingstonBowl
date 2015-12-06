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
            _.each(Meteor.users.find().fetch(), function(value, index) {
                var picks = Picks.find({
                    'owner': value._id
                }, {
                    'season': '2015'
                }).fetch();
                console.log(picks);
                var wins = _.reduce(picks, function(count, pick) {
                    if (!pick['status'] || pick['status'] === 'lose')
                        return count;
                    else
                        return count + 1;
                }, 0)
                users.push({
                    'id': value._id,
                    'name': value.profile.name,
                    'wins': wins
                })
            });

            return _.map(_.sortBy(users, 'wins').reverse(), function(val, index) {
                val['index'] = index + 1;
                return val;
            });
        }
    });
}