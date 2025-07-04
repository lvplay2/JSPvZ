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
        ],
        ZName: [oZombie, oZombie2, oZombie3, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oConeheadZombie, oZomboni],
        PicArr: (function () {
            var a = oSpikeweed.prototype,
                b = a.PicArr;
            return ["images/interface/background3.jpg", b[a.CardGif], b[a.NormalGif]];
        })(),
        Coord: 2,
        SunNum: 50,
        LF: [0, 1, 1, 2, 2, 1, 1],
        backgroundImage: "images/interface/background3.jpg",
        CanSelectCard: 1,
        LevelName: "关卡 3-6",
        LvlEName: 26,
        LargeWaveFlag: { 10: $("imgFlag3"), 20: $("imgFlag2"), 30: $("imgFlag1") },
        UserDefinedFlagFunc: function (a) {
            oP.FlagNum == oP.FlagZombies && oP.SetTimeoutWaterZombie(6, 9, 3, [oDuckyTubeZombie1]);
        },
        StartGameMusic: "Kitanai Sekai",
    },
    {
        AZ: [
            [oZombie, 2, 1],
            [oZombie2, 3, 1],
            [oZombie3, 1, 1],
            [oDuckyTubeZombie1, 1, 6, [6, 7, 8, 10, 20, 29, 30]],
            [oDuckyTubeZombie2, 1, 6],
            [oDuckyTubeZombie3, 1, 6],
            [oConeheadZombie, 1, 1],
            [oZomboni, 1, 20, [10, 20]],
        ],
        FlagNum: 30,
        FlagToSumNum: { a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29], a2: [1, 2, 3, 10, 4, 5, 6, 15, 7, 8, 9, 25] },
        FlagToMonitor: { 9: [ShowLargeWave, 0], 19: [ShowLargeWave, 0], 29: [ShowFinalWave, 0] },
        FlagToEnd: function () {
            NewImg("imgSF", "images/Card/Plants/Spikeweed.png", "left:627px;top:325px;clip:rect(auto,auto,60px,auto)", EDAll, {
                onclick: function () {
                    GetNewCard(this, oSpikeweed, 0);
                },
            });
            NewImg("PointerUD", "images/interface/PointerDown.gif", "top:290px;left:636px", EDAll);
        },
    }
);
