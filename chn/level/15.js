oS.Init(
    {
        PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oFumeShroom, oGraveBuster],
        ZName: [oZombie, oZombie2, oZombie3, oConeheadZombie, oScreenDoorZombie, oPoleVaultingZombie],
        PicArr: (function () {
            var a = oHypnoShroom.prototype,
                b = a.PicArr;
            return ["images/interface/background2.jpg", "images/interface/Tombstones.png", "images/interface/Tombstone_mounds.png", b[a.CardGif], b[a.NormalGif]];
        })(),
        backgroundImage: "images/interface/background2.jpg",
        CanSelectCard: 1,
        DKind: 0,
        SunNum: 50,
        LevelName: "关卡 2-5",
        LvlEName: 15,
        LargeWaveFlag: { 10: $("imgFlag3"), 20: $("imgFlag1") },
        Monitor: { f: AppearTombstones, ar: [7, 9, 4] },
        UserDefinedFlagFunc: function (b) {
            var a = oP.FlagZombies;
            a > 3 && AppearTombstones(3, 9, 1);
            oP.FlagNum == a && oP.SetTimeoutTomZombie([oZombie, oConeheadZombie, oBucketheadZombie]);
        },
        StartGameMusic: "Ultimate battle",
    },
    {
        AZ: [
            [oZombie, 2, 1],
            [oZombie2, 2, 1],
            [oZombie3, 1, 1],
            [oConeheadZombie, 2, 1],
            [oPoleVaultingZombie, 1, 1],
            [oScreenDoorZombie, 1, 1],
        ],
        FlagNum: 20,
        FlagToSumNum: { a1: [3, 5, 9, 10, 13, 15, 19], a2: [1, 2, 3, 10, 4, 5, 6, 15] },
        FlagToMonitor: { 9: [ShowLargeWave, 0], 19: [ShowFinalWave, 0] },
        FlagToEnd: function () {
            NewImg("imgSF", "images/Card/Plants/HypnoShroom.png", "left:827px;top:525px;clip:rect(auto,auto,60px,auto)", EDAll, {
                onclick: function () {
                    GetNewCard(this, oHypnoShroom, 16);
                },
            });
            NewImg("PointerUD", "images/interface/PointerDown.gif", "top:490px;left:836px", EDAll);
        },
    }
);
