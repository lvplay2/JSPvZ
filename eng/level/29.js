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
            oSpikeweed,
            oTorchwood,
            oTallNut,
        ],
        ZName: [oZombie, oZombie2, oZombie3, oDuckyTubeZombie1, oDuckyTubeZombie2, oDuckyTubeZombie3, oConeheadZombie, oBucketheadZombie, oDolphinRiderZombie, oPoleVaultingZombie, oZomboni],
        PicArr: ["images/interface/background3.jpg", "images/interface/ZombieNoteSmall.png", "images/interface/ZombieNote3.png"],
        Coord: 2,
        SunNum: 50,
        LF: [0, 1, 1, 2, 2, 1, 1],
        backgroundImage: "images/interface/background3.jpg",
        CanSelectCard: 1,
        LevelName: "Level 3-9",
        LvlEName: 29,
        LargeWaveFlag: { 10: $("imgFlag3"), 20: $("imgFlag2"), 30: $("imgFlag1") },
        UserDefinedFlagFunc: function (a) {
            oP.FlagNum == oP.FlagZombies && oP.SetTimeoutWaterZombie(6, 9, 3, [oDuckyTubeZombie1]);
        },
        StartGameMusic: "Kitanai Sekai",
    },
    {
        AZ: [
            [oZombie, 1, 1],
            [oZombie2, 3, 1],
            [oZombie3, 1, 1],
            [oDuckyTubeZombie1, 1, 6, [6, 7, 8, 10, 19, 20, 25, 30]],
            [oDuckyTubeZombie2, 1, 6, [10, 20, 30]],
            [oDuckyTubeZombie3, 1, 6, [10, 20, 30]],
            [oConeheadZombie, 1, 1],
            [oBucketheadZombie, 1, 1],
            [oPoleVaultingZombie, 1, 10],
            [oDolphinRiderZombie, 1, 10, [10, 14, 15, 16, 18, 19, 20]],
            [oZomboni, 1, 30, [30]],
        ],
        FlagNum: 30,
        FlagToSumNum: { a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29], a2: [1, 2, 3, 10, 4, 5, 6, 15, 7, 8, 9, 25] },
        FlagToMonitor: { 9: [ShowLargeWave, 0], 19: [ShowLargeWave, 0], 29: [ShowFinalWave, 0] },
        FlagToEnd: function () {
            NewImg("imgSF", "images/interface/ZombieNoteSmall.png", "left:667px;top:220px", EDAll, {
                onclick: function () {
                    PlayAudio("winmusic");
                    SetHidden($("PointerUD"));
                    SetStyle(this, { width: "613px", height: "399px", left: "193px", top: "100px" }).src = "images/interface/ZombieNote3.png";
                    this.onclick = function () {
                        SelectModal(30);
                    };
                },
            });
            NewImg("PointerUD", "images/interface/PointerDown.gif", "top:185px;left:676px", EDAll);
        },
    }
);
