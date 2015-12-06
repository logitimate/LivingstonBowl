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

    Router.route('/admin', function() {
        this.render('admin');
    });

    Router.route('/picks/:userID', {
        template: 'viewUserPicks',
        data: function() {
            console.log("This is a list page.");
            console.log(this.params.userID);
            var userId = this.params.userID;
            var pick = Picks.findOne({
                'name': params.hash.bowlName,
                'season': Number(params.hash.season),
                'owner': userId
            });
            if (!pick.status && pick.choice === params.hash.team)
                return 'picked';
            else if (!pick.status && pick.choice != params.hash.team)
                return '';
            else if (pick.status === 'win' && pick.choice === params.hash.team)
                return 'success';
            else if (pick.status === 'lose' && pick.choice === params.hash.team)
                return 'fail';
            else
                return '';

        }
    });
}
