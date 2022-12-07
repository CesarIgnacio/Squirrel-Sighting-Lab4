const getTime = () => {
  axios.get("http://localhost:3000/timeandplace").then((response) => {
    showTime(response.data);
    tab();
  });
};

const getTimeid = () => {
  const url =
    "http://localhost:3000/timeandplace/" +
    document.getElementById("rep").value;
  if (url === "http://localhost:3000/timeandplace/") {
    document.getElementById("area").value = "";
    document.getElementById("time").value = "";
  } else {
    axios.get(url).then((response) => {
      var data = response.data;
      data.forEach((ele) => {
        document.getElementById("area").value = ele.area_id;
        document.getElementById("time").value = ele.time_sighted.replace(
          ".000Z",
          ""
        );
      });
    });
  }
};

function showTime(data) {
  let tab = `<tr>
		<th>ReportID</th>
		<th>AreaID</th>
		<th>TimeSighted</th>
		</tr>`;

  // Loop to access all rows
  data.forEach((ele) => {
    tab += `<tr>
        <td>${ele.report_id}</td>
        <td>${ele.area_id}</td>
        <td>${ele.time_sighted.replace(".000Z", "")}</td>
    </tr>`;
  });
  document.getElementById("timeTable").innerHTML = tab;
}

const uptTime = () => {
  const url =
    "http://localhost:3000/timeandplace/" +
    document.getElementById("rep").value;
  axios.put(url, {
    area_id: document.getElementById("area").value,
    time_sighted: document.getElementById("time").value,
  });
  document.getElementById("time").value = "";
  document.getElementById("area").value = "";
  document.getElementById("rep").value = "";
};

function tab() {
  const style = document.createElement("style");
  style.innerHTML = `
  table,
  th,
  td {
    border: 2px solid;
  }
      `;
  document.head.appendChild(style);
}
