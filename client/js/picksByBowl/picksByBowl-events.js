if (Meteor.isClient) {
	Template.picksByBowl.events({
		'click .pick' : function(event){
			var element = $(event.currentTarget).closest('.pick');
			var team = element.data('team');
			var picks = element.data('picks');
			Session.set('team', team );
			Session.set('picks',picks);
			$('#teamPicksModal').openModal();
		}
	})
}