let totalPemakaian = 0;

document.getElementById("role").addEventListener("change", function () {
  document
    .getElementById("passwordField")
    .classList.toggle("hidden", this.value !== "admin");
});

// Login Form submission
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let role = document.getElementById("role").value;
    let name = document.getElementById("name").value.trim();
    let password = document.getElementById("password").value;

    if (!name) {
      alert("Nama tidak boleh kosong!");
      return;
    }
    if (role === "admin" && password !== "admin123") {
      alert("Kata sandi salah!");
      return;
    }

    localStorage.setItem("userRole", role);
    localStorage.setItem("userName", name);
    document.getElementById("loginContainer").classList.add("hidden");

    if (role === "admin") {
      document.getElementById("bbmContainer").classList.remove("hidden");
    }
    document.getElementById("dataContainer").classList.remove("hidden");
  });

// BBM Form submission
document.getElementById("bbmForm").addEventListener("submit", function (event) {
  event.preventDefault();
  let tanggal = document.getElementById("tanggal").value;
  let pemakaian = parseFloat(document.getElementById("pemakaian").value);
  let jenis = document.getElementById("jenis").value;
  let kendaraan = document.getElementById("kendaraan").value;

  let tableBody = document.getElementById("dataBody");
  let row = tableBody.insertRow();
  row.innerHTML = `
        <td>${tanggal}</td>
        <td>${pemakaian} L</td>
        <td>${jenis}</td>
        <td>${kendaraan}</td>
        <td><button class="delete-btn" onclick="deleteRow(this)">Hapus</button></td>
    `;

  totalPemakaian += pemakaian;
  document.getElementById(
    "totalPemakaian"
  ).textContent = `Total Pemakaian: ${totalPemakaian} L`;

  document.getElementById("bbmForm").reset();
});

// Delete row function
function deleteRow(button) {
  let row = button.closest("tr");
  let pemakaian = parseFloat(row.cells[1].textContent.replace(" L", ""));
  totalPemakaian -= pemakaian;
  document.getElementById(
    "totalPemakaian"
  ).textContent = `Total Pemakaian: ${totalPemakaian} L`;
  row.remove();
}
