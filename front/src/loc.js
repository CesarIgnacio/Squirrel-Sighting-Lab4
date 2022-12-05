const getLocation = () => {
  axios.get("http://localhost:3000/locations").then((response) => {
    show(response.data);
  });
};

const getLocid = () => {
  const url =
    "http://localhost:3000/locations/" + document.getElementById("rep").value;
  if (url === "http://localhost:3000/locations/") {
    document.getElementById("bud").value = "";
  } else {
    axios.get(url).then((response) => {
      var data = response.data;
      data.forEach((ele) => {
        document.getElementById("bud").value = ele.building;
      });
    });
  }
};

function show(data) {
  let tab = `<tr>
		<th>SightLocID</th>
		<th>ReportID</th>
		<th>AreaID</th>
		<th>Building</th>
		</tr>`;

  // Loop to access all rows
  data.forEach((ele) => {
    tab += `<tr>
        <td>${ele.sight_location_id} </td>
        <td>${ele.report_id}</td>
        <td>${ele.area_id}</td>
        <td>${ele.building}</td>
    </tr>`;
  });
  document.getElementById("tabel").innerHTML = tab;
}

const uptLoc = () => {
  const url =
    "http://localhost:3000/locations/" + document.getElementById("rep").value;
  axios.put(url, {
    building: document.getElementById("bud").value,
  });
  document.getElementById("bud").value = "";
  document.getElementById("rep").value = "";
};
