-- check if it already exist, if so drop to create a new one with the same name
DROP DATABASE IF EXISTS  squirrel_sighting ;
CREATE DATABASE  squirrel_sighting ;
USE  squirrel_sighting ;

-- table holds area of campus-> WQ EQ OC (west quad, east quad, off campus)
CREATE TABLE area_sighted (
	area_id  VARCHAR(2) NOT NULL,
    area_name VARCHAR(50) NOT NULL,
	PRIMARY KEY (area_id)
); 
INSERT INTO  area_sighted  VALUES ('WQ','West Quad' );
INSERT INTO  area_sighted  VALUES ('EQ','East Quad' );
INSERT INTO  area_sighted  VALUES ('OC', 'Off Campus');

-- each sight reported will get an id number, located refers to the area name
-- time refers to when the sighting occured
-- total_seen refers to amount of squirrels that were sighted in that particular report

CREATE TABLE  sight_report  (
    report_id  SMALLINT AUTO_INCREMENT,
    area_id VARCHAR(2) NOT NULL,
    time_sighted  DATETIME NOT NULL,
    PRIMARY KEY (report_id),
    FOREIGN KEY (area_id) REFERENCES area_sighted(area_id)
);
-- table holds specific info on the location of the sighting
-- near what building?
-- Foreign key links to other table 
CREATE TABLE  sight_location  (
    sight_location_id SMALLINT AUTO_INCREMENT,
    report_id SMALLINT,
	area_id VARCHAR(2),
    building  VARCHAR(50) NOT NULL,
    PRIMARY KEY (sight_location_id),
    FOREIGN KEY (report_id) REFERENCES sight_report(report_id),
    FOREIGN KEY (area_id) REFERENCES area_sighted(area_id)
);
-- squirrel description
-- exactly where (on grass, in tree, in trash can, passing by)
CREATE TABLE  squirrel_desc  (
    desc_id SMALLINT AUTO_INCREMENT,
    report_id  SMALLINT,
    total_seen  INT NOT NULL,
    phys_desc VARCHAR(50), -- squirrel description (look)
    squirrel_action  VARCHAR(50),
    PRIMARY KEY (desc_id),
    FOREIGN KEY (report_id) REFERENCES sight_report(report_id)
);