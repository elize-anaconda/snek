import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef,
  HostListener
} from '@angular/core';

@Component({selector: 'app-snake', templateUrl: './snake.component.html', styleUrls: ['./snake.component.scss']})
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

  public board_border = 'black';
  public board_background = "white";
  public snake_col = 'lightblue';
  public snake_border = 'darkblue';

  private context : CanvasRenderingContext2D;

  // True if changing direction
  public changing_direction = false;
  // Horizontal velocity
  public food_x;
  public food_y;
  public dx = 10;
  // Vertical velocity
  public dy = 0;

  public snake = [
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
  ]


  ngAfterViewInit() {
    // Return a two dimensional drawing context
    this.canvas = document.getElementById("snakeboard") as HTMLCanvasElement;

    this.context = this.canvas.getContext('2d');

    this.clearCanvas();
    this.drawSnake();

    this.startGame();
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
  private drawSnakePart(snakePart : any): void {
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

  private moveSnake(): void{  
    const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy};
    this.snake.unshift(head);
    this.snake.pop();
  }

  private startGame(): void {
    setTimeout(() => 
    {    
      this.clearCanvas();    
      this.moveSnake();  
      this.drawSnake();
      // Call main again
      this.startGame();
    }, 100)
  }

}
