oS.Init(
    {
        PName: [
            oPeashooter,
            oSunFlower,
            oCherryBomb,
            oWallNut,
            oPotatoMine,
            oSnowPea,
            oChomper,
            oRepeater,
            oPuffShroom,
            oSunShroom,
            oFumeShroom,
            oGraveBuster,
            oHypnoShroom,
            oScaredyShroom,
            oIceShroom,
            oDoomShroom,
            oLilyPad,
            oSquash,
            oThreepeater,
            oTangleKlep,
            oJalapeno,
            oSpikeweed,
            oTorchwood,
            oTallNut,
            oSeaShroom,
        ],
        ZName: [oZombie, oZombie2, oDuckyTubeZombie1, oConeheadZombie, oJackinTheBoxZombie],
        PicArr: (function () {
            var b = oTallNut.prototype,
                c = b.PicArr,
                a = "images/interface/fog",
                d = $User.Browser.IE && !$User.Browser.IE9 ? "gif" : "png";
            return ["images/interface/background4.jpg", "images/interface/Dave.gif", c[b.CardGif], c[b.NormalGif], a + "0." + d, a + "1." + d, a + "2." + d, a + "3." + d];
        })(),
        Coord: 2,
        SunNum: 50,
        LF: [0, 1, 1, 2, 2, 1, 1],
        backgroundImage: "images/interface/background4.jpg",
        CanSelectCard: 1,
        DKind: 0,
        HaveFog: 3,
        LevelName: "关卡 4-1",
        LvlEName: 31,
        AudioArr: ["crazydavelong1", "crazydavelong3"],
        LargeWaveFlag: { 10: $("imgFlag1") },
        UserDefinedFlagFunc: function (a) {
            oP.FlagNum == oP.FlagZombies && oP.SetTimeoutWaterZombie(6, 9, 3, [oDuckyTubeZombie1]);
        },
        LoadMusic: "Faster",
        StartGameMusic: "Loonboon",
        LoadAccess: function (a) {
            EDAll.scrollLeft = 0;
            NewImg("dDave", "images/interface/Dave.gif", "left:0;top:81px;z-index:20", EDAll);
            NewEle("DivTeach", "div", 0, 0, EDAll);
            (function (d) {
                var b = arguments.callee,
                    c = $("DivTeach");
                switch (d) {
                    case 0:
                        PlayAudio("crazydavelong1");
                        c.onclick = null;
                        $("dDave").src = "images/interface/Dave3.gif";
                        oSym.addTask(
                            110,
                            function () {
                                $("dDave").src = "images/interface/Dave.gif";
                                c.onclick = function () {
                                    oSym.addTask(10, b, [1]);
                                };
                            },
                            []
                        );
                        c.innerHTML = '<span style="font-size:22px">你知道，他们曾叫我“迷雾男”。(点击继续)</span>';
                        break;
                    case 1:
                        PlayAudio("crazydavelong3");
                        c.onclick = null;
                        $("dDave").src = "images/interface/Dave3.gif";
                        oSym.addTask(
                            100,
                            function () {
                                $("dDave").src = "images/interface/Dave.gif";
                                c.onclick = function () {
                                    oSym.addTask(10, b, [2]);
                                };
                            },
                            []
                        );
                        c.innerHTML = '<span style="font-size:22px">因为我曾停留在雾中并突然从人群中跳出！(点击继续)</span>';
                        break;
                    case 2:
                        PlayAudio("crazydavelong3");
                        c.onclick = null;
                        $("dDave").src = "images/interface/Dave3.gif";
                        oSym.addTask(
                            100,
                            function () {
                                $("dDave").src = "images/interface/Dave.gif";
                                c.onclick = function () {
                                    oSym.addTask(10, b, [3]);
                                };
                            },
                            []
                        );
                        c.innerHTML = '<span style="font-size:22px">噢，那都是过去的事了。(点击继续)</span>';
                        break;
                    case 3:
                        $("dDave").src = "images/interface/Dave2.gif";
                        ClearChild($("DivTeach"));
                        oSym.addTask(
                            50,
                            function () {
                                ClearChild($("dDave"));
                                a(0);
                                StopMusic();
                                PlayMusic((oS.LoadMusic = "Look up at the Sky"));
                            },
                            []
                        );
                }
            })(0);
        },
    },
    {
        AZ: [
            [oZombie, 6, 1],
            [oZombie2, 1, 1],
            [oDuckyTubeZombie1, 1, 6, [6, 10]],
            [oConeheadZombie, 1, 1],
            [oJackinTheBoxZombie, 1, 5, [5, 6, 10]],
        ],
        FlagNum: 10,
        FlagToSumNum: { a1: [3, 5, 9], a2: [1, 2, 3, 10] },
        FlagToMonitor: { 9: [ShowFinalWave, 0] },
        FlagToEnd: function () {
            NewImg("imgSF", "images/Card/Plants/Plantern.png", "left:627px;top:325px;clip:rect(auto,auto,60px,auto)", EDAll, {
                onclick: function () {
                    SelectModal(0);
                },
            });
            NewImg("PointerUD", "images/interface/PointerDown.gif", "top:290px;left:636px", EDAll);
        },
    }
);
