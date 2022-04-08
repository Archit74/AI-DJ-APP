song = "";

function preload() {
    song = loadSound("music.mp3");
}
score_left_wrist = 0;
score_right_wrist = 0;

left_wrist_x = 0;
right_wrist_x = 0;

left_wrist_y = 0;
right_wrist_y = 0;

function setup() {
    canvas = createCanvas(800, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on("pose", gotPoses);
}

function modelloaded() {
    console.log("modelloaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        score_right_wrist = results[0].pose.keypoints[10].score;
        score_left_wrist = results[0].pose.keypoints[9].score;

        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
    }
}

function draw() {
    image(video, 0, 0, 800, 400);
    fill("#FF0000");
    stroke("#FF0000");

    if (score_right_wrist > 0.2) {
        circle(right_wrist_x, right_wrist_y, 20);

        if (right_wrist_y > 0 && right_wrist_y <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x ";
            song.rate(0.5);
        }
        else if (right_wrist_y > 100 && right_wrist_y <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x ";
            song.rate(1);
        }
        else if (right_wrist_y > 200 && right_wrist_y <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x ";
            song.rate(1.5);
        }
        else if (right_wrist_y > 300 && right_wrist_y <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x ";
            song.rate(2);
        }
        else if (right_wrist_y > 400) {
            document.getElementById("speed").innerHTML = "Speed = 3x ";
            song.rate(3);
        }
    }

    if (score_left_wrist > 0.2) {
        circle(left_wrist_x, left_wrist_y, 20);
        InNumberleftWristY = Number(left_wrist_y);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}