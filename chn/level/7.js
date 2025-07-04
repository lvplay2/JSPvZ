oS.Init(
    {
        PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea],
        ZName: [oZombie, oZombie2, oZombie3, oConeheadZombie, oPoleVaultingZombie],
        PicArr: (function () {
            var a = oChomper.prototype,
                b = a.PicArr;
            return ["images/interface/background1.jpg", b[a.CardGif], b[a.NormalGif]];
        })(),
        backgroundImage: "images/interface/background1.jpg",
        CanSelectCard: 0,
        LevelName: "关卡 1-7",
        LvlEName: 7,
        LargeWaveFlag: { 10: $("imgFlag3"), 20: $("imgFlag1") },
    },
    {
        AZ: [
            [oZombie, 3, 1],
            [oZombie2, 2, 1],
            [oZombie3, 2, 1],
            [oConeheadZombie, 2, 1],
            [oPoleVaultingZombie, 1, 1],
        ],
        FlagNum: 20,
        FlagToSumNum: { a1: [3, 5, 9, 10, 13, 15, 19], a2: [1, 2, 3, 10, 4, 5, 6, 15] },
        FlagToMonitor: { 9: [ShowLargeWave, 0], 19: [ShowFinalWave, 0] },
        FlagToEnd: function () {
            NewImg("imgSF", "images/Card/Plants/Chomper.png", "left:667px;top:220px;clip:rect(auto,auto,60px,auto)", EDAll, {
                onclick: function () {
                    GetNewCard(this, oChomper, 8);
                },
            });
            NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:676px", EDAll);
        },
    }
);
