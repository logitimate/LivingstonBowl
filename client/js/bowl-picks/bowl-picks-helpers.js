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
            if(!pick || !pick.status)
                return '';
            else if(pick.status === 'win' && pick.choice === params.hash.team)
                return '<div class="icon-container green accent-3 valign-wrapper"><i class="fa fa-check valign"></i></div>';
            else if(pick.status === 'win' && pick.choice != params.hash.team)
                return '';
            else if (pick.status === 'lose' && pick.choice === params.hash.team)
                return '<div class="icon-container red darken-2 valign-wrapper"><i class="fa fa-times valign"></i></div>';
            else if(pick.status === 'lose' && pick.choice != params.hash.team)
                return '';
            else
                return '';
        }
    });
}
