if (Meteor.isClient) {
    Router.route('/', function() {
        trackPageView: true
        this.render('home');
    });

    Router.route('/scoreboard', function() {
         trackPageView: true
        this.render('scoreboard');
    });

    Router.route('/bowlPicks', function() {
         trackPageView: true
        this.render('bowlPicks');
    });

    Router.route('/admin', function() {
         trackPageView: true
        this.render('admin');
    });
}