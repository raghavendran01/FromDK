var app = angular.module('sampleTask', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
       
        $stateProvider
            .state('repoList',{
              url:'/',
              templateUrl:'./template/repositoryList.html',
              controller:'MainCtrl'
            })
            .state('repoCommits',{
              parent:'repoList',
              url:'/repoCommits?userName&repoName',
              templateUrl:'./template/repoCommits.html',
              controller:'repoCtrl'
            })
            
    }]);