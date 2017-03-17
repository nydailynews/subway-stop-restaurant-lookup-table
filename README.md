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

### How to remove a subway route

#### If the line hasn't been activated

1. Remove the letter / number of the line from these two arrays in js/scripts.js:
```js
    var lines = ['1','2','3',...
    var lines_no = ['1',....
``` 

#### If the line is active on the site 
