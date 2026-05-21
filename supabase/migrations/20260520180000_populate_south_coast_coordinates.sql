-- Populate south coast areas with geocoded centroids and radii.
--
-- Sources:
--   - scripts/geocode-south-coast.mjs (commit 8427a68) — geocoded 35 areas via Google Maps Geocoding API
--   - scripts/output/south_coast_coordinates.csv (gitignored) — script output, founder-reviewed via Cowork
--
-- Manual overrides (geocoder_type=manual in CSV):
--   - south-coast (parent): radius 70000m override
--   - midigama: Google returned wrong town inland
--   - hiriketiya: Google returned wrong Hiriketiya near Kalutara
--
-- The CHECK constraint on areas enforces (center IS NOT NULL AND radius_m IS NOT NULL)
-- OR (center IS NULL AND radius_m IS NULL). Every UPDATE here sets both columns.
--
-- Migration is idempotent: plain UPDATE statements keyed on slug.

-- parent.
update areas
set center = extensions.st_makepoint(80.42, 5.97)::extensions.geography,
    radius_m = 70000
where slug = 'south-coast';

-- galle district — western half (west to east).
update areas
set center = extensions.st_makepoint(79.98414369999999, 6.475923499999999)::extensions.geography,
    radius_m = 2500
where slug = 'beruwala';

update areas
set center = extensions.st_makepoint(80.0289158, 6.33847)::extensions.geography,
    radius_m = 2500
where slug = 'kosgoda';

update areas
set center = extensions.st_makepoint(80.0409178, 6.313277600000001)::extensions.geography,
    radius_m = 2500
where slug = 'ahungalla';

update areas
set center = extensions.st_makepoint(80.0403047, 6.2783546)::extensions.geography,
    radius_m = 2500
where slug = 'balapitiya';

update areas
set center = extensions.st_makepoint(80.002455, 6.4187604)::extensions.geography,
    radius_m = 2500
where slug = 'bentota';

update areas
set center = extensions.st_makepoint(80.0590804, 6.2441521)::extensions.geography,
    radius_m = 2500
where slug = 'ambalangoda';

update areas
set center = extensions.st_makepoint(80.1090375, 6.1396164)::extensions.geography,
    radius_m = 2500
where slug = 'hikkaduwa';

update areas
set center = extensions.st_makepoint(80.24188989999999, 6.021239599999999)::extensions.geography,
    radius_m = 1500
where slug = 'rumassala';

update areas
set center = extensions.st_makepoint(80.2167912, 6.032894799999999)::extensions.geography,
    radius_m = 2500
where slug = 'galle';

update areas
set center = extensions.st_makepoint(80.2488596, 6.017446899999999)::extensions.geography,
    radius_m = 2500
where slug = 'unawatuna';

update areas
set center = extensions.st_makepoint(80.2593131, 6.0039238)::extensions.geography,
    radius_m = 1500
where slug = 'dalawella';

update areas
set center = extensions.st_makepoint(80.2781262, 6.0009954)::extensions.geography,
    radius_m = 2500
where slug = 'thalpe-habaraduwa';

update areas
set center = extensions.st_makepoint(80.3352364, 6.000704)::extensions.geography,
    radius_m = 2500
where slug = 'koggala';

update areas
set center = extensions.st_makepoint(80.36215949999999, 5.973974699999999)::extensions.geography,
    radius_m = 2500
where slug = 'ahangama';

update areas
set center = extensions.st_makepoint(80.3925, 5.9742)::extensions.geography,
    radius_m = 2500
where slug = 'midigama';

-- matara district (west to east).
update areas
set center = extensions.st_makepoint(80.4293545, 5.973710899999999)::extensions.geography,
    radius_m = 2500
where slug = 'weligama';

update areas
set center = extensions.st_makepoint(80.4715866, 5.948262)::extensions.geography,
    radius_m = 2500
where slug = 'mirissa';

update areas
set center = extensions.st_makepoint(80.5158699, 5.9361336)::extensions.geography,
    radius_m = 800
where slug = 'madiha';

update areas
set center = extensions.st_makepoint(80.5257863, 5.9400607)::extensions.geography,
    radius_m = 1500
where slug = 'polhena';

update areas
set center = extensions.st_makepoint(80.54685289999999, 5.9496309)::extensions.geography,
    radius_m = 2500
where slug = 'matara';

update areas
set center = extensions.st_makepoint(80.5892815, 5.928180299999999)::extensions.geography,
    radius_m = 2500
where slug = 'devundara';

update areas
set center = extensions.st_makepoint(80.62436629999999, 5.9534956)::extensions.geography,
    radius_m = 2500
where slug = 'talalla';

update areas
set center = extensions.st_makepoint(80.69863169999999, 5.9768617)::extensions.geography,
    radius_m = 2500
where slug = 'dickwella';

update areas
set center = extensions.st_makepoint(80.7028, 5.9614)::extensions.geography,
    radius_m = 800
where slug = 'hiriketiya';

-- hambantota district — eastern half (west to east, terminating at mattala).
update areas
set center = extensions.st_makepoint(80.7805868, 6.0091578)::extensions.geography,
    radius_m = 800
where slug = 'goyambokka';

update areas
set center = extensions.st_makepoint(80.794658, 6.028548799999999)::extensions.geography,
    radius_m = 2500
where slug = 'tangalle';

update areas
set center = extensions.st_makepoint(80.8516173, 6.0514652)::extensions.geography,
    radius_m = 1500
where slug = 'rekawa';

update areas
set center = extensions.st_makepoint(80.93736229999999, 6.092186)::extensions.geography,
    radius_m = 2500
where slug = 'kalametiya';

update areas
set center = extensions.st_makepoint(81.124773, 6.125941399999999)::extensions.geography,
    radius_m = 2500
where slug = 'hambantota';

update areas
set center = extensions.st_makepoint(81.2408689, 6.1969138)::extensions.geography,
    radius_m = 1500
where slug = 'bundala';

update areas
set center = extensions.st_makepoint(81.229209, 6.2421494)::extensions.geography,
    radius_m = 2500
where slug = 'weerawila';

update areas
set center = extensions.st_makepoint(81.28603149999999, 6.277565999999999)::extensions.geography,
    radius_m = 2500
where slug = 'tissamaharama';

update areas
set center = extensions.st_makepoint(81.47188469999999, 6.463961299999999)::extensions.geography,
    radius_m = 800
where slug = 'yala';

update areas
set center = extensions.st_makepoint(81.11409119999999, 6.305154300000001)::extensions.geography,
    radius_m = 2500
where slug = 'mattala';
