if (Meteor.isClient) {
    Template.scoreboard.events({
    	'click .user-row' : function(e) {
    		e.preventDefault();
    		Router.go("/picks/" + this.id);
    	}
    });
}
