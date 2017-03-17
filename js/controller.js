app.controller('MainCtrl', ['$scope', 'getService', '$rootScope', function($scope, getService, $rootScope) {
  $scope.gitUserName = "";
  var repo
  $scope.repoArray = [];
  $scope.callChart=function(repoArray,commitsCount){
    console.log(repoArray);
    console.log(commitsCount);
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: repoArray,
        datasets: [{
            label: '# of Commits',
            data: commitsCount,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
  }
  $scope.getUserRepo = function() {
    var url = "https://api.github.com/users/" + $scope.gitUserName + "/repos"
    getService.getData(url).then(function(data) {
      $scope.repo = data;
      $scope.repoArray=[];
      $scope.commitCount=[];
      $scope.repoArray=$scope.repo.map(function(x){
        return x.name;
      });
      $scope.repo.map(function(x){
        console.log("https://api.github.com/repos/"+$scope.gitUserName+"/"+x.name+"/commits");
        var y=getService.getData("https://api.github.com/repos/"+$scope.gitUserName+"/"+x.name+"/commits").then(function(data){
          return data.length;
        },function(data){
        });
        y.then(function(value){
          console.log(value);
          $scope.commitCount.push(value);
        }).then(function(){
          $scope.callChart($scope.repoArray,$scope.commitCount);
        });
      })
      
      
    }, function(data) {
      alert("Error occoured. Please enter valid name");
    });
  }
  
  

}]);

app.controller('repoCtrl', ['$scope', '$rootScope', 'getService', '$stateParams', '$state', function($scope, $rootScope, getService, $stateParams, $state) {
  console.log($stateParams);

  $scope.getCommits = function() {
    var url = "https://api.github.com/repos/" + $stateParams.userName + "/" + $stateParams.repoName + "/commits"
    console.log(url);
    getService.getData(url).then(function(data) {
      $scope.commits = data;
      console.log($scope.commits[0].sha);

    }, function(data) {
      alert("Error occoured. Please enter valid name");
    });
  }
  $scope.getCommits();
}]);