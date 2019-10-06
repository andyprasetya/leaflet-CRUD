function _displayMapCreate (divtarget) {
  divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
  document.getElementById(divtarget).innerHTML = "<div id='map' class='map-wrapper'></div>";
  
  var map, isCollapsed, openStreetMaps;
  if (document.body.clientWidth <= 767) {
    isCollapsed = true;
  } else {
    isCollapsed = false;
  }

  openStreetMaps = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 3, 
    maxZoom: 20, 
    attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
  });
  
  map = L.map("map", {
    zoom: 5,
    center: [-2.5918889841, 118.2788085937],
    layers: [openStreetMaps],
    minZoom: 3,
    maxZoom: 20,
    zoomControl: false,
    attributionControl: true
  });
  
  map.setMaxBounds([[-12.6406520507, 94.1211943626], [7.4970404951, 142.1802794933]]);

  var zoomControl = L.control.zoom({
    position: "topleft"
  }).addTo(map);

  var baseLayers = {
    "OpenStreetMap": openStreetMaps
  };
  
  var layerControl = L.control.layers(baseLayers, null,  {
    collapsed: isCollapsed
  }).addTo(map);
  
  var attributionControl = L.control({
    position: "bottomright"
  });
  
  /* Digitize Function */
  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);
  
  var drawControl = new L.Control.Draw({
    draw: {
      position: 'topleft',
      polyline: true,
      polygon: true,
      rectangle: false,
      circle: false,
      marker: true,
      circlemarker: false
    },
    edit: false
  });
  
  map.addControl(drawControl);
  
  map.on('draw:created', function (e) {
    var type = e.layerType, 
      layer = e.layer;
      
    var drawnJSONObject = layer.toGeoJSON();
    var objectGeometry = Terraformer.WKT.convert(drawnJSONObject.geometry);
    
    if (type === 'polyline') {
      _buildDigitiseModalBox('modalform','LINESTRING',objectGeometry);
    } else if (type === 'polygon') {
      _buildDigitiseModalBox('modalform','POLYGON',objectGeometry);
    } else if (type === 'marker') {
      _buildDigitiseModalBox('modalform','POINT',objectGeometry);
    } else {
      console.log('__undefined__');
    }
    //map.addLayer(layer);
    drawnItems.addLayer(layer);
  });
  
  $("#modalform").on('shown.bs.modal', function(){
    _activateFeatureSave();
  });
  
}
