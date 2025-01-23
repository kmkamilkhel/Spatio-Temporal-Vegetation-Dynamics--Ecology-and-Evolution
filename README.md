# Vegetation and Climate Research Repository

This repository contains all scripts, workflows, and documentation related to the analysis of vegetation dynamics and climatic impacts using remote sensing data. The research focuses on vegetation indices, climate variables, and spatiotemporal analysis in specific geographic regions.

## Research Overview

The primary goal of this research is to assess vegetation dynamics, climatic influences, and trends in ecologically sensitive regions of the Western Himalayas. The key methods include:

- **Remote Sensing Data Analysis:** Utilizing Landsat datasets to calculate vegetation indices such as NDVI, BAIS2, and NBR.
- **Climatic Data Processing:** Downloading and processing temperature, precipitation, solar radiation, and vapor pressure deficit data from ECMWF ERA5-Land and TerraClimate.
- **Trend and Residual Analysis:** Employing advanced statistical tools such as the Mann-Kendall test, Sen's slope, and residual NDVI trends to quantify vegetation changes and human impacts.
- **Spatiotemporal Analysis:** Conducting pixel-based trend analysis and ecological assessments to monitor vegetation changes over time.
```
📁 /README.md                # Main repository README

📁 /Data Download and Preprocessing
├── climate/                 # Climate data (e.g., temperature, precipitation)
├── vegetation/              # Vegetation index data (e.g., NDVI)
```
## Data Sources

| Variable                   | Sensor/Dataset               | Temporal Resolution | Spatial Resolution |
|----------------------------|------------------------------|---------------------|--------------------|
| **NDVI**                  | Landsat (5 TM, 7 ETM+, 8 OLI)| 16-Day Composite    | 30 m               |
| **Temperature**           | ECMWF ERA5-Land             | Monthly             | 9 km               |
| **Precipitation**         | TerraClimate                | Monthly             | 5.5 km             |
| **Solar Radiation**       | TerraClimate                | Monthly             | 5.5 km             |
| **Vapor Pressure Deficit**| TerraClimate                | Monthly             | 5.5 km             |

## Key Features

1. **Vegetation Analysis:**
   - Calculation of NDVI for assessing vegetation dynamics.
   - Trend analysis using Mann-Kendall test and Sen’s slope.

2. **Climatic Data Processing:**
   - Monthly composites of temperature, precipitation, solar radiation, and vapor pressure deficit.
   - Automated export of processed climatic variables as GeoTIFF files.

3. **Spatiotemporal Trends:**
   - Advanced statistical analysis to identify vegetation trends and human-induced impacts.
   - Residual NDVI trends to isolate anthropogenic influences.

4. **Visualization:**
   - Exported maps for NDVI and climatic variables.
   - Visual summaries of trend analysis results.

## How to Use

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-name.git
   cd your-repository-name


## Contact

For questions or feedback, please contact:

- **Author:** Kaleem Mehmood  
  **Email:** [kaleemmehmood73@gmail.com](mailto:kaleemmehmood73@gmail.com)

- **Author:** Shoaib Ahmad Anees  
  **Email:** [anees.shoaib@gmail.com](mailto:anees.shoaib@gmail.com)





