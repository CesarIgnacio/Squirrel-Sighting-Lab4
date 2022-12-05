const postbtn = document.getElementById("post");

const submitSight = () => {
  axios
    .post("http://localhost:3000/report", {
      id: document.getElementById("report").value,
      area: document.getElementById("area").value,
      time: document.getElementById("time").value,
      building: document.getElementById("building").value,
      total: document.getElementById("total").value,
      desc: document.getElementById("desc").value,
      action: document.getElementById("act").value,
    })
    .then(() => {
      alert("Success Inserted");
    });
};
