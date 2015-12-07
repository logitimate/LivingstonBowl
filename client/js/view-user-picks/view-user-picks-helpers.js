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
     })
 }


