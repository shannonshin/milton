$(document).ready(function(){
    quickEvent();
});
function quickEvent(){
    var obj = {
        $wing: $("#quick_banner"),
        _winW: $("body").width(),
        _contH: $("#content_wrap").height(),
        _footH: $("#footer_wrap").height(),
        _domH: null,
        ieChk: navigator.userAgent.indexOf("MSIE"),
        lenChk : function(){
            var _hT = $("#header_wrap").height();

            if (obj.$wing.length) {
                obj.scrollEvent(obj.$wing, _hT);
            }

            if (obj._domH == null) {
                obj._domH = $(document).height();
            } else if (obj._domH < $(document).height()) {
                obj._domH = $(document).height();
            }
        },
        widthChk: function() {
            if ($(window).width() > 1099) {
                obj.$wing.css({
                    /*marginRight: Math.round(-($(".best_wrap").width() / 2) - obj.$wing.width() -10),*/
                    marginRight: Math.round(-(1024 / 2) - obj.$wing.width() -10),
                    right: '49%',
                    left: 'auto',
                    display:'block'
                });
            } else {
                obj.$wing.css({
                    display:'none'
                });
            }
        },
        scrollEvent: function($target, _hT) { // wing Moving  function
            var _chT = _hT;
            var _sTop = $(window).scrollTop(),
                _fT = obj._domH - $target.height() - obj._footH,
                _wingT;

            $target.css({ top: _chT });
            if (_sTop < _chT) {				// header check
                $target.css({ position: 'absolute' });
                _wingT = _chT;
            } else if (_sTop > _fT) {		// footer check
                $target.css({ position: 'absolute' });
                _wingT = _fT;
            } else {								// other
                if (obj.ieChk != -1) {
                    $target.css({
                        position: 'fixed',
                        top: 5
                    });
                } else {
                    _wingT = _sTop;
                }
            }
            $target.css({ top: _wingT });
        }
    };
    obj.widthChk();
    $(window).bind("mousewheel DOMMouseScroll MozMousePixelScroll scroll onmousewheel ", function() {
        obj.lenChk();
    });
    $(window).resize(function() { obj.widthChk(); });
    $(window).load(function() {
        obj.lenChk();
        obj.widthChk();
    });
    $(window).bind("touchmove", function() { obj.lenChk(); });
    $(window).bind("touchend", function() { obj.lenChk(); });
}