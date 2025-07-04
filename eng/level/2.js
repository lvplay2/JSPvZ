oS.Init(
    {
        PName: [oPeashooter, oSunFlower],
        ZName: [oZombie, oZombie2, oZombie3],
        PicArr: (function () {
            var a = oCherryBomb.prototype,
                b = a.PicArr;
            return ["images/interface/SodRollCap.png", "images/interface/SodRoll.png", "images/interface/sod3row.png", "images/interface/background1unsodded_1.jpg", b[a.CardGif], b[a.NormalGif]];
        })(),
        backgroundImage: "images/interface/background1unsodded_1.jpg",
        LF: [0, 0, 1, 1, 1, 0],
        CanSelectCard: 0,
        LevelName: "Level 1-2",
        LvlEName: 2,
        AudioArr: ["dirt_rise"],
        LargeWaveFlag: { 6: $("imgFlag1") },
        InitLawnMower: function () {
            var a = 5;
            while (--a > 1) {
                CustomSpecial(oLawnCleaner, a, -1);
            }
        },
        StartGame: function () {
            NewEle("sod3row", "div", "position:absolute;left:123px;top:163px;height:330px;width:46px;z-index:1;background:url(images/interface/sod3row.png);over-flow:hidden", 0, EDPZ);
            NewImg("SodRoll_1", "images/interface/SodRoll.png", "left:136px;top:128px;z-index:1", EDPZ);
            NewImg("SodRollCap_1", "images/interface/SodRollCap.png", "left:131px;top:211px;z-index:1", EDPZ);
            NewImg("SodRoll_2", "images/interface/SodRoll.png", "left:136px;top:348px;z-index:1", EDPZ);
            NewImg("SodRollCap_2", "images/interface/SodRollCap.png", "left:131px;top:431px;z-index:1", EDPZ);
            PlayAudio("dirt_rise", true);
            (function (e, h, b, d, c, g, a, f) {
                e += 15;
                h += 16;
                d += 16;
                $("sod3row").style.width = e + "px";
                SetStyle($("SodRoll_1"), { left: h + "px", width: --b + "px", height: "141px" });
                SetStyle($("SodRoll_2"), { left: h + "px", width: b + "px", height: "141px" });
                SetStyle($("SodRollCap_1"), { left: d + "px", width: --c + "px", height: --g + "px", top: ++a + "px" });
                SetStyle($("SodRollCap_2"), { left: d + "px", width: c + "px", height: g + "px", top: ++f + "px" });
                e < 766
                    ? oSym.addTask(3, arguments.callee, [e, h, b, d, c, g, a, f])
                    : (PauseAudio("dirt_rise"),
                      ClearChild($("SodRoll_1"), $("SodRoll_2"), $("SodRollCap_1"), $("SodRollCap_2")),
                      (function () {
                          StopMusic();
                          PlayMusic((oS.LoadMusic = oS.StartGameMusic));
                          oS.InitLawnMower();
                          SetVisible($("dFlagMeter"), $("dTop"));
                          PrepareGrowPlants(function () {
                              NewEle("DivTeach", "div", 0, 0, EDAll);
                              oP.Monitor({
                                  ar: [0],
                                  f: function (l) {
                                      var m = oS.C + 1;
                                      switch (l) {
                                          case 0:
                                              innerText($("DivTeach"), "Sunflowers are an extremely important plant!");
                                              NewImg("PointerUD", "images/interface/PointerUP.gif", "top:120px;left:50px", EDAll);
                                              oSym.addTask(10, arguments.callee, [++l]);
                                              break;
                                          case 1:
                                              var j = oGd.$,
                                                  i;
                                              for (i in j) {
                                                  if (j[i].EName == "oSunFlower") {
                                                      innerText($("DivTeach"), "Planting at least 3 sunflowers improves your chances of surviving a zombie attack!");
                                                      oSym.addTask(10, arguments.callee, [++l]).addTask(
                                                          2500,
                                                          function () {
                                                              oP.AddZombiesFlag();
                                                              SetVisible($("dFlagMeterContent"));
                                                          },
                                                          []
                                                      );
                                                      return;
                                                  }
                                              }
                                              oSym.addTask(10, arguments.callee, [l]);
                                              break;
                                          case 2:
                                              var j = oGd.$,
                                                  i,
                                                  k = 0;
                                              for (i in j) {
                                                  j[i].EName == "oSunFlower" && ++k;
                                              }
                                              k > 1 && (innerText($("DivTeach"), "The more sunflowers you have, the faster you can grow plants!"), ++l);
                                              oSym.addTask(10, arguments.callee, [l]);
                                              break;
                                          default:
                                              var j = oGd.$,
                                                  i,
                                                  k = 0;
                                              for (i in j) {
                                                  j[i].EName == "oSunFlower" && ++k;
                                              }
                                              k > 2
                                                  ? (innerText($("DivTeach"), "Now use the sun you gained to grow other plants!"), SetStyle($("PointerUD"), { left: "50px", top: "60px" }), oSym.addTask(500, SetNone, [$("PointerUD"), $("DivTeach")]))
                                                  : oSym.addTask(10, arguments.callee, [3]);
                                      }
                                      return l;
                                  },
                              });
                              BeginCool();
                              AutoProduceSun(25);
                          });
                      })());
            })(65, 132, 68, 127, 73, 71, 211, 431);
        },
    },
    {
        AZ: [
            [oZombie, 6, 1],
            [oZombie2, 2, 1],
            [oZombie3, 2, 1],
        ],
        FlagNum: 6,
        FlagToSumNum: { a1: [3, 5], a2: [1, 2, 4] },
        FlagToMonitor: { 5: [ShowFinalWave, 0] },
        FlagToEnd: function () {
            NewImg("imgSF", "images/Card/Plants/CherryBomb.png", "left:827px;top:220px;clip:rect(auto,auto,60px,auto)", EDAll, {
                onclick: function () {
                    GetNewCard(this, oCherryBomb, 3);
                },
            });
            EditImg($("PointerUD"), 0, "images/interface/PointerDown.gif", { left: "836px", top: "185px", display: "block" });
        },
    }
);
