oS.Init(
    {
        PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut],
        ZName: [oZombie, oZombie2, oZombie3, oConeheadZombie],
        PicArr: (function () {
            var a = oPotatoMine.prototype,
                b = a.PicArr;
            return ["images/interface/background1.jpg", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
        })(),
        backgroundImage: "images/interface/background1.jpg",
        CanSelectCard: 0,
        LevelName: "Level 1-5",
        LvlClearFunc: function () {
            oSym.TimeStep = 10;
        },
        LvlEName: 5,
        LargeWaveFlag: { 10: $("imgFlag1") },
        StartGameMusic: "Watery Graves",
        StartGame: function () {
            SetHidden($("dSunNum"));
            SetVisible($("tdShovel"), $("dTop"));
            NewEle("DivTeach", "div", 0, 0, EDAll);
            oP.Monitor(
                {
                    ar: [0],
                    f: function (c) {
                        var d,
                            a = oGd.$,
                            b = oS.Chose;
                        switch (c) {
                            case 0:
                                innerText($("DivTeach"), "Use your shovel and dig up those plants!");
                                NewImg("PointerUD", "images/interface/PointerUP.gif", "top:36px;left:250px", EDAll);
                                oSym.addTask(10, arguments.callee, [++c]);
                                break;
                            case 1:
                                b < 0 && (innerText($("DivTeach"), "Click on a plant to remove it!"), ++c);
                                oSym.addTask(10, arguments.callee, [c]);
                                break;
                            case 2:
                                !(a["2_6_1"] && a["3_8_1"] && a["4_7_1"]) ? (innerText($("DivTeach"), "Keep digging until your lawn is clear of plants!"), ++c) : b > -1 && (innerText($("DivTeach"), "Click on the shovel to pick it up!"), (c = 1));
                                oSym.addTask(10, arguments.callee, [c]);
                                break;
                            default:
                                !(a["2_6_1"] || a["3_8_1"] || a["4_7_1"])
                                    ? (function () {
                                          SetHidden($("DivTeach"), $("PointerUD"));
                                          SetVisible($("dSunNum"), $("dFlagMeter"), $("dTop"));
                                          StopMusic();
                                          PlayMusic((oS.LoadMusic = oS.StartGameMusic));
                                          oS.InitLawnMower();
                                          PrepareGrowPlants(function () {
                                              BeginCool();
                                              AutoProduceSun(25);
                                              oSym.addTask(
                                                  2000,
                                                  function () {
                                                      oP.AddZombiesFlag();
                                                      SetVisible($("dFlagMeterContent"));
                                                  },
                                                  []
                                              );
                                          });
                                      })()
                                    : oSym.addTask(10, arguments.callee, [3]);
                        }
                    },
                },
                function () {
                    var c = Math.floor(1 + Math.random() * 5),
                        f = Math.floor(1 + Math.random() * 9),
                        g = GetX(f) - 55,
                        e = GetY(c) - 60,
                        b = c + "_" + f,
                        a = oP.FlagZombies,
                        d;
                    switch (true) {
                        case a > 3:
                            SetStyle((d = $("imgCrater")), { left: g + "px", top: e + "px", zIndex: 3 * c });
                            delete oGd.$Crater[d.getAttribute("S")];
                            oGd.$Crater[b] = 2;
                            d.setAttribute("S", b);
                            (d = oGd.$[b + "_1"]) && d.Die();
                            break;
                        case a > 2:
                            NewImg("imgCrater", "images/interface/crater1.png", "left:" + g + "px;top:" + e + "px;z-index:" + 3 * c, EDAll).setAttribute("S", b);
                            (d = oGd.$[b + "_1"]) && d.Die();
                            oGd.$Crater[b] = 2;
                    }
                }
            );
            SetVisible($("dFlagMeter"));
            CustomPlants(0, 2, 6);
            CustomPlants(0, 3, 8);
            CustomPlants(0, 4, 7);
        },
    },
    {
        AZ: [
            [oZombie, 3, 1],
            [oZombie2, 2, 1],
            [oZombie3, 2, 1],
            [oConeheadZombie, 3, 1],
        ],
        FlagNum: 10,
        FlagToSumNum: { a1: [3, 5, 9], a2: [1, 2, 3, 10] },
        FlagToMonitor: { 9: [ShowFinalWave, 0] },
        FlagToEnd: function () {
            NewImg("imgSF", "images/Card/Plants/PotatoMine.png", "left:587px;top:270px;clip:rect(auto,auto,60px,auto)", EDAll, {
                onclick: function () {
                    GetNewCard(this, oPotatoMine, 6);
                },
            });
            NewImg("PointerUD", "images/interface/PointerDown.gif", "top:235px;left:596px", EDAll);
        },
    }
);
