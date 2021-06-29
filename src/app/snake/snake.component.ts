import {
    Component,
    AfterViewInit,
    HostListener
} from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'

const SNAKE_START_POSITION = [
    {
        x: 200,
        y: 200
    }, {
        x: 190,
        y: 200
    }, {
        x: 180,
        y: 200
    }, {
        x: 170,
        y: 200
    }, {
        x: 160,
        y: 200
    }
];

@Component({ selector: 'app-snake', templateUrl: './snake.component.html', styleUrls: ['./snake.component.scss'] })
export class SnakeComponent implements AfterViewInit {
    @HostListener('document:keydown', ['$event'])
    changeDirection(event: KeyboardEvent) {
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;

        const keyPressed = event.keyCode;
        const goingUp = this.dy === -10;
        const goingDown = this.dy === 10;
        const goingRight = this.dx === 10;
        const goingLeft = this.dx === -10;

        if (keyPressed === LEFT_KEY && !goingRight) {
            this.dx = -10;
            this.dy = 0;
        } else if (keyPressed === UP_KEY && !goingDown) {
            this.dx = 0;
            this.dy = -10;
        } else if (keyPressed === RIGHT_KEY && !goingLeft) {
            this.dx = 10;
            this.dy = 0;
        } else if (keyPressed === DOWN_KEY && !goingUp) {
            this.dx = 0;
            this.dy = 10;
        }
    }

    private canvas;

    public board_border = '#102443';
    public board_background = "#102443";
    public snake_col = '#e1f1f1';
    public snake_border = 'darkblue';

    public showOverlay: boolean = true;
    public countdown: string = "";
    public replay: boolean = false;

    private context: CanvasRenderingContext2D;

    public food_x;
    public food_y;
    // Horizontal velocity
    public dx = 10;
    // Vertical velocity
    public dy = 0;

    public score: number = 0;

    public snake = [...SNAKE_START_POSITION];


    ngAfterViewInit() {
        // Return a two dimensional drawing context
        this.canvas = document.getElementById("snakeboard") as HTMLCanvasElement;

        this.context = this.canvas.getContext('2d');

        this.startPlay();
    }

    public startPlay(): void {
        this.score = 0;
        this.snake = [...SNAKE_START_POSITION];
        this.dy = 0;
        this.dx = 10;

        this.replay = false;

        this.clearCanvas();
        this.drawSnake();

        this.feedSnake();

        let countdown;

        countdown = interval(1000).pipe(
            map((x) => {
                const timer = 3 - x;

                if (timer === 0) {
                    this.countdown = 'Go!';
                } else if (timer < 0) { 
                    this.countdown = '';
                    countdown.unsubscribe();
                    this.showOverlay = false;
                    this.startGame();
                } else {
                    this.countdown = `${3 - x}`;
                }
            })
        ).subscribe();
    }

    // draw a border around the canvas
    private clearCanvas(): void {
        //  Select the colour to fill the drawing
        this.context.fillStyle = this.board_background;
        //  Select the colour for the border of the canvas
        this.context.strokeStyle = this.board_border;
        // Draw a "filled" rectangle to cover the entire canvas
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw a "border" around the entire canvas
        this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Draw the snake on the canvas
    private drawSnake(): void {
        // Draw each part
        this.snake.forEach(part => this.drawSnakePart(part));
    }

    // Draw one snake part
    private drawSnakePart(snakePart: any): void {
        // Set the colour of the snake part
        this.context.fillStyle = this.snake_col;
        // Set the border colour of the snake part
        this.context.strokeStyle = this.snake_border;
        // Draw a "filled" rectangle to represent the snake part at the coordinates the
        // part is located
        this.context.fillRect(snakePart.x, snakePart.y, 10, 10);
        // Draw a border around the snake part
        this.context.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    private moveSnake(): void {
        // Create the new Snake's head
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
        // Add the new head to the beginning of this.snake body
        this.snake.unshift(head);
        const has_eaten_food = this.snake[0].x === this.food_x && this.snake[0].y === this.food_y;
        if (has_eaten_food) {
            this.score += 10;
            // Generate new food location
            this.feedSnake();
        } else {
            // Remove the last part of this.snake body
            this.snake.pop();
        }
    }

    private startGame(): void {
        setTimeout(() => {
            if (!this.hasGameEnded()) {
                this.clearCanvas();
                this.moveSnake();

                this.drawSnake();
                this.drawFood();

                // Call main again
                this.startGame();
            } else {
                this.showOverlay = true;
                this.replay = true;
            }
        }, 100)
    }

    private hasGameEnded(): boolean {
        for (let i = 4; i < this.snake.length; i++) {
            const has_collided = this.snake[i].x === this.snake[0].x && this.snake[i].y === this.snake[0].y
            if (has_collided)
                return true
        }
        const hitLeftWall = this.snake[0].x < 0;
        const hitRightWall = this.snake[0].x > this.canvas.width - 10;
        const hitToptWall = this.snake[0].y < 0;
        const hitBottomWall = this.snake[0].y > this.canvas.height - 10;

        return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
    }

    private randomFood(min, max): number {
        return Math.round((Math.random() * (max - min) + min) / 10) * 10;
    }

    private feedSnake() {
        this.food_x = this.randomFood(0, this.canvas.width - 10);
        this.food_y = this.randomFood(0, this.canvas.height - 10);
        this.snake.forEach((part) => {
            const has_eaten = part.x === this.food_x && part.y === this.food_y;
            if (has_eaten) this.feedSnake();
        });
    }

    private drawFood(): void {
        this.context.fillStyle = '#5ba641';
        this.context.strokeStyle = 'darkgreen';
        this.context.fillRect(this.food_x, this.food_y, 10, 10);
        this.context.strokeRect(this.food_x, this.food_y, 10, 10);
    }

}
