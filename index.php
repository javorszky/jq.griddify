<?php

if( !function_exists('es_preit') ) {
    function es_preit( $obj, $echo = true ) {
        if( $echo ) {
            echo '<pre>';
            print_r( $obj );
            echo '</pre>';
        } else {
            return '<pre>' . print_r( $obj, true ) . '</pre>';
        }
    }
}

if( !function_exists('es_silent') ) {
    function es_silent( $obj ) {
          ?>
        <div style="display: none">
            <pre><?php print_r( $obj ); ?></pre>
        </div>
        <?php
    }
}


 ?><!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.7.1.min.js"></script>
        <script src="js/vendor/underscore.js"></script>
    </head>
    <body>
        <!--[if lt IE 8]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        <p>Hello world! This is HTML5 Boilerplate.</p>
        <h1>This is where the images go</h1>
        <ul class="container clearfix">
            <?php
            $files = glob('img/*.jpg', GLOB_NOSORT);
            // es_preit($files);
            foreach ($files as $file) {
                echo "<li><img src='{$file}'></li>";

            }

            ?>

        </ul>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
        <script src="jg.jq.griddify.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
    </body>
</html>