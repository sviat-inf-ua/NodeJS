 <html>
 <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular.js"></script>
    <script type="text/javascript">

    {/* var app=angular.module('app');
                app.controller('PostCtrl', function($scope,Post){
                    
                }) */}

        var app=angular.module('app',[]);
        app.controller('PostCtrl',function($scope,$http){
            //$http.get('http://localhost:3000/api/posts')
            PostsSvc.fetch().then(function(posts){
                console.log(posts);
                $scope.posts = posts.data;
            //    $scope.posts.data.recordsets[1];
            })

            


            $scope.addPost = function(){
                if ($scope.postBody) {
                   // $http.post('http://localhost:3000/api/posts',{username: $scope.postBody,
                   postsSvc.create({username:'username', 
                   body:'body'}).then(function(post){
                     body:$scope.postBody1})
                   
                     //   console.log(post);
                       // console.log(post.config.data);
                         $scope.posts.unshift(post.config.data);
                         $scope.postBody = null;
                         $scope.postBody1 = null;

                    })
                }
            }
        }
        



                app.service('PostSvc', function($http){
                    this.fetch=function(){
                        return $http.get('http://localhost:3000/api/posts')
                    }
                })
            // $scope.posts=[
            //     {
            //         username:'@samxxx',
            //         body:'Node Rules!'

            //     },
            //     {
            //         username:'@tomxxx',
            //         body: 'Trying Angular!'
                    
            //      }
            //  ];
            // $scope.addPost=function(){
            //     if($scope.postBody) {
            //         $scope.posts.unshift({
            //             username:'@samxxx',
            //             body:'my new post!'
            //         })
            //         $scope.postBody=null;
            //     }
            // }
        })
    </script>
</html>    