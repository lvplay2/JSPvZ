oS.Init(
    {
        PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine],
        ZName: [oZombie, oZombie2, oZombie3, oConeheadZombie, oPoleVaultingZombie],
        PicArr: (function () {
            var a = oSnowPea.prototype,
                b = a.PicArr;
            return ["images/interface/background1.jpg", "images/interface/crater1.png", b[a.CardGif], b[a.NormalGif]];
        })(),
        backgroundImage: "images/interface/background1.jpg",
        CanSelectCard: 0,
        LevelName: "Level 1-6",
        LvlEName: 6,
        LargeWaveFlag: { 9: $("imgFlag1") },
    },
    {
        AZ: [
            [oZombie, 3, 1],
            [oZombie2, 2, 1],
            [oZombie3, 2, 1],
            [oConeheadZombie, 2, 1],
            [oPoleVaultingZombie, 1, 1],
        ],
        FlagNum: 9,
        FlagToSumNum: { a1: [3, 5, 8], a2: [1, 2, 3, 9] },
        FlagToMonitor: { 8: [ShowFinalWave, 0] },
        FlagToEnd: function () {
            NewImg("imgSF", "images/Card/Plants/SnowPea.png", "left:827px;top:525px;clip:rect(auto,auto,60px,auto)", EDAll, {
                onclick: function () {
                    GetNewCard(this, oSnowPea, 7);
                },
            });
            NewImg("PointerUD", "images/interface/PointerDown.gif", "top:490px;left:836px", EDAll);
        },
    }
);
