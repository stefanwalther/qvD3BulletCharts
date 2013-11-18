// ------------------------------------------------------------------
// Basic table Rendering
// ------------------------------------------------------------------
// extElement = _this
function renderTable(extElement) {

    var createClickHandler =
            function (rowIndex) {
                return function () {
                    extElement.Data.SelectRow(rowIndex);
                };
            };

    // Data.SelectValuesInColumn(columnIdx, values, toggle, isFinal)
    var createClickHandler2 =
        function (colIdx, values) {
            return function () {
                extElement.Data.SelectTextsInColumn(colIdx, true, values)
            }
        }

    while (extElement.Element.firstChild) extElement.Element.removeChild(extElement.Element.firstChild);
    var mytable = document.createElement("table");
    mytable.style.width = "100%";
    var noCols = extElement.Data.HeaderRows[0].length;
    var tablebody = document.createElement("tbody");
    for (var r = 0; r < extElement.Data.HeaderRows.length; r++) {
        var row = document.createElement("tr");
        for (var c = 0; c < noCols; c++) {
            var cell = document.createElement("td");
            cell.innerHTML = extElement.Data.HeaderRows[r][c].text;
            row.appendChild(cell);
        }
        tablebody.appendChild(row);
    }
    for (var r = 0; r < extElement.Data.Rows.length; r++) {
        var row = document.createElement("tr");
        for (var c = 0; c < noCols; c++) {
            var cell = document.createElement("td");

            var cellValue = extElement.Data.Rows[r][c].text;
            cell.innerHTML = cellValue;
            //cell.innerHTML = extElement.Data.Rows[r][c].text;

            //cell.onclick = createClickHandler(r);
            cell.onclick = createClickHandler2(c, cellValue);

            row.appendChild(cell);
        }
        tablebody.appendChild(row);
    }
    mytable.appendChild(tablebody);
    extElement.Element.appendChild(mytable);
}