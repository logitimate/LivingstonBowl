Meteor.startup(function() {
    Bowls = new Mongo.Collection("bowlGames");
    Picks = new Mongo.Collection("picks");
    Champions = new Mongo.Collection("champions");
});

