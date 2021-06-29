import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef
} from '@angular/core';

@Component({selector: 'app-snake', templateUrl: './snake.component.html', styleUrls: ['./snake.component.scss']})
export class SnakeComponent implements AfterViewInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>; 

  public board_border = 'black';
  public board_background = "white";
  public snake_col = 'lightblue';
  public snake_border = 'darkblue';

  private snakeboard_ctx : CanvasRenderingContext2D;

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
    // Return a two dimensional drawing snakeboard_ctx
    const el = this.canvas.nativeElement;

    console.log(el);

    this.clearCanvas(el.getContext('2d'));
    this.drawSnake(el.getContext('2d'));

  }

  // draw a border around the canvas
  private clearCanvas(context): void {
    console.log(context);
    //  Select the colour to fill the drawing
   context.fillStyle = this.board_background;
    //  Select the colour for the border of the canvas
   context.strokeStyle = this.board_border;
    // Draw a "filled" rectangle to cover the entire canvas
   context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    // Draw a "border" around the entire canvas
   context.strokeRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  // Draw the snake on the canvas
  private drawSnake(context): void {
    // Draw each part
    this.snake.forEach(part => this.drawSnakePart(part, context));
  }

  // Draw one snake part
  private drawSnakePart(snakePart : any, context): void {
    console.log(context);

    // Set the colour of the snake part
    context.fillStyle = this.snake_col;
    // Set the border colour of the snake part
    context.strokeStyle = this.snake_border;
    // Draw a "filled" rectangle to represent the snake part at the coordinates the
    // part is located
    context.fillRect(snakePart.x, snakePart.y, 10, 10);
    // Draw a border around the snake part
    context.strokeRect(snakePart.x, snakePart.y, 10, 10);
  }

}
