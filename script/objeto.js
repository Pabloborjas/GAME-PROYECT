
class Objetos {
    constructor(ctx, x, y, vx) {
        this.ctx = ctx
        this.x = x
        this.y = y

        this.height = 102
        this.width = 100


        this.vx = vx

    
   
        this.img = new Image()
        this.img.src = './Imagenes/piedra.png';
        this.img.isReady = false
        this.img.onload = () => {
          this.img.isReady = true

          //this.img.frameWidth = Math.floor(Math.random() * this.img.width)
          //this.img.frameHeight = Math.floor(Math.random() * this.img.height)
        
        
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
            this.height,
            this.width
           
          )
        }
    
      }
    move(){
        this.x += this.vx
        }
       
    
}