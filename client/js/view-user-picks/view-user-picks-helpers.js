 if (Meteor.isClient) {

     Template.viewUserPicks.helpers({
         bowls: function() {
             return Bowls.find({}, {
                 sort: {
                     'date': 1
                 }
             }).fetch();
         }
     })
 }
