if (Meteor.isClient) {
	Template.nav.rendered = function(){
		 $(".button-collapse").sideNav();
	};
	
    Template.nav.events({
        'click .logout': function(event) {
            event.preventDefault();
            Meteor.logout();
            Router.go('/');
            Meteor.myFunctions.newMessage("Logged out succesfully.", 'success', 3);
        }
    });
}
