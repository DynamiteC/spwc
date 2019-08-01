//declare ideal values
var constraints = {
    audio: false,
    video: {
        facingMode: "environment"
    }
};

$(document).ready(function () {
    var video = document.getElementById('video');
    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            video.srcObject = stream;
            video.play();
        });
    }
});

document.getElementById("video").addEventListener("click", function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    $('#canvas').prop('width', video.videoWidth);
    $('#canvas').prop('height', video.videoHeight);
    var instance = M.Modal.getInstance($('#canvasModal'))
    instance.open();
    context.scale(1, 1);
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    if($('#canvas').data('cropper'))
    {
      $('#canvas').data('cropper').destroy();
      $('#canvas').data('cropper',null);
    }
    var image = $('#canvas');
    image.cropper({
        dragMode: "none",
        crop: function (event) {
            console.log(event.detail.x);
            console.log(event.detail.y);
            console.log(event.detail.width);
            console.log(event.detail.height);
            console.log(event.detail.rotate);
            console.log(event.detail.scaleX);
            console.log(event.detail.scaleY);
        },
        data: {
          width: 134,
          height: 333
        },
        cropBoxResizable: false
    });
    video.pause();
    $(video)[0].srcObject.getTracks()[0].stop();
});

$(document).ready(function () {
    $('#canvasModal').modal({ onCloseEnd: onModalClose });
    $('#zoomIn').click(function () {
        var image = $('#canvas');
        var cropper = image.data('cropper');
        cropper.zoom(0.1);
    });
    $('#zoomOut').click(function () {
        var image = $('#canvas');
        var cropper = image.data('cropper');
        cropper.zoom(-0.1);
    });
    $('#moveLeft').click(function () {
        var image = $('#canvas');
        var cropper = image.data('cropper');
        cropper.move(-10,0)
    });
    $('#moveRight').click(function () {
        var image = $('#canvas');
        var cropper = image.data('cropper');
        cropper.move(10,0)
    });
    $('#moveUp').click(function () {
        var image = $('#canvas');
        var cropper = image.data('cropper');
        cropper.move(0,-10)
    });
    $('#moveDown').click(function () {
        var image = $('#canvas');
        var cropper = image.data('cropper');
        cropper.move(0,10)
    });
    $('#rotateLeft').click(function () {
        var image = $('#canvas');
        var cropper = image.data('cropper');
        cropper.rotate(-90)
    });
    $('#rotateRight').click(function () {
        var image = $('#canvas');
        var cropper = image.data('cropper');
        cropper.rotate(90)
    });
    $('#swapHoriz').click(function () {
        var scale = $('#swapHoriz').data('option')
        var image = $('#canvas');
        var cropper = image.data('cropper');
        cropper.scaleX(scale);
        $('#swapHoriz').data('option',-scale)
    });
    $('#swapVert').click(function () {
        var scale = $('#swapVert').data('option')
        var image = $('#canvas');
        var cropper = image.data('cropper');
        cropper.scaleY(scale);
        $('#swapVert').data('option',-scale)
    });
    $('#saveImage').click(function () {
        var image = $('#canvas');
        var cropper = image.data('cropper');
        var imgurl = cropper.getCroppedCanvas().toDataURL();
        document.getElementById('showImage').src = imgurl;
        var instance = M.Modal.getInstance($('#canvasModal'))
        instance.close();
         $('html, body').animate({
              scrollTop: $("#showImage").offset().top
         }, 2000);
    });
    $('#refreshImage').click(function () {
        if($('#canvas').data('cropper'))
        {
          $('#canvas').data('cropper').destroy();
          $('#canvas').data('cropper',null);
        }
        var image = $('#canvas');
        image.cropper({
            dragMode: "none",
            crop: function (event) {
                console.log(event.detail.x);
                console.log(event.detail.y);
                console.log(event.detail.width);
                console.log(event.detail.height);
                console.log(event.detail.rotate);
                console.log(event.detail.scaleX);
                console.log(event.detail.scaleY);
            },
            data: {
              width: 134,
              height: 333
            },
            cropBoxResizable: false
        });
    });
});

var onModalClose = function () {
    var video = document.getElementById('video');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            video.srcObject = stream;
            video.play();
        });
    }
};
