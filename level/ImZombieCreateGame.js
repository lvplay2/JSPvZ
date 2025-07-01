oS.Init(
    {
        PName: [oPeashooter, oSunFlower, oWallNut, oPotatoMine, oSnowPea, oChomper, oPuffShroom, oFumeShroom, oScaredyShroom, oSquash, oThreepeater, oSpikeweed, oTorchwood, oTallNut, oSplitPea, oStarfruit, oGarlic],
        ZName: [oZombie],
        PicArr: ["images/interface/background2.jpg", "images/interface/trophy.png"],
        backgroundImage: "images/interface/background2.jpg",
        BrainsNum: 5,
        ProduceSun: false,
        SunNum: 9990,
        DKind: 0,
        LevelName: "Custom I, Zombie level",
        LvlEName: "ImZombieCreateGame",
        LoadMusic: "Mountains",
        StartGameMusic: "Mountains",
        LargeWaveFlag: { 10: $("imgFlag3"), 20: $("imgFlag1") },
        InitLawnMower: function () {
            var a = 6;
            while (--a) {
                CustomSpecial(oBrains, a, -1);
            }
        },
        LvlClearFunc: function () {
            oS.ScrollScreen = oS.LvlVar.ScrollScreen;
            delete oS.LvlVar.ScrollScreen;
        },
        ArP: { ArC: [1, 4], ArR: [1, 5] },
        LoadAccess: function (a) {
            !oS.LvlVar ? (oS.LvlVar = { ScrollScreen: oS.ScrollScreen }) : (oS.LvlVar.ScrollScreen = oS.ScrollScreen);
            $("tGround").style.left = "-115px";
            oS.ScrollScreen = function () {
                $("tGround").style.left = 0;
                ClearChild($("dButton1"), $("dButton2"));
                (function () {
                    (EDAll.scrollLeft += 25) < 500 ? oSym.addTask(2, arguments.callee, []) : SetVisible($("dMenu"), $("dSelectCard"), $("dCardList"));
                })();
            };
            a(0);
        },
        StartGame: function () {
            oP.Monitor({
                ar: [],
                f: function () {
                    var a = NewEle("DivTeach", "div", "line-height:40px;font-size:14px;top:380px", 0, EDAll),
                        b = function (c) {
                            ClearChild($("DivTeach"));
                            ImmediatelyCool();
                            SetVisible($("tdShovel"), $("dFlagMeter"));
                            NewImg("iStripe", "images/interface/Stripe.png", "left:" + (GetX1X2(c)[0] - 11) + "px;top:65px", EDAll);
                            NewEle(
                                "btnClickSave",
                                "button",
                                "position:absolute;left:750px;top:250px;height:50px;width:100px;font-family: 幼圆; font-size:18px",
                                {
                                    innerHTML: "Save Level",
                                    onclick: function () {
                                        var g = oGd.$,
                                            k,
                                            m = "",
                                            i,
                                            l,
                                            f,
                                            d = oS.ArP.ArC[1] - 1,
                                            h = oS.ArP.ArR[1],
                                            j = {
                                                oPeashooter: "01",
                                                oSunFlower: "02",
                                                oWallNut: "04",
                                                oPotatoMine: "05",
                                                oSnowPea: "06",
                                                oChomper: "07",
                                                oRepeater: "08",
                                                oPuffShroom: "09",
                                                oFumeShroom: 11,
                                                oScaredyShroom: 14,
                                                oSquash: 18,
                                                oThreepeater: 19,
                                                oSpikeweed: 22,
                                                oTorchwood: 23,
                                                oTallNut: 24,
                                                oSplitPea: 29,
                                                oStarfruit: 30,
                                                oGarlic: 37,
                                            };
                                        for (k in g) {
                                            if (g.hasOwnProperty(k)) {
                                                m += (i = k.split("_"))[0] + i[1] + j[g[k].EName];
                                            }
                                        }
                                        if ($User.Visitor.UserName == "Guest") {
                                            alert("Only logged in users can save progress! \nPlease log in before saving progress!");
                                            return;
                                        }
                                        if ($P.length < h * d) {
                                            alert("The plants must fill the set range! \n\nPlease save again after the arrangement is complete!");
                                            return;
                                        }
                                        if ((f = prompt("Please enter the amount of sun, the range is 150-350 and must be a multiple of 25\nOptional: 150, 175, 200, 225, 250, 275, 300, 325, 350", "150")) == null) {
                                            return;
                                        }
                                        if (isNaN((f = Number(f))) || f % 25 != 0 || f < 150 || f > 350) {
                                            alert("Please enter a number between 150-350 and a multiple of 25!");
                                            return;
                                        }
                                        if ((l = prompt("Please enter a custom title (within 50 characters)\nIf not entered, the default title will be used", "")) != null) {
                                            $("btnClickSave").innerHTML = "Save";
                                            $("btnClickSave").disabled = "disabled";
                                            ClearChild($("JSPVZAjax"));
                                            NewEle("JSPVZAjax", "script", 0, { src: $User.Server.DataURL + "asp/ImZombieCreateGame.asp?SNum=" + f + "&T=" + escape(l) + "&C=" + escape(m), type: "text/javascript" }, document.body);
                                        }
                                    },
                                },
                                EDAll
                            );
                            oS.ArP.ArC = [1, c];
                        };
                    innerText(NewEle("spanT", "span", "position:absolute;left:20px;width:620px;text-align: center; font-family: 幼圆; font-size: 14px;line-height:50px", 0, a), "Select the number of columns to place your plants in:");
                    innerText(
                        NewEle(
                            "btnClick1",
                            "button",
                            "position:absolute;left:420px;top:10px;height:30px;width:40px;font-family:幼圆;font-size:14px",
                            {
                                onclick: function () {
                                    b(5);
                                },
                            },
                            a
                        ),
                        "4列"
                    );
                    innerText(
                        NewEle(
                            "btnClick2",
                            "button",
                            "position:absolute;left:470px;top:10px;height:30px;width:40px;font-family:幼圆;font-size:14px",
                            {
                                onclick: function () {
                                    b(6);
                                },
                            },
                            a
                        ),
                        "5列"
                    );
                    innerText(
                        NewEle(
                            "btnClick3",
                            "button",
                            "position:absolute;left:520px;top:10px;height:30px;width:40px;font-family:幼圆;font-size:14px",
                            {
                                onclick: function () {
                                    b(7);
                                },
                            },
                            a
                        ),
                        "6列"
                    );
                },
            });
        },
    },
    {
        AZ: [[oZombie, 4, 1]],
        FlagNum: 20,
        FlagToSumNum: { a1: [19], a2: [1, 2] },
        FlagToMonitor: { 9: [ShowLargeWave, 0], 19: [ShowFinalWave, 0] },
        FlagToEnd: function () {
            NewImg("imgSF", "images/interface/trophy.png", "left:260px;top:233px", EDAll, {
                onclick: function () {
                    SelectModal(0);
                },
            });
            NewImg("PointerUD", "images/interface/PointerDown.gif", "top:198px;left:269px", EDAll);
        },
    },
    {
        GrowPlant: function (k, d, c, e, b) {
            var i = oS.ChoseCard,
                f = ArCard[i],
                g = f.PName,
                j = g.prototype,
                h = j.coolTime,
                a;
            j.CanGrow(k, e, b) && (CustomSpecial(g, e, b, 1), oSym.addTask(20, SetHidden, [SetStyle($("imgGrowSoil"), { left: d - 30 + "px", top: c - 40 + "px", zIndex: 3 * e, visibility: "visible" })]));
            CancelPlant();
        },
        ViewPlantTitle: function (a) {
            var c = $("dTitle"),
                b = ArCard[a].PName.prototype;
            c.innerHTML = b.CName + "<br>" + b.Tooltip;
            SetStyle(c, { top: 60 * a + "px", left: EDAlloffsetLeft + 100 + "px" });
        },
    }
);
