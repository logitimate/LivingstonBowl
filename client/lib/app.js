if(Meteor.isClient) {
    angular.module('bowlBlitz', ['angular-meteor','ui.router']);
} else if(Meteor.isServer) {
    angular.module('bowlBlitz', ['angular-meteor']);
}