if (Meteor.isClient) {
    Template.picksByBowl.rendered = function() {
         $('.modal-trigger').leanModal();
     };

    Template.picksByBowl.helpers({
        bowls: function() {
            return _.sortBy(Bowls.find({}).fetch(), function(bowl){
                return new Date(bowl.date);
            });
        },
        picks : function(params){
            var picks = Picks.find({'season':Number(params.hash.season), 'name': params.hash.name, 'choice':params.hash.team}).fetch();
            return JSON.stringify(_.map(picks, function(pick){
                pick['ownerName'] = Meteor.users.findOne({'_id':pick.owner}).name;
                return pick;
            }));
        },
        counts : function(params){
            var picks = Picks.find({'season':Number(params.hash.season), 'name': params.hash.name, 'choice':params.hash.team}).fetch();
            return picks.length;
        },
        username: function(params){
            var name = Meteor.users.find({_id: params.hash.owner}).fetch()[0].profile.name
            return name;
        }
    });
}
