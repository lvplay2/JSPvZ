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
        CName: "墓地苔",
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
        Tooltip: "把它种在墓碑上用来吞噬墓碑",
        Produce:
            '墓地苔用来吃掉墓碑。<p>使用方法：<font color="#FF0000">单次使用，只对墓碑生效。</font><br>特点：<font color="#FF0000">吞噬墓碑。</font></p>尽管墓地苔的外表十分吓人，但他想要所有人都知道，其实他喜欢小猫咪，而且利用业余时间，在一家僵尸康复中心做志愿者。“我只是在做正确的事情，”他说。',
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
        CName: "草地剪草机",
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
        Tooltip: "最普通的草地剪草机",
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
        CName: "池塘清扫车",
        width: 47,
        height: 64,
        beAttackedPointL: 0,
        beAttackedPointR: 47,
        SunNum: 0,
        PicArr: ["images/interface/PoolCleaner.png"],
        Tooltip: "池塘清扫车",
        AudioArr: ["pool_cleaner"],
    }),
    oBrains = InheritO(CPlants, {
        EName: "oBrains",
        CName: "脑子",
        width: 32,
        height: 31,
        beAttackedPointL: 0,
        beAttackedPointR: 32,
        SunNum: 0,
        PicArr: ["images/interface/brain.png"],
        Tooltip: "美味的脑子",
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
        CName: "杨桃",
        width: 77,
        height: 70,
        beAttackedPointR: 57,
        SunNum: 125,
        GetDY: function (b, c, a) {
            return a[0] ? -17 : -10;
        },
        PicArr: ["images/Card/Plants/Starfruit.png", "images/Plants/Starfruit/0.gif", "images/Plants/Starfruit/Starfruit.gif", "images/Plants/Starfruit/Star.gif"],
        Tooltip: "向五个方向发射小杨桃",
        Produce:
            '杨桃可以向五个方向发射小杨桃。<p>伤害：<font color="#FF0000">中等</font><br>范围：<font color="#FF0000">五个方向</font></p>杨桃：“嘿，哥们，有一天我去看牙医，他说我有四个牙洞。我一数，我就只有一颗牙齿！一颗牙齿长了四个牙洞？怎么会这样啊？”',
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
        CName: "豌豆射手",
        width: 71,
        height: 71,
        beAttackedPointR: 51,
        SunNum: 100,
        BKind: 0,
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        PicArr: ["images/Card/Plants/Peashooter.png", "images/Plants/Peashooter/0.gif", "images/Plants/Peashooter/Peashooter.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
        Tooltip: "向敌人射出豌豆",
        Produce:
            '豌豆射手，你的第一道防线。它们通过发射豌豆来攻击僵尸。<p>伤害：<font color="#FF0000">中等</font></p>一棵植物，怎么能如此快地生长，并发射如此多的豌豆呢？豌豆射手：“努力工作，奉献自己，再加上一份阳光，高纤维和氧化碳均衡搭配，这种健康早餐让一切成为可能。”',
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
        CName: "寒冰射手",
        SunNum: 175,
        BKind: -1,
        PicArr: ["images/Card/Plants/SnowPea.png", "images/Plants/SnowPea/0.gif", "images/Plants/SnowPea/SnowPea.gif", "images/Plants/PB-10.gif", "images/Plants/PeaBulletHit.gif"],
        AudioArr: ["frozen", "splat1", "splat2", "splat3", "shieldhit", "shieldhit2", "plastichit"],
        Tooltip: "寒冰射手可造成伤害, 同时又有减速效果",
        Produce:
            '寒冰射手会发射寒冰豌豆来攻击敌人，并具有减速效果。<p>伤害：<font color="#FF0000">中等，带有减速效果</font></p>人们经常告诉寒冰射手他是多么“冷酷”，或者告诫他要“冷静”。他们叫他要“保持镇静”。寒冰射手只是转转他的眼睛。其实他都听见了。',
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
        CName: "双发射手",
        width: 73,
        height: 71,
        beAttackedPointR: 53,
        SunNum: 200,
        PicArr: ["images/Card/Plants/Repeater.png", "images/Plants/Repeater/0.gif", "images/Plants/Repeater/Repeater.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        Tooltip: "一次发射两颗豌豆",
        Produce:
            '双发射手可以一次发射两颗豌豆<p>伤害：<font color="#FF0000">中等(每颗)</font><br>发射速度：<font color="#FF0000">两倍</font></p>双发射手很凶悍，他是在街头混大的。他不在乎任何人的看法，无论是植物还是僵尸，他打出豌豆，是为了让别人离他远点。其实呢，双发射手一直暗暗地渴望着爱情。',
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
        CName: "三线射手",
        width: 73,
        height: 80,
        beAttackedPointR: 53,
        SunNum: 325,
        PicArr: ["images/Card/Plants/Threepeater.png", "images/Plants/Threepeater/0.gif", "images/Plants/Threepeater/Threepeater.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        Tooltip: "一次射出三行的豌豆",
        Produce:
            '三线射手可以在三条线上同时射出豌豆。<p>伤害：<font color="#FF0000">普通(每颗)</font><br>范围：<font color="#FF0000">三线</font></p>三线射手喜欢读书，下棋和在公园里呆坐。他也喜欢演出，特别是现代爵士乐。“我正在寻找我生命中的另一半，”他说。三线射手最爱的数字是5。',
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
        CName: "加特林",
        width: 88,
        height: 84,
        beAttackedPointR: 68,
        SunNum: 250,
        coolTime: 50,
        PicArr: ["images/Card/Plants/GatlingPea.png", "images/Plants/GatlingPea/0.gif", "images/Plants/GatlingPea/GatlingPea.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        Tooltip: "一次发射四颗豌豆<br>(需要双发射手)",
        Produce:
            '加特林可以一次发射四颗豌豆<p>伤害：<font color="#FF0000">中等(每颗)</font><br>发射速度：<font color="#FF0000">四倍<br>只能种在双发射手上</font></p>当加特林宣布他要参军的时候，他的父母很为他担心，他们异口同声地对他说：“亲爱的，但这太危险了。”加特林拒绝让步，“生活本就危险，”他这样回答着，此时他的眼睛里，正闪烁着钢铁般的信念。',
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
        CName: "分裂射手",
        width: 92,
        height: 72,
        beAttackedPointR: 72,
        SunNum: 125,
        PicArr: ["images/Card/Plants/SplitPea.png", "images/Plants/SplitPea/0.gif", "images/Plants/SplitPea/SplitPea.gif", "images/Plants/PB00.gif", "images/Plants/PB01.gif", "images/Plants/PeaBulletHit.gif"],
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        Tooltip: "前后双向发射豌豆",
        Produce:
            '分裂射手，可以向前后两个方向发射豌豆。<p>伤害：<font color="#FF0000">中等</font><br>范围：<font color="#FF0000">前面和后面</font><br>发射速度：<font color="#FF0000">前面为正常速度，后面为两倍速度</font></p>分裂射手：“没错，我就是双子座。我知道，这的确很令人惊奇。不过，有两个头，或者实际上，长着一个头和一个类似头的东西，在背上，对我这条线上的防守帮助很大。',
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
        CName: "向日葵",
        width: 73,
        height: 74,
        beAttackedPointR: 53,
        SunNum: 50,
        PicArr: ["images/Card/Plants/SunFlower.png", "images/Plants/SunFlower/0.gif", "images/Plants/SunFlower/SunFlower1.gif", "images/Plants/SunFlower/SunFlower.gif"],
        Tooltip: "提供你额外的阳光",
        Produce: '向日葵，为你生产额外阳光的经济作物。尝试尽可能多种植吧！<p>阳光产量：<font color="#FF0000">中等</font></p>向日葵情不自禁地和着节拍起舞。是什么节拍呢？嗨，是大地自己用来提神的爵士节拍，这种频率的节拍，只有向日葵才能听到。',
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
        CName: "双子向日葵",
        width: 83,
        height: 84,
        beAttackedPointR: 63,
        SunNum: 150,
        coolTime: 50,
        PicArr: ["images/Card/Plants/TwinSunflower.png", "images/Plants/TwinSunflower/0.gif", "images/Plants/TwinSunflower/TwinSunflower1.gif", "images/Plants/TwinSunflower/TwinSunflower.gif"],
        Tooltip: "一次提供两倍于向日葵的阳光量<br>(需要向日葵)",
        Produce:
            '双子向日葵的阳光产量是普通向日葵的两倍。<p>阳光产量：<font color="#FF0000">双倍<br>只能种在普通向日葵上</font></p>这是一个疯狂的夜晚，禁忌的科学技术，让双子向日葵来到了这个世界。电闪雷鸣，狂风怒吼，都在表示着这个世界对他的拒绝。但是一切都无济于事，双子向日葵他却仍然活着！',
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
        CName: "南瓜头",
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
        Tooltip: "能保护种在里面的植物",
        Produce:
            '南瓜头，可以用他的外壳保护其他植物。<p>韧性：<font color="#FF0000">高</font><br>特点：<font color="#FF0000">可以种在其他植物上</font></p>南瓜头最近都没收到，关于他表哥刃菲尔德的消息。很明显，刃菲尔德是个大明星，是一种……叫什么运动来着……的体育明星？佩格跳跳球大师？南瓜头反正搞不懂是什么运动，他只想做好他自己的工作。',
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
        CName: "花盆",
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
        Tooltip: "可以让植物栽种在屋顶上",
        Produce: '花盆可以让你在屋顶上种植植物。<p>特点：<font color="#FF0000">允许你在屋顶上种植</font></p>“我是一个让植物栽种的花盆，但我也是一棵植物。是不是很意外？',
        InitTrigger: function () {},
    }),
    oLilyPad = InheritO(oFlowerPot, {
        BookHandBack: 4,
        Stature: -1,
        EName: "oLilyPad",
        CName: "睡莲",
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
        Tooltip: "使你能够将非水生植物种在上面",
        Produce:
            '睡莲可以让你种植非水生植物在它上面。<p>特点：<font color="#FF0000">非水生植物可以种植在它上面<br>必须种植在水面</font></p>睡莲从不抱怨，它也从来不想知道发生了什么事。在它身上种植物，它也不会说什么。难道，它有什么惊奇想法或者可怕的秘密？没人知道。睡莲把这些都埋藏在心底。',
    }),
    oPotatoMine = InheritO(CPlants, {
        EName: "oPotatoMine",
        CName: "土豆雷",
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
        Tooltip: "敌人接触后爆炸<br>需要时间安放",
        Produce:
            '土豆雷具有强大的威力，但是他们需要点时间来武装自己。你应把他们种在僵尸前进的路上，当他们一被接触就会发生爆炸。<p>伤害：<font color="FF0000">巨大</font><br>范围：<font color="#FF0000">一个小区域内的所有僵尸</font><br>使用方法：<font color="#FF0000">单独使用，需要一定准备时间才能起作用。</font></p>一些人说土豆雷很懒，因为他总是把所有事情留到最后。土豆雷才没空理他们，他正忙着考虑他的投资战略呢。',
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
        CName: "火炬树桩",
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
        Tooltip: "通过火炬树桩的豌豆将变为火球",
        Produce:
            '火炬树桩可以把穿过他的豌豆变成火球，可以造成两倍伤害。<p>特点：<font color="#FF0000">让穿过他的火球造成两倍伤害。火球也会对附近僵尸造成溅射伤害</font></p>每个人都喜欢并敬重火炬树桩。他们喜欢他的诚实和坚贞的友谊，以及增强豌豆伤害的能力。但他也有自己的秘密：他不识字！',
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
        CName: "坚果墙",
        width: 65,
        height: 73,
        beAttackedPointR: 45,
        SunNum: 50,
        HP: 4000,
        coolTime: 30,
        PicArr: ["images/Card/Plants/WallNut.png", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/WallNut.gif", "images/Plants/WallNut/Wallnut_cracked1.gif", "images/Plants/WallNut/Wallnut_cracked2.gif"],
        Tooltip: "阻碍僵尸前进, 并保护你其他的植物",
        Produce: '坚果墙拥有足以让你用来保护其它植物的坚硬外壳。<p>韧性：<font color="FF0000">高</font></p>坚果墙：“人们想知道，经常被僵尸啃的感觉怎样？他们不知道，我有限的感官，只能让我感到一种麻麻的感觉，像是，令人放松的背部按摩。”',
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
        CName: "坚果保龄球",
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
        CName: "巨型坚果保龄球",
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
        CName: "爆炸坚果",
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
        CName: "高坚果",
        width: 83,
        height: 119,
        beAttackedPointR: 63,
        SunNum: 125,
        HP: 8000,
        PicArr: ["images/Card/Plants/TallNut.png", "images/Plants/TallNut/0.gif", "images/Plants/TallNut/TallNut.gif", "images/Plants/TallNut/TallnutCracked1.gif", "images/Plants/TallNut/TallnutCracked2.gif"],
        Tooltip: "不会被跳过的坚实壁垒",
        Produce:
            '高坚果是重型壁垒植物，而且不会被跨过。<p>韧性：<font color="#FF0000">非常高</font><br>特殊：<font color="#FF0000">不会被跨过或越过</font></p>人们想知道，坚果墙和高坚果是否在竞争。高坚果以男中音的声调大声笑了。“我们之间怎么会存在竞争关系？我们是哥们儿。你知道坚果墙为我做了什么吗……”高坚果的声音越来越小，他狡黠地笑着。”',
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
        CName: "樱桃炸弹",
        width: 112,
        height: 81,
        beAttackedPointR: 92,
        SunNum: 150,
        coolTime: 50,
        PicArr: ["images/Card/Plants/CherryBomb.png", "images/Plants/CherryBomb/0.gif", "images/Plants/CherryBomb/CherryBomb.gif", "images/Plants/CherryBomb/Boom.gif" + $Random],
        AudioArr: ["cherrybomb"],
        Tooltip: "炸掉一定区域内的所有僵尸",
        Produce:
            '樱桃炸弹，能炸掉一定区域内所有僵尸。他们一种下就会立刻引爆。所以请把他们种在僵尸们的身边。<p>伤害：<font color="#FF0000">巨大</font><br>范围：<font color="#FF0000">一个中等区域内的所有僵尸</font><br>使用方法：<font color="#FF0000">单独使用，立即爆炸</font></p>“我要‘爆’开了。”樱桃一号说。“不，我们是要‘炸’开了！”它哥哥樱桃二号说。经过激烈的商议之后，他们才统一“爆炸这个说法。”',
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
        CName: "火爆辣椒",
        width: 68,
        height: 89,
        beAttackedPointR: 48,
        PicArr: ["images/Card/Plants/Jalapeno.png", "images/Plants/Jalapeno/0.gif", "images/Plants/Jalapeno/Jalapeno.gif", "images/Plants/Jalapeno/JalapenoAttack.gif"],
        AudioArr: ["jalapeno"],
        Tooltip: "消灭整行的敌人",
        Produce:
            '火爆辣椒可以摧毁一整条线上的敌人。<p>伤害：<font color="#FF0000">极高</font><br>范围：<font color="#FF0000">整条线上的僵尸</font><br>用法：<font color="#FF0000">单独使用，立即生效</font></p>“嘎嘎嘎嘎嘎嘎嘎！！！”火爆辣椒说。他现在不会爆炸，还不到时候，不过快了，喔~，快了快了，快来了。他知道，他感受到了，他一生都是在等待这个时刻！',
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
        CName: "地刺",
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
        Tooltip: "扎破轮胎, 也能伤害走在上面的僵尸",
        Produce:
            '地刺可以扎破轮胎，并对踩到他的僵尸造成伤害<p>伤害：<font color="#FF0000">普通</font><br>范围：<font color="#FF0000">所有踩到他的僵尸</font><br>特点：<font color="#FF0000">不会被僵尸吃掉</font></p>地刺痴迷冰球，他买了包厢的季票。他一直关注着他喜欢的球员，他也始终如一的在赛后清理冰球场。但只有一个问题：他害怕冰球。',
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
        CName: "地刺王",
        width: 84,
        height: 43,
        beAttackedPointL: 10,
        beAttackedPointR: 74,
        SunNum: 125,
        coolTime: 50,
        PicArr: ["images/Card/Plants/Spikerock.png", "images/Plants/Spikerock/0.gif", "images/Plants/Spikerock/Spikerock.gif", "images/Plants/Spikerock/2.gif", "images/Plants/Spikerock/3.gif"],
        Attack: 40,
        Tooltip: "能扎破多个轮胎, 并伤害经过上面的僵尸<br>(需要地刺)",
        Produce:
            '地刺王可以扎破多个轮胎，并对踩到他的僵尸造成伤害。<p><font color="#FF0000">必须种植在地刺上</font></p>地刺王刚刚从欧洲旅行回来。他玩的很高兴，也认识了很多有趣的人。这些都真的拓展了他的视野——他从来不知道，他们建造了这么大的博物馆，有这么多的画作。这对他来说太惊奇了。',
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
        CName: "大蒜",
        width: 60,
        height: 59,
        beAttackedPointR: 40,
        SunNum: 50,
        HP: 400,
        PicArr: ["images/Card/Plants/Garlic.png", "images/Plants/Garlic/0.gif", "images/Plants/Garlic/Garlic.gif", "images/Plants/Garlic/Garlic_body2.gif", "images/Plants/Garlic/Garlic_body3.gif"],
        Tooltip: "将僵尸赶到其它的横行",
        Produce:
            '大蒜可以让僵尸改变前进的路线。<p>范围：<font color="#FF0000">近距离接触</font><br>特点：<font color="#FF0000">改变僵尸的前进路线</font></p>路线转向，这不仅仅是大蒜的专业，更是他的热情所在。他在布鲁塞尔大学里，获得了转向学的博士学位。他能把路线向量和反击阵列，讲上一整天。他甚至会把家里的东西，推到街上去。不知道为啥，他老婆还可以忍受这些。',
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
        CName: "窝瓜",
        width: 100,
        height: 226,
        beAttackedPointR: 67,
        SunNum: 50,
        coolTime: 30,
        PicArr: ["images/Card/Plants/Squash.png", "images/Plants/Squash/0.gif", "images/Plants/Squash/Squash.gif", "images/Plants/Squash/SquashAttack.gif", "images/Plants/Squash/SquashL.png", "images/Plants/Squash/SquashR.png"],
        AudioArr: ["squash_hmm", "gargantuar_thump"],
        Tooltip: "压扁接近的僵尸",
        Produce:
            '窝瓜会压扁第一个接近它的僵尸。<p>伤害：<font color="#FF0000">极高</font><br>范围：<font color="#FF0000">短，覆盖所有它压到的僵尸。</font><br>用法：<font color="#FF0000">单独使用</font></p>“我准备好了！”窝瓜大吼道，“干吧！！算我一份！没人比我厉害！我就是你要的人！来啊！等啥啊？要的就是这个！”',
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
        CName: "大嘴花",
        width: 130,
        height: 114,
        beAttackedPointR: 70,
        SunNum: 150,
        PicArr: ["images/Card/Plants/Chomper.png", "images/Plants/Chomper/0.gif", "images/Plants/Chomper/Chomper.gif", "images/Plants/Chomper/ChomperAttack.gif", "images/Plants/Chomper/ChomperDigest.gif"],
        Tooltip: "能一口气吞下一只僵尸, 但处于咀嚼状态中十分脆弱",
        Produce:
            '大嘴花可以一口吞掉一整只僵尸，但是他们消化僵尸的时候很脆弱。<p>伤害：<font color="#FF0000">巨大</font><br>范围：<font color="#FF0000">非常近</font><br>特点：<font color="#FF0000">消化时间很长</font></p>大嘴花几乎可以去“恐怖小店”，来表演它的绝技了，不过他的经纪人压榨了他太多的钱，所以他没去成。尽管如此，大嘴花没有怨言，只说了句这只是交易的一部分。',
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
        CName: "大喷菇",
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
        Tooltip: "喷射可以穿过门板的气液",
        Produce:
            '大喷菇喷出的臭气可以穿透铁丝网门。<p>伤害：<font color="#FF0000">普通，可穿透铁丝网门</font><br>范围：<font color="#FF0000">臭气中的所有僵尸<br>白天睡觉</font></p>“我以前那份没前途的工作，是为一个面包房生产酵母孢，”大喷菇说。“然后小喷菇，上帝保佑它，告诉了我这个喷杀僵尸的机会。现在我真觉得自己完全不同了。”',
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
        CName: "咖啡豆",
        width: 39,
        height: 97,
        beAttackedPointL: 10,
        beAttackedPointR: 29,
        SunNum: 75,
        PKind: 3,
        canEat: 0,
        PicArr: ["images/Card/Plants/CoffeeBean.png", "images/Plants/CoffeeBean/0.gif", "images/Plants/CoffeeBean/CoffeeBean.gif", "images/Plants/CoffeeBean/CoffeeBeanEat.gif" + $Random],
        AudioArr: ["coffee", "wakeup"],
        Tooltip: "唤醒在白天里睡觉的蘑菇类植物",
        Produce:
            '咖啡豆，可以唤醒睡眠中的蘑菇们。<p>使用方法：<font color="#FF0000">单独使用，立即生效</font><br>特点：<font color="#FF0000">可以种在其他植物上，用来唤醒蘑菇们</font></p>咖啡豆：“嘿，伙计们！嘿，怎么回事？是谁？嘿！你瞧见那个东西没？什么东西？哇！是狮子！”嗯，咖啡豆确定，这样可以让自己很兴奋。',
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
        CName: "曾哥",
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
        Tooltip: "围绕自身释放大量绵羊音<br>(需要大喷菇)",
        Produce:
            '伪娘终结者，喜欢围绕自身释放大量绵羊音<p><font color="#FF0000">必须种植在大喷菇上</font></p>起初人们一直非议他，后来曾哥用自己独特的绵羊音横扫了宇宙拆迁办，全世界都拜倒在他的脚下。“听说有个节目叫‘快男’？”曾哥说，“没有我在他们真应该感到羞愧。”他于是决定明年去看看。',
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
        CName: "小喷菇",
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
        Tooltip: "向敌人发射短程孢子",
        Produce:
            '小喷菇是免费的，不过射程很近。<p>伤害：<font color="#FF0000">中等</font><br>范围：<font color="#FF0000">近<br>白天要睡觉</font></p>小喷菇：“我也是最近才知道僵尸的存在，和很多蘑菇一样，我只是把他们想象成童话和电影里的怪物。不过这次的经历已经让我大开眼界了。',
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
        CName: "胆小菇",
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
        Tooltip: "远程射手, 但敌人靠近时会蜷缩不动",
        Produce:
            '胆小菇是一种远程射手，敌人接近后会躲起来。<p>伤害：<font color="#FF0000">普通</font><br>特点：<font color="#FF0000">敌人接近后就停止攻击<br>白天睡觉</font></p>“谁在那？”胆小菇低声说，声音细微难辨。“走开！我不想见任何人。除非……除非你是马戏团的人。”',
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
        CName: "魅惑菇",
        width: 71,
        height: 78,
        beAttackedPointL: 10,
        beAttackedPointR: 61,
        SunNum: 75,
        coolTime: 30,
        PicArr: ["images/Card/Plants/HypnoShroom.png", "images/Plants/HypnoShroom/0.gif", "images/Plants/HypnoShroom/HypnoShroom.gif", "images/Plants/HypnoShroom/HypnoShroomSleep.gif"],
        Tooltip: "让一只僵尸为你作战",
        Produce:
            '当僵尸吃下魅惑菇后，他将会掉转方向为你作战。<p>使用方法：<font color="#FF0000">单独使用，接触生效</font><br>特点：<font color="#FF0000">让一只僵尸为你作战<br>白天睡觉</font></p>魅惑菇声称：“僵尸们是我们的朋友，他们被严重误解了，僵尸们在我们的生态环境里扮演着重要角色。我们可以也应当更努力地让他们学会用我们的方式来思考。”',
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
        CName: "寒冰菇",
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
        Tooltip: "暂时使画面里的所有敌人停止行动",
        Produce:
            '寒冰菇，能短暂的冻结屏幕上所有僵尸。<p>伤害：<font color="#FF0000">非常低，冻结僵尸</font><br>范围：<font color="#FF0000">屏幕上的所有僵尸</font><br>用法：<font color="#FF0000">单独使用，立即生效<br>白天睡觉</font></p>寒冰菇皱着眉头，倒不是因为它不高兴或不满意，只是因为，它儿时因受创伤而遗留下了面瘫。',
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
        CName: "阳光菇",
        width: 59,
        height: 61,
        beAttackedPointL: 15,
        beAttackedPointR: 44,
        SunNum: 25,
        Stature: -1,
        Status: 0,
        PicArr: ["images/Card/Plants/SunShroom.png", "images/Plants/SunShroom/0.gif", "images/Plants/SunShroom/SunShroom2.gif", "images/Plants/SunShroom/SunShroomSleep.gif", "images/Plants/SunShroom/SunShroom.gif"],
        Tooltip: "开始提供少量的阳光, 一段时间后提供正常量的阳光",
        Produce:
            '阳光菇开始提供少量阳光，稍后提供正常数量阳光。<p>生产阳光：<font color="#FF0000">开始低，之后正常<br>白天睡觉</font></p>阳光菇讨厌阳光。恨到当它内部产生点阳光时，就尽可能快的吐出来。它就是不能忍受这个。对它来说，阳光令人厌恶。',
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
