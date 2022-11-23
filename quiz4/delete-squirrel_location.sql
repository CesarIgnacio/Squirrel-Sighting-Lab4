-- Delete sight_location
USE squirrel_sighting;
SELECT *;
DELETE FROM sight_location
WHERE area_id="OC" AND (building!="Student Center" AND building!="Tanger Hillel House");