Meteor.myFunctions = {

        newMessage: function(message, type, duration) {
            $('.messenger').removeClass('animated');

            Messenger.options = {
                extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
                theme: 'air'
            };

            Messenger().post({
                message: message,
                type: type, // TYPES: warning, info, success, and error
                hideAfter: duration | 0,
                showCloseButton: true
            });
        }
    }
