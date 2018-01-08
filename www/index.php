<?php
$lines = ['1','2','3','4','5','6','7','A','C','E','B','D','F','M','G','J','Z','L','N','Q','R','W'];
#lines_no = ['1','6','C','E','D','F','R','L']
$add = '';
$add_desc = '';
$add_desc_full = 'in New York\'s five boroughs';
$param = '';
$add_tag = '';
foreach ( $lines as $line ):
	if ( isset($_GET[$line]) ):
		$add = $line . ' line ';
		$add_desc = ' on the ' . $line . ' line';
		$add_desc_full = 'along the ' . $line . ' train line in New York City.';
		$param = '?' . $line;
		$add_tag = ', "' . $line . ' line", "eating along the ' . $line . ' line"';
	endif;
endforeach;
?><!DOCTYPE HTML>
<html lang="en">
  <head>
        <title>NYC <?php echo $add; ?>subway map with restaurant reviews: Where to eat at every stop<?php echo $add_desc; ?> - NY Daily News</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="format-detection" content="telephone=no"/>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
        <link rel="icon" type="image/png" href="http://interactive.nydailynews.com/favicons.png">

        <!-- TITLES-->
        <meta property="og:title" content="NYC <?php echo $add; ?>subway map with restaurant reviews: Where to eat at every stop<?php echo $add_desc; ?>" />
        <meta name="twitter:title" content="NYC <?php echo $add; ?>subway map with restaurant reviews: Where to eat at every stop<?php echo $add_desc; ?>"/>

        <!-- DESCRIPTION-->
        <meta name="description" content="Our NYC <?php echo $add; ?>subway map restaurant guide will help you find your new favorite restaurant <?php echo $add_desc_full; ?>" />
        <meta property="og:description" content="Our NYC <?php echo $add; ?>subway map restaurant guide will help you find your new favorite restaurant <?php echo $add_desc_full; ?>" />
        <meta name="twitter:description" content="Our NYC <?php echo $add; ?>subway map restaurant guide will help you find your new favorite restaurant <?php echo $add_desc_full; ?>" />

        <!-- KEYWORD -->
        <meta name="keywords" content="NYC subway map, NYC restaurants, NYC restaurant guide, New York restaurants, restaurants near me, Brooklyn restaurants, Manhattan restaurants, Queens restaurants, Bronx restaurants" />

        <!-- LINK -->
        <meta property="og:url" content="http://interactive.nydailynews.com/map/nyc-subway-restaurant-guide/<?php echo $param; ?>" />
        <meta name="twitter:url" content="http://interactive.nydailynews.com/map/nyc-subway-restaurant-guide/<?php echo $param; ?>">

        <!-- THUMBNAIL IMAGE-->
        <meta property="og:image" content="http://interactive.nydailynews.com/map/nyc-subway-restaurant-guide/img/subway-share.png" />
        <meta name="twitter:image:src" content="http://interactive.nydailynews.com/map/nyc-subway-restaurant-guide/img/subway-share.png" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="512" />

        <!-- PARSELY -->
        <script type="application/ld+json">
            {
                "@context": "http://schema.org",
                "@type": "NewsArticle",
                "headline": "NYC <?php echo $add; ?>subway map with restaurant reviews",
                "url": "http://interactive.nydailynews.com/map/nyc-subway-restaurant-guide/<?php echo $param; ?>",
                "thumbnailUrl": "http://interactive.nydailynews.com/map/nyc-subway-restaurant-guide/img/subway-share.png",
                "dateCreated": "2017-08-16T06:00:00Z",
                "articleSection": "Interactive",
                "creator": ["Interactive Project","Evie Liu", "Joe Murphy", "Kelli R. Parker", "Steve Smirti", "Mike Sullivan"],
                "keywords": ["interactive project","interactive","mta","subway fare","new york restaurants","manhattan restaurants","brooklyn restaurants","queens restaurants","bronx restaurants","interactive map"<?php echo $add_tag; ?>]
            }
        </script>

        <!-- NO NEED TO FILL -->
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_card_large"> 
        <meta name="twitter:domain" content="http://interactive.nydailynews.com"/>
        <meta name="twitter:site" content="NY Daily News">
        <meta name="decorator" content="responsive" />

        <script src="//assets.adobedtm.com/4fc527d6fda921c80e462d11a29deae2e4cf7514/satelliteLib-c91fdc6ac624c6cbcd50250f79786de339793801.js"></script>

        <script>
        var is_mobile = /Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        function load_js(url, callback) {
            var s = document.createElement('script');
            s.onload = function() { callback(); }
            s.setAttribute('src', url);
            document.body.appendChild(s);
        }
        function load_css(url) {
            var l = document.createElement('link');
            l.setAttribute('rel', 'stylesheet');
            l.setAttribute('type', 'text/css');
            l.setAttribute('href', url);
            document.getElementsByTagName('head')[0].appendChild(l);
        }
        </script>
    <meta name="themeKey" content="nydailynews" />
    <meta name="mapThemeKey" content="responsive" />
    <meta name="urlPrefix" content="" />
    <meta name="staticContentPrefix" content="http://static.localedge.com/" />
    <meta name="searchBinding" content="/search" />
    <meta name="localeCountry" content="US"/>
    <meta name="localeLanguage" content="en" />
    <link rel="stylesheet" href="css/foundation.css" type="text/css" />
    <link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700|Open+Sans:300,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/main.css?2017" />
