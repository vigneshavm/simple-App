libraryApp.controller("bookController", ['$scope', '$http', '$rootScope','$state', function ($scope, $http, $rootScope,$state) {

    $scope.page = 1;
    $scope.limit = 5;
    $scope.disableBtn = false;
    $scope.previousButton = false;


    if ($rootScope.role == 'normal') {
        $scope.navList = [



            {
                title: "Books",
                navUrl: "#/book",
                state: "book"
            }

        ];
        $scope.editField = true
        $scope.deleteField = true

    } else {
        $scope.navList = [

            {
                title: "User Details",
                navUrl: "#/home",
                state: "home"
            },

            {
                title: "Manage Books",
                navUrl: "#/book",
                state: "book"
            },
            {
                title: "Add Books",
                navUrl: "#/addBook",
                state: "addBook"
            }


        ];

        $scope.editField = false
        $scope.deleteField = false
    }


    $scope.deleteBook = function(m){
        console.log(m.list)
        if(m.list)
        {
            console.log(m.list.bookID);
            $http({

                method: 'DELETE',

                url: '/deleteBook',

                params: {bookID :m.list.bookID }

            }).then(function success(response) {
                location.reload();
                if(response.status) {
                    $scope.book_delete = "Book deleted successfully";

                }else{
                    $scope.book_delete = "Book not deleted";
                }
            })
        }

    }

    $scope.getBookList = function () {

        var req_data = {
            limit: $scope.limit,
            page: $scope.page
        };

        $http({

            method: 'GET',

            url: '/bookList',

            params: req_data

        })
            .then(function success(response) {


            var responseObject = response.data.data;
            $scope.pageNum = true
            $scope.bookList = responseObject

            if ($scope.page == 1) {

                $scope.totalCount = Number(response.data.count)
                $scope.totalPage = Math.ceil($scope.totalCount / $scope.limit)

                console.log($scope.totalPage);

                if($scope.totalPage ==0)
                {
                    $scope.totalPage +=1;
                }


            }


            if (($scope.totalPage < $scope.page) || ($scope.totalPage == $scope.page)) {
                $scope.nextButton = true
            } else {
                $scope.nextButton = false
            }


            if (($scope.page == 1) || ($scope.page == 0)) {

                $scope.previousButton = true
            } else {
                $scope.previousButton = false
            }


        });
    };
    $scope.getBookList()


    $scope.previous_question = function () {
        $scope.page -= 1;
        $scope.getBookList()


    }

    $scope.next_question = function () {
        $scope.page += 1;
        $scope.getBookList()


    }


    $scope.logout = function () {

        var req_data = {
            email : $rootScope.email


        };
        $http.post('/logout', req_data)

            .then(function (response) {
                $state.go("login")

            });
    };
}]);
