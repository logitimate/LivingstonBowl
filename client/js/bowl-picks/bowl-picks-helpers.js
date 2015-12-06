if (Meteor.isClient) {
    Template.bowlPicks.helpers({
        bowls: function() {
            return Bowls.find({}, {
                sort: {
                    'date': 1
                }
            }).fetch();
        },
        isNotLocked: function() {
            var firstBowl = Bowls.find({}, {
                sort: {
                    date: 1
                },
                limit: 1
            }).fetch();
            var firstBowlDate = firstBowl[0].date;
            var today = moment(new Date());
            return moment(firstBowlDate).isAfter(today);
        },
        isLocked: function() {
            var firstBowl = Bowls.find({}, {
                sort: {
                    date: 1
                },
                limit: 1
            }).fetch();
            var firstBowlDate = firstBowl[0].date;
            var today = moment(new Date());
            return !moment(firstBowlDate).isAfter(today);
        },
        isCorrect: function(params) {
            var pick = Picks.findOne({
                'name': params.hash.bowlName,
                'season': Number(params.hash.season),
                'owner': Meteor.userId()
            });

            if (params.hash.winner === undefined) {
                if (pick.choice === params.hash.team)
                    return 'picked';
                else
                    return '';
            } else if (pick.choice === params.hash.winner && pick.choice === params.hash.team)
                return 'success';
            else if (pick.choice != params.hash.winner && pick.choice === params.hash.team)
                return 'fail';
        }
    });
}
