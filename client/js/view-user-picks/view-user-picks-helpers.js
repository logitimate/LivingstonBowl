 if (Meteor.isClient) {
     Template.viewUserPicks.helpers({
         bowls: function() {
            return _.sortBy(Bowls.find({}).fetch(), function(bowl){
                return new Date(bowl.date);
            });
         },
         isPicked: function(params) {
             var pick = Picks.findOne({'name': params.hash.name, 'season': Number(params.hash.season), 'owner': params.hash.owner});
             if(!pick)
                return '';
             if(pick.choice === params.hash.team)
                 return 'selected';
             else
                 return '';
         },
         isCorrect: function(params){
             var pick = Picks.findOne({'name': params.hash.name, 'season': Number(params.hash.season), 'owner': params.hash.owner});
             if(!pick || !pick.status)
                return 'cyan darken-1';
            else if(pick.status === 'win')
                return 'green accent-4';
            else if (pick.status === 'lose')
                return 'red darken-2';
         }
     })
 }