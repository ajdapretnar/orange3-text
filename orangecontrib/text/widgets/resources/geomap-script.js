var DATA = {};
var MAP_CODE = 'world_mill_en';
var REGIONS = {};
var SELECTED_REGIONS = [];

function renderMap() {
    if ('europe_mill_en|world_mill_en|us_aea_en'.indexOf(MAP_CODE) < 0) {
        console.error('Invalid map code');
    }
    $('.jvectormap-tip').remove();
    map = $('#map').html('').vectorMap({
        container: $('#map'),
        map: MAP_CODE,
        backgroundColor:'#88a',
        regionsSelectable: true,
        regionStyle: {
            hover: {
                "fill-opacity": .8,
            },
            selected: {
                fill: '#fc4',
                stroke: 'black',
                "stroke-width": .5
            },
            selectedHover: {
                "fill-opacity": .8,
            },
        },
        series: {
            regions: [{
                values: DATA,
                scale: ['#ffdddd', '#ff0000'],
                normalizeFunction: 'polynomial',
                legend: {
                    horizontal: true
                }
            }]
        },
        onRegionTipShow: function(e, el, code) {
            el.html(el.html() + ' (' + (DATA[code] || 0) + ')');
        },
        onRegionClick: function(event, code) {
            event = event.originalEvent;
            if (typeof event === 'undefined') {
                alert('expected Event.originalEvent, see https://github.com/bjornd/jvectormap/pull/341');
            }
            if (! (event.ctrlKey || event.shiftKey)) {
                map.clearSelectedRegions();
            }
        },
        onRegionSelected: function() {
            var regions = [];
            var selected = map.getSelectedRegions();
            for (var i=0; i<selected.length; ++i) {
                var alias = REGIONS[MAP_CODE][selected[i]];
                if (!alias) {
                    console.error(alias + ': ' + selected[i] + ' not in REGIONS[MAP_CODE]');
                    continue;
                }
                for (var j=0; j<alias.length; ++j) {
                    regions.push(alias[j]);
                }
                regions.push(selected[i]);
            }
            pybridge.region_selected(regions);
        }
    }).vectorMap('get', 'mapObject');

    var svg = document.getElementsByTagName('svg')[0];
    svg.addEventListener('click', function(event) {
        if (event.target != svg)
            return;
        map.clearSelectedRegions();
    });

    map.setSelectedRegions(SELECTED_REGIONS.filter(function(el) { return map.regions[el]; }));
}

window.onresize = renderMap;