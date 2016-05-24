/**
 * Create a new Scene
 * <ul><li>Copy the content of this file in a new .js document.</li>
 * <li>Save the new file in Assets/Javascript/Scenes/NameOfYourScene.js .</li>
 * <li>In the index.html add below this comment <!-- Scene --> the line: 
*                    "<script type="text/javascript" src="Assets/Scripts/Javascript/Scenes/NameOfYourGameObject.js"></script>"</li>
 * <li>For create a new scene, use this instruction: "new Scene()".</li>
 * </ul>
 * <strong>To load your scene, use this instruction: "Application.LoadLevel(LevelName)".</strong>
 * 
 * @class
 * 
 * @return {Scene}
 * */
function mainScene() 
{
	this.name = "mainScene";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;

	this.WorldSize = new Vector(4096,4096);

	this.player = null;
	this.ennemyCounter = 0;
	/**
	 * Called at the instruction new Scene().
	 * */
	this.Awake = function() 
	{
		console.clear();
		Print('System:Scene ' + this.name + " Created !");
	}
	
	/**
	 * Start the Scene and show a message in console or launch Update() if already started
	 * Called at the first use of scene in game.
	 * */
	this.Start = function() 
	{
		if (!this.started) 
		{
			Time.SetTimeWhenSceneBegin();

			// operation start
			var character = new Character();
			this.player = character;
			this.GameObjects.push(character);

/*			for (var i = 0; i < 10; i++) {
				var enemy = new Enemy();
				this.GameObjects.push(enemy);
			}*/



			this.started = true;
			Print('System:Scene ' + this.name + " Started !");
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	/**
	 * Start every GameObject, Group and apply the debug mode if asked
	 * Called each frame,code game is here.
	 * */
	this.Update = function() 
	{

		if (!Application.GamePaused) 
		{
			var pat = ctx.createPattern(Images['tile'],"repeat");
			ctx.rect(0,0,canvas.width,canvas.height);
			ctx.fillStyle = pat;
			ctx.fill();
			ctx.fillStyle = 'rgba(0,0,0,.8)';
			ctx.fillRect(0,0,canvas.width,canvas.height);
			
			this.ennemyCounter++;
			if(this.ennemyCounter == 60){
				this.ennemyCounter = 0;
				if(Math.random() > 0.60){
					var enemy = new Enemy();
					this.GameObjects.push(enemy);
				}
			}
			for (var i = 0; i < this.GameObjects.length; i++) 
			{
				this.GameObjects[i].Start();
			}

			for (var i = 0; i < this.Groups.length; i++) 
			{
				this.Groups[i].Start();
			}
		}
		if (Application.debugMode) 
		{
			Debug.DebugScene();
		}
		this.GUI();
	}
	/**
	 * Called each frame, code all the GUI here.
	 * */
	this.GUI = function() 
	{
		var thePlayer = Application.LoadedScene.player;
		if (!Application.GamePaused) 
		{
			//Show UI

			//Set score text
			ctx.font = "30px Arial";
			//DISPLAY BONUS
			if(thePlayer.bonusLight.activated){
				ctx.fillStyle = "#f00";
				ctx.fillText('Bonus: '+ thePlayer.bonusLight.duration, canvas.width - 200, canvas.height - 100);
			}
			//DISPLAY SCORE
			ctx.fillStyle = "#fff";
			ctx.fillText('Scores: '+ thePlayer.killCounter, canvas.width - 200, canvas.height - 50);

			//SET CHARACTER LIFE
			for(var i = 0 ; i < thePlayer.lifes ; i++){
				ctx.drawImage(Images['Heart'], i * Images['Heart'].width, canvas.height - Images['Heart'].height);
			}

			if(thePlayer.lifes <= 0){
				thePlayer.enabled = false;
				Scenes["SceneGameOver"].Score = thePlayer.killCounter;
				Application.LoadedScene = Scenes["SceneGameOver"];
			}
		} 
		else 
		{
			// Show pause menu
			ctx.font = "30px Arial";
			ctx.fillText("Controller calibration waited",10,50);
		}
	}

	this.Awake()
}