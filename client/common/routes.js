angular.module('bowlBlitz').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('myPicks', {
            url: '/myPicks',
            templateUrl: 'client/myPicks/myPicks.html'
        }).state('admin', {
            url: '/admin',
            templateUrl: 'client/admin/admin.html'
        }).state('bowlView', {
            url: '/bowlView',
            templateUrl: '/bowlView/bowlView.html'
        }).state('userPicks', {
            url: '/userPicks/:id',
            templateUrl: 'client/userPicks/userPicks.html'
        }).state('home', {
            url: '/home',
            templateUrl: 'client/home/home.html'
        }).state('scoreboard', {
            url: '/scoreboard',
            templateUrl: 'client/scoreboard/scoreboard.html'
        });

    $urlRouterProvider.otherwise("/home");
});