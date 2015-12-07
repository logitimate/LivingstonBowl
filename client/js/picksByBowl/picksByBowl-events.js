if (Meteor.isClient) {
	Template.picksByBowl.events({
		'click .pick' : function(event){
			console.log(event.currentTarget);
			var team = $(event.currentTarget).data('team');
			var picks = $(event.currentTarget).data('picks');
			Session.set('team', team );
			Session.set('picks',picks);
			$('#teamPicksModal').openModal();
		}
	})
}