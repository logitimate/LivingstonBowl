if (Meteor.isClient) {
    Router.onBeforeAction(function () {
        if (!Meteor.user())
            this.render('home');
        else
            this.next();
    })

    Router.route('/', function() {
        this.render('home');
    });

    Router.route('/scoreboard', function() {
        this.render('scoreboard');
    });

    Router.route('/bowlPicks', function() {
        this.render('bowlPicks');
    });

    Router.route('/admin', function() {
        this.render('admin');
    });

    Router.route('/picksByBowl', function() {
        this.render('picksByBowl');
    });

    Router.route('viewUserPicks', {
        path: '/picks/:userId',
        template: 'viewUserPicks',
        data: function () {
            return { 'id': this.params.userId };
        }
    });
}
