if (Meteor.isClient) {
    Template.picksByBowl.helpers({
        bowls: function() {
            return _.sortBy(Bowls.find({}).fetch(), function(bowl){
                return new Date(bowl.date);
            });
        },
        pick : function(params){
            console.log(params.hash.bowlName);
            return Picks.find({name: params.hash.bowlName}).fetch();
        },
        username: function(params){
            console.log(params.hash.owner);
            var name = Meteor.users.find({_id: params.hash.owner}).fetch()[0].profile.name
            return name;
        }
    });
}
