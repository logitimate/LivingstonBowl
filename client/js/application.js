Meteor.myFunctions = {
        newMessage: function(message, type, duration) {
            console.log(message);
            Materialize.toast(message,4000);
        }
    }

    
