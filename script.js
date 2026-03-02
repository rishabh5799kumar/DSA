const tableBody = document.querySelector("#dsaTable tbody");
const totalCount = document.getElementById("totalCount");
const searchInput = document.getElementById("searchInput");

let problems = [];

Papa.parse("data.csv", {
    download: true,
    header: true,
    complete: function(results) {
        problems = results.data.filter(row => row.Topic);
        renderTable(problems);
        totalCount.innerText = `Total Problems Solved: ${problems.length}`;
    }
});

function renderTable(data) {
    tableBody.innerHTML = "";

    data.forEach(row => {
        const tr = document.createElement("tr");

        let difficultyClass = row.Difficulty.toLowerCase();

        tr.innerHTML = `
            <td>${row.Topic}</td>
            <td class="${difficultyClass}">${row.Difficulty}</td>
            <td>${row.Problem}</td>
            <td>${row.Platform}</td>
            <td><a href="${row.Link}" target="_blank">View</a></td>
        `;

        tableBody.appendChild(tr);
    });
}

searchInput.addEventListener("keyup", function() {
    const value = this.value.toLowerCase();
    const filtered = problems.filter(row =>
        row.Problem.toLowerCase().includes(value) ||
        row.Topic.toLowerCase().includes(value)
    );
    renderTable(filtered);
});