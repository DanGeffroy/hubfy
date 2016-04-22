$(function () {
    $('.grid-stack').gridstack({
        cellHeight: 75
        , verticalMargin: 10
        , animate: true
        , width: 12,

        alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        , resizable: {
            handles: 'e, se, s, sw, w'
        }
    });
});