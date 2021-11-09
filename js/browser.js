
// 익스 버전체크
function IEVerChk()
{
    var isIe9 = false;

    var word = ""
    var agent = navigator.userAgent.toLowerCase();

    // IE old version(IE 10 or Lower)
    if (navigator.appName == "Microsoft Internet Explorer")
    {
        word = "msie ";
    }
    else
    {
        // IE 11
        if (agent.search("trident") > -1)
        {
            word = "trident/.*rv:";
        }
        // IE 12(Microsoft Edge)
        else if (agent.search("edge/") > -1)
        {
            word = "edge/";
        }
        else
        {
            return isIe9;
        }
    }

    var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");

    if (reg.exec(agent) != null)
    {
        version = RegExp.$1 + RegExp.$2;

        if (parseInt(version, 10) <= 9)
        {
            isIe9 = true;
        }
    }

    return isIe9;
};
