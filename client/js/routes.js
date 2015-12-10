if (Meteor.isClient) {
    Router.onBeforeAction(function (action) {
        if(action.url === '/admin' ) {
            var router = this;
            Meteor.call('isAdmin', Meteor.userId(), function(error, result) {
                if(error || !result) {
                    router.render('bowlPicks');
                    Meteor.myFunctions.newMessage('You are unauthorized to access this page.', "error", 5);
                }
                else {
                    router.render('admin');
                }
            });
        } else if (!Meteor.userId() && action.url != '/scoreboard')
            this.render('home');
        else
            this.next();
    });

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
        var isAdmin = undefined;
        
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
