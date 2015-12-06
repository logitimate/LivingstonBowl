if (Meteor.isClient) {
	Template.scoreboard.rendered = function () {
		$('.button-collapse').sideNav('hide');
	};
    Template.scoreboard.events({
    	'click .user-row' : function(e) {
    		e.preventDefault();
    		Router.go("/picks/" + this.id);
    	}
    });
}
