song1 = "";
song2 = "";

leftwristX = 0;
leftwristY = 0;

rightwristX = 0;
rightwristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

song1status = "";
song2status = "";

function preload(){
    song1 = loadSound("americanmusic.mp3");
    song2 = loadSound("russianmusic.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Posenet's initialized.");
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Right Wrist = " + scoreRightWrist + " Score Left Wrist = " + scoreLeftWrist);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");
    if (scoreRightWrist > 0.2){
        circle(rightwristX, rightwristY, 20);
        song2.stop();
        if (song1status == "false"){
            song1.play();
            document.getElementById("song").innerHTML = "Song playing = Infetterence by YOYLECAKE";
        }
    }
    if(scoreLeftWrist > 0.2){
        circle(leftwristX, leftwristY, 20);
        song1.stop();
        if (song2status == "false"){
            song2.play();
            document.getElementById("song").innerHTML = "Song playing = Moskau by Dschingis Khan";
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}