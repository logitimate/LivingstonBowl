angular.module('bowlBlitz')
    .directive('header', function () {
        return {
            templateUrl: 'client/common/header.html',
            link: function () {
                angular.element(document).ready(function () {
                    angular.element(".button-collapse").sideNav();
                });
            }
        };
    })

    .directive('footer', function () {
        return {
            templateUrl: 'client/common/footer.html'
        };
    })