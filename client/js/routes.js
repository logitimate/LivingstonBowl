if (Meteor.isClient) {
    Router.onBeforeAction(function (action) {
        if (!Meteor.user() && !action.url === '/scoreboard')
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
        // var isAdmin = undefined;
        // Meteor.call('isAdmin', Meteor.userId(), function(error, result) {
            // console.log('result --> ', result);
            // if(error) {
                // Meteor.myFunctions.newMessage('You are unauthorized to access this page.', "error", 5);
            // }
            // else {
                // isAdmin = result;
                // this.render('admin');
            // }
        this.render('admin');
        // });
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
