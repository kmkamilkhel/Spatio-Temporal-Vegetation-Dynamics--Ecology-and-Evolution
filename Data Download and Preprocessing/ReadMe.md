# NDVI Calculation and Processing Workflow

This script calculates and visualizes NDVI (Normalized Difference Vegetation Index) using Landsat 5, 7, and 8 data in Google Earth Engine (GEE). It addresses Landsat 7 SLC-off gaps, generates consistent NDVI composites, and exports the results as GeoTIFF files.

## Features
- **NDVI Calculation:** Computes NDVI values using surface reflectance bands for Landsat 5, 7, and 8.
- **Gap-Filling:** Handles SLC-off gaps in Landsat 7 imagery using a focal mean filter.
- **Compositing:** Generates median composites for NDVI across all Landsat collections.
- **Export:** Outputs NDVI composites as GeoTIFF files to Google Drive.

## Script Overview
### Input Parameters
- **Study Area:** Western Himalayas, including Khyber Pakhtunkhwa (KPK), Azad Jammu and Kashmir (AJK), and Gilgit-Baltistan (GB).
- **Date Range:** Processes data from `2000-01-01` to `2023-12-31`.
- **Satellite Sensors:** Landsat 5 (TM), Landsat 7 (ETM+), and Landsat 8 (OLI).
- **Cloud Masking:** Utilizes the `QA_PIXEL` band to filter clouds, shadows, snow, and water.

### Workflow
1. **Data Collection:**
   - Load Landsat collections filtered by date and region of interest.
   - Apply cloud masking using the `QA_PIXEL` band.
2. **Gap-Filling for Landsat 7:**
   - Apply a focal mean filter to address SLC-off gaps in Landsat 7 imagery (post-2003).
   - Blend filled gaps with the original imagery for spatial consistency.
3. **NDVI Calculation:**
   - Compute NDVI using the formula:
     ```javascript
     NDVI = (NIR - RED) / (NIR + RED)
     ```
   - Band usage:
     - Landsat 5 & 7: `SR_B4` (RED) and `SR_B5` (NIR).
     - Landsat 8: `SR_B5` (RED) and `SR_B4` (NIR).
4. **Compositing:**
   - Generate a median composite of NDVI across all Landsat collections.
5. **Export:**
   - Save the NDVI composite as a GeoTIFF file to Google Drive.

## Dependencies
- **Google Earth Engine (GEE):** The script is designed to run on the GEE platform.

## How to Use
1. Open the script in the GEE code editor.
2. Modify the `studyArea` coordinates to match your region of interest.
3. Adjust the `startDate` and `endDate` parameters to specify your time range.
4. Run the script.
5. Download the exported GeoTIFF files from your Google Drive.

## Outputs
- **GeoTIFF Files:**
  - `NDVI_Composite.tif`: Median NDVI composite for the specified study area and time range.
- **Visualization:** A color-coded NDVI layer displayed on the GEE map.

## Visualization Parameters
- **NDVI:**
  ```javascript
  { min: -1, max: 1, palette: ['#640000', '#ff0000', '#006400', '#00c800', '#006400'] }


## Data Sources

| Variable              | Sensor                      | Temporal Resolution | Spatial Resolution |
|-----------------------|-----------------------------|---------------------|--------------------|
| **NDVI**              | Landsat (5 TM, 7 ETM+, 8 OLI) | 16-Day Composite    | 30 m               |
| **Temperature**       | ECMWF Reanalysis Project     | Monthly             | 9 km               |
| **Precipitation**     | TerraClimate                | Monthly             | 5.5 km             |
| **Solar Radiation**   | TerraClimate                | Monthly             | 5.5 km             |
| **Vapor Pressure Deficit** | TerraClimate           | Monthly             | 5.5 km             |

## Contact

For questions or feedback, please contact:

- **Author:** Kaleem Mehmood  
  **Email:** [kaleemmehmood73@gmail.com](mailto:kaleemmehmood73@gmail.com)

- **Author:** Shoaib Ahmad Anees  
  **Email:** [anees.shoaib@gmail.com](mailto:anees.shoaib@gmail.com)
















