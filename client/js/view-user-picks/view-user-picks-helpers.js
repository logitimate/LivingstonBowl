 if (Meteor.isClient) {
 	var id;

     Template.viewUserPicks.helpers({
         bowls: function() {
             return Bowls.find({}, {
                 sort: {
                     'date': 1
                 }
             }).fetch();
         },
         isCorrect: function(params) {

            var pick = Picks.findOne({
                'name': params.hash.name,
                'season': Number(params.hash.season),
                'owner': id
            });
            console.log('pick in veiw helpers --> ', pick);
            if (!pick.status && pick.choice === params.hash.team)
                return 'picked';
            else if (!pick.status && pick.choice != params.hash.team)
                return '';
            else if (pick.status === 'win' && pick.choice === params.hash.team)
                return 'success';
            else if (pick.status === 'lose' && pick.choice === params.hash.team)
                return 'fail';
            else
                return '';
         },
         setId: function(params) {
         	id = params.hash.id;
         }
     })
 }
