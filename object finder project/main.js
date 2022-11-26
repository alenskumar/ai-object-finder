status = "";
object = [];
function setup()
{
    canvas = createCanvas(400,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,300);
    video.hide();
}

function start()
{
    objectdetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "AI IS DETECTING " + object_name;
    object_name = document.getElementById("inpt").value;
}

function modelLoaded()
{
    console.log("model is loaded");
    status = true;
}

function draw()
{
    image(video,0,0,400,300);
    if(status !="")
    {
        objectdetector.detect(video,gotResult);
        for(i=0;i<object.length;i++)
        {
            document.getElementById("status").innerHTML = "status: object detected";
            document.getElementById("number_of_objects").innerHTML = "number of object detected are:" + object.length;
            fill('green');
            percent = floor(object[i].confidence*100);
            text(object[i].label + " " + percent + "%" , object[i].x,object[i].y)
            noFill();
            stroke('green');
            rect(object[i].x , object[i].y , object[i].width , object[i].height);
            
            if(object[i].label==object_name)
            {
                video.stop();
                objectdetector.detect(gotResult);
                document.getElementById("status").innerHTML = object_name + " FOUND!";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name+"found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML = object_name+" not found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance("sorry ai couldnt find " + object_name);
                synth.speak(utterThis);
            }
        }
    }
    }


function gotResult(error,results)
{
    if(error)
    {
        console.log("error");
    }
    console.log(results);
    object = results;
}
