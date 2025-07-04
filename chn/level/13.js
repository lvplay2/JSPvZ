oS.Init(
    {
        PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom],
        ZName: [oZombie, oZombie2, oZombie3, oConeheadZombie, oScreenDoorZombie],
        PicArr: (function () {
            var a = oGraveBuster.prototype,
                b = a.PicArr;
            return ["images/interface/background2.jpg", "images/interface/Tombstones.png", "images/interface/Tombstone_mounds.png", b[a.CardGif], b[a.NormalGif]];
        })(),
        backgroundImage: "images/interface/background2.jpg",
        CanSelectCard: 1,
        DKind: 0,
        SunNum: 50,
        LevelName: "关卡 2-3",
        LvlEName: 13,
        LargeWaveFlag: { 10: $("imgFlag1") },
        Monitor: { f: AppearTombstones, ar: [7, 9, 4] },
        UserDefinedFlagFunc: function (a) {
            oP.FlagNum == oP.FlagZombies && oP.SetTimeoutTomZombie([oZombie, oConeheadZombie, oBucketheadZombie]);
        },
        StartGameMusic: "Ultimate battle",
    },
    {
        AZ: [
            [oZombie, 3, 1],
            [oZombie2, 2, 1],
            [oZombie3, 2, 1],
            [oConeheadZombie, 2, 1],
            [oScreenDoorZombie, 1, 1],
        ],
        FlagNum: 10,
        FlagToSumNum: { a1: [3, 5, 9], a2: [1, 2, 3, 10] },
        FlagToMonitor: { 9: [ShowFinalWave, 0] },
        FlagToEnd: function () {
            NewImg("imgSF", "images/Card/Plants/GraveBuster.png", "left:827px;top:525px;clip:rect(auto,auto,60px,auto)", EDAll, {
                onclick: function () {
                    GetNewCard(this, oGraveBuster, 14);
                },
            });
            NewImg("PointerUD", "images/interface/PointerDown.gif", "top:490px;left:836px", EDAll);
        },
    }
);
