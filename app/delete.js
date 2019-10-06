function _displayMapDelete (divtarget) {
  divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
  document.getElementById(divtarget).innerHTML = "<div id='map' class='map-wrapper'></div>";
  
  var map, isCollapsed, openStreetMaps;
  
  if (document.body.clientWidth <= 767) {
    isCollapsed = true;
  } else {
    isCollapsed = false;
  }
  
  var promisePoint = $.ajax({
    url: "./dataservice/read_point.php",
    method: "GET",
    dataType: "json",
    data: {command:"POINT"},
    username: null,
    password: null
  });
  
  var pointObjects = L.geoJson(null, {
    onEachFeature: function (feature, layer) {
      if (feature.properties) {
        layer.on({
          click: function (e) {
            var featureGid = feature.properties.gid;
            var deleteConfirmation = confirm("Feature akan terhapus dari basisdata!");
            if (deleteConfirmation == true) {
              $.ajax({
                url: "./dataservice/delete_point.php",
                method: "GET",
                dataType: "json",
                data: {command:"DELETE",gid:featureGid},
                success: function (data) {
                  if (data.response=="200") {
                    map.off();
                    map.remove();
                    _displayMapDelete('app');
                  } else {
                    console.log('Failed to delete.');
                  }
                },
                username: null,
                password: null
              });
            } else {
              console.log('Delete feature is cancelled.');
            }
          }
        });
      }
    }
  });
  promisePoint.then(function (data) {
    pointObjects.addData(data);
    map.addLayer(pointObjects);
  });
  
  var promiseLinestring = $.ajax({
    url: "./dataservice/read_linestring.php",
    method: "GET",
    dataType: "json",
    data: {command:"LINESTRING"},
    username: null,
    password: null
  });
  
  var linestringObjects = L.geoJson(null, {
    onEachFeature: function (feature, layer) {
      if (feature.properties) {
        layer.on({
          click: function (e) {
            var featureGid = feature.properties.gid;
            var deleteConfirmation = confirm("Feature akan terhapus dari basisdata!");
            if (deleteConfirmation == true) {
              $.ajax({
                url: "./dataservice/delete_linestring.php",
                method: "GET",
                dataType: "json",
                data: {command:"DELETE",gid:featureGid},
                success: function (data) {
                  if (data.response=="200") {
                    map.off();
                    map.remove();
                    _displayMapDelete('app');
                  } else {
                    console.log('Failed to delete.');
                  }
                },
                username: null,
                password: null
              });
            } else {
              console.log('Delete feature is cancelled.');
            }
          }
        });
      }
    }
  });
  promiseLinestring.then(function (data) {
    linestringObjects.addData(data);
    map.addLayer(linestringObjects);
  });
  
  var promisePolygon = $.ajax({
    url: "./dataservice/read_polygon.php",
    method: "GET",
    dataType: "json",
    data: {command:"POLYGON"},
    username: null,
    password: null
  });
  
  var polygonObjects = L.geoJson(null, {
    onEachFeature: function (feature, layer) {
      if (feature.properties) {
        layer.on({
          click: function (e) {
            var featureGid = feature.properties.gid;
            var deleteConfirmation = confirm("Feature akan terhapus dari basisdata!");
            if (deleteConfirmation == true) {
              $.ajax({
                url: "./dataservice/delete_polygon.php",
                method: "GET",
                dataType: "json",
                data: {command:"DELETE",gid:featureGid},
                success: function (data) {
                  if (data.response=="200") {
                    map.off();
                    map.remove();
                    _displayMapDelete('app');
                  } else {
                    console.log('Failed to delete.');
                  }
                },
                username: null,
                password: null
              });
            } else {
              console.log('Delete feature is cancelled.');
            }
          }
        });
      }
    }
  });
  promisePolygon.then(function (data) {
    polygonObjects.addData(data);
    map.addLayer(polygonObjects);
  });

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
  
  var overlayLayers = {
    "Points": pointObjects,
    "Lines": linestringObjects,
    "Polygons": polygonObjects
  };
  
  var layerControl = L.control.layers(baseLayers, overlayLayers,  {
    collapsed: isCollapsed
  }).addTo(map);
  
  var attributionControl = L.control({
    position: "bottomright"
  });
}
