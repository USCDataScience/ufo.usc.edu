# UFO Data Insights

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-gh--pages-green)](https://github.com/USCDataScience/ufo.usc.edu)

A static demo site hosting dozens of interactive **D3.js** visualizations of UFO sighting data. Originally developed by students in USC Data Science courses (primarily **DSCI 550 / CSCI 599 Spring 2018**) under the direction of Dr. Chris Mattmann as part of the [USC Information Retrieval and Data Science (IRDS) Group](http://irds.usc.edu/).

The site demonstrates data collection, enrichment (joining public datasets, OCR on British MoD files, deep learning for image captioning/object recognition via Apache Tika + TensorFlow), similarity analysis (Tika-Similarity), and rich client-side visualization — all made fully self-contained for easy deployment and local viewing.

## Live Sites
- http://www.usc.edu/ufodata
- http://irds.usc.edu/ufo.usc.edu/
- GitHub Pages mirror (this repo)

## Quick Start (Local)
```bash
# From the repo root
python3 -m http.server

# Then open http://localhost:8000/
# or http://localhost:8000/html/d3-examples.html for the full gallery
```

No build step, no external dependencies, no servers required. All data is vendored or synthetic where original backends (Solr/ES) were used.

## Project Structure
- `index.html` — Main landing page (About, Insights, Partners, Search/Explore sections)
- `html/d3-examples.html` — Central gallery listing all team visualizations with thumbnails and descriptions
- `html/team_*.html` + `teams/team_*/` — Individual team hubs (consistent top navbar + cards linking to visualizations)
- `CS599_group_8_final_assignment/` — Complete Team 8 (Spring 2018 DATAVIS) submission with its own dashboard-style gallery
- `html/`, `js/`, `css/`, `images/`, `Data/`, `data_files/` — Shared assets, D3 libraries (vendored), and data
- `visualizations/`, `d3-visualizations/` — Additional standalone examples

Many teams originally relied on dynamic backends. These have been converted to static/synthetic data (JSON/CSV) so everything works reliably from a plain HTTP server.

## Key Features & Student Work
- **Data Enrichment (HW1/HW2 style)**: Joining UFO sightings with airports, population, weather, etc. + OCR on British UFO files + image analysis with Tika + Inception models.
- **Similarity & Clustering**: Tika-Similarity (Jaccard, cosine, edit distance), dendrograms, circle packing.
- **Interactive D3 Visualizations**: Maps (choropleth, dot), timelines, word clouds, gauges, bubbles, circos, radar, heatmaps, image similarity search (MEMEX ImageSpace/ImageCat), Solr-backed dynamic views (now static), and more.
- **Consistent Branding**: USC/IRDS top navbar on all team pages (Home → `/index.html#page-top`, About, Insights, Search, Partners). Iframe loading pattern used on complex hubs so the outer nav is never lost.
- **Self-Contained Demo**: Absolute paths, vendored d3.v3/v4 + topojson, no CDNs, works offline after `python -m http.server`.

## Team Contributions (Spring 2018 + later semesters)
- **Team 2**: World map with year filtering + temporal/sci-fi/meteorite viz
- **Team 3**: US/UK maps (airports + meteorites), scatter, dendro, shapes, word clouds, etc.
- **Team 4 (2018 & 2021)**: Population bars, military, shapes, density maps, bubble maps, time bars, word clouds, sunburst
- **Team 5**: State maps, time series, gauges, shape donuts, environmental/literacy correlations
- **Team 6**: Choropleths, shape pies/bars, airport distances, heatmaps, word clouds, state bubbles, climate scatters, elevation dashboard, dynamic bullets
- **Team 7**: Smog gauges, duration, shape pies/connections, aerial/events, airport distances, word clouds, US maps
- **Team 8**: Pop culture influence, severe weather, OCR retention (British files), NER, word clouds, sighting date circos, airbase radar, population, Tika vision bubbles (full dashboard gallery)
- **Team 10**: Word clouds (objects/descriptions/captions), airport/meteor correlations, date diffs, state maps, movie impacts, yearly trends, dynamic Solr
- **Team 11**: Chords, heatmaps, word trends, 3D shapes, world/US maps, population/marijuana/airport state correlations, image classification
- **Team 12**: Global distributions, air pollution, airports, population, cancer incidences, shapes/states, top cities, word clouds, world map

(Teams 1, 9, and 13 did not submit complete work and are omitted from the gallery.)

## Credits
- **Dr. Chris Mattmann** — http://mattmann.ai
- Student teams from DSCI 550 / CSCI 599 (Spring 2018 and subsequent semesters)
- USC Information Retrieval and Data Science Group (IRDS) — http://irds.usc.edu/
- Tools & libraries: Apache Tika, Tesseract, TensorFlow/Inception (via Tika dockers), D3.js, MEMEX ImageCat + ImageSpace, Solr/Elasticsearch (originally), FLANN, SMQTK, etc.
- Original data sources: UFO-Awesome corpus (example: https://www.kaggle.com/datasets/camnugent/ufo-sightings-around-the-world), UFO Stalker (https://ufostalker.com/), British MoD UFO files

## License
Apache License 2.0 (see [LICENSE](LICENSE))

## Contributing / History
This repository aggregates and maintains student work from multiple semesters. All visualizations have been made self-contained, paths normalized for GitHub Pages + local `http.server`, consistent navigation added, and non-functional dynamic features replaced with synthetic data so the entire demo "just works."

Pull requests and issues welcome for fixes, new visualizations, or documentation improvements.

---

*Maintained by the USC Data Science Group. Questions? Contact the IRDS team.*