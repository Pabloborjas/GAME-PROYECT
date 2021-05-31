class Player {
  constructor(ctx, x, y) { 
    this.ctx = ctx
    this.x = 40
    this.y = 300

    this.size = 70
    this.speed = 5

    this.vx = 0
    this.vy = 0

    this.width = 0
    this.height = 0

    this.img = new Image()
    this.img.src = '../Imagenes/nave-azul.png'
    this.img.isReady = false;
    this.img.onload = () => {
      this.img.isReady = true

     
      
    this.movements = {
      up: false,
      down: false,
      left: false,
      right: false
      }
    }
  }
  isReady(){
    return this.img.isReady;
  }
  draw(){
    if (this.isReady()) {
      this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.size,
        this.size,
      )
    }
  }
  move(){
    if (this.movements.up){
      this.vy = -this.speed;
      }else if (this.movements.down){
        this.vy = this.speed;
      }else {
          this.vy = 0;
        }
      
    
    if (this.movements.left){
      this.vx = -this.speed;
      }else if (this.movements.right){
        this.vx = this.speed;
       
      }else {
      this.vx = 0;
      }
  
      this.x += this.vx;
      this.y += this.vy;

      if (this.x + this.size >= this.ctx.canvas.width){
        this.x = this.ctx.canvas.width - this.size;
      }else if(this.x <= 0){
        this.x = 0
      }
      if (this.y + this.size >= this.ctx.canvas.height){
        this.y = this.ctx.canvas.height - this.size;
      }else if(this.y <= 0){
        this.y = 0
      }
   
      }
  onKeyEvent(event){
    const status = event.type === 'keydown'
    switch (event.keyCode) { 
    case KEY_UP:
      this.movements.up = status
      break;
      case KEY_DOWN:
        this.movements.down = status
        break;
      case KEY_LEFT:
          this.movements.left = status
          break;
      case KEY_RIGHT:
            this.movements.right = status
            break;
    }
    
  }
  collisiones(element){
   return this.x < element.x + element.width &&
    this.x + this.size > element.x &&
    this.y < element.y + element.height &&
    this.y + this.size > element.y
  }
}
