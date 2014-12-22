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
            divname: '=',
            waits: '='
            
        },
        template: function(element,attrs) {
        	return '<div id="'+attrs.divname+'"' +' style="width:200"></div>';
        },
        	
        link: function(scope, element, attrs) {
        	//console.log(scope.waits);
            var r = Raphael(attrs.divname, 350,200);
            var back = r.rect(0,0,350,200,5);
            back.attr({'fill':'#C7C7C7'});
            var x=25;
            var colors=['#F2676C','green','#5BAAE6', 'yellow','orange','grey'];
            
            console.log(scope.waits);
            console.log(typeof scope.waits);
            var circles={};
            for (var i in scope.waits) {
            	
            	console.log(scope.waits[i]);
            	var y = Math.random()*170;
            	circles[scope.waits[i].name] = r.circle(x,y,20); 
            	circles[scope.waits[i].name].attr({'fill':colors[i]});
        	//	circles[scope.waits[i].name].attr({'fill':colors[i]});

            	r.text(x+5, y, scope.waits[i].name);
            	x+=70;
            }
            //connect
            for (var i in scope.waits) {
            	// get a node
            	// do  line as to who waits on me to other nodes
            	var node1 = scope.waits[i];
            	for (var j in node1.waiting_on) {
            		//console.log(circles[node1.waiting_on[j]]);
            		var cl = circles[node1.waiting_on[j]];
            		var pt1x = cl.attr('cx');
            		var pt1y = cl.attr('cy');
            		var clthis = circles[node1.name];
            		var pt2x = clthis.attr('cx');
            		var pt2y = clthis.attr('cy');
            		console.log(node1.name);
            		console.log(node1.waiting_on[j]);
            		var line  = r.path( ["M", pt1x, pt1y, "L", pt2x,pt2y ]);
            		line.attr({'stroke':colors[i], 'opacity':.45});
            		var midx = (pt1x+pt2x)/2;
            		var midy = (pt1y+pt2y)/2;
            		var linelabel = r.text(midx,midy,node1.name);
            		linelabel.attr({'stroke':colors[i]});
            		//cl.attr({'fill':colors[i]});
            	}
            	
            }
            	
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