</head>
<body>
    <script>
        var googletag = googletag || {};
        googletag.cmd = googletag.cmd || [];
        (function() {
        var gads = document.createElement('script');
        gads.async = true;
        var useSSL = 'https:' == document.location.protocol;
        gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(gads, node);
        })();

      var ad_tag = 'subway-eats';
      if( !is_mobile ) {
          googletag.cmd.push(function() {
          googletag.defineSlot('/4692832/NYDN/Interactive',  [[728, 90]], 'div-gpt-ad-x101').addService(googletag.pubads())
          .setTargeting("interactive",ad_tag)
          .setTargeting("position","x101");
          });
          googletag.cmd.push(function() {
          googletag.defineSlot('/4692832/NYDN/Interactive',  [[300, 250]], 'div-gpt-ad-1423507761396-1').addService(googletag.pubads())
          .setTargeting("interactive",ad_tag)
          .setTargeting("position","x102");
          });
          googletag.cmd.push(function() {
          googletag.defineSlot('/4692832/NYDN/Interactive',  [[300, 250]], 'div-gpt-ad-1423507761396-2').addService(googletag.pubads())
          .setTargeting("interactive",ad_tag)
          .setTargeting("position","x103");
          });
          googletag.cmd.push(function() {
          googletag.defineSlot('/4692832/NYDN/Interactive',  [[728, 90]], 'div-gpt-ad-x105').addService(googletag.pubads())
          .setTargeting("interactive",ad_tag)
          .setTargeting("position","x105");
          });
          googletag.cmd.push(function() {
          googletag.defineSlot('/4692832/NYDN/Interactive',  [[300, 250]], 'div-gpt-ad-1423507761396-3').addService(googletag.pubads())
          .setTargeting("interactive",ad_tag)
          .setTargeting("position","x104");
          googletag.pubads().enableSingleRequest();
          googletag.enableServices();
          });
        }
    </script>
