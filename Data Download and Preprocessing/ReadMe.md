# NDVI Calculation and Processing Workflow

This repository contains scripts and documentation for calculating and analyzing NDVI (Normalized Difference Vegetation Index) using Landsat 5, 7, and 8 data in Google Earth Engine (GEE). The focus is on vegetation dynamics in the Western Himalayas, addressing Landsat 7 SLC-off gaps and generating consistent NDVI composites for temporal analysis.

## Repository Structure

├── README.md # Overview of the repository ├── data/ # Placeholder for dataset links and descriptions │ ├── README.md # Instructions for accessing datasets │ └── placeholders/ # Placeholder for sample datasets ├── scripts/ # GEE scripts for data processing │ ├── ndvi_calculation.js # NDVI calculation script │ ├── gap_filling.js # Gap-filling for Landsat 7 │ ├── data_preprocessing.js # Additional preprocessing workflows ├── docs/ # Documentation and references │ ├── methodology.md # Detailed explanation of methods │ └── references.md # References to papers and tools used └── LICENSE # Licensing information (e.g., MIT, GNU)


## Workflow Overview

This workflow performs the following tasks:

### Importing Data

- Landsat 5 (TM), Landsat 7 (ETM+), and Landsat 8 (OLI) surface reflectance data.
- Focuses on the study area: Western Himalayas.

### Preprocessing

- Filtering by date and location.
- Masking clouds, cloud shadows, snow, and water using the `QA_PIXEL` band.

### Gap-Filling for Landsat 7

- Addresses SLC-off gaps (2003 onward) using a `focal_mean` filter.
- Blends filled gaps with the original image to ensure spatial consistency.

### NDVI Calculation

Calculates NDVI using the formula:

```markdown
NDVI = (NIR - RED) / (NIR + RED)

Uses the following bands:
Landsat 5 & 7: SR_B4 (RED) and SR_B5 (NIR).
Landsat 8: SR_B5 (RED) and SR_B4 (NIR).
Compositing
Merges Landsat collections and generates a median composite of NDVI.
Exporting Results
Outputs NDVI composite as a GeoTIFF for further analysis.
Scripts
1. ndvi_calculation.js
Main script for:

Filtering Landsat data.
Cloud masking.
Calculating NDVI.
Exporting NDVI composites.
2. gap_filling.js
Script for handling Landsat 7 SLC-off gaps.
Uses a focal mean method to fill missing pixels while retaining data integrity.
3. data_preprocessing.js
Placeholder for additional preprocessing workflows, such as:

Temporal compositing.
Smoothing NDVI time-series data.
Data Sources
Variable	Sensor	Temporal Resolution	Spatial Resolution
NDVI	Landsat (5 TM, 7 ETM+, 8 OLI)	16-Day Composite	30 m
Temperature	ECMWF Reanalysis Project	Monthly	9 km
Precipitation	TerraClimate	Monthly	5.5 km
Solar Radiation	TerraClimate	Monthly	5.5 km
Vapor Pressure Deficit	TerraClimate	Monthly	5.5 km
Study Area
The workflow is designed for the Western Himalayas, encompassing regions of Khyber Pakhtunkhwa (KPK), Azad Jammu and Kashmir (AJK), and Gilgit-Baltistan (GB). The study area is characterized by diverse vegetation types and varying climatic conditions.

How to Use the Scripts
Prerequisites
Google Earth Engine (GEE) account.
Basic knowledge of JavaScript for GEE scripting.
Steps
Clone the Repository:

git clone https://github.com/your-repository-name
cd your-repository-name

Update Parameters:

Modify the studyArea coordinates in the scripts to match your area of interest.
Update date ranges (startDate, endDate) as needed.
Run in GEE:

Open the script in the GEE code editor.
Execute the script to calculate and export NDVI.
Export Outputs:

The NDVI composite will be exported to Google Drive as a GeoTIFF.
Gap-Filling for Landsat 7
To address SLC-off gaps in Landsat 7 imagery:

Applies a focal_mean filter to fill gaps using neighboring pixels.
Ensures consistent data for time-series analysis.
References
Landsat Collections: USGS Earth Explorer
Google Earth Engine Documentation: GEE Guide
NDVI Calculation: NDVI Overview
Gap-Filling Techniques: Markham et al. (2004), Pringle et al. (2009)
License
This repository is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
We acknowledge the use of Google Earth Engine and Landsat datasets for this project.















