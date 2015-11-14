angular.module('mega-video', [
	'ngAnimate'
])

.controller('mainCtrl', [
	'$scope',
	function ($scope) {
		$scope.sources = [
			{
				src: 'https://archive.org/download/Duck_and_Cover/1951_duck_and_cover_512kb.mp4',
				type: 'video/mp4'
			},
			{
				src: 'https://ia600500.us.archive.org/1/items/Duck_and_Cover/1951_duck_and_cover.ogv',
				type: 'video/ogg'
			}
		];
	}
])

.directive('megaVideo', [
	'$sce',
	function ($sce) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			templateUrl: 'templates/megaVideo.html',
			scope: true,
			link: function (scope, element, attributes) {
				var playing = false;
				scope.toggleVideo = function () {
					if (playing) {
						angular.element(element)[0].pause();
					} else {
						angular.element(element)[0].play();
					}
					playing = !playing;
				}

				scope.resetVideo = function () {
					angular.element(element)[0].pause();
					angular.element(element)[0].currentTime = 0;
					playing = false;
				}

				scope.sources = [];
				function processSources(){
					var sourceTypes = {
						webm: { type: 'video/webm'},
						mp4: { type: 'video/mp4'},
						ogg: { type: 'video/ogg'}
					};
					for (source in sourceTypes) {
						if (attributes.hasOwnProperty(source)) {
							scope.sources.push({
								type: sourceTypes[source].type,
								src: $sce.trustAsResourceUrl(attributes[source])
							});
						}
					}
				}
				processSources();
				scope.width = attributes.width;
				scope.height = attributes.height;
			}
		};
	}
]);