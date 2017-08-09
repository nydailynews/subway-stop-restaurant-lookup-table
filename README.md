# NYC Subway Restaurant Guide

## Usage

### How to update a subway route
Get the [current MTA route data from CUNY](http://www.gc.cuny.edu/Page-Elements/Academics-Research-Centers-Initiatives/Centers-and-Institutes/Center-for-Urban-Research/CUNY-Mapping-Service/Projects/NYC-Subway-GIS-update-Hudson-Yards,-7-Line-Extension).

Convert it into something usable with https://ogre.adc4gis.com/ on the web or the ogr2ogr command-line client.

1. Edit data/mta.geojson and add / update the route for the desired line. This file controls the direction of the line's line.
2. If you have stations to add / remove / change location, edit the data/subway_geo.geojson file. Each line in it corresponds with a station, and records the station name and lat/long. This file controls the location of the station markers.
3. If you're just adding or removing stations, also update the data/stops.json file.

### How to figure out what's wrong when an article that should appear on a particular subway line is not appearing

1. Make sure the line is in the array assigned to the stop in data/stops.json
2. Make sure the article is tagged with "eating along the X line"

### How to activate a subway line

Most all of this is done in js/scripts.js.

1. In the `var rss = [...` array, add an object that looks like this with the line number and URL to that line's RSS feed, `{"line":"2", "link":"http://www.nydailynews.com/json/cmlink/eating-2-line-1.2734246"},`, somewhere inside the array.
2. Add a "cover" photo that's representative of the line into the img directory. Name it like `img/A_Train-min.jpg` except well you know. The image should be horizontal and at least 400px wide.
3. In the  `var cover = [...` array in scripts.js add an object that looks like `{"line":"2", "image":"img/2_Train-min.jpg","text":""},` except for the line you're adding.
4. If there are any subway line labels that need to be angled up, add an object for that particular line to the `var labels = [...` array like this `{"line":"Q", "upper":["57th St", "Ocean Pkwy", "Coney Island - Stillwell Av"]},`.
5. Remove the line from the `var lines_no = [...` array.

### How to remove stops along a subway route

Edit the data/subway_geo.geojson file.

### What if a stop isn't showing up on a line?

Edit the data/subway_geo.geojson file.

### How to remove a subway route

#### If the line hasn't been activated

1. Remove the line image from splash.html
2. Remove the letter / number of the line from these two arrays in js/scripts.js:
```js
    var lines = ['1','2','3',...
    var lines_no = ['1',....
``` 

#### If the line is active on the site 
