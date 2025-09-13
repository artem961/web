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
        }
    })
}

let submitButton = document.getElementById('submit');
submitButton.addEventListener('click', () => {
    console.log(submitButton.value);
});