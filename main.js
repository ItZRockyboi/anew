
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
var song = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
function setup(){
canvas = createCanvas(600,500);
canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video,modalLoaded);
poseNet.on("pose",gotPoses);

}


function draw(){
image(video,0,0,600,500);
fill("162, 3, 255");
stroke("162, 3, 255");
if(scoreRightWrist > 0.2){


circle(rightWristX,rightWristY,20);
if(rightWristY > 0 && rightWristY <= 100){
    document.getElementById("speed").innerHTML = "speed = 0.5x";
    song.rate(0.5);
}
else if(rightWristY > 100 && rightWristY <= 200){
    document.getElementById("speed").innerHTML = "speed = 1x";
    song.rate(1);
}
else if(rightWristY > 200 && rightWristY <= 300){
    document.getElementById("speed").innerHTML = "speed = 1.5x";
    song.rate(1.5);
}
else if (rightWristY > 300 && rightWristY <= 400){
    document.getElementById("speed").innerHTML = "speed = 2x";
    song.rate(2)
}
else if (rightWristY < 400 && rightWristY <= 500){
    document.getElementById("speed").innerHTML = "speed = 2.5x";
    song.rate(2.5);
}

}



if(scoreLeftWrist > 0.2){
circle(leftWristX,leftWristY,20);
num = Number(leftWristY);
removeDecimals = floor(num);
volume = removeDecimals/500;
document.getelementbyId("volume").innerHTML ="volume = "+volume;
song.setVolume(volume);
} 
}


function preload(){
song = loadSound("Bones.mp3");
}


function play() {
    song.play();

    song.rate(1);

}


function stop() {
    song.stop();
}


function modalLoaded(){
    console.log("pose net initialized")
}


function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score left wrist = "+scoreLeftWrist);
        console.log("score right wrist = "+scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        console.log("left wrist x = "+leftWristX);
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist y = "+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        console.log("right wrist x = "+rightWristX);
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist y = "+rightWristY);
    }
}


