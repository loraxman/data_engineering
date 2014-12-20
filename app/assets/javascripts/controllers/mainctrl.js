    // create the module and name it freemdm
        // also include ngRoute for all our routing needs
var dataeng = angular.module('dataeng', ['ngRoute','ui.bootstrap']);
dataeng.controller('IndexController', function($scope , $http, $routeParams) {
    
 	$http({method: 'GET', url:'job_api_index'}).
	success(function(data, status, headers, config) {
	       $scope.jobs = data; 
//	       console.log($scope.datatype_curr);   
	   //   drawtest(data);    
	    //  d3test();
        
	});
});


dataeng.controller('FirstCtrl', ['$scope', function($scope) {

    $scope.fakeDataSets = {
        biology: {
            male: 20,
            female: 5
        },
        physics: {
            male: 10,
            female: 10
        }             
    }
}]);

//below directive allows raphel to have a div passed in 
//so that it can attach to the div at runtime from angular
dataeng.directive('piechart', function() {
    return {
        restrict: 'E',
        scope: {
            divname: '='
            
        },
        template: function(element,attrs) {
        	return '<div id="'+attrs.divname+'"' +' style="width:200"></div>';
        },
        	
        link: function(scope, element, attrs) {
        	console.log(attrs);
            var r = Raphael(attrs.divname, 150,150);
     
            r.circle(60,50,50);         
        }
    }
});

function d3test() {
    var sampleSVG = d3.select("#testit")
    .append("svg")
    .attr("width", 100)
    .attr("height", 100);    

sampleSVG.append("circle")
    .style("stroke", "gray")
    .style("fill", "white")
    .attr("r", 40)
    .attr("cx", 50)
    .attr("cy", 50)
    .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
    .on("mouseout", function(){d3.select(this).style("fill", "white");});
}

dataeng.directive('myPostRepeatDirective', function() {
  return function(scope, element, attrs) {
    if (scope.$index){
      // iteration is complete, do whatever post-processing
      // is necessary
      console.log(element);
      drawtest2(element);
    }
  };
});

function drawtest2(element){
	
		x =10;
		console.log(element);
	  var paper = new Raphael( element.children(0), 20, 20);

			var circle = paper.circle(10, 15, 10);
			
	
 }

	  
function drawtest(data){
	var len = data.length
		x =10;
	  var paper = new Raphael( 200, 200);
	  for (var i=0;i<len;i++) {
	  	var y = 15;
	  	var job = data[i];
	  	for (var j=0;j<job.steps.length;j++) {
			var circle = paper.circle(10, y, 10);
			y+= 25;
	  	
	  	}
  }
 

}

