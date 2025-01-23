// Import Landsat collections
var landsat5 = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2");
var landsat7 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2");
var landsat8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2");

// Define the study area (replace with your AOI coordinates or shapefile)
var studyArea = ee.Geometry.Polygon([
  [[69.0, 31.5], [77.5, 31.5], [77.5, 37.0], [69.0, 37.0], [69.0, 31.5]]
]);

// Filter collections by date and location
var startDate = '2000-01-01';
var endDate = '2023-12-31';

function filterCollection(collection, start, end, aoi) {
  return collection
    .filterDate(start, end)
    .filterBounds(aoi)
    .map(maskClouds);
}

// Cloud masking function using quality bands
function maskClouds(image) {
  var qa = image.select('QA_PIXEL');
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
    .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask).divide(10000).copyProperties(image, ['system:time_start']);
}

// Function to fill SLC gaps in Landsat 7 imagery
function fillSLCGaps(image) {
  var filledImage = image.focal_mean({radius: 3, kernelType: 'circle', iterations: 1});
  return filledImage.blend(image);
}

// Calculate NDVI
function calculateNDVI(image) {
  return image.addBands(
    image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI')
  );
}

// Process Landsat 7: Apply gap-filling to SLC-off images
var landsat7Filtered = filterCollection(landsat7, startDate, endDate, studyArea)
  .map(function(image) {
    var year = ee.Date(image.get('system:time_start')).get('year');
    // Apply gap-filling only for SLC-off years
    return ee.Algorithms.If(year.gte(2003),
      fillSLCGaps(image),
      image
    );
  })
  .map(calculateNDVI);

// Process Landsat 5 and 8 normally
var landsat5Filtered = filterCollection(landsat5, startDate, endDate, studyArea).map(calculateNDVI);
var landsat8Filtered = filterCollection(landsat8, startDate, endDate, studyArea).map(calculateNDVI);

// Merge collections
var combinedCollection = landsat5Filtered
  .merge(landsat7Filtered)
  .merge(landsat8Filtered);

// Composite and visualize NDVI
var ndviComposite = combinedCollection
  .select('NDVI')
  .median()
  .clip(studyArea);

Map.centerObject(studyArea, 7);
Map.addLayer(ndviComposite, { min: 0, max: 1, palette: ['blue', 'white', 'green'] }, 'NDVI Composite');

// Export the composite as a GeoTIFF
Export.image.toDrive({
  image: ndviComposite,
  description: 'NDVI_Composite_With_GapFilling',
  folder: 'EarthEngineOutputs',
  fileNamePrefix: 'NDVI_Composite_With_GapFilling',
  scale: 30,
  region: studyArea,
  maxPixels: 1e13
});
