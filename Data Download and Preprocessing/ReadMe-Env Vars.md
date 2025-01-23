# Climatic Data Download and Processing Workflow

This script processes and exports climatic data, including temperature, precipitation, solar radiation, and vapor pressure deficit, using Google Earth Engine (GEE). The data is derived from ECMWF ERA5-Land and TerraClimate datasets, aggregated to monthly composites, and exported as GeoTIFF files.

## Features
- **Temperature Calculation:** Processes temperature data from ECMWF ERA5-Land, converting Kelvin to Celsius.
- **Precipitation, Solar Radiation, and Vapor Pressure Deficit:** Extracted from TerraClimate with proper masking for invalid values.
- **Monthly Composites:** Aggregates data to monthly means for each variable.
- **Export:** Saves processed GeoTIFF files to Google Drive.

## Script Overview
### Input Parameters
- **Study Area:** User-defined region (replace with your coordinates in the script).
- **Date Range:** Processes data from `2000-01-01` to `2023-12-31`.
- **Data Sources:**
  - Temperature: ECMWF ERA5-Land (`temperature_2m`).
  - Precipitation, Solar Radiation, Vapor Pressure Deficit: TerraClimate (`pr`, `srad`, `vpd`).

### Workflow
1. **Data Collection:**
   - Loads ECMWF ERA5-Land and TerraClimate datasets filtered by date and region of interest.
   - Applies scaling factors and masks invalid values.
2. **Monthly Composites:**
   - Aggregates data into monthly means for each climatic variable.
3. **Export:**
   - Saves each month’s data as a GeoTIFF to Google Drive in a specified folder.
4. **Visualization:**
   - Adds average data layers to the GEE map for quick review.

## Outputs
- **GeoTIFF Files:**
  - `Temperature_C_<Year>-<Month>.tif`: Monthly temperature in Celsius.
  - `Precipitation_mm_<Year>-<Month>.tif`: Monthly precipitation in mm.
  - `SolarRadiation_Wm2_<Year>-<Month>.tif`: Monthly solar radiation in W/m².
  - `VaporPressureDeficit_kPa_<Year>-<Month>.tif`: Monthly vapor pressure deficit in kPa.
- **Visualization:** Color-coded average layers displayed on the GEE map.

## Visualization Parameters
- **Temperature:**
  ```javascript
  { min: -30, max: 50, palette: ['blue', 'white', 'red'] }




## Contact

For questions or feedback, please contact:

- **Author:** Shoaib Ahmad Anees  
  **Email:** [anees.shoaib@gmail.com](mailto:anees.shoaib@gmail.com)

- **Author:** Kaleem Mehmood  
  **Email:** [kaleemmehmood73@gmail.com](mailto:kaleemmehmood73@gmail.com)




















