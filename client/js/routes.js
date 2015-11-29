if (Meteor.isClient) {
    Router.route('/', function() {
        this.render('home');
    });

    Router.route('/scoreboard', function() {
        this.render('login');
    });

    Router.route('/bowlPicks', function() {
        this.render('bowlPicks');
    });
}