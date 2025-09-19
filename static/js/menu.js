let elements = document.getElementsByName('r');

for (const el of elements) {
    el.addEventListener('click', () => {
        if (el.checked) {
            for (const element of elements) {
                if (element !== el) {
                    element.checked = false;
                }
            }

            const canvas = document.getElementById('canvas');
            drawPlane(canvas, el.value);
        } else {
            el.checked = true;
        }
    })
}

let submitButton = document.getElementById('submit');
submitButton.addEventListener('click', () => {
    let x = document.querySelector('input[name="x"]:checked').value;
    let y = document.querySelector('input[name="y"]').value;
    let r = document.querySelector('input[name="r"]:checked').value.trim();

    if (!validateNumberInString(y)) {
        showTooltip("Введите целое или дробное число!");
    } else {
        let json = sendRequest(x, y, r);

        json
            .then(data => {
                addTableRow(data);
            })
            .catch(err => {
                alert(err)
            })
    }
});

function validateNumberInString(string) {
    return /^[0-9]+([.][0-9]+)?$/.test(string);
}


function showTooltip(text) {
    const tooltip = document.getElementById('tooltip');

    tooltip.textContent = text;
    tooltip.style.display = 'block';

    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 5000);

}

async function sendRequest(x, y, r) {
    const api = 'http://localhost:8080/fcgi-bin/server.jar';
    let response = await fetch(`${api}/calc?x=${x}&y=${y}&r=${r}`);

    if (response.ok) {
        return response.json();
    } else {
        alert(`HTTP Error! ${response.message}`);
    }
}

function addTableRow(data) {

    let x = data.x;
    let y = data.y;
    let r = data.r;
    let res = data.result;
    let time = data.time;
    let currentTime = data.currentTime;

    const table = document.getElementById("results").getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    addCell(row, x);
    addCell(row, y);
    addCell(row, r);
    addCell(row, res);
    addCell(row, time);
    addCell(row, currentTime);
}

function addCell(row, value) {
    const newCell = row.insertCell();
    const newText = document.createTextNode(value);
    newCell.appendChild(newText);
}
