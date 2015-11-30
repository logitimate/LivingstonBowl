    Meteor.startup(function() {

        if (Meteor.users.find().fetch().length === 0) {

            console.log('Creating users: ');

            var users = [{
                name: "Normal User",
                email: "normal@example.com",
                roles: []
            }, {
                name: "Logan Livingston",
                email: "lrlivingston@live.com",
                roles: ['admin']
            }];

            _.each(users, function(userData) {
                var id,
                    user;

                console.log(userData);

                id = Accounts.createUser({
                    email: userData.email,
                    password: "apple1",
                    profile: {
                        name: userData.name
                    }
                });

                Meteor.users.update({
                    _id: id
                }, {
                    $set: {
                        'emails.0.verified': true
                    }
                });

                Roles.addUsersToRoles(id, userData.roles);

            });
        }
    });

    if (Meteor.isServer) {
        Meteor.methods({
            addBowl: function(bowlEntry) {
                Bowls.insert(bowlEntry)
            },
            deleteBowl: function(bowlName){
                Bowls.remove( { "bowlName": bowlName })
            },
            addWinner: function(name, season, winner){
                var bowl = Bowls.findOne({ 'bowlName' : name, 'season' : ''+ season });
                console.log(bowl);
                bowl['winner'] = winner;
                Bowls.update({'bowlName':name, 'season': ''+ season}, bowl)
            },
            savePick: function(pick) {
                Picks.insert(pick)
            }
        })
    };
