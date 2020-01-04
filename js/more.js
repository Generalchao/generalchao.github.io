  // 保持视频16:9宽
      window.onload = window.onresize = function () {
          resizeIframe();
      }
      var resizeIframe=function(){
          var bodyw=document.body.clientWidth;
          for(var ilength=0;ilength<=document.getElementsByTagName("iframe").length;ilength++){
              if (bodyw > 800) {
                  document.getElementsByTagName("iframe")[ilength].height = 490;//设定pc高度 
              }
              else{
                  document.getElementsByTagName("iframe")[ilength].height = bodyw*9/16;//设定移动端高度
              }
          }
      }