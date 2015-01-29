    // create the module and name it freemdm
        // also include ngRoute for all our routing needs
var dataeng = angular.module('dataeng', ['ngRoute','ui.bootstrap']);

dataeng.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

dataeng.controller('IndexController', function($scope , $http, $routeParams) {

 	$http({method: 'GET', url:'job_api_index'}).
	success(function(data, status, headers, config) {
	       $scope.jobs = data; 
//	       console.log($scope.datatype_curr);   
	   //   drawtest(data);    
	    //  d3test();
        
	});
});

dataeng.controller('AsimovController', function($scope , $http, $routeParams) {
	$scope.notices="";
	$scope.executedb = function() {
	 	$http({method: 'GET', url:'execute_api'}).
		success(function(data, status, headers, config) {
		       $scope.notices = data.results; 
		       console.log(data);
		});

	}
});


dataeng.controller('DataModelController', function($scope , $http, $routeParams,$interval) {
	$scope.datamodelimg="/assets/images/claim.png";
	$scope.dbphysicalimg="/assets/images/physical.png";
	$scope.dblogicalimg="/assets/images/logical.png";
	
	$scope.newmodel = function() {
		$http.post('/datamodel/datamodel_api_change', {modelcode: $scope.modeltext}).
		  success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.datamodelimg="/assets/images/claim.png"+ '?' + new Date().getTime();
		   
		   // $scope.$apply();
		    //alert("yes");
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	}
	
	$scope.$watch('modeltext', function(newVal, oldVal){
		console.log('changed');
		$scope.newmodel();
    
	});
	
	$scope.graph_db = function() {
		$http.post('/datamodel/graph_api', {modelcode: $scope.modeltext, dbname: $scope.dbname}).
		  success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.dbphysicalimg="/assets/images/physical.png"+ '?' + new Date().getTime();
		    $scope.dblogicalimg="/assets/images/logical.png"+ '?' + new Date().getTime();
		   
		   // $scope.$apply();
		    //alert("yes");
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	}
	


});

dataeng.controller('JobExecController', function($scope , $http, $routeParams,$interval) {
	$scope.yamls=[];
	$scope.cronrecurrs = true;
	$scope.cronminute = 10;
	$scope.cronhour = 15;
	$scope.crondays=[true,false,false,false,false,false,true];
    $scope.jobexec = function(yaml) {
       $http.get('job_api_exec/?jobfile='+yaml).success(function(data) {
    	    alert("job started");
    	    $scope.yamls.push(yaml);
       });
      
    }
    
    $scope.jobschedule = function(yaml) {
        var data = {
        	crondays : $scope.crondays,
            cronminute : $scope.cronminute,
            cronhour : $scope.cronhour,
            cronrecurrs : $scope.cronrecurrs,
            yamlfile : yaml
        };
        $http.post("job_api_schedule/", data).success(function(data, status) {
            $scope.hello = data;
        });
             	


      
    }
    
     $scope.jobdebug = function(stat) {
    	 console.log(Object.keys(stat)); //args.subString(3,stat.args.indexOf(')')-2))
    	 Object.keys(stat).forEach (function (key) {
    		 var it = stat[key];
    		 console.log(it.args.substring(3,it.args.indexOf(')')-2));
    		 });
    	 
    	 
     }
     
     
    $scope.jobdetails = function(yamlfile) {
     	    $http.get('job_api_status_details?jobfile='+yamlfile).success(function(data) {
		    
	    	$scope.jobdetails = data;
		});
    }
    
    
     $scope.jobstatus = function() {

	    $http.get('job_api_status').success(function(data) {
		    
		    $scope.status = data;
	   });
	    
	   if ($scope.yamls.length == 0 ) {
		   $http({method: 'GET', url:'job_api_index'}).
			success(function(data, status, headers, config) {
			       $scope.jobs = data; 
			       for(var i=0;i<$scope.jobs.length;i++) {
			    	   $scope.yamls.push($scope.jobs[i].yamlfile);
			    	   console.log("pushit");
			    	   }
			       
			});
		}
	    
	    
	   for (var i=0;i<$scope.yamls.length;i++) {
		   console.log($scope.yamls[i]);
		  //$scope.jobdetails($scope.yamls[i]);
   	    	$http.get('job_api_status_details?jobfile='+$scope.yamls[i]).success(function(data) {
		    
			$scope.jobdetails = data;
			});

		   }
	   
      
    }
     

    //update status each sec
    stop = $interval(function() {
    	$scope.jobstatus();
    },30000);
    
    // have to destroy interval according to angular docs
    $scope.stopFight = function() {
        if (angular.isDefined(stop)) {
          $interval.cancel(stop);
          stop = undefined;
        }
      };

    // on destroy clean up intervals
    $scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $scope.stopFight();
        });

});
//GET http://localhost:5555/api/tasks for getting list of tasks--status "SUCESSS" "STARTED for running"

