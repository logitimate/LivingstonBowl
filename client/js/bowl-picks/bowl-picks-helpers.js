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
            var pick = Picks.findOne({'name': params.hash.bowlName, 'season': Number(params.hash.season), 'owner': Meteor.userId()});
            if(!pick.status && pick.choice === params.hash.team)
                return 'picked';
            else if(!pick.status && pick.choice != params.hash.team)
                return '';
            else if(pick.status === 'win' && pick.choice === params.hash.team)
                return 'success';
            else if (pick.status === 'lose' && pick.choice === params.hash.team)
                return 'fail';
            else
                return '';
        }
    });
}
