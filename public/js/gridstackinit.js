$(function () {
       $('.grid-stack').gridstack({
                width:  12,
                height: 9,
                animate: true,
           
                alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                resizable: {
                    handles: 'e, se, s, sw, w'
                }
            });
});