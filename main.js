song1 = "";
song2 = "";

lwx = 0;
lwy = 0;
rwx = 0;
rwy = 0;
scoreLW = 0;
sip = "";
scoreRW = 0;
song_status = "";

function preload(){
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}   
 
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLW = results[0].pose.keypoints[9].score;
        scoreRW = results[0].pose.keypoints[10].score;
        console.log("Score Left Wrist = "+scoreLW);
        lwx = results[0].pose.leftWrist.x;
        lwy = results[0].pose.leftWrist.y;
        
        rwx = results[0].pose.rightWrist.x;
        rwy = results[0].pose.rightWrist.y;
    }
}



function modelLoaded(){
    console.log('Posenet is Initialized');
}

function draw(){
    image(video, 0, 0, 600, 500);
    song_status = song1.isPlaying();
    sip = song2.isPlaying();

    fill("red");
    stroke("red");

    if(scoreLW > 0.2){
    circle(lwx, lwy, 20);
    song2.stop();
    if(song_status == false){
        song1.play();
        document.getElementById("song_name").innerHTML = "Heat Waves";
    }
    }
   

    if(scoreRW > 0.2){
        circle(rwx, rwy, 20);
        song1.stop();

        if(sip == false){
            song2.play();
            document.getElementById("song_name").innerHTML = "Safe & Sound";
        }
        }
        


}
