const getDesc = () => {
  axios.get("http://localhost:3000/description").then((response) => {
    showDes(response.data);
  });
};

const getDescid = () => {
  const url =
    "http://localhost:3000/description/" + document.getElementById("rep").value;
  if (url === "http://localhost:3000/description/") {
    document.getElementById("phys").value = "";
    document.getElementById("seen").value = "";
    document.getElementById("acts").value = "";
  } else {
    axios.get(url).then((response) => {
      var data = response.data;
      data.forEach((ele) => {
        document.getElementById("phys").value = ele.phys_desc;
        document.getElementById("seen").value = ele.total_seen;
        document.getElementById("acts").value = ele.squirrel_action;
      });
    });
  }
};

const uptDesc = () => {
  const url =
    "http://localhost:3000/description/" + document.getElementById("rep").value;
  axios.put(url, {
    phys_desc: document.getElementById("phys").value,
    total_seen: document.getElementById("seen").value,
    squirrel_action: document.getElementById("acts").value,
  });
  document.getElementById("phys").value = "";
  document.getElementById("rep").value = "";
  document.getElementById("seen").value = "";
  document.getElementById("acts").value = "";
};

function showDes(data) {
  let tab = `<tr>
		<th>DescID</th>
		<th>ReportID</th>
		<th>TotalSeen</th>
    <th>Physical</th>
    <th>Action</th>
		</tr>`;

  // Loop to access all rows
  data.forEach((ele) => {
    tab += `<tr>
        <td>${ele.desc_id} </td>
        <td>${ele.report_id}</td>
        <td>${ele.total_seen}</td>
        <td>${ele.phys_desc}</td>
        <td>${ele.squirrel_action}</td>
    </tr>`;
  });
  document.getElementById("deco").innerHTML = tab;
}
