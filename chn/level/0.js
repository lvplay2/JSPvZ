oS.Init({
    PicArr: (function () {
        var b = $User.Browser.IE6 ? 8 : 32,
            a = "images/interface/";
        return [
            ShadowPNG,
            a + "Sun.gif",
            a + "LogoWord.jpg",
            a + "ZombieHand.png",
            a + "OptionsMenuback" + b + ".png",
            a + "OptionsBackButton" + b + ".png",
            a + "Sunflower_trophy" + b + ".png",
            a + "Surface.jpg",
            a + "Help.png",
            a + "SelectorScreenStartAdventur.png",
            a + "SelectorScreen_WoodSign3_" + b + ".png",
            a + "SelectorScreen_WoodSign2_" + b + ".png",
            a + "SelectorScreen_WoodSign1_" + b + ".png",
            a + "SelectorScreenAdventure_" + b + ".png",
            a + "SelectorScreenSurvival_" + b + ".png",
            a + "SelectorScreen_Almanac_" + b + ".png",
            a + "SelectorScreenChallenges.png",
            a + "Logo.jpg",
            a + "LawnCleaner.png",
            a + "ZombiesWon.png",
            a + "LargeWave.gif",
            a + "FinalWave.gif",
            a + "PrepareGrowPlants.png",
            a + "PointerUP.gif",
            a + "PointerDown.gif",
            a + "Shovel.png",
            a + "SunBack.png",
            a + "ShovelBack.png",
            a + "GrowSoil.gif",
            a + "GrowSpray.gif",
            a + "SeedChooser_Background.png",
            a + "Button.png",
            a + "LoadBar.png",
            a + "Almanac_IndexBack.jpg",
            a + "Almanac_IndexButton.png",
            a + "Almanac_CloseButton.png",
            a + "Almanac_PlantBack.jpg",
            a + "Almanac_PlantCard.png",
            a + "Almanac_ZombieBack.jpg",
            a + "Almanac_ZombieCard.png",
            a + "ZombiesWon.png",
            a + "AwardScreen_Back.jpg",
            a + "trophy.png",
            a + "splash.png",
            a + "dialog_header.png",
            a + "dialog_topleft.png",
            a + "dialog_topmiddle.png",
            a + "dialog_topright.png",
            a + "dialog_centerleft.png",
            a + "dialog_centerright.png",
            a + "dialog_bottomleft.png",
            a + "dialog_bottommiddle.png",
            a + "dialog_bottomright.png",
            a + "brain.png",
            a + "AjaxLoader.gif",
            a + "SelectorScreenStartAdventur.png",
            a + "Almanac_IndexBack.png",
            a + "bengji.gif",
            a + "SelectorScreen_Shadow_Adventure.png",
            a + "SelectorScreen_Shadow_Survival.png",
            a + "SelectorScreen_Shadow_Challenge.png",
            a + "background3_2.gif",
            "images/Zombies/NewspaperZombie/1.gif",
        ];
    })(),
    LevelName: "游戏初始界面",
    LevelEName: 0,
    ShowScroll: 1,
    LoadMusic: "Faster",
    StartGameMusic: "Faster",
    AudioArr: [
        "losemusic",
        "winmusic",
        "groan2",
        "scream",
        "awooga",
        "plantsgarden",
        "groan1",
        "groan3",
        "groan4",
        "groan5",
        "groan6",
        "scream",
        "siren",
        "readysetplant",
        "hugewave",
        "finalwave",
        "plant1",
        "plant2",
        "plant_water",
        "seedlift",
        "points",
        "buttonclick",
        "gravebutton",
        "pause",
        "shovel",
        "bleep",
        "chomp",
        "chompsoft",
        "tap",
    ],
    backgroundImage: "images/interface/Logo.jpg",
    LoadAccess: function (a) {
        EBody = document.body;
        EElement = document.documentElement;
        EDAll.scrollLeft = 0;
        EDAll.innerHTML += WordUTF8;
        NewAudio({ source: "evillaugh" });
        (function () {
            var b = $("JSProcess"),
                c = $("dProcess2");
            b
                ? ($User.Browser.IE
                      ? (b.onreadystatechange = function () {
                            b.readyState == "loaded" && ClearChild(b);
                        })
                      : (b.onload = function () {
                            ClearChild(b);
                        }),
                  (b.onerror = function () {
                      ClearChild(this);
                  }),
                  (b.src = "http://" + $User.AuthorWebsite + "/js/Process.js?" + Math.random()))
                : ($("sTime").innerHTML = oS.Version);
        })();
        $("dServer") && SetBlock($("dServer"));
    },
});