<div id="nydn-shell">
  <script src="/js/jquery.min.js"></script> 
  <script>
        jQuery(document).ready(function(){ Rnav(); });
      
        function Rnav(){
            jQuery("#nydn-menu-close").on("click",function(e){ RnavClose(); });
            jQuery("html").on("touchstart click",function(e) {
                if( jQuery(e.target).attr("id") == "nydn-menu-open" ) {
                    jQuery("#nydn-menu nav").slideDown();
                    jQuery("#nydn-menu").addClass("on");}
                else    RnavClose();
            });
        }
      
        function RnavClose(){
            jQuery("#nydn-menu").removeClass("on");
            jQuery("#nydn-menu nav").slideUp();
        }

        load_js('data/mta.min.geojson', function(){});
        //load_js('data/mta.geojson', function(){});
        if ( is_mobile )
        {
            $('#info-box-desktop').remove();
            load_js('js/jquery.touchwipe.min.js', function(){});
        }
        else {
            $('#info-box-handheld').remove();
            // Load the map js.
            // This unholy chain makes sure the app.js dependencies are all loaded by the time the app.js loads.
            load_js('data/subway_geo.min.geojson', function() { load_js('data/nyc.min.geojson', function() { load_js('js/leaflet.js', function() { load_js('js/app.js', function(){})})})});
            load_css('https://npmcdn.com/leaflet@0.7.7/dist/leaflet.css');
            load_css('css/jquery-ui.css');
            /*
            load_js('data/mta.min.geojson');
            load_js('data/nyc.min.geojson');
            load_js('js/leaflet.js');
            */
            //load_js('js/markerwithlabel_packed.js', function(){});
        }
  </script>
  
	<header id="nydn-header" style="z-index: 10000;">
		<div id="nydn-header-wrap">
			<h1 id="nydn-logo"><a href="http://www.nydailynews.com">NYC <?php echo $add; ?>subway map with restaurant reviews: Where to eat at every stop<?php echo $add_desc; ?>, by the NY Daily News</a></h1>
			<nav id="nydn-menu" style="z-index: 10000;">
				<button class="hamburger" id="nydn-menu-open">Menu</button>
				<nav>
					<ul>
						<li><a href="http://www.nydailynews.com/new-york">New York</a></li>
						<li><a href="http://www.nydailynews.com/news">News</a></li>
						<li><a href="http://www.nydailynews.com/news/politics">Politics</a></li>
						<li><a href="http://www.nydailynews.com/sports">Sports</a></li>
						<li><a href="http://www.nydailynews.com/entertainment">Entertainment</a></li>
						<li><a href="http://www.nydailynews.com/opinion">Opinion</a></li>
						<li><a href="http://www.nydailynews.com/life-style">Living</a></li>
						<li><a href="http://www.nydailynews.com/autos">Autos</a></li>
					</ul>
				</nav>
				<span id="nydn-menu-close">X</span>
			</nav>
			<nav id="nydn-sm">
				<ul>
					<li class="facebook"><a href="https://www.facebook.com/NYDailyNews/" target="_blank">facebook</a></li>
					<li class="twitter"><a href="https://twitter.com/NYDailyNews" target="_blank">twitter</a></li>
				</ul>
			</nav>
		</div>
	</header>

    <div id="map-container"></div>
    <div id="legend_box"></div>
    <div id="close_box">BACK</div>
    <div id="close_box_back"></div>

    <div id="label_small"></div>
    <div id="label_small_back"></div>

    <div id="box-wrapper"><div id="box">
    </div></div>
    <div id="top-ad-wrapper"><div id='top_ad' class='ad center'><div id='div-gpt-ad-1423507761396-1'><script>googletag.cmd.push(function() { googletag.display('div-gpt-ad-1423507761396-1'); });</script></div></div></div>

    <div class="info_box" id="info-box-desktop"></div>
    <div class="info_box" id="info-box-handheld"></div>

    <div id="bottom-ad-wrapper"><div id='bottom_ad' class='ad center'><div id='div-gpt-ad-1423507761396-2'><script>googletag.cmd.push(function() { googletag.display('div-gpt-ad-1423507761396-2'); });</script></div></div></div>

    <footer id="nydn-footer"></footer>
    <script>_satellite.pageBottom();</script>
    </div>
    <div id="parsely-root" style="display: none">
        <span id="parsely-cfg" data-parsely-site="nydailynews.com"></span>
    </div>
    <div id="loader">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
              <feBlend in="SourceGraphic" in2="goo"></feBlend>
            </filter>
          </defs>
        </svg>
        <div class="blob blob-0"></div><div class="blob blob-1"></div><div class="blob blob-2"></div><div class="blob blob-3"></div><div class="blob blob-4"></div><div class="blob blob-5"></div>
    </div>
    <script>
        if ( is_mobile ) {
            $( document ).ready(function() {
                load_js('js/app.js', function(){});
            });
        }
    if ( typeof PARSELY === 'undefined' ) (function(s, p, d) { var h=d.location.protocol, i=p+"-"+s, e=d.getElementById(i), r=d.getElementById(p+"-root"), u=h==="https:"?"d1z2jf7jlzjs58.cloudfront.net" :"static."+p+".com"; if (e) return; e = d.createElement(s); e.id = i; e.async = true; e.src = h+"//"+u+"/p.js"; r.appendChild(e); })("script", "parsely", document);
    </script>
  </body>
</html>
