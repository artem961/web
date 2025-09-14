let elements = document.getElementsByName('r');

for (const el of elements) {
    el.addEventListener('click', () => {
        if (el.checked) {
            for(const element of elements) {
                if (element !== el){
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

    console.log(x, y, r);

});

function validateNumberInString(string) {
    return /^[0-9]+([.|,][0-9]+)?$/.test(string);
}