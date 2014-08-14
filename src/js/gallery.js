'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:GalleryCtrl
 * @description
 * # GalleryCtrl
 * Controller of the angularApp
 */
module.exports = function ($scope) {
    var images = [];
    var categories = ['abstract', 'animals', 'business', 'cats', 'city', 'food', 'nightlife', 'fashion', 'people',
        'nature', 'sports', 'technics', 'transport'
    ];
    var nbItems = 3;
    var category = 0;

    for (var i = 0, j = 0; i < nbItems; i++) {
        if (j > 10) {
            j = 0;
            category++;
        }
        images.push({
            category: categories[category],
            nb: ++j
        });
    }

    $scope.title = 'Gallery';
    $scope.images = images;

    $scope.add = function () {
        $scope.images.push({
            category: 'transport',
            nb: 1
        });
    };
};
