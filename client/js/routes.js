if (Meteor.isClient) {
    Router.route('/', function() {
        this.render('home');
    });

    Router.route('/scoreboard', function() {
        this.render('scoreboard');
    });

    Router.route('/bowlPicks', function() {
        this.render('bowlPicks');
    });

    Router.route('/adminAddBowls', function() {
        this.render('adminAddBowls');
    });

    Router.route('/adminAddWinners', function() {
        this.render('adminAddWinners');
    });
}