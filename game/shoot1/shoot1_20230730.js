//変数の宣言
//testmode
var test = 0; //テストモード 0:normal 1:test
//エンジン系
var fps = 30; //fps
var maxx = 432; //最大x
var maxy = 768; //最大y
//ゲーム共通系
var syokiti = -1; //初期値
var sleepmode = 10000; //スリープモード
var bgya = 0; //BGのY位置a
var bgyb = 0; //BGのY位置b
var bgyc = 0; //BGのY位置c
var bgspd = 2; //BG移動速度
var counter = 0; //カウンタ
var scene = 0; //シーン 0:初期 1:title 2:説明 3:ゲーム中 4:ゲームオーバー
var score = 0; //点数
var level = 1; //レベル
var life = 0; //ライフ
var hit = false; //当たってる？
var defjikispeed = 5; //自機スピードデフォルト
var jikisize = 40; //自機サイズ
var jikispeed = defjikispeed; //自機スピード
var maxcount = 300; //配列マックス
var jikimoving = false; //自機移動中？
var shotinterval = 5; //ショット間隔
var shotspeed = 20; //ショットスピード
var tekispeedmax = 5; //敵スピードマックス
var tekispeedbase = 1; //敵スピードベース
var tekitamaspeedmax = 5; //敵弾スピードマックス
var tekitamaspeedbase = 2; //敵弾スピードベース
var tekitamashot = 20; //敵弾発射間隔
//入力管理
var lasttapx = syokiti; //最後にタップされたx
var lasttapy = syokiti; //最後にタップされたy
var unpress = true; //放してたらtrue
//自機管理
var myx = maxx / 2; //自機x
var myy = maxy / 2; //自機y
//有象無象
var mytamax = new Array(maxcount);
var mytamay = new Array(maxcount);
var tekix = new Array(maxcount);
var tekiy = new Array(maxcount);
var tekitox = new Array(maxcount);
var tekitoy = new Array(maxcount);
var tekispeed = new Array(maxcount);
var tekist = new Array(maxcount);
var tekimode = new Array(maxcount);
var tekitmp = new Array(maxcount);
var tekitamax = new Array(maxcount);
var tekitamay = new Array(maxcount);
var tekitamakakudo = new Array(maxcount);
var tekitamaspeed = new Array(maxcount);
var i;
var j;
//------------------------------------------------------------------------
//起動時の処理
function setup() {
    canvasSize(maxx, maxy);
    setFPS(fps);
    loadImg(0, 'shoot1_bg.png');
    loadImg(1, 'shoot1_kumo2.png');
    loadImg(2, 'shoot1_kumo1.png');
    loadSound(0, 'GB-Shooter-A05-2(Stage4-Loop155).mp3');
    loadSound(1, 'GB-Shooter01-01(Shoot).mp3');
    loadSound(2, 'GB-Shooter01-03(Damage).mp3');
    loadSound(3, 'GB-Shooter01-04(Damage).mp3');
    loadSound(4, 'GB-Shooter01-06(Miss).mp3');
}
//メインループ
function mainloop() {
    var _a, _b;
    //メインループ処理
    if (scene != 4) {
        fill('white');
    }
    counter++;
    //debug表示
    if (test == 1) {
        fText("test ".concat(tapX, " ").concat(tapY, " ").concat(lasttapx, " ").concat(lasttapy, " ").concat(unpress, " ").concat(scene), maxx / 2, 5, 10, 'black');
    }
    //タップ管理
    if (tapC == 1) {
        lasttapx = tapX;
        lasttapy = tapY;
        unpress = false;
    }
    else {
        unpress = true;
    }
    //----------------------------------------------------------------------
    //シーン0 最初の初期化
    if (scene == 0) {
        syokika();
        scene = 1;
    }
    //背景はずっと動きっぱなし
    bgmove();
    //シーン1 title
    if (scene == 1) {
        fText("\u25A0\u5F3E\u5E55\u30B7\u30E5\u30FC\u30C6\u30A3\u30F3\u30B0\u25A0", maxx / 2, maxy / 2, 40, 'black');
        if (tapY > maxy / 2 + 40 - 20 && tapY < maxy / 2 + 40 + 20) {
            fText("\u30B9\u30BF\u30FC\u30C8", maxx / 2, maxy / 2 + 40, 40, 'red');
            if (tapC == 1) {
                scene = 3;
                playBgm(0);
            }
        }
        else {
            fText("\u30B9\u30BF\u30FC\u30C8", maxx / 2, maxy / 2 + 40, 40, 'black');
        }
        if (tapY > maxy / 2 + 80 - 20 && tapY < maxy / 2 + 80 + 20) {
            fText("\u305B\u3064\u3081\u3044", maxx / 2, maxy / 2 + 80, 40, 'red');
            if (tapC == 1) {
                scene = 2;
            }
        }
        else {
            fText("\u305B\u3064\u3081\u3044", maxx / 2, maxy / 2 + 80, 40, 'black');
        }
    }
    //シーン2 説明
    if (scene == 2) {
        fTextN("\u25A0\u305B\u3064\u3081\u3044\n\u753B\u9762\u30BF\u30C3\u30D7\u3059\u308B\u3068\u305D\u3053\u306B\u81EA\u6A5F\u304C\u3046\u3054\u304F\u3088\u3002\n\u5F3E\u306F\u52DD\u624B\u306B\u51FA\u3066\u308B\u304B\u3089\u3001\n\u6575\u306B\u3076\u3064\u3051\u3066\u3084\u3063\u3064\u3051\u3088\u3046\uFF01\n\u30E9\u30A4\u30D5\u304C\u7121\u304F\u306A\u3063\u305F\u3089\u7D42\u308F\u308A\u3060\n\n-------------------------\n\n\n      \u5C71 \u2190 \u81EA\u6A5F\n\u6575 \u2190 \u6575\u6A5F\n \uFF01 \u2190 \u81EA\u6A5F\u5F3E\n \u30FB\u2190\u6575\u5F3E\n\n-------------------------\n\n\n      \u4F7F\u7528\u3057\u305F\u97F3\u7D20\u6750:\nOtoLogic(https://otologic.jp)\n\u30B2\u30FC\u30E0\u30A8\u30F3\u30B8\u30F3:\nWWS.js\n\n-------------------------\n\n\n      \u25A0\u601D\u3044\u6B8B\u3057\u30E1\u30E2(20230730)\n\u30FB\u7D75\u3092\u3064\u3051\u308B\n\u30FB\u97F3\u306F\u3053\u308C\u304C\u9650\u754C\uFF1F\n\u30FB\u6575\u7A2E\u985E\u3075\u3084\u3059\n\u30FB\u30BF\u30C3\u30D7\u304C\u9023\u7D9A\u3057\u3061\u3083\u3046\u5834\u5408\u304C\u3042\u308B\u4EF6\n\u30FB\u30EC\u30D9\u30EB\u30A2\u30C3\u30D7\u306E\u30AB\u30FC\u30D6\u4E0B\u3052\u308B\n\u30FB\u30D5\u30A9\u30F3\u30C8\u3082\u306A\u3093\u3068\u304B\u3059\u308B\n", maxx / 2, maxy / 2 - 80, 500, 15, 'black');
        if (tapY > maxy / 2 + 300 - 20 && tapY < maxy / 2 + 300 + 20) {
            fText("\u30B9\u30BF\u30FC\u30C8", maxx / 2, maxy / 2 + 300, 40, 'red');
            if (tapC == 1) {
                scene = 3;
                playBgm(0);
            }
        }
        else {
            fText("\u30B9\u30BF\u30FC\u30C8", maxx / 2, maxy / 2 + 300, 40, 'black');
        }
    }
    //シーン3 ゲーム中
    if (scene == 3) {
        //点数表示
        var tenst = void 0;
        var levst = void 0;
        var lifest = void 0;
        score++;
        tenst = score.toString().padStart(6, '0');
        levst = level.toString().padStart(3, '0');
        lifest = life.toString().padStart(3, '0');
        fText("score:".concat(tenst, "  level:").concat(levst, " life:").concat(lifest, "%"), maxx / 2, maxy - 10, 20, 'black');
        if (life <= 0) {
            playSE(4);
            scene = 4;
        }
        //自機表示
        if (hit == false) {
            fText("\u5C71", myx, myy, jikisize, 'black');
        }
        else {
            fText("\u5C71", myx, myy, jikisize, 'red');
        }
        //自機移動管理
        _a = movexy(myx, myy, lasttapx, lasttapy, jikispeed), myx = _a[0], myy = _a[1];
        if (jikimoving == true) {
            jikispeed++;
        }
        else {
            jikispeed = defjikispeed;
        }
        //自機当たり判定
        hit = false;
        for (i = 0; i < maxcount; i++) {
            if (jikisize * 0.5 > kyorikeisan(myx, myy, tekitamax[i], tekitamay[i])) {
                life--;
                hit = true;
                if (life > 10) {
                    playSE(3);
                }
                break;
            }
            if (jikisize * 0.75 > kyorikeisan(myx, myy, tekix[i], tekiy[i])) {
                life--;
                hit = true;
                if (life > 10) {
                    playSE(3);
                }
                break;
            }
        }
        //自弾発射
        if (counter % shotinterval == 0) {
            //playSE(1);
            for (i = 0; i < maxcount; i++) {
                if (mytamay[i] < 0) {
                    mytamax[i] = myx;
                    mytamay[i] = myy;
                    break;
                }
            }
        }
        //自弾管理
        for (i = 0; i < maxcount; i++) {
            mytamay[i] = mytamay[i] - shotspeed;
            if (mytamay[i] > 0) {
                fText("\uFF01", mytamax[i], mytamay[i], jikisize, 'black');
            }
        }
        //敵発生管理
        if (rnd(100) < level / 20 + 1) {
            //敵生成
            var k = void 0;
            k = rnd(100);
            if (k < 25) {
                //追尾x１
                for (i = 0; i < maxcount; i++) {
                    if (tekist[i] == syokiti) {
                        tekist[i] = 1;
                        tekimode[i] = 1;
                        break;
                    }
                }
            }
            if (k > 25 && k < 45) {
                //ジグザグx１
                for (i = 0; i < maxcount; i++) {
                    if (tekist[i] == syokiti) {
                        tekist[i] = 1;
                        tekimode[i] = 4;
                        break;
                    }
                }
            }
            if (k > 45 && k < 65) {
                //まっすぐx7
                for (j = 0; j < 7; j++) {
                    for (i = 0; i < maxcount; i++) {
                        if (tekist[i] == syokiti) {
                            tekist[i] = 1;
                            tekimode[i] = 2;
                            break;
                        }
                    }
                }
            }
            if (k > 65 && k < 85) {
                //連続x3
                for (j = 0; j < 3; j++) {
                    for (i = 0; i < maxcount; i++) {
                        if (tekist[i] == syokiti) {
                            tekist[i] = 1;
                            tekimode[i] = 5;
                            break;
                        }
                    }
                }
            }
            if (k > 85 && k < 100) {
                //自爆花火x3
                for (j = 0; j < 3; j++) {
                    for (i = 0; i < maxcount; i++) {
                        if (tekist[i] == syokiti) {
                            tekist[i] = 1;
                            tekimode[i] = 3;
                            break;
                        }
                    }
                }
            }
        }
        //敵行動管理
        for (i = 0; i < maxcount; i++) {
            //敵が生存してたら
            if (tekist[i] != syokiti) {
                switch (tekimode[i]) {
                    case 1:
                        tekimode_one(i);
                        break;
                    case 2:
                        tekimode_two(i);
                        break;
                    case 3:
                        tekimode_three(i);
                        break;
                    case 4:
                        tekimode_four(i);
                    case 5:
                        tekimode_five(i);
                        break;
                    default:
                        break;
                }
            }
        }
        //敵表示
        for (i = 0; i < maxcount; i++) {
            //敵が生存してたら
            if (tekist[i] == 2) {
                fText("\u6575", tekix[i], tekiy[i], jikisize, 'black');
            }
            if (tekist[i] > 99) {
                fText("\u6575", tekix[i], tekiy[i], jikisize, 'red');
            }
        }
        //敵弾移動
        for (i = 0; i < maxcount; i++) {
            if (tekitamakakudo[i] != sleepmode) {
                _b = movexykakudo(tekitamax[i], tekitamay[i], tekitamakakudo[i], tekitamaspeed[i]), tekitamax[i] = _b[0], tekitamay[i] = _b[1];
            }
        }
        //敵弾管理
        for (i = 0; i < maxcount; i++) {
            //画面外だったら
            if (tekitamax[i] < 0 ||
                tekitamax[i] > maxx ||
                tekitamay[i] < 0 ||
                tekitamay[i] > maxy) {
                tekitamakakudo[i] = sleepmode;
            }
        }
        //敵弾表示
        for (i = 0; i < maxcount; i++) {
            if (tekitamakakudo[i] != sleepmode) {
                fText("\u30FB", tekitamax[i], tekitamay[i], jikisize, 'black');
            }
        }
    }
    //シーン4 ゲームオーバー
    if (scene == 4) {
        var tenst = void 0;
        var levst = void 0;
        tenst = score.toString().padStart(6, '0');
        levst = level.toString().padStart(3, '0');
        stopBgm();
        fText("GAME OVER", maxx / 2, maxy / 2, 60, 'black');
        fText("score:".concat(tenst, "  level:").concat(levst, " "), maxx / 2, maxy / 2 + 40, 25, 'black');
        if (tapY > maxy / 2 + 200 - 20 && tapY < maxy / 2 + 200 + 20) {
            fText("push", maxx / 2, maxy / 2 + 200, 40, 'red');
            if (tapC == 1) {
                scene = 0;
            }
        }
        else {
            fText("push", maxx / 2, maxy / 2 + 200, 40, 'black');
        }
    }
}
//------------------------------------------------------------------------
//初期設定
function syokika() {
    counter = 0; //カウンタ
    score = 0; //点数
    level = 1; //レベル
    life = 100; //ライフ
    lasttapx = syokiti; //最後にタップされたx
    lasttapy = syokiti; //最後にタップされたy
    myx = maxx / 2; //自機x
    myy = maxy / 2; //自機y
    var i;
    for (i = 0; i < maxcount; i++) {
        mytamax[i] = syokiti;
        mytamay[i] = syokiti;
        tekix[i] = syokiti;
        tekiy[i] = syokiti;
        tekitox[i] = syokiti;
        tekitoy[i] = syokiti;
        tekispeed[i] = syokiti;
        tekist[i] = syokiti;
        tekitamax[i] = syokiti;
        tekitamay[i] = syokiti;
        tekitamakakudo[i] = sleepmode;
    }
}
//bg表示
function bgmove() {
    bgya = (bgya - bgspd - level / 20) % maxy;
    bgyb = (bgyb - bgspd * 1.25 - (level / 20) * 1.25) % maxy;
    bgyc = (bgyc - bgspd * 1.5 - (level / 20) * 1.5) % maxy;
    drawImg(0, 0, -bgya);
    drawImg(0, 0, -maxy - bgya);
    drawImg(1, 0, -bgyb);
    drawImg(1, 0, -maxy - bgyb);
    drawImg(2, 0, -bgyc);
    drawImg(2, 0, -maxy - bgyc);
}
//角度計算
function getkakudo(fromx, fromy, tox, toy) {
    var myrad;
    myrad = Math.atan2(toy - fromy, tox - fromx);
    return myrad;
}
//移動計算
function movexy(fromx, fromy, tox, toy, spd) {
    var myrad;
    var mydeg;
    var retx;
    var rety;
    var tmpa;
    var tmpb;
    myrad = Math.atan2(toy - fromy, tox - fromx);
    mydeg = (myrad * 180) / Math.PI;
    retx = fromx + Math.round(Math.cos(myrad) * spd);
    rety = fromy + Math.round(Math.sin(myrad) * spd);
    //debug表示
    if (test == 1) {
        tmpa = Math.round(myrad);
        tmpb = Math.round(mydeg);
        fText("movexy (".concat(fromx, " ,").concat(fromy, ") (").concat(tox, " ,").concat(toy, ") ").concat(spd, " (").concat(retx, " ").concat(rety, ") ").concat(tmpa, " ").concat(tmpb), maxx / 2, 15, 10, 'black');
    }
    //近くなったらオーバーランしないようにする
    if (kyorikeisan(fromx, fromy, tox, toy) <= spd) {
        jikimoving = false;
        return [tox, toy];
    }
    else {
        jikimoving = true;
        return [retx, rety];
    }
}
//移動計算(角度)
function movexykakudo(fromx, fromy, kakudo, spd) {
    var retx;
    var rety;
    retx = fromx + Math.round(Math.cos(kakudo) * spd);
    rety = fromy + Math.round(Math.sin(kakudo) * spd);
    //debug表示
    if (test == 1) {
        fText("movexykakudo ".concat(fromx, " ,").concat(fromy, " ,").concat(kakudo, " ,").concat(spd, " ,").concat(retx, " ").concat(rety, " "), maxx / 2, 25, 10, 'black');
    }
    return [retx, rety];
}
//度→ラジアン
function dorad(kakudo) {
    return (kakudo / 180) * 3.14;
}
//距離計算
function kyorikeisan(fromx, fromy, tox, toy) {
    return Math.sqrt((fromx - tox) * (fromx - tox) + (fromy - toy) * (fromy - toy));
}
//敵が弾に当たったか判定
function tekiatari(tekinum) {
    var i;
    var j;
    //まだ生きてる
    if (tekist[tekinum] == 2) {
        for (i = 0; i < maxcount; i++) {
            if (jikisize >
                kyorikeisan(tekix[tekinum], tekiy[tekinum], mytamax[i], mytamay[i])) {
                tekist[tekinum] = 100;
                playSE(2);
                break;
            }
        }
    }
    //死亡処理１
    if (tekist[tekinum] > 99) {
        tekist[tekinum]++;
    }
    //死亡処理２
    if (tekist[tekinum] > 120) {
        tekist[tekinum] = syokiti;
        tekix[tekinum] = syokiti;
        tekiy[tekinum] = syokiti;
        tekitox[tekinum] = syokiti;
        tekitoy[tekinum] = syokiti;
        tekispeed[tekinum] = syokiti;
        score += 100;
        level++;
    }
}
//敵mode1 だらだら追尾
function tekimode_one(tekinum) {
    var _a;
    var j;
    //コンストラクタ
    if (tekist[tekinum] == 1) {
        tekix[tekinum] = rnd(maxx + 100) - 50;
        tekiy[tekinum] = -50;
        tekispeed[tekinum] = rnd(tekispeedmax) + tekispeedbase + 1 + level / 30;
        tekist[tekinum] = 2;
    }
    //生きてたら
    if (tekist[tekinum] == 2) {
        //敵移動
        _a = movexy(tekix[tekinum], tekiy[tekinum], myx, myy, tekispeed[tekinum]), tekix[tekinum] = _a[0], tekiy[tekinum] = _a[1];
        //敵弾発射
        if (rnd(tekitamashot * 7.5) - level / 20 < 1) {
            for (j = 0; j < maxcount; j++) {
                if (tekitamakakudo[j] == sleepmode) {
                    tekitamax[j] = tekix[tekinum];
                    tekitamay[j] = tekiy[tekinum];
                    tekitamakakudo[j] = getkakudo(tekix[tekinum], tekiy[tekinum], myx, myy);
                    tekitamaspeed[j] =
                        rnd(tekitamaspeedmax) + tekitamaspeedbase + 1 + level / 40;
                    break;
                }
            }
        }
    }
    //当たり判定
    tekiatari(tekinum);
}
//敵mode2 まっすぐどーん
function tekimode_two(tekinum) {
    var j;
    //コンストラクタ
    if (tekist[tekinum] == 1) {
        tekix[tekinum] = rnd(maxx + 100) - 50;
        tekiy[tekinum] = -50;
        tekispeed[tekinum] = rnd(tekispeedmax) + tekispeedbase * 1.5 + level / 40;
        tekist[tekinum] = 2;
    }
    //生きてたら
    if (tekist[tekinum] == 2) {
        //敵移動
        tekiy[tekinum] =
            tekiy[tekinum] + tekispeed[tekinum] + Math.abs(tekiy[tekinum]) / 20;
    }
    //当たり判定
    if (tekist[tekinum] == 199) {
        level--;
    }
    tekiatari(tekinum);
    //画面外判定
    if (tekiy[tekinum] > maxy + jikisize && tekist[tekinum] == 2) {
        tekist[tekinum] = 100;
    }
}
//敵mode3 自爆花火
function tekimode_three(tekinum) {
    var i;
    var j;
    //コンストラクタ
    if (tekist[tekinum] == 1) {
        tekix[tekinum] = rnd(maxx + 100) - 50;
        tekiy[tekinum] = -50;
        tekispeed[tekinum] = rnd(tekispeedmax) + tekispeedbase + level / 40;
        tekist[tekinum] = 2;
    }
    //生きてたら
    if (tekist[tekinum] == 2) {
        //敵移動
        tekiy[tekinum] =
            tekiy[tekinum] + tekispeed[tekinum] + Math.abs(tekiy[tekinum]) / 20;
        //半分まで移動したら自爆
        if (tekiy[tekinum] > maxy / 2) {
            tekist[tekinum] = 100;
            //敵弾発射
            for (i = 0; i < 20; i++) {
                for (j = 0; j < maxcount; j++) {
                    if (tekitamakakudo[j] == sleepmode) {
                        tekitamax[j] = tekix[tekinum];
                        tekitamay[j] = tekiy[tekinum];
                        tekitamakakudo[j] = dorad(i * 18);
                        tekitamaspeed[j] = level / 50 + 1;
                        break;
                    }
                }
            }
        }
    }
    //当たり判定
    if (tekist[tekinum] == 199) {
        level--;
    }
    tekiatari(tekinum);
    //画面外判定
    if (tekiy[tekinum] > maxy + jikisize && tekist[tekinum] == 2) {
        tekist[tekinum] = 100;
    }
}
//敵mode4 じぐざぐ
function tekimode_four(tekinum) {
    //コンストラクタ
    if (tekist[tekinum] == 1) {
        tekix[tekinum] = rnd(maxx + 100) - 50;
        tekiy[tekinum] = -50;
        tekispeed[tekinum] = tekispeedbase * 2 + level / 20;
        if (rnd(100) < 50) {
            tekitmp[tekinum] = tekispeed[tekinum];
        }
        else {
            tekitmp[tekinum] = tekispeed[tekinum] * -1;
        }
        tekist[tekinum] = 2;
    }
    //生きてたら
    if (tekist[tekinum] == 2) {
        //敵移動
        tekiy[tekinum] = tekiy[tekinum] + tekispeed[tekinum] / 2;
        tekix[tekinum] = tekix[tekinum] + tekitmp[tekinum];
        if (tekix[tekinum] < 0 || tekix[tekinum] > maxx) {
            tekitmp[tekinum] = tekitmp[tekinum] * -1.5;
        }
    }
    //当たり判定
    if (tekist[tekinum] == 199) {
        level--;
    }
    tekiatari(tekinum);
    //画面外判定
    if (tekiy[tekinum] > maxy + jikisize && tekist[tekinum] == 2) {
        tekist[tekinum] = 100;
    }
}
//敵mode5 途中で連続発射
function tekimode_five(tekinum) {
    var i;
    var j;
    //コンストラクタ
    if (tekist[tekinum] == 1) {
        tekix[tekinum] = rnd(maxx + 100) - 50;
        tekiy[tekinum] = -50;
        tekispeed[tekinum] = rnd(tekispeedmax) + tekispeedbase + level / 60;
        tekist[tekinum] = 2;
    }
    //生きてたら
    if (tekist[tekinum] == 2) {
        //敵移動
        tekiy[tekinum] =
            tekiy[tekinum] + tekispeed[tekinum] / 2 + Math.abs(tekiy[tekinum]) / 20;
        //上1/4～3/4の間は毎フレ弾発射
        if (tekiy[tekinum] > maxy * 0.25 && tekiy[tekinum] < maxy * 0.75) {
            for (j = 0; j < maxcount; j++) {
                if (tekitamakakudo[j] == sleepmode) {
                    tekitamax[j] = tekix[tekinum];
                    tekitamay[j] = tekiy[tekinum];
                    tekitamakakudo[j] = getkakudo(tekix[tekinum], tekiy[tekinum], myx, myy);
                    tekitamaspeed[j] = tekitamaspeedbase + level / 40;
                    break;
                }
            }
        }
    }
    //当たり判定
    if (tekist[tekinum] == 199) {
        level--;
    }
    tekiatari(tekinum);
    //画面外判定
    if (tekiy[tekinum] > maxy + jikisize && tekist[tekinum] == 2) {
        tekist[tekinum] = 100;
    }
}
