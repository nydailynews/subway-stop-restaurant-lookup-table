$(document).ready(function() {
  var main_div = 'info-box-desktop';
  if ( is_mobile ) main_div = 'info-box-handheld';
  var map;
  var markersArray =[];
  var markerList = {};
  var infoWindow;
  var availableStops = [];
  var selected_mta = [];
  var selected_stops = [];
  var selected_stops_empty = [];
  var selected = [];
  //if ($.bbq.getState("line") != null) {
  //  var line_selected = $.bbq.getState("line");
  //} else {
    var line_selected = "N"
    // Runs the first time the page loads
    if ( window.location.hash !== '' )
    {
        // Parse out the pieces of the hash, which we use for permanent links
        line_selected = window.location.hash[1];
        window.scrollTo(0,0);
    }
  //}
  var json_selected;
  var cover_height;
  var select_layer;

  var width = $("#label").css("width");
  var height= $("#label").css("height");
  $("#label_back").css({"width":parseInt(width)+20, "height":parseInt(height)+0})


  var rss = [
    {"line":"N", "link":"http://www.nydailynews.com/json/cmlink/eating-n-line-1.2734164"},
    {"line":"7", "link":"http://www.nydailynews.com/json/cmlink/eating-7-line-1.2761341"},
    {"line":"Q", "link":"http://www.nydailynews.com/json/cmlink/eating-q-line-1.2761339"},
    {"line":"4", "link":"http://www.nydailynews.com/json/cmlink/eating-4-line-1.2761335"},
    {"line":"M", "link":"http://www.nydailynews.com/json/cmlink/eating-m-line-1.2761327"},
    {"line":"G", "link":"http://www.nydailynews.com/json/cmlink/eating-g-line-1.2761325"},
    {"line":"A", "link":"http://www.nydailynews.com/json/cmlink/eating-a-line-1.2761311"},
    {"line":"2", "link":"http://www.nydailynews.com/json/cmlink/eating-2-line-1.2734246"},
    {"line":"Z", "link":"http://www.nydailynews.com/json/cmlink/eating-Z-line-1.3001224"},
    {"line":"5", "link":"http://www.nydailynews.com/json/cmlink/eating-5-line-1.3001238"},
    {"line":"3", "link":"http://www.nydailynews.com/json/cmlink/eating-3-line-1.3001232"},
    {"line":"J", "link":"http://www.nydailynews.com/json/cmlink/eating-j-line-1.2962618"},
    {"line":"1", "link":""}
  ]

   var cover = [
    {"line":"N", "image":"img/N_Train-min.jpg","text":""},
    {"line":"7", "image":"img/7_Train-min.jpg","text":""},
    {"line":"Q", "image":"img/Q_Train-min.jpg","text":""},
    {"line":"4", "image":"img/4_Train-min.jpg","text":""},
    {"line":"M", "image":"img/M_Train-min.jpg","text":""},
    {"line":"G", "image":"img/G_Train-min.jpg","text":""},
    {"line":"A", "image":"img/A_Train-min.jpg","text":""},
    {"line":"2", "image":"img/2_Train-min.jpg","text":""},
    {"line":"Z", "image":"img/Z_Train-min.jpg","text":""},
    {"line":"5", "image":"img/5_Train-min.jpg","text":""},
    {"line":"3", "image":"img/3_Train-min.jpg","text":""},
    {"line":"J", "image":"img/J_Train-min.jpg","text":""}
  ]

  // These are the stations that have labels that need to be angled up
  var labels = [
    {"line":"N", "upper":["57th St"]},
    {"line":"7", "upper":["Vernon Blvd - Jackson Ave", "46th St", "52nd St", "Junction Blvd", "Woodside - 61st St", "69th St", "74th St - Broadway", "82nd St - Jackson Hts", "90th St - Elmhurst Av", "40th St"],
                 "lower":["45th Rd - Court House Sq", "Hunters Point Ave"]},
    {"line":"Q", "upper":["57th St", "Ocean Pkwy", "Coney Island - Stillwell Av"]},
    {"line":"4", "upper":["Franklin Ave"]},
    {"line":"M", "upper":["Seneca Ave", "Forest Ave", "23rd St - Ely Av", "36th St"],
                 "lower":["Myrtle Ave", "Central Ave", "Knickerbocker Ave", "Fresh Pond Rd", "Steinway St"]},
    {"line":"G", "upper":["Clinton - Washington Aves", "Hoyt - Schermerhorn Sts", "Fulton St", "Classon Ave"]},
    {"line":"A", "upper":["Nostrand Ave", "Beach 105th St", "Beach 98th St", "Rockaway Park - Beach 116 St", "Utica Ave", "Rockaway Blvd", "80th St", "Broadway Junction"],
                 "lower":["Euclid Ave", "Grant Ave"]},
    {"line":"2", "upper":["149th St - Grand Concourse"],
                 "lower":["Jackson Ave", "3rd Ave - 149th St"]},
    {"line":"Z", "upper":["Chauncey St", "Broadway Junction", "75th St - Eldert Ln", "104th-102nd Sts", "121st St", ]},
    {"line":"5", "upper":[""]},
    {"line":"3", "upper":[""],
                 "lower":["Franklin Ave"]},
    {"line":"J", "upper":["Marcy Ave", "Hewes St", "Lorimer St", "Flushing Ave", "Myrtle Ave", "Kosciuszko St", "Gates Ave", "Halsey St", "Chauncey St", "Broadway Junction", "Alabama Ave", "Van Siclen Ave", "Cleveland St", "Cypress Hills", "75th St - Eldert Ln", "85th St - Forest Pky", "95th St - Forest Pky", "Woodhaven Blvd", "104th-102nd Sts", "121st St"],
                 "lower":["Broad St", "Fulton St", "Chambers St", "Canal St", "Norwood Ave", "Sutphin Blvd - Archer Av"]}
  ]

  for (i=0;i<rss.length;i++) {
    if (rss[i].line == line_selected) {
      json_selected = rss[i].link;
    }
  }

    // BUILD THE LEGEND
    var lines = ['1', '2','3','4','5','6','7','A','C','E','B','D','F','M','N','Q','R','J','Z','G','L']
    var lines_no = ['1','6','C','E','B','D','F','R','L']

    for (i=0; i<lines.length; i++) {
        $("#legend_box").append('<div class="logo_box"><img style="cursor: pointer;" class="legend" id="' + lines[i] + '" src="img/line_' + lines[i] + '.png" alt="' + lines[i] + ' restaurants"></div>')
    }
    
    $.each($(".legend"), function() {
        for (p=0; p<lines_no.length; p++) {
            if ( $(this).attr("id") == lines_no[p]) {
                $(this).addClass("no_restaurant");
                // $(this).off("click");
            }
        }
    })

    $("#1").css("margin-left", "52px");
    $("#S").css("margin-right", "52px");

    $("#legend_box").prepend('<div class="left_box" ><img class="left" src="img/left.png" alt="Scroll left"></div>');
    $("#legend_box").append('<div class="right_box" ><img class="right" src="img/right.png" alt="Scroll right"></div>');

    function scroll_legend(lr) {
        var slideW = $('.logo_box').width();
        if ( lr == 'left' ) $('#legend_box').animate({scrollLeft: "-="+slideW*2 }, 600);      
        else $('#legend_box').animate({scrollLeft: "+="+slideW*2 }, 600);
    }
    $(".left").click(function() { scroll_legend('left'); });
    $(".right").click(function() { scroll_legend('right'); });


    if ( !is_mobile ) {
        var map = L.map("map-container",{
            scrollWheelZoom: false
        }).setView([40.708670, -74.024773], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/nydnmaps/cisgc1l2q001p2xpiqbx1o4bx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibnlkbm1hcHMiLCJhIjoiM1dZem9aWSJ9.x22rTAWkRpNy2bOTlVe1jg', {
              attribution: 'Mapbox',
              maxZoom: 20,
              minZoom: 13,
              //token: '',
          }).addTo(map);

        L.control.zoom ({
          position: "bottomright"
        }).addTo(map);
    }

    function get_line(d) {
        // Return the line's color, or black if the line name doesn't match anything we've set up.
        return d == "1" || d == "2" || d == "3" ? '#ee352e' :
               d == "4" || d == "5" || d == "6"  ? '#00933c' :
               d == "7"  ? '#b933ad' :
               d == "R" || d == "N" || d == "Q"? '#fccc0a' :
               d == "A" || d == "C" || d == "E"  ? '#2850ad' :
               d == "B" || d == "D" || d == "F" || d == "M"  ? '#ff6319' :
               d == "S"  ? '#808183' :
               d == "L"  ? '#a7a9ac' :
               d == "G"  ? '#6cbe45' :
               d == "J" || d == "Z" ? '#996633' :
                                      '#000000' ;
    };

    function style_line(feature) {
        weight = 3,
        color = get_line(feature.properties.route_id)
        return {
            weight: weight,
            color: color,
            opacity: 1.0,
        };
    };

    function style_line_hide(feature) {
        weight = 3,
        color = get_line(feature.properties.route_id)
        return {
            weight: weight,
            color: color,
            opacity: 0,
        };
    };

    function style_nyc(feature) {
        return {
            weight: 2,
            color: "black",
            opacity: 1.0,
        };
    };

    function style_stop(feature) {
        color = get_line(feature.properties.line)
        return {
            weight: 2,
            color: color,
            fillColor: color,
            fillOpacity: 1,
            opacity: 1,
            radius: 6,
        };
    };

    function style_stop_hide(feature) {
        color = get_line(feature.properties.line)
        return {
            weight: 2,
            color: color,
            fillColor: color,
            fillOpacity: 0,
            opacity: 0,
            radius: 6,
        };
    };

    function style_stop_empty(feature) {
        color = get_line(feature.properties.line)
        return {
            weight: 2,
            color: color,
            fillColor: "white",
            fillOpacity: 1,
            opacity: 1,
            radius: 6,
        };
    };

    var style_stop_hovered = {
      radius: 12,
    }

    var style_stop_clicked = function(color) {
        return {
          fillColor: color,
          radius: 12,
          //weight: 7,
        }
    }

    function scroll_to_card(stop) {
      $.each($(".window"), function() {
          var currentID = $(this).attr("id").split("window")[1];
          var station = $(this).find(".stop").find(".stop_name").text()
          var station1 = station.split(" & ")[0];
          var station2 = station.split(" & ")[1];
          if (stop == station1 || stop == station2) {
              $('html, body').animate({
                  scrollTop: $("#window"+currentID).offset().top - 120
              }, 0);
              var windowWidth = $(window).width();
              if (windowWidth < 480) {
                    setTimeout(function() {
                        $("#map-container").css("z-index", 0);
                        $("#close_box").css("display","none");
                        $("#close_box_back").css("display","none");
                    }, 1000);
              } else {
                  $(".window").removeClass("highlighted");
                  $(this).addClass("highlighted"); 
              }

          }
      })

    };

    function on_each_feature(feature, layer) {
        layer.on({
            click: highlight_feature,
        });
        layer.bindPopup('<div class="popup-back"></div><div class="popup-front">'+feature.properties.stations+'<img class="line_label" src="img/line_'+feature.properties.line+'.png"></div>', {offset:new L.Point(0,0)});
        var windowWidth = $(window).width();
        layer.on('mouseover', function(e){
          if (windowWidth > 480  && select_layer.feature.properties.stations != feature.properties.stations) {  
              geojson_stop.setStyle(style_stop);
              select_layer.setStyle(style_stop_clicked(get_line(feature.properties.line)));
              layer.setStyle(style_stop_hovered);
          }
        });
        layer.on('mouseout', function(e){
          if (windowWidth > 480 && select_layer.feature.properties.stations != feature.properties.stations) {   
              geojson_stop.setStyle(style_stop);
              select_layer.setStyle(style_stop_clicked(get_line(feature.properties.line)));
          }
        });
    };

    function on_each_feature2(feature, layer) {
        layer.bindPopup(feature.properties.stations + "<div>No articles for this stop</div>", {className: 'no_articles', offset:new L.Point(0,0)});
        var windowWidth = $(window).width();
        if (windowWidth > 480) {    
          layer.on('mouseover', function(e){
                layer.openPopup();
          });
          layer.on('mouseout', function(e){
                layer.closePopup();
          });
        }
    };

    function highlight_feature(e) {
        var popup_width = $(".leaflet-popup-content").width();
        var popup_height = $(".leaflet-popup-content").height();
        $(".popup-back").width(popup_width)
        $(".popup-back").height(popup_height)
        var windowWidth = $(window).width();
        //window.history.replaceState('', '', window.location.origin + window.location.pathname + '#' + selected.toLowerCase().replace(' ', '-'));
        // if (windowWidth > 480) {
                geojson_stop.setStyle(style_stop);
                layer = e.target;
                layer.setStyle(style_stop_clicked(get_line(layer.feature.properties.line)));
                scroll_to_card(layer.feature.properties.stations);
                map.panTo(e.latlng);
                layer.openPopup();
        //}
        select_layer = layer;
    };

    if ( !is_mobile ) {
        //geojson_line = L.geoJson(nyc, {style: style_nyc}).addTo(map);
        geojson_line = L.geoJson(mta, {style: style_line_hide}).addTo(map);
        geojson_stop = L.geoJson(stops, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng);
            },
            style: style_stop_hide,
        }).addTo(map);
        geojson_stop_empty = L.geoJson(stops, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng);
            },
            style: style_stop_hide,
        }).addTo(map);
    }

    function load_marker(latlng, stop, line, i, marker_type) {
        if ( is_mobile ) return false;
        // Handle placing and naming markers. 
        // marker_type will be either 'horizontal' 'upper' or 'lower'
        var anchors = { 
            horizontal: [-15, 10],
            'upper-right': [30, 90],
            'lower-right': [20, -75]
        };
        var lat = latlng[0];
        var lng = latlng[1];

        // Remove detritus from stop name
        var stop_name = stop.replace(/ Ave?s?| Rds?/i, '');

        var marker = L.marker([lng, lat], {
            icon: L.divIcon({
                className: marker_type,
                html: "<div class='" + marker_type + "-inner'>"+stop_name+"</div>",
                iconAnchor: anchors[marker_type],
                iconSize: 100})
        }).addTo(map);
        markersArray.push(marker);
    }

    var load_map = function (line_selected, json_selected, subsequent_click) {   
        // This is the workhorse function. It loads the map and all the stop-cards.
        $.getJSON(json_selected, function(data){
            if (line_selected == "4" || line_selected == "5" ) { data.reverse(); }

            //if ( !is_mobile ) {
            selected_mta = [];
            selected_stops = [];
            selected_stops_empty = [];
            for (i=0; i < mta.features.length; i++) {
              if (mta.features[i].properties.route_id == line_selected) {
                    if ( !is_mobile ) {
                      map.removeLayer(geojson_line);
                      selected_mta.push(mta.features[i])
                      geojson_line = L.geoJson(selected_mta, {style: style_line}).addTo(map);
                    }
              }
            }

            var my_stops = []
            var l = data.length;
            for (p = 0; p<l; p++) {
                var stop1 = data[p].body[0].paragraphs.split(": ")[0].split(" & ")[0];
                var stop2 = data[p].body[0].paragraphs.split(": ")[0].split(" & ")[1];
                my_stops.push(stop1);
                if (stop2 != null && $.inArray(stop2,my_stops) == -1) {
                    my_stops.push(stop2)
                } 
            }

            if ( !is_mobile ) {
                var l = stops.features.length;
                for (i=0; i<l; i++) {
                    if (stops.features[i].properties.line == line_selected) {
                        if ($.inArray(stops.features[i].properties.stations,my_stops) !== -1) {
                            selected_stops.push(stops.features[i]);
                        } else {
                            selected_stops_empty.push(stops.features[i])
                        }
                    }
                }
        
                map.removeLayer(geojson_stop);
                map.removeLayer(geojson_stop_empty); 
                //map.removeLayer(geojson_stop_highlight);   

                geojson_stop = L.geoJson(selected_stops, {
                    pointToLayer: function (feature, latlng) {                            
                        return L.circleMarker(latlng);
                    },
                    style: style_stop,
                    onEachFeature: on_each_feature
                }).addTo(map);

              geojson_stop_empty = L.geoJson(selected_stops_empty, {
                  pointToLayer: function (feature, latlng) {                            
                      return L.circleMarker(latlng);
                  },
                  style: style_stop_empty,
                  onEachFeature: on_each_feature2
              }).addTo(map);

              for (i = 0; i < markersArray.length; i++) {
                map.removeLayer(markersArray[i]);
              }
            }

          for (p = 0; p < labels.length; p++) {
            if (labels[p].line == line_selected) {
                for (i = 0; i < selected_stops.length; i++) {
                  selected.push(selected_stops[i].properties.stations);
                  // This logic determines if subway stop labels appear horizontal
                  // or turned up at an angle. This is necessary to fix situations
                  // where labels overlap.
                  // This logic looks for whether the subway station is listed in the subway line's 'upper' or 'lower' arrays.
                  if ($.inArray(selected_stops[i].properties.stations,labels[p].upper) >= 0 ) {
                    load_marker(selected_stops[i].geometry.coordinates, selected_stops[i].properties.stations, selected_stops[i].properties.line, i, 'upper-right');
                  }
                  else if ($.inArray(selected_stops[i].properties.stations,labels[p].lower) >= 0 ) {
                    load_marker(selected_stops[i].geometry.coordinates, selected_stops[i].properties.stations, selected_stops[i].properties.line, i, 'lower-right');
                  } else {
                    load_marker(selected_stops[i].geometry.coordinates, selected_stops[i].properties.stations, selected_stops[i].properties.line, i, 'horizontal');
                  }
                }            
            }
          }

        for (i=0;i<cover.length;i++) {
          if (cover[i].line == line_selected) {
            var banner = cover[i].image;
            var intro = cover[i].text;
          }
        }

        var share = {
            url: 'http://interactive.nydailynews.com/features/nyc-restaurant-guide-subway/',
            url_short: '',
            subject: 'The Daily News Subway Restaurant Guide',
            blurb: 'A curated guide to NYC restaurants for each MTA subway line in Manhattan, Brooklyn, Queens and the Bronx, by the New York Daily News',
            blurb_encoded: ''
        };

        // Clean up the main_div between different lines loading
        $("#" + main_div + ' .window').remove();

        $("#box").html('\n\
<svg id="subway" width="367px" height="118px" viewBox="0 0 367 118" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\
<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n\
    <g id="subway_line" fill="' + get_line(line_selected) + '">\n\
        <path d="M2,8 L365.138914,8 C329.250684,71.8546012 261.381149,114.92314 183.570374,114.92314 C105.753806,114.92314 37.8863002,71.8546012 2.00002871,8.00005109 Z" id="subway_line_path"></path>\n\
    </g>\n\
</g>\n\
</svg>\n\
<h3 id="' + line_selected + '">' + line_selected + '</h3>\n\
<h3 id="head">Explore the ' + line_selected + ' line</h3>\n\
<div class"img_box">\n\
    <div id="social_map" class="large-12 medium-12 small-12 columns">\n\
        <a class="fb-share" href="http://www.facebook.com/sharer.php?u=' + share.url + '" target="_blank"><div id="facebook" class="small-text-center"></div></a>\n\
        <a href="https://twitter.com/share?url=' + share.url + '%23' + line_selected + '&text=' + share.subject + '&hashtags=SubwayEats,' + line_selected + 'line&via=NYDailynews" target="_blank"><div id="twitter"></div></a>\n\
        <a href="mailto:?subject=' + share.subject + '&body=' + share.blurb + ' ' + share.url + '"><div id="email"></div></a>\n\
    </div>\n\
</div>\n\
<div class="text">'+ intro +'</div>\n\
</div>\n\
<div class="scroll_box"><img class="scroll" src="img/scroll.png" alt="Scroll down image"></div>');

          $(".scroll").on("click",function(){
              $('html, body').animate({
                  scrollTop: $("#" + main_div).offset().top - 120
              }, 600);
          });

        // RESIZE USING VIEWPORT DIMENSIONS ON MOBILE
        if ( is_mobile && subsequent_click == 0 )
        {
            $('#' + main_div).append($('#box-wrapper'));
            $('#' + main_div).height($('body').height());
            $('#' + main_div).width($('body').width());
            $('#' + main_div + '#bottom_ad, #' + main_div + ' #top_ad').height($('body').height());
            $('#' + main_div + '#bottom_ad, #' + main_div + ' #top_ad').width($('body').width());
        }

        var l = data.length;
        for (i = 0; i<l; i++) {
            var stop = data[i].body[0].paragraphs.split(": ")[0];
            var headline = data[i].title;
            var details = data[i].body[0].paragraphs.split(": ")[1];
            // We don't want the full-size image, so we edit the image string
            var image = data[i].images[0].originalSrc.replace('httpImage', 'httpImage/image.jpg_gen/derivatives/article_500');
            var url = data[i].url;     
            $('#' + main_div).append('<div class="window" id="window'+i+'">\n\
<div class="card_top">\n\
    <img class="profile" src="'+image+'" />\n\
    <div class="stop">\n\
        <p class="stop_name"><a target="_blank" href="'+url+'"">'+stop+'</a></p>\n\
    </div>\n\
    <h3 class="name"><a target="_blank" href="'+url+'"">'+headline+'</a></h3>\n\
</div>\n\
<p class="details"><a target="_blank" href="'+url+'"">'+details+'</a></p>\n\
<a class="button_link" target="_blank" href="'+url+'"">\n\
    <button class="visit-page">READ MORE</button>\n\
</a>\n\
<div id="social">\n\
    <a class="fb-share" href="http://www.facebook.com/sharer.php?u=' + url + '" target="_blank"><div id="facebook" class="small-text-center"></div></a>\n\
    <a href="https://twitter.com/share?url=' + url + '&text=' + headline + '&hashtags=SubwayEats,' + line_selected + 'line&via=NYDailynews" target="_blank"><div id="twitter"></div></a>\n\
    <a href="mailto:?subject=' + headline+ '&body=' + details + ' ' + url + '"><div id="email"></div></a>\n\
</div>\n\
</div>');

            // AD JUGGLER Add an ad after the first card.
            if ( i == 0 ) {
                $('#' + main_div).append($('#top_ad'));
                $('#' + main_div + ' #top_ad').append("<script>googletag.cmd.push(function() { googletag.display('div-gpt-ad-1423507761396-1'); })</script>");
            }
            if ( is_mobile && i == 1 ) {
                $('#' + main_div).append($('#top-ad-wrapper'));
                //$('#' + main_div + ' #top_ad').append("<script>googletag.cmd.push(function() { googletag.display('div-gpt-ad-1423507761396-1'); })</script>");
            }
        } // end that big for loop

        // Place the final ad on mobile
        if ( is_mobile ) {
            $('#' + main_div).append($('#bottom_ad'));
        }

        if ( !is_mobile ) {
            $('html, body').animate({
                scrollTop: $("#box").offset().top - 120
            }, 0);
        }

        if ( !is_mobile ) {
            $.each(geojson_stop._layers, function() { 
                var layer_stop = $(this)[0].feature.properties.stations;
                var data_stop = data[0].body[0].paragraphs.split(": ")[0];
                var data_stop_1 = data_stop.split(" & ")[0];
                if (layer_stop ==  data_stop_1 ) {
                    var latlng = $(this)[0].feature.geometry.coordinates;
                    var lat = latlng[0];
                    var lng = latlng[1];
                    map.panTo([lng,lat]);
                }
            });
        }
    });
    };


    // ACTION: If someone clicks on a subway line at the top of the screen
    $(".legend").click(function(){
        line_selected = $(this).attr("id");
        click_legend(line_selected);
    });

    function click_legend(value) {
        // Handle clicks and taps on the legend at the top of the screen.
        // Why is it called a legend and not a nav
        if ($.inArray(value,lines_no) == -1) {
            var l = rss.length;
            for ( i=0; i<l; i++ ) {
                if (rss[i].line == value) {
                    window.history.replaceState('', '', window.location.origin + window.location.pathname + '#' + value);
                    highlight_legend(value);
                    json_selected = rss[i].link;
                }
            }
            load_map(value, json_selected, 1);
        }
    }

    function highlight_legend(value) {
        $(".logo_box").removeClass("selected");
        var line_link = document.getElementById(value);
        $(line_link).closest(".logo_box").addClass("selected");
    }

    // This is what fires on the initial load.
    // That "0" in load_map means "this is the initial load."
    highlight_legend(line_selected);
    load_map(line_selected, json_selected, 0);


    cover_height = $("#box").css("height");

    function scroll_function() {
        // This is what fires when a reader scrolls.
        var scroll_obj = window;
        if ( is_mobile ) scroll_obj = document.getElementById('info-box-handheld');
        var window_height = $(scroll_obj).height();
        var window_top_position = $(scroll_obj).scrollTop();
        if ( is_mobile ) window_top_position = $(scroll_obj).scrollLeft();
        //console.log('*', window_height, window_top_position);

        // Loop through each of the restaurant panels to see which one is in
        // view, if it's in view we make sure its label on the line map is visible.
        //
        // We run this loop twice: The first time to figure out what the active station is,
        // the second time to perform the browser actions on the active station (if necessary).
        $.each($(".window"), function() {
            var element_height = $(this).outerHeight();
            if ( is_mobile ) element_height = $(this).outerWidth();

            var element_top_position = $(this).offset().top;
            if ( is_mobile ) element_top_position = $(this).offset().left;

            //console.log('**', element_height, $(this).offset());

            // No "var" on this variable means we have it available in our next loop.
            station = $(this).find(".stop_name").text();

            // Check to see if this current panel is near / within viewport
            var window_pos = element_top_position - window_top_position;
            //console.log('***', element_top_position, window_top_position, window_pos);
            // Break the loop when we get the panel closest to the top of the screen.
            if ( window_pos > 0 ) { return false; }
        });

        // Now that we have the station, if our station is different from the 
        // previous station we loaded, we load the new station.
        if ( station === old_station ) { return false; }

        $.each($(".window"), function() {
            var current_station = $(this).find(".stop_name").text()
            if ( current_station === station ) {
                old_station = station;
                var station1 = station.split(" & ")[0];
                var station2 = station.split(" & ")[1];

                $("#label").html(station + "<img class='line_label' src='img/line_"+line_selected+".png' alt='"+ line_selected + " line'><img class='map_label' src='img/map.png' alt='Map icon'>");
                var width = $("#label").css("width");
                var height= $("#label").css("height");
                $("#label_back").css({"width":parseInt(width)+20, "height":parseInt(height)+0, "display":"inline"});
                $("#label").css({"display":"inline"});

                $.each(geojson_stop._layers, function() {
                    var stop = $(this)[0].feature.properties.stations;
                    var layer = $(this)[0];
                    var latlng = $(this)[0].feature.geometry.coordinates;
                    if (station1 == stop) {
                        var lat = latlng[0];
                        var lng = latlng[1];
                        geojson_stop.setStyle(style_stop);
                        geojson_stop_empty.setStyle(style_stop_empty);
                        layer.setStyle(style_stop_clicked(get_line(line_selected)));
                        layer.openPopup();
                        select_layer = layer;
                        map.panTo(layer._latlng);
                    }
                    if (station2 == stop) {
                        geojson_stop.setStyle(style_stop);
                        geojson_stop_empty.setStyle(style_stop_empty);
                        layer.setStyle(style_stop_clicked(get_line(line_selected)));
                        layer.openPopup();
                        select_layer2 = layer;
                    }
                });

                var windowWidth = $(scroll_obj).width();
                if (windowWidth > 480 ) {
                    $(".window").removeClass("highlighted");
                    $(this).addClass("highlighted"); 
                }
          }
          
        });

        $(".map_label").click(function() {
          //$("#legend_box").css("display","none");
          //$("#nydn-header").css("display","none");
          //$("#label").css("display","none");
          //$("#label_back").css("display","none");

          var stations = $(this).closest(".stop").find(".stop_name").text();
          var stations1 = stations.split(" & ")[0];
          var stations2 = stations.split(" & ")[1];       
          $.each(geojson_stop._layers, function() {
            var stop = $(this)[0].feature.properties.stations;
            var layer = $(this)[0];
            if (stations1 == stop) {
              var latlng = $(this)[0].feature.geometry.coordinates;
              var lat = latlng[0];
              var lng = latlng[1];
              geojson_stop.setStyle(style_stop);
              geojson_stop_empty.setStyle(style_stop_empty);
              layer.setStyle(style_stop_clicked(get_line()));
              layer.openPopup();
              map.panTo([lng,lat]);
            }
            if (stations2 == stop) {
              geojson_stop.setStyle(style_stop);
              geojson_stop_empty.setStyle(style_stop_empty);
              layer.setStyle(style_stop_clicked(get_line()));
              layer.openPopup();
            }
          })

          $("#map-container").css("z-index",5);
          $("#legend_box").css("z-index",6);
          $("#close_box").html("<img class='back' src='img/back.png' alt=''>BACK");
          $("#close_box").css("display","block");
          $("#close_box_back").css("display","block");
          var width = $("#close_box").css("width");
          var height= $("#close_box").css("height");

          $("#close_box_back").css({"width":parseInt(width)+0, "height":parseInt(height)+0})
          $("#close_box").click(function() {
              $("#map-container").css("z-index", 0);
              $("#close_box").css("display","none");
              $("#close_box_back").css("display","none");
              //$("#legend_box").css("display","block");
              //$("#nydn-header").css("display","block");
              //$("#label").css("display","block");
              //$("#label_back").css("display","block");
          })
        })

        if (window_top_position < parseInt(cover_height) + 300) {
            $("#label").css({"display":"none"})
            $("#label_back").css({"display":"none"})
        }

        if (window_top_position < 50 ) {
           $(".right, .left").css({"top":50 - window_top_position})
        } else {
          $(".right, .left").css({"top":0}) 
        }

      };

        // We want the scroll_function() to fire, at most, three times per second.
        did_scroll = 0;
        scroll_pos = 0;
        old_station = '';
        var scroll_obj = window;
        if ( is_mobile ) scroll_obj = document.getElementById('info-box-handheld');
        $(scroll_obj).scroll( function() { 
            // The waypoints library appears to fire the scroll handler even
            // if scrolling hasn't occured, so we check to see if the window's
            // scrolltop position has actually changed.
            //console.log(scroll_pos, $(this).scrollTop());
            if ( scroll_pos !== $(this).scrollTop() ) {
                scroll_pos = $(this).scrollTop();
                did_scroll = 1;
            }
        });
        setInterval( function()
        {
            if ( did_scroll == 1 )
            {
                did_scroll = 0;
                scroll_function();
            }
        }, 1000);


