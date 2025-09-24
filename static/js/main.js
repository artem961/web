const canvas = document.getElementById('canvas');
const canvasController = new CanvasController(canvas);

let plane = new Plane(canvasController, 1);
plane.initObjects();
canvasController.updateFrame();

let elements = document.getElementsByName('r');

for (const el of elements) {
    el.addEventListener('click', () => {
        /*
            for (const element of elements) {
                if (element !== el) {
                    element.checked = false;
                }
            }

         */
            plane.switchLabels(el.value);
    })
}
