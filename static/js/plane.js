class Plane {
    constructor(canvas, R) {
        this.context = canvas.getContext('2d');
        this.R = R;

        this.gridColor = '#D0D0D0';
        this.axisColor = '#000000';
        this.zoneColor = 'rgba(73,103,200,0.5)';
        this.textColor = '#000000';

        this.width = canvas.width;
        this.height = canvas.height;
        this.hWidth = canvas.width / 2;
        this.hHeight = canvas.height / 2;

        this.widthR = canvas.width/3;
        this.heightR = canvas.height/3;
    }

    drawGrid() {
        this.context.strokeStyle = this.gridColor;

        for (let x = 0; x < this.hWidth; x += this.hWidth / 6) {
            let line = new Line(
                new Position(x, this.height),
                new Position(x, -this.height));

            let lineSym = new Line(
                new Position(-x, this.height),
                new Position(-x, -this.height));

            line.draw(this.context);
            lineSym.draw(this.context);
        }

        for (let y = 0; y < this.hHeight; y += this.hWidth / 6) {
            let line = new Line(
                new Position(this.width, y),
                new Position(-this.width, y));

            let lineSym = new Line(
                new Position(this.width, -y),
                new Position(-this.width, -y));

            line.draw(this.context);
            lineSym.draw(this.context);
        }
    }

    drawAxis() {
        this.context.strokeStyle = this.axisColor;

        let lineY = new Line(
            new Position(0, -this.height),
            new Position(0, this.height)
        );
        let lineX = new Line(
            new Position(-this.width, 0),
            new Position(this.width, 0)
        );

        lineX.draw(this.context);
        lineY.draw(this.context);
        this._drawArrows();
    }

    _drawArrows() {
        this.context.fillStyle = this.axisColor;

        let topArrow = new Polygon([
            new Position(0, this.hHeight),
            new Position(5, this.hHeight - 10),
            new Position(-5, this.hHeight - 10)]);

        let rightArrow = new Polygon([
            new Position(this.hWidth, 0),
            new Position(this.hWidth - 10, -5),
            new Position(this.hWidth - 10, 5)]);

        topArrow.draw(this.context);
        rightArrow.draw(this.context);
    }

    drawZones() {
        let R = this.R;
        this.context.fillStyle = this.zoneColor;

        let rectangle = new Polygon([
            new Position(0, 0),
            new Position(0, this.heightR / 2),
            new Position(this.widthR, this.heightR / 2),
            new Position(this.widthR, 0)
        ]);

        let triangle = new Polygon([
            new Position(0, 0),
            new Position(-this.widthR / 2, 0),
            new Position(0, -this.heightR)
        ]);

        let sector = new Sector(new Position(0, 0), this.widthR);

        rectangle.draw(this.context);
        triangle.draw(this.context);
        sector.draw(this.context, 0, Math.PI / 2);
    }

    drawLabels() {
        let R = this.R;
        let wR = this.widthR;
        let hR = this.heightR;
        let shift = 10;
        this.context.fillStyle = this.textColor;
        this.context.font = '18px Arial';

        let labels = [
            new Label(new Position(shift, hR), String(R)),
            new Label(new Position(shift, -hR), String(-R)),
            new Label(new Position(shift, hR / 2), String(R / 2)),
            new Label(new Position(shift, -hR / 2), String(-R / 2)),
            new Label(new Position(wR, shift), String(R)),
            new Label(new Position(-wR, shift), String(-R)),
            new Label(new Position(wR / 2, shift), String(R / 2)),
            new Label(new Position(-wR / 2, shift), String(-R / 2)),
        ];

        wR = this.widthR;
        hR = this.heightR;

        shift = shift - 4;

        let dashes = [
            new Line(new Position(-shift, hR), new Position(shift, hR)),
            new Line(new Position(-shift, -hR), new Position(shift, -hR)),
            new Line(new Position(wR, shift), new Position(wR, -shift)),
            new Line(new Position(-wR, shift), new Position(-wR, -shift)),
            new Line(new Position(-shift, hR/2), new Position(shift, hR/2)),
            new Line(new Position(-shift, -hR/2), new Position(shift, -hR/2)),
            new Line(new Position(wR/2, shift), new Position(wR/2, -shift)),
            new Line(new Position(-wR/2, shift), new Position(-wR/2, -shift)),
        ]

        labels.forEach(label => {
            label.draw(this.context);
        });

        dashes.forEach(dashe => {
            dashe.draw(this.context);
        })
    }

    clearCanvas() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function drawPlane(canvas, radius) {
    let plane = new Plane(canvas, radius);

    plane.clearCanvas();
    plane.drawGrid();
    plane.drawZones();
    plane.drawAxis();
    plane.drawLabels();
}