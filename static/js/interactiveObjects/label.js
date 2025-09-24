class LabelObject extends InteractiveObject {
    constructor(canvas, position, text) {
        super(canvas);

        this.position = position;
        this.text = text;
        this.textColor = 'rgba(0,0,0,1)'

        this.animationTime = 200;
        this.distance = 4.9;
        this.fadeOut = true;
    }

    draw() {
        this.context.fillStyle = this.textColor;
        this.context.font = '18px Arial';

        let label = new Label(this.position, this.text);
        label.draw(this.context);
    }

    animate() {
        if (!this.supportsAnimation) {
            return;
        }
        if (this.animationStarted && this.progress >= 1) {
            this.animationStarted = false;
            this.position = this.tmpPosition;
            this.requestFrameUpdate = false;
            return;
        }

        if (this.animationStarted) {
            const time = Date.now();
            this.progress = Math.min((time - this.startTime) / this.animationTime, 1);
            this.position.y = this.tmpPosition.y + (this.distance * this.progress);

            this.textColor = `rgba(0,0,0,${this.fadeOut ? 0.8 - this.progress : 0.3 + this.progress})`;
            this.requestFrameUpdate = true;
        } else {
            this.tmpPosition = this.position;
            this.startTime = Date.now();
            this.progress = 0;
            this.animationStarted = true;
        }
    }
}