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
function SceneGameOver() 
{
	this.name = "SceneGameOver";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;

	this.WorldSize = new Vector(4096,4096);

	this.Score = null;

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

			//canvas.style.background = 'black';
			// operation start
			GameStatus = false;

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
/*		if(Application.GamePaused){
			ctx.font = "30px Arial";
			ctx.fillText("Controller calibration waited",10,50);
		}*/

		if (!Application.GamePaused) 
		{
			//Show UI
			var W = 200, midW = (W/2);
			var H = 75, midH = (H/2);
			var X = (canvas.width / 2) - midW;
			var Y = (canvas.height / 2) - midH;

			ctx.fillStyle = "#fff";
			ctx.fillRect(X,Y,W,H);
			ctx.font = "30px Arial";
			ctx.fillStyle = "#000";
			ctx.fillText('Scores: '+ this.Score, X + 40 , Y + midH );

			/*				socket.emit('gameStatus',{
					status: GameStatus = false;
				});*/
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.Awake()
}