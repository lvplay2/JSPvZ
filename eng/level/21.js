oS.Init(
    {
        PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster, oHypnoShroom, oScaredyShroom, oIceShroom, oDoomShroom, oLilyPad],
        ZName: [oZombie, oZombie2, oZombie3, oDuckyTubeZombie1, oConeheadZombie],
        PicArr: (function () {
            var a = oSquash.prototype,
                b = a.PicArr;
            return ["images/interface/background3.jpg", "images/interface/Dave.gif", "images/interface/Dave2.gif", "images/interface/Dave3.gif", b[a.CardGif], b[a.NormalGif]];
        })(),
        Coord: 2,
        SunNum: 50,
        LF: [0, 1, 1, 2, 2, 1, 1],
        backgroundImage: "images/interface/background3.jpg",
        CanSelectCard: 1,
        LevelName: "Level 3-1",
        LvlEName: 21,
        AudioArr: ["crazydaveshort2", "crazydavelong1", "crazydavelong2", "crazydavelong3"],
        LargeWaveFlag: { 10: $("imgFlag1") },
        UserDefinedFlagFunc: function (a) {
            oP.FlagNum == oP.FlagZombies && oP.SetTimeoutWaterZombie(6, 9, 2, [oDuckyTubeZombie1]);
        },
        StartGameMusic: "Kitanai Sekai",
        LoadAccess: function (a) {
            NewImg("dDave", "images/interface/Dave.gif", "left:0;top:81px", EDAll);
            NewEle("DivTeach", "div", 0, 0, EDAll);
            (function (d) {
                var b = arguments.callee,
                    c = $("DivTeach");
                switch (d) {
                    case 0:
                        PlayAudio("crazydavelong" + Math.floor(1 + Math.random() * 3));
                        c.onclick = null;
                        $("dDave").src = "images/interface/Dave3.gif";
                        oSym.addTask(
                            200,
                            function () {
                                $("dDave").src = "images/interface/Dave.gif";
                                c.onclick = function () {
                                    oSym.addTask(10, b, [1]);
                                };
                            },
                            []
                        );
                        innerText(c, "Looks like the zombies gave up attacking your front yard. (Click to continue)");
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
                        innerText(c, "Now they're trying your backyard. (Click to continue)");
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
                        innerText(c, "And to top it all off, you can't even use your mushrooms! (Click to continue)");
                        break;
                    case 3:
                        PlayAudio("crazydaveshort2");
                        c.onclick = null;
                        $("dDave").src = "images/interface/Dave3.gif";
                        oSym.addTask(
                            100,
                            function () {
                                $("dDave").src = "images/interface/Dave.gif";
                                c.onclick = function () {
                                    oSym.addTask(10, b, [4]);
                                };
                            },
                            []
                        );
                        innerText(c, "'cause they'll fall asleep during the day! (Click to continue)");
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
                        innerText(c, "Well isn't that just dandy! (Click to continue)");
                        break;
                    case 5:
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
            [oZombie3, 3, 1],
            [oDuckyTubeZombie1, 1, 6, [6, 7, 8, 10]],
            [oConeheadZombie, 2, 1],
        ],
        FlagNum: 10,
        FlagToSumNum: { a1: [3, 5, 9], a2: [1, 2, 3, 10] },
        FlagToMonitor: { 9: [ShowFinalWave, 0] },
        FlagToEnd: function () {
            NewImg("imgSF", "images/Card/Plants/Squash.png", "left:827px;top:525px;clip:rect(auto,auto,60px,auto)", EDAll, {
                onclick: function () {
                    SelectModal(22);
                },
            });
            NewImg("PointerUD", "images/interface/PointerDown.gif", "top:490px;left:836px", EDAll);
        },
    }
);
