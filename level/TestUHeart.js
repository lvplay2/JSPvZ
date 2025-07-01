oS.Init(
    {
        PName: [oPeashooter, oPotatoMine, oSquash, oCherryBomb, oJalapeno],
        ZName: [oZombie],
        PicArr: ["images/interface/background1.jpg"],
        backgroundImage: "images/interface/background1.jpg",
        CanSelectCard: 0,
        SunNum: 100,
        LevelName: "Test Your Heart",
        LvlEName: "TestUHeart",
        LargeWaveFlag: { 1: $("imgFlag1") },
        StartGameMusic: "Watery Graves",
        StartGame: function () {
            SetVisible($("tdShovel"), $("dFlagMeter"), $("dTop"));
            var a = NewEle("DivTeach", "div", "line-height:40px;font-size: 14px", 0, EDAll);
            NewEle("spanT", "span", "position:absolute;left:0;width:620px;text-align: center; font-family: 幼圆; font-size: 14px;line-height:50px", 0, a);
            NewEle("btnClick1", "span", "cursor:pointer;position:absolute;left:620px;height:40px;width:40px;text-align:center;line-height:40px;font-family: 幼圆; font-size: 14px;color:#FFF;border:1px solid #888;background:#000", 0, a);
            NewEle("btnClick2", "span", "cursor:pointer;position:absolute;left:670px;height:40px;width:60px;text-align:center;line-height:40px;font-family: 幼圆; font-size: 14px;color:#FFF;border:1px solid #888;background:#000", 0, a);
            NewEle("btnClick3", "span", "cursor:pointer;position:absolute;left:740px;height:40px;width:140px;text-align:center;line-height:40px;font-family: 幼圆; font-size: 14px;color:#FFF;border:1px solid #888;background:#000", 0, a);
            innerText($("spanT"), "Test whether the CPU and browser are powerful. Open Task Manager and click Start!");
            innerText($("btnClick1"), "100");
            innerText($("btnClick2"), "1000");
            innerText($("btnClick3"), "Give me 5000!!");
            CustomPlants(0, 2, 5);
            CustomPlants(0, 3, 9);
            CustomPlants(0, 4, 1);
            oP.Monitor({
                ar: [0],
                f: function () {
                    var c = $User.Browser,
                        b = function () {
                            StopMusic();
                            PlayMusic((oS.LoadMusic = oS.StartGameMusic));
                            oS.InitLawnMower();
                            PrepareGrowPlants(function () {
                                BeginCool();
                                AutoProduceSun(25);
                                oP.AddZombiesFlag();
                                SetVisible($("dFlagMeterContent"));
                            });
                        };
                    $("btnClick1").onclick = function () {
                        oP.FlagToSumNum.a2 = [100];
                        innerText($("DivTeach"), "Time to unleash our 100 guest zombie performers!");
                        b();
                    };
                    $("btnClick2").onclick = function () {
                        oP.FlagToSumNum.a2 = [1000];
                        innerText($("DivTeach"), "And now... please welcome our 1,000 zombie guest stars!");
                        b();
                    };
                    $("btnClick3").onclick = function () {
                        oP.FlagToSumNum.a2 = [5000];
                        innerText($("DivTeach"), "Here come 5,000 guest stars!! They might need a little time to get their makeup done, so hang tight...");
                        b();
                    };
                    (c.IE9 || !c.IE) &&
                        ((oS.LvlClearFunc = function () {
                            oP.SelectFlagZombie = oP.OldSelectFlagZombie;
                        }),
                        (oP.OldSelectFlagZombie = oP.SelectFlagZombie),
                        (oP.SelectFlagZombie = function (h) {
                            var i = oP,
                                g = [],
                                f = 1,
                                j = i.ArZ,
                                m = [],
                                k = [],
                                e = 30,
                                d = EDPZ.cloneNode(true);
                            oS.LargeWaveFlag[i.FlagZombies].style.top = "5px";
                            --h;
                            k[0] = (m[0] = new oFlagZombie()).prepareBirth(0);
                            while (h--) {
                                k[f] = (m[f++] = new oZombie()).prepareBirth(e);
                                e += 5;
                            }
                            i.NumZombies += f;
                            d.innerHTML = EDPZ.innerHTML + k.join("");
                            EDAll.replaceChild(d, EDPZ);
                            EDPZ = d;
                            while (f--) {
                                m[f].Birth();
                            }
                        }));
                },
            });
        },
    },
    { AZ: [[oZombie, 30, 1]], FlagNum: 1, FlagToSumNum: { a1: [], a2: [1000] }, FlagToMonitor: { 1: [ShowFinalWave, 0] } }
);
