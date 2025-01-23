// Define the study area (replace with your AOI coordinates or shapefile)
var studyArea = ee.Geometry.Polygon([
  [[69.0, 31.5], [77.5, 31.5], [77.5, 37.0], [69.0, 37.0], [69.0, 31.5]]
]);

// Define the date range
var startDate = '2000-01-01';
var endDate = '2023-12-31';

// Function to mask invalid values (e.g., fill values in TerraClimate data)
function maskInvalid(image) {
  return image.updateMask(image.neq(-9999));
}

// Load ECMWF temperature data
var temperature = ee.ImageCollection("ECMWF/ERA5_LAND/HOURLY")
  .select('temperature_2m')
  .filterDate(startDate, endDate)
  .filterBounds(studyArea)
  .map(function(image) {
    // Convert temperature from Kelvin to Celsius
    return image.subtract(273.15).rename('Temperature_C').clip(studyArea);
  });

// Load TerraClimate data for precipitation, solar radiation, and vapor pressure deficit
var terraClimate = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE")
  .filterDate(startDate, endDate)
  .filterBounds(studyArea)
  .map(maskInvalid);

var precipitation = terraClimate.select('pr').rename('Precipitation_mm').clip(studyArea);
var solarRadiation = terraClimate.select('srad').rename('SolarRadiation_Wm2').clip(studyArea);
var vaporPressureDeficit = terraClimate.select('vpd').rename('VaporPressureDeficit_kPa').clip(studyArea);

// Generate monthly composites for each variable
function createMonthlyComposite(collection, varName) {
  return ee.ImageCollection(
    ee.List.sequence(0, ee.Date(endDate).difference(ee.Date(startDate), 'month'))
      .map(function(month) {
        var start = ee.Date(startDate).advance(month, 'month');
        var end = start.advance(1, 'month');
        return collection.filterDate(start, end)
          .mean()
          .set('system:time_start', start.millis())
          .rename(varName);
      })
  );
}

// Create monthly composites
var monthlyTemperature = createMonthlyComposite(temperature, 'Temperature_C');
var monthlyPrecipitation = createMonthlyComposite(precipitation, 'Precipitation_mm');
var monthlySolarRadiation = createMonthlyComposite(solarRadiation, 'SolarRadiation_Wm2');
var monthlyVaporPressureDeficit = createMonthlyComposite(vaporPressureDeficit, 'VaporPressureDeficit_kPa');

// Function to export monthly images as GeoTIFF
function exportMonthlyData(collection, varName) {
  collection.toList(collection.size()).evaluate(function(images) {
    images.forEach(function(image) {
      var img = ee.Image(image);
      var date = ee.Date(img.get('system:time_start')).format('YYYY-MM').getInfo();
      Export.image.toDrive({
        image: img,
        description: varName + '_' + date,
        folder: 'ClimateData',
        fileNamePrefix: varName + '_' + date,
        scale: 5500, // Use appropriate scale for TerraClimate and ECMWF
        region: studyArea,
        maxPixels: 1e13
      });
    });
  });
}

// Export monthly composites for each variable
exportMonthlyData(monthlyTemperature, 'Temperature_C');
exportMonthlyData(monthlyPrecipitation, 'Precipitation_mm');
exportMonthlyData(monthlySolarRadiation, 'SolarRadiation_Wm2');
exportMonthlyData(monthlyVaporPressureDeficit, 'VaporPressureDeficit_kPa');

// Add layers to the map for visualization
Map.centerObject(studyArea, 6);
Map.addLayer(monthlyTemperature.mean(), {min: -30, max: 50, palette: ['blue', 'white', 'red']}, 'Mean Temperature');
Map.addLayer(monthlyPrecipitation.mean(), {min: 0, max: 200, palette: ['white', 'blue']}, 'Mean Precipitation');
Map.addLayer(monthlySolarRadiation.mean(), {min: 0, max: 300, palette: ['white', 'yellow', 'red']}, 'Mean Solar Radiation');
Map.addLayer(monthlyVaporPressureDeficit.mean(), {min: 0, max: 3, palette: ['white', 'orange', 'red']}, 'Mean Vapor Pressure Deficit');
