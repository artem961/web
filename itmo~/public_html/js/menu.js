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
    }


});

function validateNumberInString(string) {
    return /^[0-9]+([.|,][0-9]+)?$/.test(string);
}


function showTooltip(text) {
    const tooltip = document.getElementById('tooltip');

    tooltip.textContent = text;
    tooltip.style.display = 'block';

    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 5000);

}