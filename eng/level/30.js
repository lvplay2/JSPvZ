oS.Init(
    {
        PName: [oLilyPad, oThreepeater, oJalapeno, oSpikeweed, oTorchwood, oTangleKlep, oTallNut],
        ZName: [oZombie, oZombie2, oZombie3, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oConeheadZombie, oBucketheadZombie, oDolphinRiderZombie, oZomboni, oSnorkelZombie],
        PicArr: ["images/interface/background3.jpg", "images/interface/trophy.png"],
        Coord: 2,
        SunNum: 50,
        LF: [0, 1, 1, 2, 2, 1, 1],
        backgroundImage: "images/interface/background3.jpg",
        CanSelectCard: 0,
        LevelName: "Level 3-10",
        LvlEName: 30,
        LargeWaveFlag: { 10: $("imgFlag3"), 20: $("imgFlag2"), 30: $("imgFlag1") },
        StaticCard: 0,
        StartGameMusic: "2.75",
        UserDefinedFlagFunc: function (a) {
            oP.FlagNum == oP.FlagZombies && oP.SetTimeoutWaterZombie(6, 9, 3, [oDuckyTubeZombie1]);
        },
        StartGameMusic: "2.75",
        StartGame: function () {
            StopMusic();
            PlayMusic((oS.LoadMusic = oS.StartGameMusic));
            SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
            SetHidden($("dSunNum"));
            oS.InitLawnMower();
            PrepareGrowPlants(function () {
                oP.Monitor({
                    f: function () {
                        (function () {
                            var a = ArCard.length;
                            if (a < 10) {
                                var c = oS.PName,
                                    b = oP.FlagZombies < 6 ? (Math.floor(1 + Math.random() * 10) < 4 ? 1 : Math.floor(Math.random() * c.length)) : Math.floor(1 + Math.random() * 10) < 3 ? 0 : Math.floor(Math.random() * c.length),
                                    e = c[b],
                                    d = e.prototype,
                                    f = "dCard" + Math.random();
                                ArCard[a] = { DID: f, PName: e, PixelTop: 600 };
                                NewImg(f, d.PicArr[d.CardGif], "top:600px;width:100px;height:120px;cursor:pointer;clip:rect(auto,auto,60px,auto)", $("dCardList"), {
                                    onmouseover: function (g) {
                                        ViewPlantTitle(GetChoseCard(f), g);
                                    },
                                    onmouseout: function () {
                                        SetHidden($("dTitle"));
                                    },
                                    onclick: function (g) {
                                        ChosePlant(g, oS.ChoseCard, f);
                                    },
                                });
                            }
                            oSym.addTask(600, arguments.callee, []);
                        })();
                        (function () {
                            var b = ArCard.length,
                                a,
                                c;
                            while (b--) {
                                (c = (a = ArCard[b]).PixelTop) > 60 * b && ($(a.DID).style.top = (a.PixelTop = c - 1) + "px");
                            }
                            oSym.addTask(5, arguments.callee, []);
                        })();
                    },
                    ar: [],
                });
                oP.AddZombiesFlag();
                SetVisible($("dFlagMeterContent"));
            });
        },
    },
    {
        AZ: [
            [oZombie, 3, 1],
            [oZombie2, 3, 1],
            [oZombie3, 2, 1],
            [oDuckyTubeZombie1, 1, 6, [6, 7, 8, 10, 19, 20, 25, 30]],
            [oDuckyTubeZombie2, 1, 6, [10, 20, 30]],
            [oDuckyTubeZombie3, 1, 6, [10, 20, 30]],
            [oConeheadZombie, 4, 1],
            [oBucketheadZombie, 2, 1],
            [oDolphinRiderZombie, 1, 10, [10, 14, 15, 16, 18, 19, 20]],
            [oZomboni, 1, 30, [30]],
            [oDolphinRiderZombie, 1, 30, [30]],
        ],
        FlagNum: 30,
        FlagToSumNum: { a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29], a2: [3, 6, 12, 20, 18, 24, 30, 40, 36, 42, 48, 60] },
        FlagToMonitor: { 9: [ShowLargeWave, 0], 19: [ShowLargeWave, 0], 29: [ShowFinalWave, 0] },
        FlagToEnd: function () {
            NewImg("imgSF", "images/interface/trophy.png", "left:667px;top:220px", EDAll, {
                onclick: function () {
                    SelectModal(31);
                },
            });
            NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:676px", EDAll);
        },
    },
    {
        GetChoseCard: function (b) {
            var a = ArCard.length;
            while (a--) {
                ArCard[a].DID == b && ((oS.ChoseCard = a), (a = 0));
            }
            return oS.ChoseCard;
        },
        ChosePlant: function (a, b) {
            PlayAudio("seedlift");
            a = window.event || a;
            var f = ArCard[oS.ChoseCard],
                e = a.clientX - EDAlloffsetLeft + EBody.scrollLeft || EElement.scrollLeft,
                d = a.clientY + EBody.scrollTop || EElement.scrollTop,
                c = f.PName.prototype;
            oS.Chose = 1;
            EditImg(
                NewImg("MovePlant", c.PicArr[c.StaticGif], "left:" + e - 0.5 * (c.beAttackedPointL + c.beAttackedPointR) + "px;top:" + d + 20 - c.height + "px;z-index:254", EDAll).cloneNode(false),
                "MovePlantAlpha",
                "",
                { visibility: "hidden", filter: "alpha(opacity=40)", opacity: 0.4, zIndex: 30 },
                EDAll
            );
            SetAlpha($(f.DID), 50, 0.5);
            SetHidden($("dTitle"));
            GroundOnmousemove = GroundOnmousemove1;
        },
        CancelPlant: function () {
            ClearChild($("MovePlant"), $("MovePlantAlpha"));
            oS.Chose = 0;
            SetAlpha($(ArCard[oS.ChoseCard].DID), 100, 1);
            oS.ChoseCard = "";
            GroundOnmousemove = function () {};
        },
        GrowPlant: function (l, c, b, f, a) {
            var j = oS.ChoseCard,
                g = ArCard[j],
                i = g.PName,
                k = i.prototype,
                d = g.DID,
                e,
                h = oGd.$LF[f];
            k.CanGrow(l, f, a) &&
                (function () {
                    PlayAudio(h != 2 ? "plant" + Math.floor(1 + Math.random() * 2) : "plant_water");
                    new i().Birth(c, b, f, a, l);
                    oSym.addTask(20, SetNone, [SetStyle($("imgGrowSoil"), { left: c - 30 + "px", top: b - 40 + "px", zIndex: 3 * f, visibility: "visible" })]);
                    ClearChild($("MovePlant"), $("MovePlantAlpha"));
                    $("dCardList").removeChild((e = $(d)));
                    e = null;
                    ArCard.splice(j, 1);
                    oS.ChoseCard = "";
                    oS.Chose = 0;
                    GroundOnmousemove = function () {};
                })();
        },
        ViewPlantTitle: function (a) {},
    }
);
