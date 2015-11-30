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
                Bowls.insert({
                    bowl_name: bowlEntry.bowlName,
                    team_1: bowlEntry.team1,
                    team_2: bowlEntry.team2,
                    _date: bowlEntry.bowlDate
                })
            },
            deleteBowl: function(bowl_name){
                Bowls.remove( { "bowl_name": bowl_name })
            }
        })
    };
