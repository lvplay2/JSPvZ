oS.Init(
    {
        PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom],
        ZName: [oZombie, oZombie2, oZombie3, oNewspaperZombie],
        PicArr: (function () {
            var a = oSunShroom.prototype,
                b = a.PicArr;
            return [
                "images/interface/background2.jpg",
                "images/interface/Dave.gif",
                "images/interface/Dave2.gif",
                "images/interface/Dave3.gif",
                "images/interface/Tombstones.png",
                "images/interface/Tombstone_mounds.png",
                b[a.CardGif],
                b[a.NormalGif],
            ];
        })(),
        backgroundImage: "images/interface/background2.jpg",
        CanSelectCard: 1,
        DKind: 0,
        SunNum: 50,
        LevelName: "关卡 2-1",
        LvlEName: 11,
        AudioArr: ["crazydaveshort1", "crazydavelong1", "crazydavelong2", "crazydavelong3"],
        LargeWaveFlag: { 10: $("imgFlag1") },
        Monitor: { f: AppearTombstones, ar: [7, 9, 4] },
        UserDefinedFlagFunc: function (a) {
            oP.FlagNum == oP.FlagZombies && oP.SetTimeoutTomZombie([oZombie]);
        },
        StartGameMusic: "Ultimate battle",
        LoadAccess: function (a) {
            NewImg("dDave", "images/interface/Dave.gif", "left:0;top:81px", EDAll);
            NewEle("DivTeach", "div", 0, 0, EDAll);
            (function (d) {
                var b = arguments.callee,
                    c = $("DivTeach");
                switch (d) {
                    case 0:
                        PlayAudio("crazydaveshort1");
                        $("dDave").src = "images/interface/Dave3.gif";
                        oSym.addTask(
                            100,
                            function () {
                                $("dDave").src = "images/interface/Dave.gif";
                                c.onclick = function () {
                                    oSym.addTask(10, b, [1]);
                                };
                            },
                            []
                        );
                        innerText(c, "晚上好，" + $User.Visitor.UserName + "。(点击继续)");
                        break;
                    case 1:
                        PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
                        c.onclick = null;
                        $("dDave").src = "images/interface/Dave3.gif";
                        oSym.addTask(
                            200,
                            function () {
                                $("dDave").src = "images/interface/Dave.gif";
                                c.onclick = function () {
                                    oSym.addTask(10, b, [2]);
                                };
                            },
                            []
                        );
                        innerText(c, "那些僵尸不会减弱攻势吧？(点击继续)");
                        break;
                    case 2:
                        PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
                        c.onclick = null;
                        $("dDave").src = "images/interface/Dave3.gif";
                        oSym.addTask(
                            200,
                            function () {
                                $("dDave").src = "images/interface/Dave.gif";
                                c.onclick = function () {
                                    oSym.addTask(10, b, [3]);
                                };
                            },
                            []
                        );
                        innerText(c, "你会注意到和僵尸作战在夜间不同于白天之处。(点击继续)");
                        break;
                    case 3:
                        PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
                        c.onclick = null;
                        $("dDave").src = "images/interface/Dave3.gif";
                        oSym.addTask(
                            200,
                            function () {
                                $("dDave").src = "images/interface/Dave.gif";
                                c.onclick = function () {
                                    oSym.addTask(10, b, [4]);
                                };
                            },
                            []
                        );
                        innerText(c, "首先，你不能从天上得到阳光。(点击继续)");
                        break;
                    case 4:
                        PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
                        c.onclick = null;
                        $("dDave").src = "images/interface/Dave3.gif";
                        oSym.addTask(
                            200,
                            function () {
                                $("dDave").src = "images/interface/Dave.gif";
                                c.onclick = function () {
                                    oSym.addTask(10, b, [5]);
                                };
                            },
                            []
                        );
                        innerText(c, "但你仍可以通过向日葵来获得阳光。(点击继续)");
                        break;
                    case 5:
                        PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
                        c.onclick = null;
                        $("dDave").src = "images/interface/Dave3.gif";
                        oSym.addTask(
                            200,
                            function () {
                                $("dDave").src = "images/interface/Dave.gif";
                                c.onclick = function () {
                                    oSym.addTask(10, b, [6]);
                                };
                            },
                            []
                        );
                        innerText(c, "而且你很幸运，你得到了小喷菇。(点击继续)");
                        break;
                    case 6:
                        PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
                        c.onclick = null;
                        $("dDave").src = "images/interface/Dave3.gif";
                        oSym.addTask(
                            200,
                            function () {
                                $("dDave").src = "images/interface/Dave.gif";
                                c.onclick = function () {
                                    oSym.addTask(10, b, [7]);
                                };
                            },
                            []
                        );
                        innerText(c, "尽可能多地种植这些蘑菇吧，你会挺过去的。(点击继续)");
                        break;
                    case 7:
                        $("dDave").src = "images/interface/Dave2.gif";
                        ClearChild($("DivTeach"));
                        oSym.addTask(
                            50,
                            function () {
                                ClearChild($("dDave"));
                                a(0);
                            },
                            []
                        );
                }
            })(0);
        },
    },
    {
        AZ: [
            [oZombie, 3, 1],
            [oZombie2, 2, 1],
            [oZombie3, 2, 1],
            [oNewspaperZombie, 2, 1],
        ],
        FlagNum: 10,
        FlagToSumNum: { a1: [3, 5, 9], a2: [1, 2, 3, 15] },
        FlagToMonitor: { 9: [ShowFinalWave, 0] },
        FlagToEnd: function () {
            NewImg("imgSF", "images/Card/Plants/SunShroom.png", "left:667px;top:220px;clip:rect(auto,auto,60px,auto)", EDAll, {
                onclick: function () {
                    SelectModal(12);
                },
            });
            NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:676px", EDAll);
        },
    }
);
