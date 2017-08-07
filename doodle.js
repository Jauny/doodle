// set canvas
var canvas = document.getElementById('doodle__canvas');
var ctx = canvas.getContext('2d');
ctx.rect(0, 0, canvas.width, canvas.height)
ctx.stroke();

// set color
color = 'black'
var els = document.getElementsByClassName('color')
for (var i = 0; i < els.length; i++) {
  els[i].addEventListener('click', function(evt) {
    color = evt.target.id;
  })
};

// mouse events and helpers
var mousedown = false;
document.getElementById('doodle__canvas').addEventListener('mousedown', function(evt) {
  mousedown = true;
});
document.getElementById('doodle__canvas').addEventListener('mouseup', function(evt) {
  mousedown = false;
});
document.getElementById('doodle__canvas').addEventListener('mousemove', function(evt) {
  if (mousedown) {
    draw(evt, canvas, ctx);
  }
});

var draw = function(evt, canvas, ctx) {
  var mousePos = getMousePos(evt, canvas);
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(mousePos.x, mousePos.y, 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
};

var getMousePos = function(evt, canvas) {
  var rect = canvas.getBoundingClientRect();
  return {
    y: evt.clientY - rect.top,
    x: evt.clientX - rect.left
  };
};

// upload image to canvas background
document.getElementById('file-upload-cta').addEventListener('click', function(e) {
  document.getElementById('file-upload').click();
});

document.getElementById('file-upload').addEventListener('change', function(e) {
  var url = URL.createObjectURL(e.target.files[0]);
  var img = new Image();
  img.onload = function() {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);    
  }
  img.src = url;
});

// download image
document.getElementById('image-save').addEventListener('click', function(evt) {
  var image = canvas.toDataURL('image/png');
  var link = evt.target;
  link.href = canvas.toDataURL();
});