function nodeover( ) {
	this.attr({'r':50});
	
}
function nodeout() {
	this.attr({'r':20});
	}

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
	// assign a sequence to make the divid so that rapahel can 
	// find one per piechart
	 var uniqueId = 1;
    return {
        restrict: 'E',
        scope: {
            divname: '=',
            waits: '='
            
        },
        template: function(element,attrs) {
        	// make the div id a sequence based on the var above
        	return '<div id="'+"{{uniqueId}}"+'"' +' style="width:200"></div>';
        },
        	
        link: function(scope, element, attrs) {
        	//console.log(scope.waits);
        	scope.uniqueId = 'item' + uniqueId++;	// set the next divname

        	//VERY IMPORTANT!! let Angular watch for changes on this div so that
        	//when it is created we do our Raphael animation
        	scope.$watch(scope.uniqueId, function (val) {
	            var r  = new Raphael(scope.uniqueId, 450,200);
	            var back = r.rect(0,0,450,200,5);
	            back.attr({'fill':'#C7C7C7'});
	            var x=25;
	            var colors=['#F2676C','green','#5BAAE6', 'yellow','orange','grey'];
	            
	            var circles={};
	            var textpop="";
	            for (var i in scope.waits) {
	            	
	            	var y = Math.random()*170;
	            	console.log(x);
	            	console.log(y);
	            	circles[scope.waits[i].name] = r.circle(x,y,20); 
	            	circles[scope.waits[i].name].attr({'fill':colors[i]});
	
	            	circles[scope.waits[i].name].data({'custom':"runs after this: \n"});
	            	circles[scope.waits[i].name].mouseover(function nodeover(i) {
	            	
	            		this.animate({'r':30},250);
	            		var textstr = "waiting on stuff";
	            		textpop = this.paper.text(400,50,this.data('custom'));
	           		
	            	});
	            	circles[scope.waits[i].name].mouseout(function nodeover() {
	            		
	            		this.animate({'r':20},250);
	            		textpop.remove();
	            		
	            	});
	            	console.log(x);
	            	console.log(y);
	            	
	            	var t1 = r.text(x-8, y/2, scope.waits[i].name);
	            	t1.attr({'text-anchor':'start'});
	            
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
	            		var line  = r.path( ["M", pt1x, pt1y, "L", pt2x,pt2y ]);
	            		line.attr({'stroke':colors[i], 'opacity':.45});
	            		var midx = (pt1x+pt2x)/2;
	            		var midy = (pt1y+pt2y)/2;
	            		var linelabel = r.text(midx,midy/2,node1.name);
	            		linelabel.attr({'stroke':colors[i]});
	            		var datstr = circles[node1.name].data('custom');
	            		datstr = datstr + " " + node1.waiting_on[j];
	                	circles[node1.name].data({'custom':datstr});
	
	            		//cl.attr({'fill':colors[i]});
	            	}
	            	
	            }
	            	
	        }
	   )}
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

