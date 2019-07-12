libraryApp.controller("addBookController", ['$scope', '$http','$rootScope', function ($scope, $http,$rootScope) {

    $scope.bookDetails = {}

    $scope.navList = [

        {
            title: "User Details",
            navUrl: "#/home",
            state: "home"
        },
        {
            title: "Books",
            navUrl: "#/addBook",
            state: "addBook"
        }

    ];

    if($rootScope.role == 'normal')
    {
        $scope.navList = [


            {
                title: "Books",
                navUrl: "#/home/book",
                state: "home.book"
            }

        ];

    }else{
        $scope.navList = [

            {
                title: "User Details",
                navUrl: "#/home",
                state: "home"
            },
            {
                title: "Books",
                navUrl: "#/addBook",
                state: "addBook"
            }

        ];
    }
    $scope.saveBookDetails = function () {

        var req_data = {
            book: $scope.bookDetails.name,
            publishedDate: $scope.bookDetails.publishedDate,
            author: $scope.bookDetails.author,
            quality: $scope.bookDetails.quality


        };
        $http.post('/addBook', req_data)

            .then(function (response) {
                var responseObject = response.data;

                if(responseObject.status){
                    $scope.book_info = "Book added successfully"

            }else{
                    if(responseObject.statusCode == 100){
                        $scope.book_info = responseObject.message;
                    }else{
                        $scope.book_info = "Not able to add";
                    }

        }



            });
    };



    //$scope.addBookDetails()

    }]);