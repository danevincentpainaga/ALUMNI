<!doctype html>
<html ng-app="myApp" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <link href="{{asset('node_modules/angularjs-datepicker/dist/angular-datepicker.min.css')}}" rel="stylesheet" type="text/css">
        <link href="{{ asset('node_modules/fontawesome/css/all.css') }}" rel="stylesheet">
        <link href="{{ asset('node_modules/angular-moment-picker-master/dist/angular-moment-picker.min.css') }}" rel="stylesheet">
        <!-- <link rel="stylesheet" href="{{asset('node_modules/fullcalendar/dist/fullcalendar.min.css')}}"/> -->
        <title>UA-Alumni</title>
	</head>

<body ng-cloak ng-controller="mainCtrl" class="fb-color" >
    <ng-include src="'views/header.html'"ng-if="loggedIn" ></ng-include> 
    <nav class="navbar navbar-expand-sm bg-white login-nav" ng-if="!loggedIn"></nav>
        <div class="container-fluid" ui-view="" ></div>

        <ng-include src="'views/modals.html'" ng-if="loggedIn"></ng-include>
        <ng-include src="'views/verification_modal.html'"></ng-include> 
    
    <script src="{{asset('node_modules/jquery/dist/jquery.min.js')}}" type="text/javascript"></script>
    <script type="text/javascript" src="{{asset('js/app.js')}}"></script>
    <script type="text/javascript" src="{{asset('node_modules/moment/min/moment.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('node_modules/chart.js/dist/Chart.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('node_modules/angular-chart.js/dist/angular-chart.min.js')}}"></script>
    <!-- <script type="text/javascript" src="{{asset('node_modules/fullcalendar/dist/fullcalendar.min.js')}}"></script> -->
    <!-- <script type="text/javascript" src="{{asset('node_modules/fullcalendar/dist/gcal.min.js')}}"></script> -->
    <script type="text/javascript" src="{{asset('node_modules/angular-ui-calendar/src/calendar.js')}}"></script>
    <script src="{{asset('node_modules/@uirouter/angularjs/release/angular-ui-router.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('node_modules/angular-animate/angular-animate.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('node_modules/angular-cookies/angular-cookies.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('node_modules/angular-sanitize/angular-sanitize.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('node_modules/angular-touch/angular-touch.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('node_modules/angular-resource/angular-resource.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('node_modules/angular-confirm/dist/angular-confirm.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('node_modules/angularjs-datepicker/dist/angular-datepicker.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('node_modules/sweetalert2/dist/sweetalert2.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('node_modules/socket.io-client/dist/socket.io.js')}}" type="text/javascript"></script>
    <script src="{{ asset('node_modules/angular-moment-picker-master/dist/angular-moment-picker.min.js') }}" type="text/javascript"></script>

    <script>var baseUrl = "{{url('/')}}/";</script>
    <script type="text/javascript" src="{{asset('controller/bundleCtrl.js')}}"></script>
    <script type="text/javascript" src="{{asset('alertServices/alertServices.js')}}"></script>
    <script type="text/javascript" src="{{asset('httpServices/httpServices.js')}}"></script>

</body>
</html>