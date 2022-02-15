export class Doodle{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.vx = 5;
        this.vy = 0;
        this.width = width;
        this.height = height;
        this.color = color;
    };

    draw(ctx){
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.x + 10, this.y);
        ctx.lineTo(this.x + 10, this.y - 15);
        ctx.moveTo(this.x + 40, this.y);
        ctx.lineTo(this.x + 40, this.y - 15);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "#145A32";
        ctx.moveTo(this.x + 10, this.y - 15);
        ctx.arc(this.x + 10, this.y - 15, 5, 0, Math.PI * 2, true);
        ctx.moveTo(this.x + 40, this.y - 15);
        ctx.arc(this.x + 40, this.y - 15, 5, 0, Math.PI * 2, true)
        ctx.fill();

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
};

export class Platform{
    constructor(numPlatform){
        this.width = 100;
        this.height = 15;
        this.color = '#616A6B'
        this.numPlatform = numPlatform;
        this.platformPositions = [];
    };

    randomPositions(incrementY){
        return [
            Math.floor(Math.random() * (canvas.width - 100)),
            100 + incrementY * (canvas.height / this.numPlatform)
        ]
    }

    createPlatform(ctx){
        for(let i = 0; i < this.numPlatform; i++){
            let [x, y] = this.randomPositions(i)
            this.platformPositions.push(
                [x, y]
            );
            ctx.fillStyle = this.color;
            ctx.fillRect(x, y, this.width, this.height);
        }
    };
};
