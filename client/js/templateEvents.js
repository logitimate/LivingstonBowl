if (Meteor.isClient) {
    Template.home.events({
        'click #signup': function(event) {
            event.preventDefault();
            var email = $('#emailSignup').val();
            var password = $('#passwordSignup').val();
            Accounts.createUser({
                email: email,
                password: password
            });
            Router.go('bowlPicks');
        }
    });

    Template.nav.events({
        'click .logout': function(event) {
            event.preventDefault();
            Meteor.logout();
            Router.go('/');
        }
    });

    Template.login.events({
        'click #login': function(event) {
            event.preventDefault();
            var email = $('#emailLogin').val();
            var password = $('#passwordLogin').val();
            Meteor.loginWithPassword(email, password);
            Router.go('bowlPicks');
        }
    });
}
