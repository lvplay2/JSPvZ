oS.Init(
    {
        PName: [oPeashooter],
        ZName: [oZombie],
        PicArr: (function () {
            var a = oSunFlower.prototype,
                b = a.PicArr;
            return ["images/interface/SodRollCap.png", "images/interface/SodRoll.png", "images/interface/sod1row.png", "images/interface/background1unsodded.jpg", b[a.CardGif], b[a.NormalGif]];
        })(),
        SunNum: 175,
        backgroundImage: "images/interface/background1unsodded.jpg",
        LF: [0, 0, 0, 1, 0, 0],
        CanSelectCard: 0,
        LevelName: "Level 1-1 (Tutorial)",
        LvlEName: 1,
        AudioArr: ["dirt_rise"],
        InitLawnMower: function () {
            CustomSpecial(oLawnCleaner, 3, -1);
        },
        StartGame: function () {
            StopMusic();
            PlayMusic((oS.LoadMusic = oS.StartGameMusic));
            NewEle("sod1row", "div", "position:absolute;left:132px;top:280px;height:117px;width:0;z-index:1;background:url(images/interface/sod1row.png);over-flow:hidden", 0, EDPZ);
            NewImg("SodRoll", "images/interface/SodRoll.png", "left:112px;top:244px;z-index:1", EDPZ);
            NewImg("SodRollCap", "images/interface/SodRollCap.png", "left:17px;top:322px;z-index:1", EDPZ);
            PlayAudio("dirt_rise", true);
            (function (e, g, a, d, c, f, b) {
                e += 15;
                g += 16;
                d += 16;
                $("sod1row").style.width = e + "px";
                SetStyle($("SodRoll"), { left: g + "px", width: --a + "px", height: "141px" });
                SetStyle($("SodRollCap"), { left: d + "px", width: --c + "px", height: --f + "px", top: ++b + "px" });
                e < 755
                    ? oSym.addTask(3, arguments.callee, [e, g, a, d, c, f, b])
                    : (PauseAudio("dirt_rise"),
                      ClearChild($("SodRoll"), $("SodRollCap")),
                      (function () {
                          NewEle("DivTeach", "div", 0, 0, EDAll);
                          oS.InitLawnMower();
                          oP.Monitor({
                              ar: [0],
                              f: function (k) {
                                  var l = oS.C + 1,
                                      i = oS.Chose;
                                  switch (k) {
                                      case 0:
                                          innerText($("DivTeach"), "Click on a seed packet to pick it up!");
                                          NewImg("PointerUD", "images/interface/PointerUP.gif", "top:60px;left:50px", EDAll);
                                          oSym.addTask(10, arguments.callee, [++k]);
                                          break;
                                      case 1:
                                          i > 0 && (innerText($("DivTeach"), "Click on the grass to plant your seed!"), EditImg($("PointerUD"), "", "images/interface/PointerDown.gif", { left: "170px", top: "270px" }), ++k);
                                          oSym.addTask(10, arguments.callee, [k]);
                                          break;
                                      case 2:
                                          var h = oGd.$;
                                          while (--l) {
                                              if (h["3_" + l + "_1"]) {
                                                  SetHidden($("PointerUD"));
                                                  innerText($("DivTeach"), "Click on the falling sun to collect it!");
                                                  AutoProduceSun(25);
                                                  oSym.addTask(10, arguments.callee, [++k]);
                                                  return;
                                              }
                                          }
                                          !i && (ClearChild($("PointerUD")), (k = 0));
                                          oSym.addTask(10, arguments.callee, [k]);
                                          break;
                                      case 3:
                                          oS.SunNum > 99 &&
                                              (innerText($("DivTeach"), ("Excellent! You've collected enough sun for your next plant!"), EditImg($("PointerUD"), "", "images/interface/PointerUP.gif", { left: "50px", top: "60px", visibility: "visible" }), ++k);
                                          oSym.addTask(10, arguments.callee, [k]);
                                          break;
                                      default:
                                          var j = 0,
                                              h = oGd.$;
                                          while (--l) {
                                              h["3_" + l + "_1"] && ++j;
                                          }
                                          j > 0 ? (SetHidden($("PointerUD")), innerText($("DivTeach"), "Don\'t let the zombies reach your house!"), oP.AddZombiesFlag(), oSym.addTask(500, SetNone, [$("DivTeach")])) : oSym.addTask(10, arguments.callee, [4]);
                                  }
                              },
                          });
                          BeginCool();
                          SetVisible($("dFlagMeter"), $("dTop"));
                      })());
            })(35, 122, 68, 117, 73, 71, 322);
        },
    },
    {
        AZ: [[oZombie, 5, 1]],
        FlagNum: 4,
        FlagToSumNum: { a1: [3], a2: [1, 2] },
        FlagToMonitor: { 3: [ShowFinalWave, 0] },
        FlagToEnd: function () {
            NewImg("imgSF", "images/Card/Plants/SunFlower.png", "left:667px;top:330px;clip:rect(auto,auto,60px,auto)", EDAll, {
                onclick: function () {
                    GetNewCard(this, oSunFlower, 2);
                },
            });
            EditImg($("PointerUD"), 0, "images/interface/PointerDown.gif", { left: "676px", top: "295px", visibility: "visible" });
        },
    }
);
