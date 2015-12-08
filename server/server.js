    Meteor.startup(function() {

        if (Meteor.users.find().fetch().length === 0) {

            console.log('Creating users: ');

            var users = [
                {
                    name: "Normal User",
                    email: "normal@example.com",
                    roles: []
                }, {
                    name: "Logan Livingston",
                    email: "lrlivingston@live.com",
                    roles: ['admin']
                }, {
                    name: "Cameron Gray",
                    email: "cjfgray@gmail.com",
                    roles: ['admin']
                }
            ];

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
        var Future = Npm.require( 'fibers/future' )

        Meteor.methods({
            addBowl: function(bowlEntry) {
                Bowls.insert(bowlEntry);
            },
            deleteBowl: function(bowlName){
                Bowls.remove({ "bowlName": bowlName });
            },
            deleteChampionship: function(){
                Champions.remove({'season':'2015'});
            },
            addWinner: function(name, season, winner){
                var bowl = Bowls.findOne({ 'bowlName' : name, 'season' : ''+season });
                var picks = Picks.find({'name': name},{'season':''+season}).fetch();
                bowl['winner'] = winner;
                Bowls.update({'bowlName':name, 'season': ''+ season}, bowl);
                _.each(picks, function(val, index) {
                    val['status'] = (winner === val['choice'] ? 'win' : 'lose');
                    Picks.update({'_id': val['_id']}, val);
                });
            },
            savePick: function(pick) {
                Picks.insert(pick)
            },
            getPick: function(name, season, owner) {
                return Picks.findOne({'season':season, 'name':name, 'owner':owner});
            },
            updatePick: function(pick) {
                Picks.update({'_id':pick._id}, pick);
            }
        })
    };
