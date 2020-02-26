import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  constructor(
  ) {

  }

  ngOnInit() {
  }

  onMapLoad(map) {
    map.resize();
    d3.json('https://angotbaptiste.com/test')
        .then((data) => {
            // save full coordinate list for later
            // @ts-ignore
            const coordinates = data.features[0].geometry.coordinates;

            // start by showing just the first coordinate
            // @ts-ignore
            data.features[0].geometry.coordinates = [coordinates[0]];

            // add it to the map
            map.addSource('trace', { type: 'geojson', data });
            map.addLayer({
                id: 'trace',
                type: 'line',
                source: 'trace',
                paint: {
                    'line-color': 'yellow',
                    'line-opacity': 0.75,
                    'line-width': 5
                }
            });

            // setup the viewport
            map.jumpTo({ center: coordinates[0], zoom: 14 });
            map.setPitch(30);

            // on a regular basis, add more coordinates from the saved list and update the map
            let i = 0;
            // tslint:disable-next-line:only-arrow-functions
            const timer = window.setInterval(function() {
                if (i < coordinates.length) {
                    // @ts-ignore
                    data.features[0].geometry.coordinates.push(
                        coordinates[i]
                    );
                    map.getSource('trace').setData(data);
                    map.panTo(coordinates[i]);
                    i++;
                } else {
                    window.clearInterval(timer);
                }
            }, 50);
        })
        .catch((err) => {
            throw err;
        });
  }
}
