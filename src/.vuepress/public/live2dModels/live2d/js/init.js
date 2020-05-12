window.addEventListener('load',function(){
  var canvas = document.createElement('canvas');
  canvas.id = 'live2d';
  canvas.width = '280';
  canvas.height = '250';
  canvas.style.cssText = 'position: fixed;left:40px;bottom:-20px;';
  document.body.appendChild(canvas);
  loadlive2d("live2d", "/newBlog/live2dModels/live2d/model/22/11.json");
})