if ( is_mobile ) {
    window.setTimeout(function() {
    $('#legend_box').touchwipe({
         wipeLeft: function() { scroll_legend('right'); },
         wipeRight: function() { scroll_legend('left'); },
         preventDefaultEvents: false
    }); }, 1000);
}

  });

// I THINK THIS MAKES THINGS STICKY.
$(document).ready(function() {}), 
    function() {
        var e, t;
        e = this.jQuery || window.jQuery, t = e(window), e.fn.stick_in_parent = function(o) {
            var n, i, s, r, a, c, l, d, g, w;
            for (null == o && (o = {}), l = o.sticky_class, i = o.inner_scrolling, c = o.recalc_every, a = o.parent, r = o.offset_top, s = o.spacer, n = o.bottoming, null == r && (r = 0), null == a && (a = void 0), null == i && (i = !0), null == l && (l = "is_stuck"), null == n && (n = !0), d = function(o, d, g, w, p, u, f, h) {
                    var m, v, b, y, k, T, _, M, $, x, S;
                    if (!o.data("sticky_kit")) {
                        if (o.data("sticky_kit", !0), T = o.parent(), null != a && (T = T.closest(a)), !T.length) throw "failed to find stick parent";
                        if (m = b = !1, (x = null != s ? s && o.closest(s) : e("<div />")) && x.css("position", o.css("position")), _ = function() {
                                var e, t, n;
                                return !h && (e = parseInt(T.css("border-top-width"), 10), t = parseInt(T.css("padding-top"), 10), d = parseInt(T.css("padding-bottom"), 10), g = T.offset().top + e + t, w = T.height(), b && (m = b = !1, null == s && (o.insertAfter(x), x.detach()), o.css({
                                    position: "",
                                    top: "",
                                    width: "",
                                    bottom: ""
                                }).removeClass(l), n = !0), p = o.offset().top - parseInt(o.css("margin-top"), 10) - r, u = o.outerHeight(!0), f = o.css("float"), x && x.css({
                                    width: o.outerWidth(!0),
                                    height: u,
                                    display: o.css("display"),
                                    "vertical-align": o.css("vertical-align"),
                                    "float": f
                                }), n) ? S() : void 0
                            }, _(), u !== w) return y = void 0, k = r, $ = c, S = function() {
                            var e, a, v, M;
                            return !h && (null != $ && (--$, 0 >= $ && ($ = c, _())), v = t.scrollTop(), null != y && (a = v - y), y = v, b ? (n && (M = v + u + k > w + g, m && !M && (m = !1, o.css({
                                position: "fixed",
                                bottom: "",
                                top: k
                            }).trigger("sticky_kit:unbottom"))), p > v && (b = !1, k = r, null == s && ("left" !== f && "right" !== f || o.insertAfter(x), x.detach()), e = {
                                position: "",
                                width: "",
                                top: ""
                            }, o.css(e).removeClass(l).trigger("sticky_kit:unstick")), i && (e = t.height(), u + r > e && !m && (k -= a, k = Math.max(e - u, k), k = Math.min(r, k), b && o.css({
                                top: k + "px"
                            })))) : v > p && (b = !0, e = {
                                position: "fixed",
                                top: k
                            }, e.width = "border-box" === o.css("box-sizing") ? o.outerWidth() + "px" : o.width() + "px", o.css(e).addClass(l), null == s && (o.after(x), "left" !== f && "right" !== f || x.append(o)), o.trigger("sticky_kit:stick")), b && n && (null == M && (M = v + u + k > w + g), !m && M)) ? (m = !0, "static" === T.css("position") && T.css({
                                position: "relative"
                            }), o.css({
                                position: "absolute",
                                bottom: d,
                                top: "auto"
                            }).trigger("sticky_kit:bottom")) : void 0
                        }, M = function() {
                            return _(), S()
                        }, v = function() {
                            return h = !0, t.off("touchmove", S), t.off("scroll", S), t.off("resize", M), e(document.body).off("sticky_kit:recalc", M), o.off("sticky_kit:detach", v), o.removeData("sticky_kit"), o.css({
                                position: "",
                                bottom: "",
                                top: "",
                                width: ""
                            }), T.position("position", ""), b ? (null == s && ("left" !== f && "right" !== f || o.insertAfter(x), x.remove()), o.removeClass(l)) : void 0
                        }, t.on("touchmove", S), t.on("scroll", S), t.on("resize", M), e(document.body).on("sticky_kit:recalc", M), o.on("sticky_kit:detach", v), setTimeout(S, 0)
                    }
                }, g = 0, w = this.length; w > g; g++) o = this[g], d(e(o));
            return this
        }
    }.call(this), $("#legend_box").stick_in_parent({
        bottoming: !1,
        offset_top: 0,
    });
