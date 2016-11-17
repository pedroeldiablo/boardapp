"use strict";function Router(o,r){o.state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("test",{url:"/test",templateUrl:"/templates/test.html"}).state("boardsIndex",{url:"/boards",templateUrl:"/templates/boardsIndex.html",controller:"BoardsIndexController as boardsIndex"}).state("boardsNew",{url:"/boards/new",templateUrl:"/templates/boardsNew.html",controller:"BoardsNewController as boardsNew"}).state("boardsShow",{url:"/boards/:id",templateUrl:"/templates/boardsShow.html",controller:"BoardsShowController as boardsShow"}).state("boardsEdit",{url:"/boards/:id/edit",templateUrl:"/templates/boardsEdit.html",controller:"BoardsEditController as boardsEdit"}).state("pinsNew",{url:"/pins/new",templateUrl:"/templates/pinsNew.html",controller:"PinsNewController as pinsNew"}).state("pinsShow",{url:"/pins/:id",templateUrl:"/templates/pinsShow.html",controller:"PinsShowController as pinsShow"}),r.otherwise("/")}function Auth(o){o.loginUrl="/login",o.signupUrl="/register",o.tokenPrefix=""}function RegisterController(o,r){function t(){o.signup(e.user).then(function(){r.go("test")})}var e=this;e.user={},e.submit=t}function LoginController(o,r){function t(){o.login(e.credentials).then(function(){r.go("test")})}var e=this;e.credentials={},e.submit=t}function Board(o){return new o("/boards/:id",{id:"@_id"},{update:{method:"PUT"}})}function BoardsIndexController(o){var r=this;r.all=o.query()}function BoardsNewController(o,r){function t(){o.save(e.board,function(o){r.go("boardsShow",{id:o._id})})}var e=this;e.board={},e.create=t}function BoardsShowController(o,r,t){function e(){a.board.$remove(function(){t.go("boardsIndex")})}function n(){a.formVisible=!0}function l(){a.formVisible=!1,a.newPin={}}function i(){a.pin.boardId=t.params.id,r.save(a.pin,function(){l(),a.board=o.get(t.params)})}var a=this;a.formVisible=!1,a.board=o.get(t.params),a.delete=e,a.newPin={},a.showForm=n,a.hideForm=l,a.createPin=i}function BoardsEditController(o,r){function t(){e.board.$update(function(){r.go("boardsShow",r.params)})}var e=this;e.board=o.get(r.params),e.update=t}function MainController(o,r,t){function e(){o.logout().then(function(){r.go("login")})}var n=this;n.isLoggedIn=o.isAuthenticated,n.logout=e}function Pin(o){return new o("/pins/:id",{id:"@_id"},{update:{method:"PUT"}})}function PinsNewController(o,r){function t(){o.save(e.pin,function(o){r.go("pinsShow",{id:o._id})})}var e=this;e.pin={},e.create=t}function PinsShowController(o,r){function t(){e.pin.$remove(function(){r.go("boardsShow")})}var e=this;e.pin=o.get(r.params),e.delete=t}function PinsEditController(o,r){function t(){e.pin.$update(function(){r.go("pinsShow",r.params)})}var e=this;e.pin=o.get(r.params),e.update=t}angular.module("boardApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("boardApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("boardApp").factory("Board",Board),Board.$inject=["$resource"],angular.module("boardApp").controller("BoardsIndexController",BoardsIndexController).controller("BoardsNewController",BoardsNewController).controller("BoardsShowController",BoardsShowController).controller("BoardsEditController",BoardsEditController),BoardsIndexController.$inject=["Board"],BoardsNewController.$inject=["Board","$state"],BoardsShowController.$inject=["Board","Pin","$state"],BoardsEditController.$inject=["Board","$state"],angular.module("boardApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("boardApp").factory("Pin",Pin),Pin.$inject=["$resource"],angular.module("boardApp").controller("PinsNewController",PinsNewController).controller("PinsShowController",PinsShowController).controller("PinsEditController",PinsEditController),PinsNewController.$inject=["Pin","$state"],PinsShowController.$inject=["Pin","$state"],PinsEditController.$inject=["Pin","$state"];
//# sourceMappingURL=app.js.map
