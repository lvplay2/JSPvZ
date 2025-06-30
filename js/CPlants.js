var CPlants = NewO({
        name: "Plants",
        HP: 300,
        PKind: 1,
        beAttackedPointL: 20,
        CardGif: 0,
        StaticGif: 1,
        NormalGif: 2,
        BookHandBack: 0,
        canEat: 1,
        zIndex: 0,
        AudioArr: [],
        coolTime: 7.5,
        CanSelect: 1,
        canTrigger: 1,
        Stature: 0,
        Sleep: 0,
        CanGrow: function (c, b, e) {
            var a = b + "_" + e,
                d = oS.ArP;
            return d ? (oGd.$LF[b] == 1 ? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1]) : oGd.$LF[b] == 1 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1];
        },
        getHurt: function (e, c, b) {
            var d = this,
                a = d.id;
            !(c % 3) ? (d.HP -= b) < 1 && d.Die() : d.Die();
        },
        GetDY: function (b, c, a) {
            return a[0] ? -21 : -15;
        },
        GetDX: function () {
            return -Math.floor(this.width * 0.5);
        },
        GetDBottom: function () {
            return this.height;
        },
        Birth: function (d, c, h, a, m, n) {
            var e = this,
                k = d + e.GetDX(),
                i = c + e.GetDY(h, a, m),
                l = e.prototype,
                g = i - e.height,
                b = (e.id = "P_" + Math.random()),
                j = (e.zIndex += 3 * h),
                f = NewEle(0, "div", "position:absolute");
            NewImg(0, ShadowPNG, e.getShadow(e), f);
            NewImg(0, e.PicArr[e.NormalGif], "", f);
            e.pixelLeft = k;
            e.pixelRight = k + e.width;
            e.pixelTop = g;
            e.pixelBottom = g + e.GetDBottom();
            e.opacity = 1;
            e.InitTrigger(e, b, (e.R = h), (e.C = a), (e.AttackedLX = k + e.beAttackedPointL), (e.AttackedRX = k + e.beAttackedPointR));
            $P[b] = e;
            $P.length += 1;
            e.BirthStyle(e, b, f, { left: k + "px", top: g + "px", zIndex: j }, n);
            oGd.add(e, h + "_" + a + "_" + e.PKind);
            e.PrivateBirth(e, n);
        },
        getShadow: function (a) {
            return "left:" + (a.width * 0.5 - 48) + "px;top:" + (a.height - 22) + "px";
        },
        BirthStyle: function (c, d, b, a) {
            EditEle(b, { id: d }, a, EDPZ);
        },
        PrivateBirth: function (a) {},
        getTriggerRange: function (a, b, c) {
            return [[b, oS.W, 0]];
        },
        getTriggerR: function (a) {
            return [a, a];
        },
        InitTrigger: function (c, b, f, a, h, g) {
            var j = {},
                i = c.getTriggerR(f),
                e = i[0],
                d = i[1];
            do {
                oT.add(e, (j[e] = c.getTriggerRange(e, h, g)), b);
            } while (e++ != d);
            c.oTrigger = j;
        },
        TriggerCheck: function (b, a) {
            this.AttackCheck2(b) && ((this.canTrigger = 0), this.CheckLoop(b.id, a));
        },
        CheckLoop: function (b, c) {
            var a = this.id;
            this.NormalAttack(b);
            oSym.addTask(
                140,
                function (e, f, h) {
                    var g;
                    (g = $P[e]) && g.AttackCheck1(f, h);
                },
                [a, b, c]
            );
        },
        AttackCheck1: function (g, f) {
            var b = this,
                c = b.oTrigger,
                a = $Z[g],
                h,
                e,
                k,
                j;
            if (a && a.PZ && (h = c[a.R])) {
                k = a.ZX;
                e = h.length;
                while (e--) {
                    j = h[e];
                    if (j[0] <= k && j[1] >= k && b.AttackCheck2(a)) {
                        b.CheckLoop(g, j[2]);
                        return;
                    }
                }
            }
            b.canTrigger = 1;
        },
        AttackCheck2: function (a) {
            return a.Altitude > 0;
        },
        PrivateDie: function (a) {},
        BoomDie: function () {
            var a = this,
                b = a.id;
            a.oTrigger && oT.delP(a);
            a.HP = 0;
            delete $P[b];
            delete oGd.$[a.R + "_" + a.C + "_" + a.PKind];
            $P.length -= 1;
            ClearChild($(b));
            a.PrivateDie(a);
        },
        Die: function (a) {
            var b = this,
                c = b.id;
            b.oTrigger && oT.delP(b);
            b.HP = 0;
            delete $P[c];
            delete oGd.$[b.R + "_" + b.C + "_" + b.PKind];
            $P.length -= 1;
            !a && ClearChild($(c));
            b.PrivateDie(b);
        },
    }),
    oGraveBuster = InheritO(CPlants, {
        EName: "oGraveBuster",
        CName: "Grave Buster",
        width: 99,
        height: 106,
        beAttackedPointR: 70,
        SunNum: 75,
        BookHandBack: 2,
        PicArr: ["images/Card/Plants/GraveBuster.png", "images/Plants/GraveBuster/0.gif", "images/Plants/GraveBuster/GraveBuster.gif" + $Random + Math.random()],
        AudioArr: ["gravebusterchomp"],
        CanGrow: function (b, a, d) {
            var c = oS.ArP;
            return c ? d > 0 && d < c.ArC[1] && a + "_" + d in oGd.$Tombstones && !b[1] : a + "_" + d in oGd.$Tombstones && !b[1];
        },
        getShadow: function (a) {
            return "left:" + (a.width * 0.5 - 48) + "px;top:" + a.height + "px";
        },
        BirthStyle: function (c, d, b, a) {
            EditEle(b, { id: d }, a, EDPZ);
        },
        GetDY: function (b, c, a) {
            return -30;
        },
        InitTrigger: function () {},
        Tooltip: "Plant it on a grave to remove the grave",
        Produce:
            'Plant Grave Busters on graves to remove the graves.<p>Usage: <font color="#FF0000">single use, must be planted on graves</font><br>Special: <font color="#FF0000">removes graves</font></p>Despite Grave Buster\'s fearsome appearance, he wants everyone to know that he loves kittens and spends his off hours volunteering at a local zombie rehabilitation center. "It\'s just the right thing to do," he says.',
        PrivateBirth: function (a) {
            PlayAudio("gravebusterchomp");
            oSym.addTask(
                420,
                function (b) {
                    var e = $P[b],
                        c,
                        d,
                        f;
                    e && ((d = e.R), (f = e.C), delete oGd.$Tombstones[(c = d + "_" + f)], e.Die(), ClearChild($("dTombstones" + c)), oS.StaticCard && AppearSun(Math.floor(GetX(f) + Math.random() * 41), GetY(d), 25, 0));
                },
                [a.id]
            );
        },
    }),
    oLawnCleaner = InheritO(CPlants, {
        EName: "oLawnCleaner",
        CName: "Lawn Mower",
        width: 71,
        height: 57,
        beAttackedPointL: 0,
        beAttackedPointR: 71,
        SunNum: 0,
        PicArr: ["images/interface/LawnCleaner.png"],
        AudioArr: ["lawnmower"],
        NormalGif: 0,
        canEat: 0,
        Stature: 1,
        getTriggerRange: function (a, b, c) {
            return [[b, c, 0]];
        },
        TriggerCheck: function (b, a) {
            b.beAttacked && b.Altitude > 0 && ((this.canTrigger = 0), this.NormalAttack(this));
        },
        BoomDie: function () {},
        Tooltip: " ",
        NormalAttack: function (a) {
            PlayAudio(a.AudioArr[0]);
            (function (b, c, k, j, e, g) {
                var d = oZ.getArZ(k, j, e),
                    f = d.length,
                    h;
                while (f--) {
                    (h = d[f]).getCrushed(b) && h.CrushDie();
                }
                k > c ? b.Die() : ((b.pixelRight += 10), (b.AttackedLX = k += 10), (b.AttackedRX = j += 10), (g.style.left = (b.pixelLeft += 10) + "px"), oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]));
            })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
        },
    }),
    oPoolCleaner = InheritO(oLawnCleaner, {
        EName: "oPoolCleaner",
        CName: "Pool Cleaner",
        width: 47,
        height: 64,
        beAttackedPointL: 0,
        beAttackedPointR: 47,
        SunNum: 0,
        PicArr: ["images/interface/PoolCleaner.png"],
        Tooltip: " ",
        AudioArr: ["pool_cleaner"],
    }),
    oBrains = InheritO(CPlants, {
        EName: "oBrains",
        CName: "Brains",
        width: 32,
        height: 31,
        beAttackedPointL: 0,
        beAttackedPointR: 32,
        SunNum: 0,
        PicArr: ["images/interface/brain.png"],
        Tooltip: " ",
        NormalGif: 0,
        InitTrigger: function () {},
        PrivateBirth: function (a) {
            a.PrivateDie = oS.BrainsNum
                ? ((a.DieStep = Math.floor(150 / oS.BrainsNum)),
                  function (d) {
                      var c, b;
                      AppearSun(Math.floor(GetX(d.C) - 40 + Math.random() * 41), GetY(d.R), 50, 0);
                      (b = --oS.BrainsNum)
                          ? ((c = b * d.DieStep), ($("imgFlagHead").style.left = c - 11 + "px"), ($("imgFlagMeterFull").style.clip = "rect(0,157px,21px," + c + "px)"))
                          : (($("imgFlagHead").style.left = "-1px"), ($("imgFlagMeterFull").style.clip = "rect(0,157px,21px,0)"), oP.FlagToEnd());
                  })
                : function (b) {
                      GameOver();
                  };
        },
        GetDX: function () {
            return -40;
        },
    }),
    oStarfruit = InheritO(CPlants, {
        EName: "oStarfruit",
        CName: "Starfruit",
        width: 77,
        height: 70,
        beAttackedPointR: 57,
        SunNum: 125,
        GetDY: function (b, c, a) {
            return a[0] ? -17 : -10;
        },
        PicArr: ["images/Card/Plants/Starfruit.png", "images/Plants/Starfruit/0.gif", "images/Plants/Starfruit/Starfruit.gif", "images/Plants/Starfruit/Star.gif"],
        Tooltip: "Shoots stars in five directions",
        Produce:
            'Starfruits shoot stars in five directions.<p>Damage： <font color="#FF0000">Normal</font><br>Range: <font color="#FF0000">five directions</font></p>"Aw, man," says Starfruit. "I went to the dentist the other day and he said that I have four cavities. I\'ve got --count it-- ONE tooth! Four cavities in one tooth? How does this happen?"',
        getTriggerRange: function (e, g, f) {
            var a = this.R,
                b = GetY(a),
                c = oS.W,
                j = this.ArFlyTime,
                h = this.ArHitX,
                i,
                d = 0.5 * (g + f);
            !j && ((j = this.ArFlyTime = {}), (h = this.ArHitX = {}));
            switch (true) {
                case e < a:
                    j[e] = [(i = b - GetY(e)) / 5, i / 3];
                    h[e] = [d, d + (i / 3) * 4];
                    return [[100, c, 0]];
                case e == a:
                    return [[100, g + 25, 4]];
                default:
                    j[e] = [(i = GetY(e) - b) / 5, i / 3];
                    h[e] = [d, d + (i / 3) * 4];
                    return [[100, c, 0]];
            }
        },
        AttackCheck2: function (l) {
            var j = l.R;
            if (j == this.R) {
                return l.Altitude > 0;
            }
            var q = 0,
                t = l.AttackedLX,
                b = l.AttackedRX,
                e,
                g,
                d = this.ArFlyTime,
                c = this.ArHitX,
                s = d[j],
                r = c[j],
                f = l.WalkDirection ? -1 : 1,
                k = false,
                m,
                p,
                n,
                h,
                a = l.Speed;
            while (q < s.length) {
                h = a * s[q] * f * 0.1;
                e = Math.floor(t - h);
                g = Math.floor(b - h);
                p = r[0];
                n = r[1];
                if ((e + 20 < p && g - 20 > p) || (e < n && g > n)) {
                    k = true;
                    break;
                }
                ++q;
            }
            return k && l.Altitude > 0;
        },
        getTriggerR: function (a) {
            return [1, oS.R];
        },
        PrivateBirth: function (d) {
            var c = d.pixelLeft + 38,
                b = c - 15,
                a = d.pixelTop + 20;
            d.BulletEle = NewImg(0, "images/Plants/Starfruit/Star.gif", "left:" + b + "px;top:" + a + "px;z-index:" + (d.zIndex + 2));
        },
        PrivateDie: function (a) {
            a.BulletEle = null;
        },
        getHurt: function (d, b, a) {
            var c = this;
            b != 3 && c.NormalAttack();
            (c.HP -= a) < 1 && c.Die();
        },
        NormalAttack: function () {
            var g = this,
                f = g.pixelLeft + 38,
                d = f - 15,
                b = g.pixelTop + 20,
                c = g.R,
                e = f + 15,
                a = function (j, i, h) {
                    return j && j.Altitude == 1 ? (j.getPea(j, 20, i), ClearChild(h), false) : true;
                };
            (function (h) {
                oSym.addTask(
                    15,
                    function (j) {
                        var i = $(j);
                        i && SetVisible(i);
                    },
                    [h]
                );
                oSym.addTask(
                    1,
                    function (m, k, l, i, j) {
                        j(oZ.getZ1(m, k), 4, i) && ((m -= 5) < 100 ? ClearChild(i) : ((i.style.left = (l -= 5) + "px"), oSym.addTask(1, arguments.callee, [m, k, l, i, j])));
                    },
                    [f, c, d, EditEle(g.BulletEle.cloneNode(false), { id: h }, 0, EDPZ), a]
                );
            })("StarB" + Math.random());
            (function (h) {
                oSym.addTask(
                    15,
                    function (j) {
                        var i = $(j);
                        i && SetVisible(i);
                    },
                    [h]
                );
                oSym.addTask(
                    1,
                    function (m, n, l, k, i, j) {
                        j(oZ.getRangeLeftZ(m, n, l), 6, i) && ((k -= 5) < -15 ? ClearChild(i) : ((i.style.top = k + "px"), oSym.addTask(1, arguments.callee, [m, n, GetR(k + 15), k, i, j])));
                    },
                    [d, e, c, b, EditEle(g.BulletEle.cloneNode(false), { id: h }, 0, EDPZ), a]
                );
            })("StarB" + Math.random());
            (function (h) {
                oSym.addTask(
                    15,
                    function (j) {
                        var i = $(j);
                        i && SetVisible(i);
                    },
                    [h]
                );
                oSym.addTask(
                    1,
                    function (m, n, l, k, i, j) {
                        j(oZ.getRangeLeftZ(m, n, l), 2, i) && ((k += 5) > 600 ? ClearChild(i) : ((i.style.top = k + "px"), oSym.addTask(1, arguments.callee, [m, n, GetR(k + 15), k, i, j])));
                    },
                    [d, e, c, b, EditEle(g.BulletEle.cloneNode(false), { id: h }, 0, EDPZ), a]
                );
            })("StarB" + Math.random());
            (function (h) {
                oSym.addTask(
                    15,
                    function (j) {
                        var i = $(j);
                        i && SetVisible(i);
                    },
                    [h]
                );
                oSym.addTask(
                    1,
                    function (n, l, m, k, i, j) {
                        j(oZ.getZ0(n, l), 7, i) && ((n += 4) > 900 || (k -= 3) < -15 ? ClearChild(i) : (SetStyle(i, { left: (m += 4) + "px", top: k + "px" }), oSym.addTask(1, arguments.callee, [n, GetR(k + 15), m, k, i, j])));
                    },
                    [f, c, d, b, EditEle(g.BulletEle.cloneNode(false), { id: h }, 0, EDPZ), a]
                );
            })("StarB" + Math.random());
            (function (h) {
                oSym.addTask(
                    15,
                    function (j) {
                        var i = $(j);
                        i && SetVisible(i);
                    },
                    [h]
                );
                oSym.addTask(
                    1,
                    function (n, l, m, k, i, j) {
                        j(oZ.getZ0(n, l), 1, i) && ((n += 4) > 900 || (k += 3) > 600 ? ClearChild(i) : (SetStyle(i, { left: (m += 4) + "px", top: k + "px" }), oSym.addTask(1, arguments.callee, [n, GetR(k + 15), m, k, i, j])));
                    },
                    [f, c, d, b, EditEle(g.BulletEle.cloneNode(false), { id: h }, 0, EDPZ), a]
                );
            })("StarB" + Math.random());
        },
    }),
    oPeashooter = InheritO(CPlants, {
        EName: "oPeashooter",
        CName: "Peashooter",
        width: 71,
        height: 71,
        beAttackedPointR: 51,
        SunNum: 100,
        BKind: 0,
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        PicArr: ["images/Card/Plants/Peashooter.png", "images/Plants/Peashooter/0.gif", "images/Plants/Peashooter/Peashooter.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
        Tooltip: "Shoots peas at the enemy",
        Produce:
            'Peashooters are your first line of defense. They shoot peas at attacking zombies.<p>Damage： <font color="#FF0000">normal</font></p>How can a single plant grow and shoot so many peas so quickly? Peashooter says, "Hard work, commitment, and a healthy, well-balanced breakfast of sunlight and high-fiber carbon dioxide make it all possible."',
        PrivateBirth: function (a) {
            a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
        },
        PrivateDie: function (a) {
            a.BulletEle = null;
        },
        NormalAttack: function () {
            var a = this,
                b = "PB" + Math.random();
            EditEle(a.BulletEle.cloneNode(false), { id: b }, 0, EDPZ);
            oSym.addTask(
                15,
                function (d) {
                    var c = $(d);
                    c && SetVisible(c);
                },
                [b]
            );
            oSym.addTask(
                1,
                function (f, j, h, c, n, i, m, k, o, g) {
                    var l,
                        e = GetC(n),
                        d = oZ["getZ" + c](n, i);
                    m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), (m = 1), (h = 40), (k = e), (j.src = "images/Plants/PB" + m + c + ".gif"));
                    d && d.Altitude == 1
                        ? (d[{ "-1": "getSnowPea", 0: "getPea", 1: "getFirePea" }[m]](d, h, c), (SetStyle(j, { left: o + 28 + "px" }).src = "images/Plants/PeaBulletHit.gif"), oSym.addTask(10, ClearChild, [j]))
                        : (n += l = !c ? 5 : -5) < oS.W && n > 100
                        ? ((j.style.left = (o += l) + "px"), oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
                        : ClearChild(j);
                },
                [b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch]
            );
        },
    }),
    oSnowPea = InheritO(oPeashooter, {
        EName: "oSnowPea",
        CName: "Snow Pea",
        SunNum: 175,
        BKind: -1,
        PicArr: ["images/Card/Plants/SnowPea.png", "images/Plants/SnowPea/0.gif", "images/Plants/SnowPea/SnowPea.gif", "images/Plants/PB-10.gif", "images/Plants/PeaBulletHit.gif"],
        AudioArr: ["frozen", "splat1", "splat2", "splat3", "shieldhit", "shieldhit2", "plastichit"],
        Tooltip: "Shoots frozen peas that damage and slow the enemy",
        Produce:
            'Snow Peas shoot frozen peas that damage and slow the enemy.<p>Damage： <font color="#FF0000">normal, slows zombies</font></p>Folks often tell Snow Pea how "cool" he is, or exhort him to "chill out." They tell him to "stay frosty." Snow Pea just rolls his eyes. He\'s heard \'em all.',
        NormalAttack: function () {
            var a = this,
                b = "PB" + Math.random();
            EditEle(a.BulletEle.cloneNode(false), { id: b }, 0, EDPZ);
            oSym.addTask(
                15,
                function (d) {
                    var c = $(d);
                    c && SetVisible(c);
                },
                [b]
            );
            oSym.addTask(
                1,
                function (f, j, h, c, n, i, m, k, o, g) {
                    var l,
                        e = GetC(n),
                        d = oZ["getZ" + c](n, i);
                    m < 1 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), ++m && (h = 40), (k = e), (j.src = "images/Plants/PB" + m + c + ".gif"));
                    d && d.Altitude == 1
                        ? (d[{ "-1": "getSnowPea", 0: "getPea", 1: "getFirePea" }[m]](d, h, c), (SetStyle(j, { left: o + 28 + "px" }).src = "images/Plants/PeaBulletHit.gif"), oSym.addTask(10, ClearChild, [j]))
                        : (n += l = !c ? 5 : -5) < oS.W && n > 100
                        ? ((j.style.left = (o += l) + "px"), oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]))
                        : ClearChild(j);
                },
                [b, $(b), 20, 0, a.AttackedLX, a.R, -1, 0, a.AttackedLX - 40, oGd.$Torch]
            );
        },
    }),
    oRepeater = InheritO(oPeashooter, {
        EName: "oRepeater",
        CName: "Repeater",
        width: 73,
        height: 71,
        beAttackedPointR: 53,
        SunNum: 200,
        PicArr: ["images/Card/Plants/Repeater.png", "images/Plants/Repeater/0.gif", "images/Plants/Repeater/Repeater.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        Tooltip: "Fires two peas at a time",
        Produce:
            'Repeaters fire two peas at a time.<p>Damage： <font color="#FF0000">normal (for each pea)</font><br>Firing speed: <font color="#FF0000">2x</font></p>Repeater is fierce. He\'s from the streets. He doesn\'t take attitude from anybody, plant or zombie, and he shoots peas to keep people at a distance. Secretly, though, Repeater yearns for love.',
        NormalAttack1: oPeashooter.prototype.NormalAttack,
        NormalAttack: function (a) {
            this.NormalAttack1();
            oSym.addTask(
                15,
                function (c) {
                    var b = $P[c];
                    b && b.NormalAttack1();
                },
                [this.id]
            );
        },
    }),
    oThreepeater = InheritO(oPeashooter, {
        EName: "oThreepeater",
        CName: "Threepeater",
        width: 73,
        height: 80,
        beAttackedPointR: 53,
        SunNum: 325,
        PicArr: ["images/Card/Plants/Threepeater.png", "images/Plants/Threepeater/0.gif", "images/Plants/Threepeater/Threepeater.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        Tooltip: "Shoots peas in three lanes",
        Produce:
            'Threepeaters shoot peas in three lanes.<p>Damage： <font color="#FF0000">normal (for each pea)</font><br>Range: <font color="#FF0000">three lanes</font></p>Threepeater likes reading, backgammon and long periods of immobility in the park. Threepeater enjoys going to shows, particularly modern jazz. "I\'m just looking for that special someone," he says. Threepeater\'s favorite number is 5.',
        getTriggerR: function (a) {
            return [a > 2 ? a - 1 : 1, a < oS.R ? Number(a) + 1 : a];
        },
        PrivateBirth: function (f) {
            var e = f.AttackedLX,
                d = e - 40,
                a,
                c = f.oTrigger,
                b;
            f.BulletClass = [];
            f.BulletEle = [];
            for (b in c) {
                f.BulletClass.push(NewO({ X: e, R: b, D: 0, Attack: 20, Kind: 0, ChangeC: 0, pixelLeft: d, F: oGd.MB1 }));
                f.BulletEle.push(NewImg(0, "images/Plants/PB00.gif", "left:" + d + "px;top:" + (GetY(b) - 50) + "px;visibility:hidden;z-index:" + (3 * b + 2)));
            }
        },
        PrivateDie: function (a) {
            a.BulletEle.length = 0;
        },
        NormalAttack: function () {
            var a,
                c = this,
                d,
                b = 0;
            for (a in c.oTrigger) {
                EditEle(c.BulletEle[b++].cloneNode(false), { id: (d = "PB" + Math.random()) }, 0, EDPZ);
                oSym.addTask(
                    15,
                    function (f) {
                        var e = $(f);
                        e && SetVisible(e);
                    },
                    [d]
                );
                oSym.addTask(
                    1,
                    function (h, l, j, e, p, k, o, m, q, i) {
                        var n,
                            g = GetC(p),
                            f = oZ["getZ" + e](p, k);
                        o == 0 && i[k + "_" + g] && m != g && (PlayAudio("firepea"), (o = 1), (j = 40), (m = g), (l.src = "images/Plants/PB" + o + e + ".gif"));
                        f && f.Altitude == 1
                            ? (f[{ "-1": "getSnowPea", 0: "getPea", 1: "getFirePea" }[o]](f, j, e), (SetStyle(l, { left: q + 28 + "px" }).src = "images/Plants/PeaBulletHit.gif"), oSym.addTask(10, ClearChild, [l]))
                            : (p += n = !e ? 5 : -5) < oS.W && p > 100
                            ? ((l.style.left = (q += n) + "px"), oSym.addTask(1, arguments.callee, [h, l, j, e, p, k, o, m, q, i]))
                            : ClearChild(l);
                    },
                    [d, $(d), 20, 0, c.AttackedLX, a, 0, 0, c.AttackedLX - 40, oGd.$Torch]
                );
            }
        },
    }),
    oGatlingPea = InheritO(oPeashooter, {
        EName: "oGatlingPea",
        CName: "Gatling Pea",
        width: 88,
        height: 84,
        beAttackedPointR: 68,
        SunNum: 250,
        coolTime: 50,
        PicArr: ["images/Card/Plants/GatlingPea.png", "images/Plants/GatlingPea/0.gif", "images/Plants/GatlingPea/GatlingPea.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        Tooltip: "Shoots four peas at a time<br>(requires repeater)",
        Produce:
            'Gatling Peas shoot four peas at a time.<p>Damage： <font color="#FF0000">normal (for each pea)</font><br>Firing Speed: <font color="#FF0000">4x<br>Must be planted on repeaters</font></p>Gatling Pea\'s parents were concerned when he announced his intention to join the military. "But honey, it\'s so dangerous!" they said in unison. Gatling Pea refused to budge. "Life is dangerous," he replied, eyes glinting with steely conviction.',
        PrivateBirth: function (c) {
            var b = c.AttackedLX,
                a = b - 40;
            c.BulletClass = NewO({ X: b, R: c.R, D: 0, Attack: 20, Kind: c.BKind, ChangeC: 0, pixelLeft: a, F: oGd.MB1 });
            c.BulletEle = NewImg(0, c.PicArr[3], "left:" + a + "px;top:" + (c.pixelTop + 8) + "px;visibility:hidden;z-index:" + (c.zIndex + 2));
        },
        CanGrow: function (b, a, d) {
            var c = b[1];
            return c && c.EName == "oRepeater";
        },
        NormalAttack1: oPeashooter.prototype.NormalAttack,
        NormalAttack: function (a) {
            this.NormalAttack1();
            oSym.addTask(
                15,
                function (d, b) {
                    var c = $P[d];
                    c && c.NormalAttack1();
                    --b && oSym.addTask(15, arguments.callee, [d, b]);
                },
                [this.id, 3]
            );
        },
    }),
    oSplitPea = InheritO(oPeashooter, {
        EName: "oSplitPea",
        CName: "Split Pea",
        width: 92,
        height: 72,
        beAttackedPointR: 72,
        SunNum: 125,
        PicArr: ["images/Card/Plants/SplitPea.png", "images/Plants/SplitPea/0.gif", "images/Plants/SplitPea/SplitPea.gif", "images/Plants/PB00.gif", "images/Plants/PB01.gif", "images/Plants/PeaBulletHit.gif"],
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        Tooltip: "Shoots peas forward and backwards",
        Produce:
            'Split Peas shoot peas forward and backwards.<p>Damage: <font color="#FF0000">normal</font><br>Range： <font color="#FF0000">forward and backwards</font><br>Firing Speed：<font color="#FF0000">1x forward, 2x backwards</font></p>"Yeah, I\'m a Gemini," says Split Pea. "I know, big surprise. But having two heads --or really, one head with a large head-like growth on the back-- pays off big in my line of work."',
        GetDX: function () {
            return -55;
        },
        getShadow: function (a) {
            return "left:5px;top:" + (a.height - 22) + "px";
        },
        getTriggerRange: function (a, b, c) {
            return [
                [100, b + 25, 1],
                [b + 26, oS.W, 0],
            ];
        },
        PrivateBirth: function (c) {
            var b = c.PicArr,
                a = "px;top:" + (c.pixelTop + 3) + "px;visibility:hidden;z-index:" + (c.zIndex + 2);
            (c.BulletEle = [NewImg(0, b[3], "left:" + (c.AttackedLX - 40) + a), NewImg(0, b[4], "left:" + (c.AttackedRX - 16) + a)]), (c.aTri = [0, 0]);
        },
        PrivateDie: function (a) {
            a.BulletEle.length = 0;
        },
        TriggerCheck: function (b, a) {
            if (this.aTri[a]) {
                return;
            }
            if (this.AttackCheck2(b)) {
                ++this.aTri[a];
                this.aTri[0] && this.aTri[1] && (this.canTrigger = 0);
                this.CheckLoop(b.id, a);
            }
        },
        AttackCheck1: function (b, f) {
            var e = this,
                c = $Z[b],
                a;
            if (c && c.PZ && c.R == e.R) {
                a = c.ZX > e.AttackedLX + 25 ? 0 : 1;
                f == a ? (e.AttackCheck2(c) ? e.CheckLoop(b, f) : --e.aTri[f]) : (++e.aTri[a], --e.aTri[f]);
            } else {
                --e.aTri[f];
            }
            e.canTrigger = e.aTri[0] && e.aTri[1] ? 0 : 1;
        },
        CheckLoop: function (a, b) {
            this.NormalAttack(b);
            oSym.addTask(
                140,
                function (c, e, g) {
                    var f;
                    (f = $P[c]) && f.AttackCheck1(e, g);
                },
                [this.id, a, b]
            );
        },
        NormalAttack: function (c) {
            var d = this,
                e,
                a = c
                    ? (oSym.addTask(
                          15,
                          function (f) {
                              $P[f] && b(1);
                          },
                          [d.id]
                      ),
                      d.AttackedRX - 16)
                    : d.AttackedLX - 40,
                b = function () {
                    EditEle(d.BulletEle[c].cloneNode(false), { id: (e = "PB" + Math.random()) }, 0, EDPZ);
                    oSym.addTask(
                        15,
                        function (g) {
                            var f = $(g);
                            f && SetVisible(f);
                        },
                        [e]
                    );
                    oSym.addTask(
                        1,
                        function (i, m, k, f, q, l, p, n, r, j) {
                            var o,
                                h = GetC(q),
                                g = oZ["getZ" + f](q, l);
                            p == 0 && j[l + "_" + h] && n != h && (PlayAudio("firepea"), (p = 1), (k = 40), (n = h), (m.src = "images/Plants/PB" + p + f + ".gif"));
                            g && g.Altitude == 1
                                ? (g[{ "-1": "getSnowPea", 0: "getPea", 1: "getFirePea" }[p]](g, k, f), (SetStyle(m, { left: r + 28 + "px" }).src = "images/Plants/PeaBulletHit.gif"), oSym.addTask(10, ClearChild, [m]))
                                : (q += o = !f ? 5 : -5) < oS.W && q > 100
                                ? ((m.style.left = (r += o) + "px"), oSym.addTask(1, arguments.callee, [i, m, k, f, q, l, p, n, r, j]))
                                : ClearChild(m);
                        },
                        [e, $(e), 20, c, d.AttackedLX, d.R, 0, 0, a, oGd.$Torch]
                    );
                };
            b();
        },
    }),
    oSunFlower = InheritO(CPlants, {
        EName: "oSunFlower",
        CName: "Sunflower",
        width: 73,
        height: 74,
        beAttackedPointR: 53,
        SunNum: 50,
        PicArr: ["images/Card/Plants/SunFlower.png", "images/Plants/SunFlower/0.gif", "images/Plants/SunFlower/SunFlower1.gif", "images/Plants/SunFlower/SunFlower.gif"],
        Tooltip: "Gives you additional sun",
        Produce: 'Sunflowers are essential for you to produce extra sun. Try planting as many as you can!<p>Sun production： <font color="#FF0000">normal</font></p>Sunflower can\'t resist bouncing to the beat. Which beat is that? Why, the life-giving jazzy rhythm of the Earth itself, thumping at a frequency only Sunflower can hear.',
        BirthStyle: function (c, e, b, a) {
            var d = b.childNodes[1];
            d.src = "images/Plants/SunFlower/SunFlower.gif";
            d.style.clip = "rect(0,auto,74px,0)";
            d.style.height = "148px";
            EditEle(b, { id: e }, a, EDPZ);
        },
        ChangePosition: function (c, a) {
            var b = c.childNodes[1];
            a ? SetStyle(b, { clip: "rect(74px,auto,auto,auto)", top: "-74px" }) : SetStyle(b, { clip: "rect(auto,auto,74px,auto)", top: 0 });
        },
        PrivateBirth: function (a) {
            oS.ProduceSun
                ? oSym.addTask(
                      500,
                      function (d, c, b) {
                          $P[d] &&
                              (a.ChangePosition($(d), 1),
                              oSym.addTask(
                                  100,
                                  function (h, g, f, e) {
                                      $P[h] &&
                                          (AppearSun(Math.floor(g + Math.random() * 41), f, 25, 0),
                                          oSym.addTask(
                                              100,
                                              function (i) {
                                                  $P[i] && a.ChangePosition($(i), 0);
                                              },
                                              [h]
                                          ),
                                          oSym.addTask(2400, e, [h, g, f]));
                                  },
                                  [d, c, b, arguments.callee]
                              ));
                      },
                      [a.id, GetX(a.C) - 40, GetY(a.R)]
                  )
                : (a.getHurt = function (f, c, b) {
                      var e = this;
                      switch (c) {
                          case 0:
                              var d = (e.HP -= b);
                              !(d % 100) &&
                                  (AppearSun(Math.floor(GetX(e.C) - 40 + Math.random() * 41), GetY(e.R), 25, 0),
                                  oSym.addTask(
                                      50,
                                      function (h, g) {
                                          AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 25, 0);
                                      },
                                      [e.C, e.R]
                                  ),
                                  d < 1
                                      ? e.Die()
                                      : oSym.addTask(
                                            50,
                                            function (h, g) {
                                                AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 25, 0);
                                            },
                                            [e.C, e.R]
                                        ));
                              break;
                          case 3:
                              (e.HP -= b) < 1 && e.Die();
                              break;
                          default:
                              e.Die(1);
                      }
                  });
        },
        InitTrigger: function () {},
    }),
    oTwinSunflower = InheritO(oSunFlower, {
        EName: "oTwinSunflower",
        CName: "Twin Sunflower",
        width: 83,
        height: 84,
        beAttackedPointR: 63,
        SunNum: 150,
        coolTime: 50,
        PicArr: ["images/Card/Plants/TwinSunflower.png", "images/Plants/TwinSunflower/0.gif", "images/Plants/TwinSunflower/TwinSunflower1.gif", "images/Plants/TwinSunflower/TwinSunflower.gif"],
        Tooltip: "Gives twice as much sun as a sunflower<br>(requires sunflower)",
        Produce:
            'Twin Sunflowers give twice as much sun as a normal sunflower.<p>Sun production： <font color="#FF0000">double<br>Must be planted on sunflowers</font></p>It was a crazed night of forbidden science that brought Twin Sunflower into existence. Thunder crashed overhead, strange lights flickered, even the very roaring wind seemed to hiss its angry denial. But to no avail. Twin Sunflower was alive, ALIVE!',
        CanGrow: function (b, a, d) {
            var c = b[1];
            return c && c.EName == "oSunFlower";
        },
        BirthStyle: function (c, e, b, a) {
            var d = b.childNodes[1];
            d.src = "images/Plants/TwinSunflower/TwinSunflower.gif";
            d.style.clip = "rect(0,auto,84px,0)";
            d.style.height = "168px";
            EditEle(b, { id: e }, a, EDPZ);
        },
        ChangePosition: function (c, a) {
            var b = c.childNodes[1];
            a ? SetStyle(b, { clip: "rect(84px,auto,auto,auto)", top: "-84px" }) : SetStyle(b, { clip: "rect(auto,auto,84px,auto)", top: 0 });
        },
        PrivateBirth: function (a) {
            var b = GetX(a.C);
            oSym.addTask(
                500,
                function (f, d, c, e) {
                    $P[f] &&
                        (a.ChangePosition($(f), 1),
                        oSym.addTask(
                            100,
                            function (k, h, g, j, i) {
                                AppearSun(Math.floor(h + Math.random() * 21), j, 25, 0),
                                    AppearSun(Math.floor(g + Math.random() * 21), j, 25, 0),
                                    oSym.addTask(
                                        100,
                                        function (l) {
                                            $P[l] && a.ChangePosition($(l), 0);
                                        },
                                        [k]
                                    ),
                                    oSym.addTask(2400, i, [k, h, g, j]);
                            },
                            [f, d, c, e, arguments.callee]
                        ));
                },
                [a.id, b - 40, b - 20, GetY(a.R)]
            );
        },
    }),
    oPumpkinHead = InheritO(CPlants, {
        EName: "oPumpkinHead",
        CName: "Pumpkin",
        width: 97,
        height: 67,
        beAttackedPointL: 15,
        beAttackedPointR: 82,
        SunNum: 125,
        PKind: 2,
        HP: 4000,
        coolTime: 30,
        zIndex: 1,
        PicArr: [
            "images/Card/Plants/PumpkinHead.png",
            "images/Plants/PumpkinHead/0.gif",
            "images/Plants/PumpkinHead/PumpkinHead.gif",
            "images/Plants/PumpkinHead/PumpkinHead1.gif",
            "images/Plants/PumpkinHead/PumpkinHead2.gif",
            "images/Plants/PumpkinHead/pumpkin_damage1.gif",
            "images/Plants/PumpkinHead/pumpkin_damage2.gif",
            "images/Plants/PumpkinHead/Pumpkin_back.gif",
        ],
        Tooltip: "Protects plants that are within its shell",
        Produce:
            'Pumpkins protect plants that are within their shells.<p>Toughness： <font color="#FF0000">high</font><br>Special：<font color="#FF0000">can be planted over another plant</font></p>Pumpkin hasn\'t heard from his cousin Renfield lately. Apparently Renfield\'s a big star, some kind of... what was it... sports hero? Peggle Master? Pumpkin doesn\'t really get it. He just does his job.',
        CanGrow: function (c, b, d) {
            var a = b + "_" + d;
            return c[2] ? 1 : oGd.$LF[b] == 1 ? !(d < 1 || d > 9 || oGd.$Crater[a] || oGd.$Tombstones[a]) : c[0];
        },
        GetDY: function (b, c, a) {
            return a[0] ? -12 : -5;
        },
        HurtStatus: 0,
        getHurt: function (e, c, b) {
            var d = this,
                f = d.id,
                a = $(f);
            switch (true) {
                case c && c < 3:
                    d.Die(1);
                    break;
                case (d.HP -= b) < 1:
                    d.Die();
                    break;
                case d.HP < 1334:
                    d.HurtStatus < 2 && ((d.HurtStatus = 2), (a.childNodes[1].src = "images/Plants/PumpkinHead/pumpkin_damage2.gif"));
                    break;
                case d.HP < 2667:
                    d.HurtStatus < 1 && ((d.HurtStatus = 1), (a.childNodes[1].src = "images/Plants/PumpkinHead/pumpkin_damage1.gif"), ($(f + "_2").src = "images/Plants/PumpkinHead/Pumpkin_back.gif"));
            }
        },
        InitTrigger: function () {},
        BirthStyle: function (c, d, b, a) {
            b.childNodes[1].src = "images/Plants/PumpkinHead/PumpkinHead1.gif";
            EditEle(b, { id: d }, a, EDPZ);
            NewImg(d + "_2", "images/Plants/PumpkinHead/PumpkinHead2.gif", "left:" + c.pixelLeft + "px;top:" + c.pixelTop + "px;z-index:" + (c.zIndex - 2), EDPZ);
        },
        PrivateDie: function (a) {
            ClearChild($(a.id + "_2"));
        },
    }),
    oFlowerPot = InheritO(CPlants, {
        EName: "oFlowerPot",
        CName: "Flower Pot",
        width: 72,
        height: 68,
        beAttackedPointR: 52,
        SunNum: 25,
        BookHandBack: 5,
        PicArr: ["images/Card/Plants/FlowerPot.png", "images/Plants/FlowerPot/0.gif", "images/Plants/FlowerPot/FlowerPot.gif"],
        PKind: 0,
        Stature: -1,
        GetDY: function (b, c, a) {
            return 6;
        },
        CanGrow: function (e, d, f) {
            var c = d + "_" + f,
                b = oGd.$LF[d],
                a = f < 1 || f > 9;
            return b % 2 ? (b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c])) : 0;
        },
        Tooltip: "Lets you plant on the roof",
        Produce: 'Flower Pots let you plant on the roof.<p>Special： <font color="#FF0000">allows you to plant on the roof</font></p>"I\'m a pot for planting. Yet I\'m also a plant. HAS YOUR MIND EXPLODED YET?"',
        InitTrigger: function () {},
    }),
    oLilyPad = InheritO(oFlowerPot, {
        BookHandBack: 4,
        Stature: -1,
        EName: "oLilyPad",
        CName: "Lily Pad",
        width: 79,
        height: 58,
        beAttackedPointR: 59,
        PicArr: ["images/Card/Plants/LilyPad.png", "images/Plants/LilyPad/0.gif", "images/Plants/LilyPad/LilyPad.gif"],
        getShadow: function (a) {
            return "left:-8px;top:25px";
        },
        CanGrow: function (c, b, d) {
            var a = b + "_" + d;
            return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a]);
        },
        Tooltip: "Lets you plant non-aquatic plants on top of it",
        Produce:
            'Lily pads let you plant non-aquatic plants on top of them.<p>Special： <font color="#FF0000">non-aquatic plants can be planted on top of it<br>Must be planted in water</font></p>Lily Pad never complains. Lily Pad never wants to know what\'s going on. Put a plant on top of Lily Pad, he won\'t say a thing. Does he have startling opinions or shocking secrets? Nobody knows. Lily Pad keeps it all inside.',
    }),
    oPotatoMine = InheritO(CPlants, {
        EName: "oPotatoMine",
        CName: "Potato Mine",
        width: 75,
        height: 55,
        beAttackedPointR: 55,
        SunNum: 25,
        coolTime: 30,
        Stature: -1,
        CanGrow: function (d, c, f) {
            var b = c + "_" + f,
                a = oGd.$LF[c],
                e = oS.ArP;
            if (e) {
                switch (a) {
                    case (0, 3):
                        return false;
                    case 1:
                        return f > 0 && f < e.ArC[1] && !(d[1] || oGd.$Crater[b] || oGd.$Tombstones[b]);
                    case 2:
                        return f > 0 && f < e.ArC[1] && d[0] && !d[1];
                }
            } else {
                switch (a) {
                    case (0, 3):
                        return false;
                    case 1:
                        return !(f < 1 || f > 9 || d[1] || oGd.$Crater[b] || oGd.$Tombstones[b]);
                    case 2:
                        return d[0] && !d[1];
                }
            }
        },
        PicArr: [
            "images/Card/Plants/PotatoMine.png",
            "images/Plants/PotatoMine/0.gif",
            "images/Plants/PotatoMine/PotatoMine.gif",
            "images/Plants/PotatoMine/PotatoMineNotReady.gif",
            "images/Plants/PotatoMine/PotatoMine_mashed.gif",
            "images/Plants/PotatoMine/ExplosionSpudow.gif",
        ],
        Tooltip: "Explodes on contact, but takes time to arm itself",
        Produce:
            'Needs a while to arm themselves. You should plant them ahead of zombies. They will explode on contact.<p>Damage： <font color="FF0000">massive</font><br>Range： <font color="#FF0000">all zombies in a small area</font><br>Usage： <font color="#FF0000">single use, delayed activation</font></p>Some folks say Potato Mine is lazy, that he leaves everything to the last minute. Potato Mine says nothing. He\'s too busy thinking about his investment strategy.',
        Status: 0,
        AudioArr: ["potato_mine"],
        canTrigger: 0,
        BirthStyle: function (d, e, c, b, a) {
            c.childNodes[1].src = !a
                ? "images/Plants/PotatoMine/PotatoMineNotReady.gif"
                : (~(function () {
                      d.Status = 1;
                      d.canTrigger = 1;
                      d.getHurt = d.getHurt2;
                  })(),
                  "images/Plants/PotatoMine/PotatoMine.gif");
            EditEle(c, { id: e }, b, EDPZ);
        },
        getHurt2: function (d, b, a) {
            var c = this;
            b > 2 ? (c.HP -= a) < 1 && c.Die() : c.NormalAttack(c.pixelLeft, c.pixelRight, c.R);
        },
        PrivateBirth: function (b, a) {
            !a &&
                oSym.addTask(
                    1500,
                    function (d) {
                        var c = $P[d];
                        c && (($(d).childNodes[1].src = "images/Plants/PotatoMine/PotatoMine.gif"), (c.Status = 1), (c.canTrigger = 1), (c.getHurt = c.getHurt2));
                    },
                    [b.id]
                );
        },
        getTriggerRange: function (a, b, c) {
            return [[b, c, 0]];
        },
        TriggerCheck: function (e, c) {
            var a = this.R,
                b = this.C;
            e.beAttacked && e.Altitude < 2 && !oGd.$[a + "_" + b + "_2"] && this.NormalAttack(this.pixelLeft, this.pixelRight, this.R);
        },
        NormalAttack: function (j, h, e) {
            var g = this,
                b = g.id,
                d = $(b),
                c = oZ.getArZ(j, h, e),
                f = c.length,
                a;
            while (f--) {
                (a = c[f]).Altitude < 2 && a.getThump();
            }
            g.Die(1);
            PlayAudio("potato_mine");
            EditEle(d.childNodes[1], { src: "images/Plants/PotatoMine/PotatoMine_mashed.gif" }, { width: "132px", height: "93px", left: "-40px", top: "-20px" });
            NewImg(0, "images/Plants/PotatoMine/ExplosionSpudow.gif", "left:-90px;top:-40px", d);
            oSym.addTask(
                200,
                function (i) {
                    ClearChild(i.lastChild);
                    oSym.addTask(100, ClearChild, [i]);
                },
                [d]
            );
        },
    }),
    oTorchwood = InheritO(CPlants, {
        EName: "oTorchwood",
        CName: "Torchwood",
        width: 73,
        height: 83,
        beAttackedPointR: 53,
        SunNum: 175,
        PicArr: [
            "images/Card/Plants/Torchwood.png",
            "images/Plants/Torchwood/0.gif",
            "images/Plants/Torchwood/Torchwood.gif",
            "images/Plants/PB00.gif",
            "images/Plants/PB01.gif",
            "images/Plants/PB10.gif",
            "images/Plants/PB11.gif",
            "images/Plants/Torchwood/SputteringFire.gif",
        ],
        AudioArr: ["firepea", "ignite", "ignite2"],
        Tooltip: "Peas that pass through it turn into fireballs",
        Produce:
            'Torchwoods turn peas that pass through them into fireballs that deal twice as much damage.<p>Special： <font color="#FF0000">doubles the damage of peas that pass through it.  Fireballs deal damage to nearby zombies on impact</font></p>They like him for his integrity, for his steadfast friendship, for his ability to greatly maximize pea damage. But Torchwood has a secret: he can\'t read.',
        PrivateBirth: function (c) {
            var a = c.R,
                b = c.C;
            oGd.$Torch[a + "_" + b] = c.id;
            oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 0);
        },
        InitTrigger: function () {},
        PrivateDie: function (c) {
            var a = c.R,
                b = c.C;
            delete oGd.$Torch[a + "_" + b];
            oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 1);
        },
    }),
    oWallNut = InheritO(CPlants, {
        EName: "oWallNut",
        CName: "Wall-nut",
        width: 65,
        height: 73,
        beAttackedPointR: 45,
        SunNum: 50,
        HP: 4000,
        coolTime: 30,
        PicArr: ["images/Card/Plants/WallNut.png", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/WallNut.gif", "images/Plants/WallNut/Wallnut_cracked1.gif", "images/Plants/WallNut/Wallnut_cracked2.gif"],
        Tooltip: "Blocks off zombies and protects your other plants",
        Produce: 'Wall-nuts have hard shells which you can use to protect your other plants.<p>Toughness：<font color="FF0000">high</font></p>"People wonder how I feel about getting constantly chewed on by zombies," says Wall-nut. "What they don\'t realize is that with my limited senses all I can feel is a kind of tingling, like a relaxing back rub."',
        CanGrow: function (c, b, f) {
            var a = b + "_" + f,
                d = c[1],
                e = oS.ArP;
            return e
                ? oGd.$LF[b] == 1
                    ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d)
                    : c[0] && !d
                : d && d.EName == "oWallNut"
                ? 1
                : oGd.$LF[b] == 1
                ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d)
                : c[0] && !d;
        },
        InitTrigger: function () {},
        HurtStatus: 0,
        getHurt: function (e, b, a) {
            var c = this,
                d = $(c.id).childNodes[1];
            !(b % 3)
                ? (c.HP -= a) < 1
                    ? c.Die()
                    : c.HP < 1334
                    ? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Plants/WallNut/Wallnut_cracked2.gif"))
                    : c.HP < 2667 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Plants/WallNut/Wallnut_cracked1.gif"))
                : c.Die(1);
        },
    }),
    oNutBowling = InheritO(CPlants, {
        EName: "oNutBowling",
        CName: "Wall-nut Bowling",
        width: 71,
        height: 71,
        beAttackedPointL: 10,
        beAttackedPointR: 61,
        SunNum: 0,
        HP: 4000,
        coolTime: 0,
        canEat: 0,
        Tooltip: "",
        PicArr: ["images/Card/Plants/WallNut.png", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/WallNutRoll.gif"],
        AudioArr: ["bowling", "bowlingimpact", "bowlingimpact2"],
        Produce: "",
        CanAttack: 1,
        InitTrigger: function () {},
        getHurt: function () {},
        CanGrow: function (d, e, f) {
            return true;
        },
        NormalAttack: null,
        PrivateBirth: function (c) {
            var d = $(c.id);
            PlayAudio("bowling");
            (function (z, y, q, r, p, x, e, g, b) {
                var a = z.R,
                    l = z.C,
                    A,
                    u,
                    s,
                    v = 0,
                    w,
                    i,
                    t = false;
                if (z.CanAttack && (A = oZ.getZ0(r, a)) && A.getCrushed(z)) {
                    u = A.id;
                    PlayAudio(["bowlingimpact", "bowlingimpact2"][Math.floor(Math.random() * 2)]);
                    switch (A.Ornaments) {
                        case 0:
                            A.NormalDie();
                            break;
                        case 1:
                            A.getHit0(A, Math.min(A.OrnHP, 900), 0);
                            break;
                        default:
                            z.side ? A.Normaldie() : A.CheckOrnHP(A, u, A.OrnHP, 400, A.PicArr, 0, 0, 0);
                    }
                    z.CanAttack = 0;
                    switch (a) {
                        case oS.R:
                            e = -1;
                            break;
                        case 1:
                            e = 1;
                            break;
                        default:
                            switch (e) {
                                case 1:
                                    e = -1;
                                    break;
                                case -1:
                                    e = 1;
                                    break;
                                default:
                                    e = Math.random() > 0.5 ? 1 : -1;
                            }
                    }
                    oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX + 20, z.AttackedRX + 20, z.pixelLeft + 20, x, e, g, b]);
                } else {
                    switch (e) {
                        case 1:
                            z.pixelBottom + 2 > b && (e = -1);
                            break;
                        case -1:
                            z.pixelBottom - 2 < g && (e = 1);
                            break;
                    }
                    q > y
                        ? z.Die()
                        : ((i = GetC((z.pixelRight += 2))),
                          (z.AttackedLX = q += 2),
                          (z.AttackedRX = r += 2),
                          (w = GetR((z.pixelBottom += e * 2))),
                          SetStyle(x, { left: (z.pixelLeft = p += 2) + "px", top: (z.pixelTop += e * 2) + "px" }),
                          w != a && ((z.R = w), (t = true), !z.CanAttack && (z.CanAttack = 1)),
                          i != l && ((z.C = i), (t = true)),
                          t && (oGd.del({ R: a, C: l, PKind: 1 }), oGd.add(z, w + "_" + i + "_1")),
                          oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX, z.AttackedRX, z.pixelLeft, x, e, g, b]));
                }
            })(c, oS.W, c.AttackedLX, c.AttackedRX, c.pixelLeft, d, 0, GetY1Y2(1)[0], 600);
        },
    }),
    oHugeNutBowling = InheritO(oNutBowling, {
        EName: "oHugeNutBowling",
        CName: "Giant Wall-nut Bowling",
        width: 142,
        height: 142,
        beAttackedPointL: 5,
        beAttackedPointR: 137,
        HP: 8000,
        Stature: 1,
        PicArr: ["images/Card/Plants/HugeWallNut.png", "images/Plants/WallNut/2.gif", "images/Plants/WallNut/HugeWallNutRoll.gif"],
        PrivateBirth: function (a) {
            PlayAudio("bowling");
            (function (b, c, n, m, e, g) {
                var d = oZ.getArZ(n, m, e),
                    f = d.length,
                    k,
                    j,
                    l = b.R,
                    h = b.C;
                while (f--) {
                    (k = d[f]).getCrushed(b) && k.CrushDie();
                }
                n > c
                    ? b.Die()
                    : ((j = GetC((b.pixelRight += 2))),
                      (b.AttackedLX = n += 2),
                      (b.AttackedRX = m += 2),
                      (g.style.left = (b.pixelLeft += 2) + "px"),
                      j != h && ((b.C = j), oGd.del({ R: l, C: h, PKind: 1 }), oGd.add(b, l + "_" + j + "_1")),
                      oSym.addTask(1, arguments.callee, [b, c, n, m, e, g]));
            })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id));
        },
    }),
    oBoomNutBowling = InheritO(oNutBowling, {
        EName: "oBoomNutBowling",
        CName: "Explode-o-nut",
        PicArr: ["images/Card/Plants/BoomWallNut.png", "images/Plants/WallNut/1.gif", "images/Plants/WallNut/BoomWallNutRoll.gif", "images/Plants/CherryBomb/Boom.gif"],
        AudioArr: ["cherrybomb", "bowling"],
        PrivateBirth: function (a) {
            PlayAudio("bowling");
            (function (s, q, b, c, m) {
                var v = s.R,
                    p = s.C,
                    t,
                    l;
                if ((t = oZ.getZ0(c, v)) && t.getCrushed(s)) {
                    var j = v > 2 ? v - 1 : 1,
                        g = v < oS.R ? v + 1 : oS.R,
                        u = s.pixelLeft - 80,
                        r = s.pixelLeft + 160,
                        e,
                        k;
                    PlayAudio("cherrybomb");
                    do {
                        k = (e = oZ.getArZ(u, r, j)).length;
                        while (k--) {
                            e[k].ExplosionDie();
                        }
                    } while (j++ < g);
                    s.Die(1);
                    EditEle(m.childNodes[1], { src: "images/Plants/CherryBomb/Boom.gif" }, { width: "213px", height: "160px", left: "-50px", top: "-30px" });
                    oSym.addTask(65, ClearChild, [m]);
                } else {
                    b > q
                        ? s.Die()
                        : ((l = GetC((s.pixelRight += 2))),
                          (s.AttackedLX = b += 2),
                          (s.AttackedRX = c += 2),
                          SetStyle(m, { left: (s.pixelLeft += 2) + "px" }),
                          l != p && ((s.C = l), oGd.del({ R: v, C: p, PKind: 1 }), oGd.add(s, v + "_" + l + "_1")),
                          oSym.addTask(1, arguments.callee, [s, q, s.AttackedLX, s.AttackedRX, m]));
                }
            })(a, oS.W, a.AttackedLX, a.AttackedRX, $(a.id));
        },
    }),
    oTallNut = InheritO(oWallNut, {
        EName: "oTallNut",
        CName: "Tall-nut",
        width: 83,
        height: 119,
        beAttackedPointR: 63,
        SunNum: 125,
        HP: 8000,
        PicArr: ["images/Card/Plants/TallNut.png", "images/Plants/TallNut/0.gif", "images/Plants/TallNut/TallNut.gif", "images/Plants/TallNut/TallnutCracked1.gif", "images/Plants/TallNut/TallnutCracked2.gif"],
        Tooltip: "Heavy-duty wall that can't be vaulted over",
        Produce:
            'Tall-nuts are heavy-duty wall plants that can\'t be vaulted over.<p>Toughness： <font color="#FF0000">very high</font><br>Special： <font color="#FF0000">can\'t be vaulted or jumped over</font></p>People wonder if there\'s a rivalry between Wall-nut and Tall-nut. Tall-nut laughs a rich, baritone laugh. "How could there be anything between us? We are brothers. If you knew what Wall-nut has done for me..."',
        CanGrow: function (c, b, f) {
            var a = b + "_" + f,
                d = c[1],
                e = oS.ArP;
            return e
                ? oGd.$LF[b] == 1
                    ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d)
                    : c[0] && !d
                : d && d.EName == "oTallNut"
                ? 1
                : oGd.$LF[b] == 1
                ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d)
                : c[0] && !d;
        },
        Stature: 1,
        getHurt: function (e, b, a) {
            var c = this,
                d = $(c.id).childNodes[1];
            !(b % 3)
                ? (c.HP -= a) < 1
                    ? c.Die()
                    : c.HP < 2667
                    ? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Plants/TallNut/TallnutCracked2.gif"))
                    : c.HP < 5333 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Plants/TallNut/TallnutCracked1.gif"))
                : c.Die(1);
        },
    }),
    oCherryBomb = InheritO(CPlants, {
        EName: "oCherryBomb",
        CName: "Cherry Bomb",
        width: 112,
        height: 81,
        beAttackedPointR: 92,
        SunNum: 150,
        coolTime: 50,
        PicArr: ["images/Card/Plants/CherryBomb.png", "images/Plants/CherryBomb/0.gif", "images/Plants/CherryBomb/CherryBomb.gif", "images/Plants/CherryBomb/Boom.gif" + $Random],
        AudioArr: ["cherrybomb"],
        Tooltip: "Blows up all zombies in an area",
        Produce:
            'Cherry Bombs can blow up all zombies in an area. They have a short fuse so plant them near zombies.<p>Damage： <font color="#FF0000">massive</font><br>Range： <font color="#FF0000">all zombies in a medium area</font><br>Usage： <font color="#FF0000">single use, instant</font></p>"I wanna explode," says Cherry #1. "No, let\'s detonate instead!" says his brother, Cherry #2. After intense consultation they agree to explodonate.',
        InitTrigger: function () {},
        getHurt: function () {},
        PrivateBirth: function (a) {
            oSym.addTask(
                63,
                function (b) {
                    var c = $P[b];
                    if (c) {
                        PlayAudio("cherrybomb");
                        var f = $(b),
                            j = c.R,
                            g = j > 2 ? j - 1 : 1,
                            e = j < oS.R ? j + 1 : oS.R,
                            l = c.pixelLeft - 80,
                            k = c.pixelLeft + 160,
                            d,
                            h;
                        do {
                            h = (d = oZ.getArZ(l, k, g)).length;
                            while (h--) {
                                d[h].getExplosion();
                            }
                        } while (g++ < e);
                        c.Die(1);
                        EditEle(f.childNodes[1], { src: c.PicArr[3] + Math.random() }, { width: "213px", height: "196px", left: "-50px", top: "-37px" });
                        oSym.addTask(120, ClearChild, [f]);
                    }
                },
                [a.id]
            );
        },
    }),
    oJalapeno = InheritO(oCherryBomb, {
        EName: "oJalapeno",
        CName: "Jalapeno",
        width: 68,
        height: 89,
        beAttackedPointR: 48,
        PicArr: ["images/Card/Plants/Jalapeno.png", "images/Plants/Jalapeno/0.gif", "images/Plants/Jalapeno/Jalapeno.gif", "images/Plants/Jalapeno/JalapenoAttack.gif"],
        AudioArr: ["jalapeno"],
        Tooltip: "Destroys an entire lane of zombies",
        Produce:
            'Jalapenos destroy an entire lane of zombies.<p>Damage： <font color="#FF0000">massive</font><br>Range： <font color="#FF0000">all zombies in a lane</font><br>Usage：<font color="#FF0000">single use, instant</font></p>"NNNNNGGGGGG!!!!!!!!" Jalapeno says. He\'s not going to explode, not this time. But soon. Oh, so soon. It\'s close. He knows it, he can feel it, his whole life\'s been leading up to this moment.',
        PrivateBirth: function (a) {
            oSym.addTask(
                72,
                function (j) {
                    var h = $P[j];
                    if (h) {
                        PlayAudio("jalapeno");
                        var b = $(j),
                            f = h.R,
                            c = oZ.getArZ(100, oS.W, f),
                            e = c.length,
                            g = oGd.$Ice[f],
                            d = oGd.$Crater;
                        while (e--) {
                            c[e].getExplosion();
                        }
                        h.Die(1);
                        EditEle(b.childNodes[1], { src: "images/Plants/Jalapeno/JalapenoAttack.gif" }, { width: "755px", height: "131px", left: 120 - h.pixelLeft + "px", top: "-42px" });
                        oSym.addTask(135, ClearChild, [b]);
                        ClearChild($("dIceCar" + f));
                        if (g) {
                            for (e = g[1]; e < 11; e++) {
                                delete d[f + "_" + e];
                            }
                        }
                    }
                },
                [a.id]
            );
        },
    }),
    oSpikeweed = InheritO(CPlants, {
        EName: "oSpikeweed",
        CName: "Spikeweed",
        width: 85,
        height: 35,
        beAttackedPointL: 10,
        beAttackedPointR: 75,
        SunNum: 100,
        Stature: -1,
        canEat: 0,
        PicArr: ["images/Card/Plants/Spikeweed.png", "images/Plants/Spikeweed/0.gif", "images/Plants/Spikeweed/Spikeweed.gif"],
        Attack: 20,
        ArZ: {},
        Tooltip: "Pops tires and hurts zombies that step on it",
        Produce:
            'Spikeweeds pop tires and hurt any zombies that step on them.<p>Damage： <font color="#FF0000">normal</font><br>Range： <font color="#FF0000">all zombies that walk over it</font><br>Special：<font color="#FF0000">can\'t be eaten by zombies</font></p>Hockey is Spikeweed\'s obsession. He\'s got box seat season tickets. He keeps close track of his favorite players. And he consistently cleans up in the office hockey pool. Just one problem: he\'s terrified of pucks.',
        CanGrow: function (c, b, e) {
            var a = b + "_" + e,
                d = oS.ArP;
            return d ? e > 0 && e < d.ArC[1] && oGd.$LF[b] == 1 && !(c[1] || c[0]) : !(e < 1 || e > 9 || oGd.$LF[b] - 1 || c[1] || c[0] || oGd.$Crater[a] || oGd.$Tombstones[a]);
        },
        getHurt: function (d, b, a) {
            var c = this;
            switch (b) {
                case 2:
                    d.flatTire();
                    c.Die();
                    break;
                case 1:
                    d.getHit2(d, 20, 0);
                    c.Die();
                    break;
                default:
                    (c.HP -= a) < 1 && c.Die();
            }
        },
        NormalAttack: function (b, a) {
            var c = $Z[b];
            c.getHit2(c, this.Attack, 0);
        },
        GetDY: function (b, c, a) {
            return -2;
        },
        getTriggerRange: function (a, b, c) {
            return [[this.pixelLeft - 80, this.pixelRight + 80, 0]];
        },
        TriggerCheck: function (i, h) {
            var c = i.id,
                g = this.ArZ,
                a,
                b,
                e,
                f;
            i.PZ &&
                !g[c] &&
                ((a = i.AttackedLX), (b = i.AttackedRX), (e = this.AttackedLX), (f = this.AttackedRX), (a <= f && a >= e) || (b <= f && b >= e) || (a <= e && b >= f)) &&
                this.AttackCheck2(i) &&
                ((g[c] = 1),
                this.NormalAttack(c),
                oSym.addTask(
                    100,
                    function (d, j) {
                        var k = $P[d];
                        k && delete k.ArZ[j];
                    },
                    [this.id, c]
                ));
        },
        AttackCheck2: function (a) {
            return a.Altitude == 1 && a.beAttacked;
        },
    }),
    oSpikerock = InheritO(oSpikeweed, {
        EName: "oSpikerock",
        CName: "Spikerock",
        width: 84,
        height: 43,
        beAttackedPointL: 10,
        beAttackedPointR: 74,
        SunNum: 125,
        coolTime: 50,
        PicArr: ["images/Card/Plants/Spikerock.png", "images/Plants/Spikerock/0.gif", "images/Plants/Spikerock/Spikerock.gif", "images/Plants/Spikerock/2.gif", "images/Plants/Spikerock/3.gif"],
        Attack: 40,
        Tooltip: "Pops multiple tires and damages zombies that walk over it<br>(requires spikeweed)",
        Produce:
            'Spikerocks pop multiple tires and damage zombies that walk over it.<p><font color="#FF0000">Must be planted on spikeweeds</font></p>Spikerock just got back from a trip to Europe. He had a great time, met some wonderful people, really broadened his horizons. He never knew they made museums so big, or put so many paintings in them. That was a big surprise for him.',
        CanGrow: function (b, a, d) {
            var c = b[1];
            return c && c.EName == "oSpikeweed";
        },
        GetDY: function (b, c, a) {
            return 0;
        },
        getHurt: function (f, c, b) {
            var e = this,
                d,
                a = $(e.id).childNodes[1];
            switch (c) {
                case 2:
                    f.flatTire();
                    break;
                case 1:
                    f.getHit2(f, 40, 0);
            }
            switch (true) {
                case (d = e.HP -= b) < 1:
                    e.Die();
                    break;
                case d < 101:
                    a.src = "images/Plants/Spikerock/3.gif";
                    break;
                case d < 201:
                    a.src = "images/Plants/Spikerock/2.gif";
            }
        },
    }),
    oGarlic = InheritO(CPlants, {
        EName: "oGarlic",
        CName: "Garlic",
        width: 60,
        height: 59,
        beAttackedPointR: 40,
        SunNum: 50,
        HP: 400,
        PicArr: ["images/Card/Plants/Garlic.png", "images/Plants/Garlic/0.gif", "images/Plants/Garlic/Garlic.gif", "images/Plants/Garlic/Garlic_body2.gif", "images/Plants/Garlic/Garlic_body3.gif"],
        Tooltip: "Diverts zombies into other lanes",
        Produce:
            'Garlic diverts zombies into other lanes.<p>Usage： <font color="#FF0000">on contact</font><br>Special： <font color="#FF0000">diverts zombies into other lanes</font></p>He carries an advanced Doctorate in Redirection from the Brussels University. He\'ll talk all day about lane vectors and repulse arrays. He even pushes things into alternate avenues at home. Somehow his wife puts up with it.',
        CanGrow: function (c, b, f) {
            var a = b + "_" + f,
                d = c[1],
                e = oS.ArP;
            return e
                ? oGd.$LF[b] == 1
                    ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d)
                    : c[0] && !d
                : d && d.EName == "oGarlic"
                ? 1
                : oGd.$LF[b] == 1
                ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d)
                : c[0] && !d;
        },
        InitTrigger: function () {},
        HurtStatus: 0,
        getHurt: function (e, b, a) {
            var c = this,
                d = $(c.id).childNodes[1];
            !(b % 3)
                ? (c.HP -= 20) < 1
                    ? c.Die()
                    : (e.ChangeR({ R: c.R }),
                      c.HP < 134 ? c.HurtStatus < 2 && ((c.HurtStatus = 2), (d.src = "images/Plants/Garlic/Garlic_body3.gif")) : c.HP < 267 && c.HurtStatus < 1 && ((c.HurtStatus = 1), (d.src = "images/Plants/Garlic/Garlic_body2.gif")))
                : c.Die(1);
        },
    }),
    oSquash = InheritO(CPlants, {
        EName: "oSquash",
        CName: "Squash",
        width: 100,
        height: 226,
        beAttackedPointR: 67,
        SunNum: 50,
        coolTime: 30,
        PicArr: ["images/Card/Plants/Squash.png", "images/Plants/Squash/0.gif", "images/Plants/Squash/Squash.gif", "images/Plants/Squash/SquashAttack.gif", "images/Plants/Squash/SquashL.png", "images/Plants/Squash/SquashR.png"],
        AudioArr: ["squash_hmm", "gargantuar_thump"],
        Tooltip: "Squashes zombies",
        Produce:
            'Squashes will smash the first zombie that gets close to it.<p>Damage： <font color="#FF0000">massive</font><br>Range： <font color="#FF0000">short range, hits all zombies that it lands on</font><br>Usage： <font color="#FF0000">single use</font></p>"I\'m ready!" yells Squash. "Let\'s do it! Put me in! There\'s nobody better! I\'m your guy! C\'mon! Whaddya waiting for? I need this!"',
        GetDY: function (b, c, a) {
            return a[0] ? -21 : -10;
        },
        getHurt: function (d, b, a) {
            var c = this;
            b != 3 ? c.NormalAttack(c, d.id, d.ZX + d.Speed * 4 * (!d.WalkDirection ? -1 : 1) - 50) : (c.HP -= a) < 1 && c.Die();
        },
        getTriggerRange: function (a, b, c) {
            return [[b - 50, c + 80, 0]];
        },
        TriggerCheck: function (h, g, e) {
            var c = h.ZX,
                b = this.id,
                a = $(b).childNodes[1],
                f = h.isAttacking;
            h.beAttacked &&
                h.Altitude > -1 &&
                h.Altitude < 2 &&
                (f || (!f && c - this.AttackedRX < 71)) &&
                (PlayAudio("squash_hmm"),
                oT.$[this.R].splice(e, 1),
                (a.src = c > this.AttackedRX ? "images/Plants/Squash/SquashR.png" : "images/Plants/Squash/SquashL.png"),
                oSym.addTask(
                    100,
                    function (d, j, i) {
                        var k = $P[d];
                        k && k.NormalAttack(k, h.id, i);
                    },
                    [b, h.id, h.ZX + h.Speed * 4 * (!h.WalkDirection ? -1 : 1) - 50]
                ));
        },
        NormalAttack: function (d, c, b) {
            var a = $(d.id),
                e = $Z[c];
            e && (b = e.ZX + e.Speed * 4 * (!e.WalkDirection ? -1 : 1) - 50);
            a.childNodes[1].src = "images/Plants/Squash/SquashAttack.gif" + $Random + Math.random();
            SetStyle(a, { left: b + "px" });
            d.Die(1);
            oSym.addTask(
                45,
                function (f, l, j) {
                    PlayAudio("gargantuar_thump");
                    var g = oZ.getArZ(l, l + 100, j),
                        h = g.length,
                        k;
                    while (h--) {
                        (k = g[h]).Altitude > -1 && k.PZ && k.Altitude < 3 && k.getThump();
                    }
                    oSym.addTask(185, ClearChild, [f]);
                },
                [a, b, d.R]
            );
        },
    }),
    oChomper = InheritO(CPlants, {
        EName: "oChomper",
        CName: "Chomper",
        width: 130,
        height: 114,
        beAttackedPointR: 70,
        SunNum: 150,
        PicArr: ["images/Card/Plants/Chomper.png", "images/Plants/Chomper/0.gif", "images/Plants/Chomper/Chomper.gif", "images/Plants/Chomper/ChomperAttack.gif", "images/Plants/Chomper/ChomperDigest.gif"],
        Tooltip: "Devours a zombie whole, but is vulnerable while chewing",
        Produce:
            'Chompers can devour a zombie whole, but they are vulnerable while chewing.<p>Damage： <font color="#FF0000">massive</font><br>Range： <font color="#FF0000">very short</font><br>Special： <font color="#FF0000">long delay between chomps</font></p>Chomper almost got a gig doing stunts for The Little Shop of Horrors but it fell through when his agent demanded too much on the front end. Chomper\'s not resentful, though. He says it\'s just part of the business.',
        GetDX: function () {
            return -40;
        },
        getShadow: function (a) {
            return "top:" + (a.height - 22) + "px";
        },
        getTriggerRange: function (a, b, c) {
            return [[this.pixelLeft, c + 80, 0]];
        },
        TriggerCheck: function (a) {
            this.AttackCheck2(a) && ((this.canTrigger = 0), this.NormalAttack(this.id, a.id));
        },
        AttackCheck2: function (a) {
            return a.Altitude == 1 && a.beAttacked;
        },
        NormalAttack: function (a, b) {
            $(a).childNodes[1].src = "images/Plants/Chomper/ChomperAttack.gif" + $Random + Math.random();
            oSym.addTask(
                70,
                function (c, d) {
                    $P[c] &&
                        oSym.addTask(
                            18,
                            function (e, f) {
                                var g = $P[e],
                                    h;
                                g &&
                                    ((h = $Z[f]) && h.beAttacked && h.PZ
                                        ? ($(e).childNodes[1].src = h.getRaven(e)
                                              ? (oSym.addTask(
                                                    4200,
                                                    function (i) {
                                                        var j = $P[i];
                                                        j && ((j.canTrigger = 1), ($(i).childNodes[1].src = "images/Plants/Chomper/Chomper.gif"));
                                                    },
                                                    [e]
                                                ),
                                                "images/Plants/Chomper/ChomperDigest.gif")
                                              : ((g.canTrigger = 1), "images/Plants/Chomper/Chomper.gif"))
                                        : oSym.addTask(
                                              18,
                                              function (i) {
                                                  var j = $P[i];
                                                  j && ((j.canTrigger = 1), ($(i).childNodes[1].src = "images/Plants/Chomper/Chomper.gif"));
                                              },
                                              [e]
                                          ));
                            },
                            [c, d]
                        );
                },
                [a, b]
            );
        },
    }),
    oFumeShroom = InheritO(CPlants, {
        EName: "oFumeShroom",
        CName: "Fume-shroom",
        width: 100,
        height: 88,
        beAttackedPointR: 80,
        SunNum: 75,
        BookHandBack: 2,
        SleepGif: 3,
        night: true,
        PicArr: [
            "images/Card/Plants/FumeShroom.png",
            "images/Plants/FumeShroom/0.gif",
            "images/Plants/FumeShroom/FumeShroom.gif",
            "images/Plants/FumeShroom/FumeShroomSleep.gif",
            "images/Plants/FumeShroom/FumeShroomAttack.gif",
            "images/Plants/FumeShroom/FumeShroomBullet.gif",
        ],
        AudioArr: ["fume"],
        Tooltip: "Shoots fumes that can pass through screen doors",
        Produce:
            'Fume-shrooms shoot fumes that can pass through screen doors.<p>Damage： <font color="#FF0000">normal, penetrates screen doors</font><br>Range： <font color="#FF0000">all zombies in the fume cloud<br>Sleeps during the day</font></p>"I was in a dead-end job," says Fume-shroom. "Then Puff-shroom, bless \'im, told me about this great opportunity blasting zombies. Now I really feel like I\'m making a difference."',
        GetDY: function (b, c, a) {
            return a[0] ? -18 : -10;
        },
        GetDX: function () {
            return -45;
        },
        BirthStyle: function (c, d, b, a) {
            oS.DKind && ((c.canTrigger = 0), (c.Sleep = 1), (b.childNodes[1].src = c.PicArr[c.SleepGif]));
            EditEle(b, { id: d }, a, EDPZ);
        },
        PrivateBirth: function (b) {
            var a = b.id;
            NewEle(
                a + "_Bullet",
                "div",
                "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/FumeShroom/FumeShroomBullet.gif);z-index:" + (b.zIndex + 1),
                0,
                EDPZ
            );
        },
        PrivateDie: function (a) {
            ClearChild($(a.id + "_Bullet"));
        },
        getTriggerRange: function (a, b, c) {
            return [[b, Math.min(c + 330, oS.W), 0]];
        },
        NormalAttack: function () {
            PlayAudio("fume");
            var f = this,
                d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 330, oS.W), f.R),
                e = d.length,
                g,
                c = f.id,
                b = $(c),
                a = c + "_Bullet";
            while (e--) {
                (g = d[e]).Altitude < 2 && g.getHit1(g, 20);
            }
            b.childNodes[1].src = "images/Plants/FumeShroom/FumeShroomAttack.gif";
            SetVisible($(a));
            ImgSpriter(
                a,
                c,
                [
                    ["0 0", 9, 1],
                    ["0 -62px", 9, 2],
                    ["0 -124px", 9, 3],
                    ["0 -186px", 9, 4],
                    ["0 -248px", 9, 5],
                    ["0 -310px", 9, 6],
                    ["0 -372px", 9, 7],
                    ["0 -434px", 9, -1],
                ],
                0,
                function (i, j) {
                    var h = $(j);
                    $P[j] && ((h.childNodes[1].src = "images/Plants/FumeShroom/FumeShroom.gif"), SetHidden($(i)));
                }
            );
        },
    }),
    oCoffeeBean = InheritO(CPlants, {
        EName: "oCoffeeBean",
        CName: "Coffee Bean",
        width: 39,
        height: 97,
        beAttackedPointL: 10,
        beAttackedPointR: 29,
        SunNum: 75,
        PKind: 3,
        canEat: 0,
        PicArr: ["images/Card/Plants/CoffeeBean.png", "images/Plants/CoffeeBean/0.gif", "images/Plants/CoffeeBean/CoffeeBean.gif", "images/Plants/CoffeeBean/CoffeeBeanEat.gif" + $Random],
        AudioArr: ["coffee", "wakeup"],
        Tooltip: "Plant it on a mushroom to wake it up",
        Produce:
            'Use Coffee Beans to wake up sleeping mushrooms.<p>Usage： <font color="#FF0000">single use, instant</font><br>Special： <font color="#FF0000">can be planted over another plant, wakes up mushrooms</font></p>"Hey, guys, hey!" says Coffee Bean. "Hey! What\'s up? Who\'s that? Hey! Didja see that thing? What thing? Whoa! Lions!" Yep, Coffee Bean sure does get excited.',
        InitTrigger: function () {},
        GetDBottom: function () {
            return 49;
        },
        GetDY: function () {
            return -30;
        },
        CanGrow: function (a, b) {
            return (b = a[1]) && b.Sleep && !a[3];
        },
        BirthStyle: function (c, d, b, a) {
            b.childNodes[1].src = this.PicArr[3] + Math.random();
            EditEle(b, { id: d }, a, EDPZ);
        },
        PrivateBirth: function (a) {
            SetHidden($(a.id).firstChild);
            PlayAudio("coffee");
            oSym.addTask(
                240,
                function (c) {
                    PlayAudio("wakeup");
                    var d = oGd.$[c],
                        b;
                    d && ((b = d.WakeUP), !b ? (($(d.id).childNodes[1].src = d.PicArr[d.NormalGif]), (d.canTrigger = 1), (d.Sleep = 0)) : b(d));
                    a.Die();
                },
                [a.R + "_" + a.C + "_1"]
            );
        },
    }),
    oGloomShroom = InheritO(oFumeShroom, {
        EName: "oGloomShroom",
        CName: "Gloom-shroom",
        width: 88,
        height: 83,
        beAttackedPointR: 68,
        SunNum: 150,
        coolTime: 50,
        PicArr: [
            "images/Card/Plants/GloomShroom.png",
            "images/Plants/GloomShroom/0.gif",
            "images/Plants/GloomShroom/GloomShroom.gif",
            "images/Plants/GloomShroom/GloomShroomSleep.gif",
            "images/Plants/GloomShroom/GloomShroomAttack.gif",
            "images/Plants/GloomShroom/GloomShroomBullet.gif",
        ],
        AudioArr: ["kernelpult", "kernelpult2"],
        Tooltip: "Releases heavy fumes in an area around itself<br>(requires fume-shroom)",
        Produce:
            'Gloom-shrooms release heavy fumes in an area around themselves.<p><font color="#FF0000">Must be planted on fume-shrooms</font></p>"I\'ve always enjoyed releasing heavy fumes," says Gloom Shroom. "I know a lot of people aren\'t cool with that. They say it\'s rude or that it smells bad. All I can say is, would you rather have your brain eaten by zombies?"',
        CanGrow: function (b, a, d) {
            var c = b[1];
            return c && c.EName == "oFumeShroom";
        },
        BirthStyle: function (c, d, b, a) {
            oGd.$[c.R + "_" + c.C + "_1"].Sleep && ((c.canTrigger = 0), (c.Sleep = 1), (b.childNodes[1].src = c.PicArr[3]));
            EditEle(b, { id: d }, a, EDPZ);
        },
        GetDX: CPlants.prototype.GetDX,
        PrivateBirth: function (b) {
            var a = b.id;
            NewEle(
                a + "_Bullet",
                "div",
                "position:absolute;visibility:hidden;width:210px;height:200px;left:" + (b.pixelLeft - 60) + "px;top:" + (b.pixelTop - 65) + "px;background:url(images/Plants/GloomShroom/GloomShroomBullet.gif);z-index:" + (b.zIndex + 1),
                0,
                EDPZ
            );
        },
        PrivateDie: function (a) {
            ClearChild($(a.id + "_Bullet"));
        },
        getTriggerRange: function (c, d, e) {
            var f = GetX(this.C),
                b = (this.MinX = f - 120),
                a = (this.MaxX = f + 120);
            return [[b, a, 0]];
        },
        getTriggerR: function (c) {
            var b = (this.MinR = c > 2 ? c - 1 : 1),
                a = (this.MaxR = c < oS.R ? Number(c) + 1 : c);
            return [b, a];
        },
        NormalAttack: function () {
            var k = this,
                g,
                f = k.MaxR,
                c = k.MinX,
                b = k.MaxX,
                e,
                h,
                a,
                j = k.id,
                d = $(j),
                l = j + "_Bullet";
            for (g = k.MinR; g <= f; g++) {
                e = oZ.getArZ(c, b, g);
                for (h = e.length; h--; (a = e[h]).Altitude < 2 && a.getHit1(a, 80)) {}
            }
            oSym.addTask(
                100,
                function (i) {
                    PlayAudio(["kernelpult", "kernelpult2"][Math.floor(Math.random() * 2)]);
                    --i && oSym.addTask(100, arguments.callee, [i]);
                },
                [4]
            );
            d.childNodes[1].src = "images/Plants/GloomShroom/GloomShroomAttack.gif";
            SetVisible($(l));
            ImgSpriter(
                l,
                j,
                [
                    ["0 0", 9, 1],
                    ["0 -200px", 9, 2],
                    ["0 -400px", 9, 3],
                    ["0 -600px", 9, 4],
                    ["0 -800px", 9, 5],
                    ["0 -1000px", 9, 6],
                    ["0 -1200px", 9, 7],
                    ["0 -1400px", 9, 8],
                    ["0 -1600px", 9, 9],
                    ["0 -1800px", 9, 10],
                    ["0 -2000px", 9, 11],
                    ["0 -2200px", 9, -1],
                ],
                0,
                function (m, n) {
                    var i = $(n);
                    $P[n] && (i.childNodes[1].src = "images/Plants/GloomShroom/GloomShroom.gif");
                    SetHidden($(m));
                }
            );
        },
    }),
    oPuffShroom = InheritO(oFumeShroom, {
        EName: "oPuffShroom",
        CName: "Puff-shroom",
        width: 40,
        height: 66,
        beAttackedPointL: 15,
        beAttackedPointR: 25,
        SunNum: 0,
        Stature: -1,
        PicArr: [
            "images/Card/Plants/PuffShroom.png",
            "images/Plants/PuffShroom/0.gif",
            "images/Plants/PuffShroom/PuffShroom.gif",
            "images/Plants/PuffShroom/PuffShroomSleep.gif",
            "images/Plants/ShroomBullet.gif",
            "images/Plants/ShroomBulletHit.gif",
        ],
        AudioArr: ["puff"],
        Tooltip: "Shoots short-ranged spores at the enemy",
        Produce:
            'Puff-shrooms are cheap, but can only fire a short distance.<p>Damage： <font color="#FF0000">normal</font><br>Range： <font color="#FF0000">short<br>Sleeps during the day</font></p>"I only recently became aware of the existence of zombies," says Puff-shroom. "Like many fungi, I\'d just assumed they were fairy tales or movie monsters. This whole experience has been a huge eye-opener for me."',
        GetDX: CPlants.prototype.GetDX,
        getTriggerRange: function (a, b, c) {
            return [[b, Math.min(c + 250, oS.W), 0]];
        },
        PrivateBirth: function (a) {
            a.BulletEle = NewImg(0, "images/Plants/ShroomBullet.gif", "left:" + (a.AttackedLX - 46) + "px;top:" + (a.pixelTop + 40) + "px;visibility:hidden;z-index:" + (a.zIndex + 2));
        },
        PrivateDie: function (a) {
            a.BulletEle = null;
        },
        NormalAttack: function () {
            PlayAudio("puff");
            var b = this,
                c = "PSB" + Math.random(),
                a = b.AttackedLX;
            EditEle(b.BulletEle.cloneNode(false), { id: c }, 0, EDPZ);
            oSym.addTask(
                15,
                function (e) {
                    var d = $(e);
                    d && SetVisible(d);
                },
                [c]
            );
            oSym.addTask(
                1,
                function (j, d, e, f, g) {
                    var i = GetC(e),
                        h = oZ.getZ0(e, f);
                    h && h.Altitude == 1
                        ? (h.getPea(h, 20, 0), (SetStyle(d, { left: g + 38 + "px" }).src = "images/Plants/ShroomBulletHit.gif"), oSym.addTask(10, ClearChild, [d]))
                        : (e += 5) < oS.W
                        ? ((d.style.left = (g += 5) + "px"), oSym.addTask(1, arguments.callee, [j, d, e, f, g]))
                        : ClearChild(d);
                },
                [c, $(c), a, b.R, a - 46]
            );
        },
    }),
    oScaredyShroom = InheritO(oFumeShroom, {
        EName: "oScaredyShroom",
        CName: "Scaredy-shroom",
        width: 57,
        height: 81,
        beAttackedPointR: 37,
        SunNum: 25,
        Cry: 0,
        ArZ: [],
        Attacking: 0,
        PicArr: [
            "images/Card/Plants/ScaredyShroom.png",
            "images/Plants/ScaredyShroom/0.gif",
            "images/Plants/ScaredyShroom/ScaredyShroom.gif",
            "images/Plants/ScaredyShroom/ScaredyShroomSleep.gif",
            "images/Plants/ScaredyShroom/ScaredyShroomCry.gif",
            "images/Plants/ShroomBullet.gif",
            "images/Plants/ShroomBulletHit.gif",
        ],
        Tooltip: "Long-ranged shooter that hides when enemies get near it",
        Produce:
            'Scaredy-shrooms are long-ranged shooters that hide when enemies get near them.<p>Damage： <font color="#FF0000">normal</font><br>Special： <font color="#FF0000">stops shooting when enemy is close<br>Sleeps during the day</font></p>"Who\'s there?" whispers Scaredy-shroom, voice barely audible. "Go away. I don\'t want to see anybody. Unless it\'s the man from the circus."',
        GetDX: CPlants.prototype.GetDX,
        getTriggerRange: CPlants.prototype.getTriggerRange,
        getTriggerR: function (c) {
            var b = (this.MinR = c > 2 ? c - 1 : 1),
                a = (this.MaxR = c < oS.R ? Number(c) + 1 : c);
            return [b, a];
        },
        TriggerCheck: function (e, c) {
            var b = this,
                a = b.id;
            e.PZ && Math.abs(e.ZX - b.MX) < 121 && e.beAttacked
                ? (b.ArZ.push(e.id), !b.Cry && ((b.Cry = 1), ($(a).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroomCry.gif"), b.CryCheck(a)))
                : e.R == b.R && !b.Cry && !b.Attacking && e.Altitude > 0 && e.Altitude < 3 && b.NormalAttack();
        },
        PrivateBirth: function (c) {
            var b = c.AttackedLX,
                a = b - 46;
            c.BulletClass = NewO({ X: b, R: c.R, pixelLeft: a, F: oGd.MB2 });
            c.BulletEle = NewImg(0, "images/Plants/ShroomBullet.gif", "left:" + a + "px;top:" + (c.pixelTop + 35) + "px;visibility:hidden;z-index:" + (c.zIndex + 2));
            c.MX = b + 9;
        },
        PrivateDie: function (a) {
            a.BulletEle = null;
        },
        NormalAttack: function () {
            var c = this,
                a = c.id,
                d = "SSB" + Math.random(),
                b = c.AttackedLX;
            EditEle(c.BulletEle.cloneNode(false), { id: d }, 0, EDPZ);
            oSym.addTask(
                1,
                function (k, e, f, g, h) {
                    var j = GetC(f),
                        i = oZ.getZ0(f, g);
                    i && i.Altitude == 1
                        ? (i.getPea(i, 20, 0), (SetStyle(e, { left: h + 38 + "px" }).src = "images/Plants/ShroomBulletHit.gif"), oSym.addTask(10, ClearChild, [e]))
                        : (f += 5) < oS.W
                        ? ((e.style.left = (h += 5) + "px"), oSym.addTask(1, arguments.callee, [k, e, f, g, h]))
                        : ClearChild(e);
                },
                [d, $(d), b, c.R, b - 46]
            );
            c.Attacking = 1;
            oSym.addTask(
                10,
                function (g, e) {
                    var f = $(g);
                    f && SetVisible(f);
                    oSym.addTask(
                        130,
                        function (h) {
                            var i = $P[h];
                            i && (i.Attacking = 0);
                        },
                        [e]
                    );
                },
                [d, a]
            );
        },
        CryCheck: function (a) {
            oSym.addTask(
                140,
                function (b) {
                    var d = $P[b],
                        c,
                        f,
                        e;
                    if (d) {
                        c = (f = d.ArZ).length;
                        while (c--) {
                            (!(e = $Z[f[c]]) || !e.PZ || Math.abs(e.ZX - d.MX) > 120) && f.splice(c, 1);
                        }
                        f.length ? d.CryCheck(b) : ((d.Cry = 0), ($(b).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroom.gif"));
                    }
                },
                [a]
            );
        },
    }),
    oHypnoShroom = InheritO(oFumeShroom, {
        EName: "oHypnoShroom",
        CName: "Hypno-shroom",
        width: 71,
        height: 78,
        beAttackedPointL: 10,
        beAttackedPointR: 61,
        SunNum: 75,
        coolTime: 30,
        PicArr: ["images/Card/Plants/HypnoShroom.png", "images/Plants/HypnoShroom/0.gif", "images/Plants/HypnoShroom/HypnoShroom.gif", "images/Plants/HypnoShroom/HypnoShroomSleep.gif"],
        Tooltip: "Makes a zombie fight for you",
        Produce:
            'When eaten, Hypno-shrooms will make a zombie turn around and fight for you.<p>Usage： <font color="#FF0000">single use, on contact</font><br>Special： <font color="#FF0000">makes a zombie fight for you<br>Sleeps during the day</font></p>"Zombies are our friends," asserts Hypno-shroom. "They\'re badly misunderstood creatures who play a valuable role in our ecology. We can and should do more to bring them round to our way of thinking."',
        InitTrigger: function () {},
        getHurt: function (d, b, a) {
            var c = this;
            switch (b) {
                case 3:
                    (c.HP -= a) < 1 && c.Die();
                    break;
                case 0:
                    !c.Sleep && d.bedevil(d);
                    c.Die();
                    break;
                default:
                    c.Die(1);
            }
        },
    }),
    oIceShroom = InheritO(oFumeShroom, {
        EName: "oIceShroom",
        CName: "Ice-shroom",
        width: 83,
        height: 75,
        beAttackedPointR: 63,
        SunNum: 75,
        coolTime: 50,
        PicArr: [
            "images/Card/Plants/IceShroom.png",
            "images/Plants/IceShroom/0.gif",
            "images/Plants/IceShroom/IceShroom.gif",
            "images/Plants/IceShroom/IceShroomSleep.gif",
            "images/Plants/IceShroom/Snow.gif",
            "images/Plants/IceShroom/icetrap.gif",
        ],
        AudioArr: ["frozen", "wakeup"],
        Tooltip: "Temporarily immobilizes all zombies on the screen",
        Produce:
            'Ice-shrooms temporarily immobilize all zombies on the screen.。<p>Damage： <font color="#FF0000">very light, immobilizes zombies</font><br>Range： <font color="#FF0000">all zombies on the screen</font><br>Usage： <font color="#FF0000">single use, instant<br>Sleeps during the day</font></p>Ice-shroom frowns, not because he\'s unhappy or because he disapproves, but because of a childhood injury that left his facial nerves paralyzed.',
        GetDX: CPlants.prototype.GetDX,
        GetDY: CPlants.prototype.GetDY,
        InitTrigger: function () {},
        PrivateDie: function (a) {},
        PrivateBirth: function (a) {
            !oS.DKind ? (a.NormalAttack(a.id), (a.getHurt = function (d, c, b) {})) : (a.getHurt = CPlants.prototype.getHurt);
        },
        WakeUP: function (a) {
            var b = a.id;
            a.Sleep = 0;
            $(b).childNodes[1].src = "images/Plants/IceShroom/IceShroom.gif";
            a.NormalAttack(b);
        },
        NormalAttack: function (a) {
            oSym.addTask(
                100,
                function (c) {
                    var f = $P[c];
                    if (f) {
                        PlayAudio("frozen");
                        var e,
                            d,
                            b = "Snow_" + Math.random();
                        for (d in $Z) {
                            (e = $Z[d]).ZX < 901 && e.getFreeze(e, d);
                        }
                        oSym.addTask(
                            40,
                            function (g) {
                                ClearChild(g);
                            },
                            [
                                NewEle(
                                    b,
                                    "div",
                                    "position:absolute;left:0;top:0;width:900px;height:600px;z-index:10;filter:alpha(opacity=50);opacity:.5;background:#9CF url(images/Plants/IceShroom/Snow.gif) no-repeat scroll " +
                                        (f.pixelLeft - 197) +
                                        "px " +
                                        (f.pixelTop - 80) +
                                        "px",
                                    0,
                                    EDPZ
                                ),
                            ]
                        );
                        f.Die();
                    }
                },
                [a]
            );
        },
    }),
    oSunShroom = InheritO(oFumeShroom, {
        EName: "oSunShroom",
        CName: "Sun-shroom",
        width: 59,
        height: 61,
        beAttackedPointL: 15,
        beAttackedPointR: 44,
        SunNum: 25,
        Stature: -1,
        Status: 0,
        PicArr: ["images/Card/Plants/SunShroom.png", "images/Plants/SunShroom/0.gif", "images/Plants/SunShroom/SunShroom2.gif", "images/Plants/SunShroom/SunShroomSleep.gif", "images/Plants/SunShroom/SunShroom.gif"],
        Tooltip: "Gives small sun at first and normal sun later",
        Produce:
            'Sun-shrooms give small sun at first and normal sun later.<p>Sun production： <font color="#FF0000">low, then normal<br>Sleeps during the day</font></p>Sun-shroom hates sun. He hates it so much that when it builds up in his system, he spits it out as fast as he can. He just won\'t abide it. To him, sun is crass.',
        GetDX: CPlants.prototype.GetDX,
        GetDY: CPlants.prototype.GetDY,
        InitTrigger: function () {},
        PrivateDie: function (a) {},
        PrivateBirth: function () {},
        BirthStyle: function (c, d, b, a) {
            oS.DKind
                ? ((c.canTrigger = 0), (c.Sleep = 1), (b.childNodes[1].src = "images/Plants/SunShroom/SunShroomSleep.gif"))
                : (oSym.addTask(
                      600,
                      function (h, g, f) {
                          var e = $P[h];
                          e && e.ProduceSun(e, g, f);
                      },
                      [d, GetX(c.C) - 40, GetY(c.R)]
                  ),
                  oSym.addTask(
                      12000,
                      function (f) {
                          var e = $P[f];
                          e && ((e.Sleep = 0), ($(f).childNodes[1].src = "images/Plants/SunShroom/SunShroom.gif"), (e.Status = 1));
                      },
                      [d]
                  ));
            EditEle(b, { id: d }, a, EDPZ);
        },
        ProduceSun: function (a, c, b) {
            AppearSun(Math.floor(c + Math.random() * 41), b, !a.Status ? 15 : 25, 0),
                oSym.addTask(
                    2400,
                    function (g, f, e) {
                        var d = $P[g];
                        d && d.ProduceSun(d, f, e);
                    },
                    [a.id, c, b]
                );
        },
        WakeUP: function (a) {
            var b = a.id;
            a.ProduceSun(a, GetX(a.C) - 40, GetY(a.R));
            $(b).childNodes[1].src = "images/Plants/SunShroom/SunShroom2.gif";
            a.Sleep = 0;
            oSym.addTask(
                12000,
                function (d) {
                    var c = $P[d];
                    c && (($(d).childNodes[1].src = "images/Plants/SunShroom/SunShroom.gif"), (c.Status = 1));
                },
                [b]
            );
        },
    }),
    oDoomShroom = InheritO(oFumeShroom, {
        EName: "oDoomShroom",
        CName: "毁灭菇",
        width: 102,
        height: 91,
        beAttackedPointR: 80,
        coolTime: 50,
        SunNum: 125,
        PicArr: [
            "images/Card/Plants/DoomShroom.png",
            "images/Plants/DoomShroom/0.gif",
            "images/Plants/DoomShroom/DoomShroom.gif",
            "images/Plants/DoomShroom/Sleep.gif",
            "images/Plants/DoomShroom/BeginBoom.gif",
            "images/Plants/DoomShroom/crater10.png",
            "images/Plants/DoomShroom/crater11.png",
            "images/Plants/DoomShroom/crater20.png",
            "images/Plants/DoomShroom/crater21.png",
            "images/Plants/DoomShroom/crater30.png",
            "images/Plants/DoomShroom/crater31.png",
            "images/Plants/DoomShroom/Boom.png",
        ],
        Tooltip: "造成大规模的伤害, 但会在原地留下一个坑, 坑中无法种植物",
        Produce:
            '毁灭菇可以摧毁大范围的僵尸，并留下一个不能种植物的大弹坑。<p>伤害：<font color="#FF0000">极高</font><br>范围：<font color="#FF0000">大范围内的所有僵尸</font><br>用法：<font color="#FF0000">单独使用，立即生效</font><br>特点：<font color="#FF0000">留下一个弹坑<br>白天睡觉</font></p>“你很幸运，我是和你一伙的，”毁灭菇说，“我能摧毁任何你所珍视的东西，小菜一碟。”',
        InitTrigger: function () {},
        BirthStyle: function (c, d, b, a) {
            oS.DKind ? ((c.Sleep = 1), (b.childNodes[1].src = c.PicArr[c.SleepGif])) : ((c.Sleep = 0), (c.getHurt = function () {}), (b.childNodes[1].src = "images/Plants/DoomShroom/BeginBoom.gif"), c.NormalAttack(d));
            EditEle(b, { id: d }, a, EDPZ);
        },
        WakeUP: function (a) {
            var b = a.id;
            a.Sleep = 0;
            a.getHurt = function () {};
            $(b).childNodes[1].src = "images/Plants/DoomShroom/BeginBoom.gif";
            a.NormalAttack(b);
        },
        NormalAttack: function (a) {
            oSym.addTask(
                100,
                function (c) {
                    var d = $P[c],
                        q = c + "_Boom";
                    if (d) {
                        var g = $(c),
                            l = d.R,
                            h = l > 3 ? l - 2 : 1,
                            f = Math.min(oS.R, l + 2),
                            n = d.pixelLeft - 240,
                            m = d.pixelRight + 240,
                            e,
                            k,
                            b = GetC(d.AttackedLX),
                            o,
                            r = l + "_" + b,
                            j = oGd.$;
                        do {
                            k = (e = oZ.getArZ(n, m, h)).length;
                            while (k--) {
                                e[k].getExplosion();
                            }
                        } while (h++ < f);
                        d.Die();
                        (o = j[r + "_" + 0]) && o.Die();
                        (o = j[r + "_" + 2]) && o.Die();
                        oGd.$Crater[r] = 2;
                        NewEle(
                            q,
                            "div",
                            "position:absolute;overflow:hidden;z-index:" +
                                (d.zIndex + 2) +
                                ";width:283px;height:324px;left:" +
                                (d.pixelLeft - 80) +
                                "px;top:" +
                                (d.pixelTop - 220) +
                                "px;background:url(images/Plants/DoomShroom/Boom.png) no-repeat",
                            0,
                            EDPZ
                        );
                        oSym.addTask(
                            20,
                            function (i) {
                                ClearChild(i);
                            },
                            [NewEle(q, "div", "position:absolute;z-index:20;width:900px;height:600px;left:0;top:0;background:#FFF;*filter:alpha(opacity=50);opacity:.5", 0, EDPZ)]
                        );
                        ImgSpriter(
                            q,
                            c,
                            [
                                ["0 0", 10, 1],
                                ["-283px 0", 10, 2],
                                ["-566px 0", 10, 3],
                                ["-849px 0", 10, 4],
                                ["-1132px 0", 10, 5],
                                ["-1415px 0", 10, 6],
                                ["-1698px 0", 10, 7],
                                ["-1981px 0", 10, 8],
                                ["-2264px 0", 10, 9],
                                ["-2547px 0", 10, -1],
                            ],
                            0,
                            function (i, p) {
                                ClearChild($(i));
                                d.setCrater(c + "_crater", l, b, d.pixelLeft + 3, d.pixelTop + 50);
                            }
                        );
                    }
                },
                [a]
            );
        },
        setCrater: function (f, b, d, e, c) {
            var a;
            switch (oGd.$LF[b]) {
                case 1:
                    a = NewEle(
                        f,
                        "div",
                        "position:absolute;z-index:" +
                            (3 * b - 1) +
                            ";overflow:hidden;background:url(images/Plants/DoomShroom/crater1" +
                            oS.DKind +
                            ".png) no-repeat;width:90px;height:61px;left:" +
                            (e || GetX(d) - 45) +
                            "px;top:" +
                            (c || GetY(b) - 30) +
                            "px",
                        0,
                        EDPZ
                    );
                    break;
                case 2:
                    a = NewEle(
                        f,
                        "div",
                        "position:absolute;z-index:" +
                            (3 * b - 1) +
                            ";overflow:hidden;background:url(images/Plants/DoomShroom/crater2" +
                            oS.DKind +
                            ".png) no-repeat;width:85px;height:53px;left:" +
                            (e || GetX(d) - 42) +
                            "px;top:" +
                            (c || GetY(b) - 26) +
                            "px",
                        0,
                        EDPZ
                    );
                    break;
                default:
            }
            oSym.addTask(
                9000,
                function (g) {
                    var h = b + "_" + d;
                    g.style.backgroundPosition = "100% 0";
                    oGd.$Crater[h] = 1;
                    oSym.addTask(
                        9000,
                        function (i, j) {
                            ClearChild(i);
                            delete oGd.$Crater[j];
                        },
                        [g, h]
                    );
                },
                [a]
            );
        },
    }),
    oTangleKlep = InheritO(CPlants, {
        EName: "oTangleKlep",
        CName: "缠绕海草",
        width: 90,
        height: 72,
        beAttackedPointL: 15,
        beAttackedPointR: 80,
        coolTime: 30,
        SunNum: 25,
        BookHandBack: 4,
        GetDY: function (b, c, a) {
            return 5;
        },
        NormalGif: 1,
        PicArr: ["images/Card/Plants/TangleKlep.png", "images/Plants/TangleKlep/0.gif", "images/Plants/TangleKlep/Float.gif", "images/Plants/TangleKlep/Grab.png", "images/interface/splash.png"],
        Tooltip: "可以将僵尸拉入水底的水生植物",
        Produce:
            '缠绕水草是一种可以把接近他的僵尸拉进水中的水生植物。<p>伤害：<font color="#FF0000">极高</font><br>用法：<font color="#FF0000">单独使用，接触后生效</font><br>特点：<font color="#FF0000">必须种在水中</font></p>“我是完全隐形的，”缠绕水草自己想，“我就藏在水面下，没人会看到我。”他的朋友告诉他，他们可以清楚地看到他。不过，缠绕水草似乎不想改变自己的看法。',
        CanGrow: function (c, b, d) {
            var a = b + "_" + d;
            return !(oGd.$LF[b] != 2 || d < 1 || d > 9 || oGd.$Crater[a] || c[0] || c[1]);
        },
        getShadow: function (a) {
            return "display:none";
        },
        getTriggerRange: function (a, b, c) {
            return [[b, c, 0]];
        },
        BirthStyle: function (c, d, b, a) {
            b.childNodes[1].src = "images/Plants/TangleKlep/Float.gif";
            EditEle(b, { id: d }, a, EDPZ);
        },
        getHurt: function (d, b, a) {
            var c = this;
            b == 3 ? (c.HP -= a) < 1 && c.Die() : ((c.canTrigger = 0), c.NormalAttack(c, d));
        },
        TriggerCheck: function (b, a) {
            b.AttackedLX < GetX(9) && b.beAttacked && ((this.canTrigger = 0), this.NormalAttack(this, b));
        },
        NormalAttack: function (a, b) {
            a.getHurt = function () {};
            b.getHurt = function () {};
            b.beAttacked = 0;
            b.isAttacking = 1;
            NewImg(0, "images/Plants/TangleKlep/Grab.png", "left:" + b.beAttackedPointL + "px;top:" + (b.height - 67) + "px", b.Ele);
            oSym.addTask(
                50,
                function (g, h) {
                    var e = g.id,
                        f = h.id,
                        d = e + "_splash",
                        c = f + "_splash";
                    NewEle(d, "div", "position:absolute;background:url(images/interface/splash.png);left:" + (g.pixelLeft - 4) + "px;top:" + (g.pixelTop - 16) + "px;width:97px;height:88px;over-flow:hidden", 0, EDPZ);
                    NewEle(c, "div", "position:absolute;background:url(images/interface/splash.png);left:" + (h.AttackedLX - 10) + "px;top:" + (h.pixelTop + h.height - 88) + "px;width:97px;height:88px;over-flow:hidden", 0, EDPZ);
                    ImgSpriter(
                        d,
                        e,
                        [
                            ["0 0", 9, 1],
                            ["-97px 0", 9, 2],
                            ["-194px 0", 9, 3],
                            ["-291px 0", 9, 4],
                            ["-388px 0", 9, 5],
                            ["-485px 0", 9, 6],
                            ["-582px 0", 9, 7],
                            ["-679px 0", 9, -1],
                        ],
                        0,
                        function (i, j) {
                            ClearChild($(i));
                        }
                    );
                    ImgSpriter(
                        c,
                        f,
                        [
                            ["0 0", 9, 1],
                            ["-97px 0", 9, 2],
                            ["-194px 0", 9, 3],
                            ["-291px 0", 9, 4],
                            ["-388px 0", 9, 5],
                            ["-485px 0", 9, 6],
                            ["-582px 0", 9, 7],
                            ["-679px 0", 9, -1],
                        ],
                        0,
                        function (i, j) {
                            ClearChild($(i));
                        }
                    );
                    h.DisappearDie();
                    g.Die();
                },
                [a, b]
            );
        },
    }),
    oSeaShroom = InheritO(oPuffShroom, {
        EName: "oSeaShroom",
        CName: "海蘑菇",
        width: 48,
        height: 99,
        beAttackedPointL: 10,
        beAttackedPointR: 40,
        coolTime: 30,
        BookHandBack: 3,
        PicArr: [
            "images/Card/Plants/SeaShroom.png",
            "images/Plants/SeaShroom/0.gif",
            "images/Plants/SeaShroom/SeaShroom.gif",
            "images/Plants/SeaShroom/SeaShroomSleep.gif",
            "images/Plants/ShroomBullet.gif",
            "images/Plants/ShroomBulletHit.gif",
        ],
        CanGrow: function (c, b, d) {
            var a = b + "_" + d;
            return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a]);
        },
        Tooltip: "发射短距离孢子的水生植物",
        Produce:
            '海蘑菇，能够发射短程孢子的水生植物。<p>伤害：<font color="#FF0000">普通</font><br>射程：<font color="#FF0000">短<br>必须种在水上<br>白天睡觉</font></p>海蘑菇从来没看到过大海，大海就在他的名字里，他总听到关于大海的事。他只是没找到合适的时间，总有一天……是的，他会见到海的。',
    });
