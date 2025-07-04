oS.Init(
    {
        PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut],
        ZName: [oZombie, oZombie2, oZombie3, oConeheadZombie],
        PicArr: ["images/interface/background1unsodded2.jpg", "images/interface/background1.jpg"],
        backgroundImage: "images/interface/background1unsodded2.jpg",
        CanSelectCard: 0,
        LevelName: "关卡 1-4",
        LvlEName: 4,
        AudioArr: ["dirt_rise"],
        LargeWaveFlag: { 9: $("imgFlag1") },
        StartGame: function () {
            NewEle("sod3row", "div", "position:absolute;left:-115px;top:0;height:600px;width:264px;z-index:0;background:url(images/interface/background1.jpg);over-flow:hidden", 0, EDPZ);
            NewImg("SodRoll_1", "images/interface/SodRoll.png", "left:122px;top:48px;z-index:1", EDPZ);
            NewImg("SodRollCap_1", "images/interface/SodRollCap.png", "left:117px;top:131px;z-index:1", EDPZ);
            NewImg("SodRoll_2", "images/interface/SodRoll.png", "left:122px;top:428px;z-index:1", EDPZ);
            NewImg("SodRollCap_2", "images/interface/SodRollCap.png", "left:117px;top:511px;z-index:1", EDPZ);
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
                e < 990
                    ? oSym.addTask(3, arguments.callee, [e, h, b, d, c, g, a, f])
                    : (ClearChild($("SodRoll_1"), $("SodRoll_2"), $("SodRollCap_1"), $("SodRollCap_2")),
                      (function () {
                          StopMusic();
                          PlayMusic((oS.LoadMusic = oS.StartGameMusic));
                          oS.InitLawnMower();
                          PrepareGrowPlants(function () {
                              oP.Monitor();
                              BeginCool();
                              SetVisible($("dFlagMeter"), $("dTop"));
                              AutoProduceSun(25);
                              oSym.addTask(
                                  1500,
                                  function () {
                                      oP.AddZombiesFlag();
                                      SetVisible($("dFlagMeterContent"));
                                  },
                                  []
                              );
                          });
                      })());
            })(283, 122, 68, 117, 73, 71, 131, 511);
        },
    },
    {
        AZ: [
            [oZombie, 3, 1],
            [oZombie2, 2, 1],
            [oZombie3, 2, 1],
            [oConeheadZombie, 2, 1],
        ],
        FlagNum: 9,
        FlagToSumNum: { a1: [3, 5, 8], a2: [1, 2, 3, 10] },
        FlagToMonitor: { 8: [ShowFinalWave, 0] },
        FlagToEnd: function () {
            NewImg("imgSF", "images/interface/Shovel.png", "left:667px;top:330px;cursor:pointer", EDAll).onclick = function () {
                SetHidden(EDAll, $("dFlagMeter"));
                SetStyle($("imgSF"), { left: "351px", top: "131px", width: "152px", height: "68px", cursor: "default" }).onclick = null;
                $("iNewPlantCard").src = "images/interface/Shovel.png";
                innerText($("dNewPlantTitle"), "你获得了铲子！");
                innerText($("dNewPlantName"), "铲子");
                innerText($("dNewPlantTooltip"), "你可以使用铲子铲除掉草坪上的植物");
                $("btnNextLevel").onclick = function () {
                    SelectModal(5);
                };
                SetVisible($("dNewPlant"));
            };
            NewImg("PointerUD", "images/interface/PointerDown.gif", "top:295px;left:676px", EDAll);
        },
    }
);
