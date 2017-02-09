#Bored.

##Angular

###Bored? Make a Board. [Here](https://bored-app.herokuapp.com/).

Pick a theme, then create and curate a board. Add your favourite images and YouTube clips, or explore what others are posting, then follow the boards you love or copy your favourite pins to add to your boards.  

##Overview

Inspired by pin-boards. This project aimed to create the online equivalent, allowing users to pin resources together in one place, a board.    

![alt text](/public/images/bored-app-ipad.jpeg "An example Bored board of boats on as seen on an ipad")
___

##Project Aims

To build a MEAN stack app with full CRUD actions.  

###Essential Features:

* For users to be able to register to create an account.

* Once logged in for users to be able to create boards and pins.

* For the pins to be able to include images.

* For users to be able to duplicate a pin so that they could have copies on multiple boards.


###Additional Features:

* To be able to upload YouTube clips in addition to images.

* A search function to make finding boards or pins easier.

* A social feature, such as the ability to follow a user or board.

##Technology Used

AngularJS | BCrypt | Bourbon | Body Parser | Bower | Express | Gulp | HTML | JavaScript | JWT | Mongoose | MongoDB | Node.js | Request-Promise | Satellizer | SCSS

##Approach and Challenges

With full CRUD actions and secure routes, Bored allows users to create, update and delete their own boards and pins. Users can also see and search other boards and pins from other users.

Users can login in using Facebook, Instagram or email and password.

Bored was build as MEAN stack app group project by myself, [Eduardo Fasano](https://github.com/eduardofasano), [Jane Maguire](https://github.com/janemaguire) and [Luke Reynolds](https://github.com/Essexrambler).

###Launch Bored

To see the features available to logged in users you can use the test details:

email: __bob@example.com__

password: __password__
___

###Wins I Worked On

###__YouTube__

Creating pins that were different media types was a challenge. The pin needed to know what type it was and then perform differently to match this.

When adding YouTube rather than making users upload the embedded link we went with the URL. This cut out a step for the user as they no longer needed to search for this (a fairly minor task, but a barrier that could make this less desirable or caused confusion which would have negatively impacted the user experience).

Using a service and directive allowed users to simply paste in links to YouTube. The service checks the link and then if it matches the format of a YouTube link splits and splices it so that we get the embedded url which allows the clip to be shown on the pin.   

```javascript

function youtubeService() {
  function getCode(url) {
    let code = null;
    const match = url.match(/\?v=(.*)/);

    if(match) code = match[1];
    else code = url.split('/').splice(-1)[0];

    return code;
  }

  this.getCode = getCode;
}

```

```javascript

youtube.$inject = ['youtubeService'];
function youtube(youtubeService) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      link: '@',
      width: '@',
      height: '@'
    },
    template: '<iframe width="{{ width }}" height="{{ height }}" src="{{ src }}" frameborder="0" allowfullscreen></iframe>',
    link($scope) {
      $scope.src = `https://www.youtube.com/embed/${youtubeService.getCode($scope.link)}`;
    }
  };
}

```
Additionally we needed to create a preview of the clip which was achieved as part of a directive.
```javascript

if(pin.type === 'image') return pin.link;
if(pin.type === 'youtube') return `http://i3.ytimg.com/vi/${youtubeService.getCode(pin.link)}/hqdefault.jpg`;

```
###__Media Queries__

Creating a consistent and enjoyable user experience independent of the device that they are accessing a site on is an important consideration.

Some of the steps that were taken to account for this included changing navigation to a hamburger menu at smaller screen sizes, alternating the number of boards or pins shown per row so that these are kept large enough to view easily.

Menu

```

@media (max-width: 767px) {
  .dropdown {

```
Taking advantage of the structure provided by Skeleton to simplify adding media queries.  

```

.board {
  margin-top: 30px;
  li {
    @include span-columns(3);
    @include omega(4n);
    @media (max-width: 959px) {
      @include omega-reset(4n);
      @include span-columns(4);
      @include omega(3n);
    }
    @media (max-width: 767px) {
      @include omega-reset(3n);
      @include span-columns(6);
      @include omega(2n);
    }

```

##Where to From Here?

During the project we looked at using a drag and drop image uploader, unfortunately it wasn't possible to complete this within the timeframe of the project, so this would be a nice additional feature.

We had also discussed additional media sources, particularly adding audio through Soundcloud. Again time was a limiting factor here, having made a request for an API key, but not receiving this with sufficient time to allow us to find a solution for incorporating this.

In an early part of planning we considered adding in a string to allow users to connect pinned items within a board. This would have been a nice addition and replicates more of the experience of a pin-board so would be an interesting exploration and feels like an honest extra feature to add.
