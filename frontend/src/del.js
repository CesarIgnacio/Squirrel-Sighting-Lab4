function getDelete() {
  if (document.getElementById("det").value == "abc") {
    document.getElementById("delete").style.display = "block";
    document.getElementById("para").style.display = "block";
  }
}

const deleteId = () => {
  const url =
    "http://localhost:3000/clear/" + document.getElementById("det").value;
  axios.delete(url).then(() => {
    alert("Success Removed");
  });
};
