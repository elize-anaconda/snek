import {Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ElementRef} from '@angular/core';

@Component({selector: 'app-snake', templateUrl: './snake.component.html', styleUrls: ['./snake.component.scss']})
export class SnakeComponent implements AfterViewInit {

  @ViewChild('snakeboard', {static: false}) snakeboard!: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D;

  public board_border = 'black';
  public board_background = "white";
  public snake_col = 'lightblue';
  public snake_border = 'darkblue';
  public snakeboard_ctx: any;

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
    console.log(this.context);
    // Return a two dimensional drawing context
    this.context = this.snakeboard.nativeElement.getContext("2d");

    this.clearCanvas();
    this.drawSnake();
  
  }


  // draw a border around the canvas
  clearCanvas() {
    if (this.context) {
      //  Select the colour to fill the drawing
      this.context.fillStyle = this.board_background;
      //  Select the colour for the border of the canvas
      this.context.strokeStyle = this.board_border;
      // Draw a "filled" rectangle to cover the entire canvas
      this.context.fillRect(0, 0, this.snakeboard.nativeElement.width, this.snakeboard.nativeElement.height);
      // Draw a "border" around the entire canvas
      this.context.strokeRect(0, 0, this.snakeboard.nativeElement.width, this.snakeboard.nativeElement.height);
    }
  }

  // Draw the snake on the canvas
  drawSnake() {
    // Draw each part
    this.snake.forEach(this.drawSnakePart)
  }

  // Draw one snake part
  drawSnakePart(snakePart: any) {
    if (this.context) {
    
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
  }

}
