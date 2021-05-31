
const SPEED_INCREMENT = 240 * 1;
class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = window.innerWidth -10
    this.canvas.height = window.innerHeight - 190
    this.objetosFrame = 120

    this.fps = 1000 / 60
    this.drawInterval = undefined
    this.background = new Background(this.ctx)
    this.player = new Player(this.ctx)
    
    this.objetos = []
    this.objDrawCount = 0
    this.frameCount = 0
    this.objetosSpeed = -5

    this.points = 0
   

    const theme = new Audio('../Sound/musica game.mp3')
    const collisiones = new Audio('../Sound/yt1s.com - Explosion sonido efecto.mp3')
    collisiones.volume = 0.1;
    theme.volume = 0.1;
    this.sounds = {
      theme,
      collisiones 
      
    }
    
   
  }
  

    start() {
      if (!this.drawInterval) {
        this.sounds.theme.play()
        this.drawInterval = setInterval(() => {
          this.clear()
          this.move()
          this.draw()
          this.checkColisions()

          this.objDrawCount++


          
            if (this.objDrawCount % this.objetosFrame === 0) { 
              this.addObjetos()
         
          }
          if (this.objDrawCount % SPEED_INCREMENT === 0 ){
            this.objetosSpeed--
            this.points += 10
            this.objetos.forEach(objeto => objeto.vx = this.objetosSpeed)
            this.objetosFrame += -10
          }
          
        }, this.fps);
      }
    }
    pause() {
      clearInterval(this.drawInterval)
    }

    gameOver(){
      clearInterval(this.drawInterval)
      this.ctx.save()
      this.ctx.fillStyle = "rbga(0, 0, 0, 0, 0.5)"
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

      this.ctx.font = "30px Arial"
      this.ctx.fillStyle = "white"
      this.ctx.textAlign = "center"
      this.ctx.fillText(`SCORE: ${this.points}`, this.canvas.width / 2, (this.canvas.height) / 2 + 40)
      this.ctx.fillText("GAME OVER! REFRESH TO PLAY AGAIN", this.canvas.width / 2, this.canvas.height / 2)
      
      
    
      this.ctx.restore()
      this.sounds.collisiones.play()
      this.sounds.theme.pause()

      
    }

    clear() { 
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) 

    this.objetos = this.objetos.filter(objeto => objeto.x + objeto.width >= 0) 
    
    }
  
    draw() { 
      this.background.draw()
      this.player.draw()
      this.objetos.forEach(objeto => objeto.draw())
      

      this.ctx.save()
      this.ctx.font = '20px Arial'
      this.ctx.fillStyle = "white"
      this.ctx.fillText(`Score: ${this.points}`, this.canvas.width / 2, 20)
      this.ctx.restore()

          
    }
   
    
    move() {
      
      this.background.move()
      this.player.move()
      this.objetos.forEach(objeto => objeto.move())

     
      
    }
    onKeyEvent(event) {
      
      this.background.onKeyEvent(event)
      this.player.onKeyEvent(event)
      
    }
   
    addObjetos() {

  
      this.objetos.push(
        new Objetos(this.ctx, this.canvas.width, Math.floor(Math.random() * (this.canvas.height - 102)) ,this.objetosSpeed)
        
      )
     
    }

   
    checkColisions() {
      if  (this.objetos.some (objeto => this.player.collisiones(objeto))){
        this.gameOver()
      }
    }
 
  }