//toggle on and off checkbox
/*
    <div class="checkbox no-select">
        <i class="fa fa-square-o"></i> Keep me signed in
        <input type="checkbox" hidden="hidden" name="checkbox"/>
    </div>
*/
$('.checkbox').on('click', function() {
    var i_tag = $(this).find('i');
    var checkbox = $(this).find('input');

    if (i_tag.hasClass('fa-square-o')) {
        i_tag.removeClass('fa-square-o').addClass('fa-check-square-o');
        checkbox.prop("checked", true);
    } else {
        i_tag.removeClass('fa-check-square-o').addClass('fa-square-o');
        checkbox.prop("checked", false);
    }
});

//floating input placeholder
/*
    <div>
        <span class="animate">Password</span>
        <input type="text" name="text" />
    </div>
*/
$('.form div input').on('focusin focusout', function () {
    if ($(this).is(":focus")) {
        $(this).siblings('span').addClass('active-input-label');
    } else {
        if ($(this).val() == '') {
            $(this).siblings('span').removeClass('active-input-label');
        }

    }
});

//Canvas
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var radius = 2;
var dragging = false;

//default values
canvas.width = $('#canvas').width();
canvas.height = $('#canvas').height();
context.lineWidth = radius*2;
context.fillStyle = '#354b60';
context.strokeStyle = '#354b60';

var putPoint = function(e) {
    if(dragging) {
        var xPos = e.clientX - canvas.getBoundingClientRect().left;
        var yPos = e.clientY - canvas.getBoundingClientRect().top;

        context.lineTo(xPos, yPos);
        context.stroke();
        context.beginPath();
        context.arc(xPos, yPos, radius, 0, Math.PI*2);
        context.fill();
        context.beginPath();
        context.moveTo(xPos, yPos);
    }
}

$('#canvas')
    .on('mousedown vmousedown', function(e) {
        dragging = true;
        putPoint(e);
})
    .on('mousemove vmousemove', function(e) {
        putPoint(e);
})
    .on('mouseup vmouseup', function() {
        dragging = false;
        context.beginPath();
});

//clear canvas
function resetCanvas() {
    canvas.width = $('#canvas').width();
    canvas.height = $('#canvas').height();
    context.lineWidth = radius*2;
    context.fillStyle = '#354b60';
    context.strokeStyle = '#354b60';
}
$('#canvas-opt-clear').on('click', function() {
    //if(confirm('Are you sure want to delete the drawing?')) {}
    resetCanvas();
});

//save canvas
/*
    <?php

    $data = $_POST['image'];
    $data = str_replace('data:image/png;base64,', '', $data);
    $data = str_replace(' ', '+', $data);

    $img = base64_decode($data);
    $path = '../images/' . uniqid() . '.png';
    if(file_put_contents($path, $img))
        echo $path;
    else {
        echo 'error';
    }


    //force browser to download
    #header('Content-type: image/png');
    #header('Content-disposition: attachment; filename=TheFileName.png');
    #readfile($_GET['url']);

    ?>
*/
$('#canvas-opt-save').on('click', function() {
    var canvas_data = canvas.toDataURL();

    console.log(canvas_data);
    
    /*
        $.ajax({
            method: 'post',
            url: "php/save_canvas.php",
            data: 'image='+canvas_data,
        }).success(function(feedback) {
            console.log(feedback);
        });
    */
});

//select color
$('#canvas-opt-color').on('click', function (e) {
    $('#color-input').click();
});
$('#color-input').on('change', function () {
    var c = $(this).val();
    $('#canvas-opt-color i.fa').css('color', c);
    context.fillStyle = c;
    context.strokeStyle = c;
});