class Background {
    constructor(ctx) {
      this.ctx = ctx
  
      this.x = 0
      this.y = 0
      this.height = this.ctx.canvas.height
      this.width = this.ctx.canvas.width
  
      this.vx = -2
  
      this.img = new Image()
      this.img.src = '../Imagenes/fondo galaxy.jpg';
      this.img.isReady = false
      this.img.onload = () => {
        this.img.isReady = true
      }
  
      this.movements = {
        right: false
        
      }
    }
  
    isReady() {
      return this.img.isReady
    }
  
    draw() {
      if (this.isReady()) {
        this.ctx.drawImage(
          this.img,
          this.x, 
          0,
          this.width,
          this.height
        )
  
        this.ctx.drawImage(
          this.img,
          this.x + this.width, 
          0,
          this.width,
          this.height
        )
      } 
    }
  
    move() {
    this.x += this.vx;
    if (this.x + this.width <= 0){ 
    this.x = 0
     }
    }
    onKeyEvent(event) {
      const status = event.type === 'keydown'
  
      switch (event.keyCode) {
        case KEY_RIGHT:
          this.movements.right = status
          break;
    
        default:
          break;
        }
      }
    }