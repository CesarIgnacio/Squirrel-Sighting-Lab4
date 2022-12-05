var express = require("express");
var dotenv = require("dotenv");
var mysql2 = require("mysql2");
var cors = require("cors");
var bodyParser = require("body-parser");
dotenv.config();
var app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//connection
const connection = mysql2.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true, //allow for multiple statements in queries
});
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Contection Worked!");
  }
});
//connected!
/* --------------------------------API ENDPOINTS----------------------------------- */

/*retrieve location of a specific report from the report id, pass the id through int the url inplace of ":report_id"
ex        GET https://localhost:3000/locations/1          this will get the building of report_id 1. */
app.get("/locations/:report_id", (req, res) => {
  //get report location
  const repId = req.params.report_id;
  connection.query(
    "SELECT building FROM sight_location WHERE report_id=?",
    [repId],
    (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
/*retrieve the full sight_locations table
ex        GET https://localhost:3000/locations          this will get the full table */
app.get("/locations", (req, res) => {
  connection.query("SELECT * FROM sight_location", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
/*update the building and sight location, pass the report id through the url in place of ":report_id"
ex        PUT https://localhost:3000/locations/1          this will update the values for the building and sight_location */
app.put("/locations/:report_id", (req, res) => {
  const repId = req.params.report_id;
  const buildingName = req.body.building;
  connection.query(
    "UPDATE sight_location SET building=? WHERE report_id=?",
    [buildingName, repId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Updated building name.");
      }
    }
  );
});
/*retrieve decription of a specific report from the report id, pass the id through int the url inplace of ":report_id"
ex        GET https://localhost:3000/description/1          this will get total, physical description, and action of report_id 1. */
app.get("/description/:report_id", (req, res) => {
  //get report description
  const repId = req.params.report_id;
  connection.query(
    "SELECT total_seen, phys_desc, squirrel_action FROM squirrel_desc WHERE report_id=?",
    [repId],
    (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
/*retrieve all the data from the squirrel_description table
ex        GET https://localhost:3000/description         this will get the full squirrel_description*/
app.get("/description", (req, res) => {
  connection.query("SELECT * FROM squirrel_desc", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
/*update the physical description, amount of squirrels seen, and the recorded actions of the squirrels, pass the report id through the url in place of ":report_id"
ex        PUT https://localhost:3000/description/1          this will update the values for the squirrel_description table*/
app.put("/description/:report_id", (req, res) => {
  const repId = req.params.report_id;
  const phys_desc = req.body.phys_desc;
  const total_seen = req.body.total_seen;
  const squirrel_action = req.body.squirrel_action;
  connection.query(
    "UPDATE squirrel_desc SET total_seen=?, phys_desc=?, squirrel_action=? WHERE report_id=?",
    [total_seen, phys_desc, squirrel_action, repId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Description of squirrel updated.");
      }
    }
  );
});
/*retrieve all the values from the sight_report table
ex        GET https://localhost:3000/timeandplace         this will get the full sight_report table*/
app.get("/timeandplace", (req, res) => {
  connection.query("SELECT * FROM sight_report", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
/*retrieve specific times and areas from the sight_report table, pass the id through int the url inplace of ":report_id"
ex        GET https://localhost:3000/timeandplace/1         this will get the area and time of the sighting associated with the report_id of 1. */
app.get("/timeandplace/:report_id", (req, res) => {
  const repId = req.params.report_id;
  connection.query(
    "SELECT area_id, time_sighted FROM sight_report WHERE report_id=?",
    repId,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
/*update the area and time on the sight_report table, pass the report id through the url in place of ":report_id"
ex        PUT https://localhost:3000/timeandplace/1        this will update the area and the time associated with the report_id of 1*/
app.put("/timeandplace/:report_id", (req, res) => {
  const repId = req.params.report_id;
  const area_id = req.body.area_id;
  const time_sighted = req.body.time_sighted;
  connection.query(
    "UPDATE sight_report SET area_id=?, time_sighted=? WHERE report_id=?",
    [area_id, time_sighted, repId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Area and time of sighting has been updated.");
      }
    }
  );
});
/*delete all data from all tables, remove children first
ex        DELETE https://localhost:3000/clear   */
app.delete("/clear", (req, res) => {
  connection.query(
    "DELETE FROM sight_location; DELETE FROM squirrel_desc; DELETE FROM sight_report",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
/*delete a single record from all tables, pass the report id through the url in place of ":report_id"
ex        DELETE https://localhost:3000/clear/1      this will delete the records associated with the report_id of 1*/
app.delete("/clear/:report_id", (req, res) => {
  const repId = req.params.report_id;
  connection.query(
    "DELETE FROM sight_location WHERE report_id=?; DELETE FROM squirrel_desc WHERE report_id=?; DELETE FROM sight_report WHERE report_id=?",
    [repId, repId, repId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Record deleted.");
      }
    }
  );
});
//posting/adding data
/* JSON array for testing
    put it in the body, raw, json POSTMAN
    {
        "id": 1
        "area": "WQ",
        "time": "2019-04-07 12:54:50",
        "building": "James Hall",
        "total": 3,
        "desc": "gray and small",
        "action": "roaming around"
    }
*/
/*populate the database
this will add to sight report (?,?) , location (?,?,?), and description (?,?,?,?) tables 
    area    time
    id      area        building
    id      total       desc        action
    
ex        POST https://localhost:3000/report   */
app.post("/report", (req, res) => {
  const id = req.body.id;
  const area = req.body.area;
  const time = req.body.time;
  const building = req.body.building;
  const total = req.body.total;
  const desc = req.body.desc;
  const action = req.body.action;
  //DEBUG console.log(area+"\n"+time+"\n"+building+"\n"+total+"\n"+desc+"\n"+action)
  connection.query(
    "INSERT INTO sight_report(report_id,area_id,time_sighted) VALUES (?,?,?);INSERT INTO sight_location(report_id,area_id,building) VALUES (?,?,?);INSERT INTO squirrel_desc(report_id,total_seen,phys_desc,squirrel_action) VALUES (?,?,?,?)",
    [id, area, time, id, area, building, id, total, desc, action],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("working!");
  }
});
