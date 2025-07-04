oS.Init(
    {
        PName: [oPeashooter, oSunFlower, oCherryBomb],
        ZName: [oZombie, oZombie2, oZombie3, oConeheadZombie],
        PicArr: (function () {
            var a = oWallNut.prototype,
                b = a.PicArr;
            return ["images/interface/background1unsodded2.jpg", b[a.CardGif], b[a.NormalGif]];
        })(),
        backgroundImage: "images/interface/background1unsodded2.jpg",
        LF: [0, 0, 1, 1, 1, 0],
        CanSelectCard: 0,
        LevelName: "Level 1-3",
        LvlEName: 3,
        LargeWaveFlag: { 8: $("imgFlag1") },
        InitLawnMower: function () {
            var a = 5;
            while (--a > 1) {
                CustomSpecial(oLawnCleaner, a, -1);
            }
        },
        StartGame: function () {
            StopMusic();
            PlayMusic((oS.LoadMusic = oS.StartGameMusic));
            SetVisible($("dFlagMeter"), $("dTop"));
            oS.InitLawnMower();
            PrepareGrowPlants(function () {
                oP.Monitor();
                BeginCool();
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
        },
    },
    {
        AZ: [
            [oZombie, 3, 1],
            [oZombie2, 3, 1],
            [oZombie3, 2, 1],
            [oConeheadZombie, 1, 1],
        ],
        FlagNum: 8,
        FlagToSumNum: { a1: [3, 5, 7], a2: [1, 2, 3, 6] },
        FlagToMonitor: { 7: [ShowFinalWave, 0] },
        FlagToEnd: function () {
            NewImg("imgSF", "images/Card/Plants/WallNut.png", "left:827px;top:330px;clip:rect(auto,auto,60px,auto)", EDAll, {
                onclick: function () {
                    GetNewCard(this, oWallNut, 4);
                },
            });
            NewImg("PointerUD", "images/interface/PointerDown.gif", "top:295px;left:836px", EDAll);
        },
    }
);
