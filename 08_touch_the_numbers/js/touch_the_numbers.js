"use strict";

const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let startTime;       // Startボタンクリック時の時刻
let timeoutid;       // ID
let stopTime = 0;    // Stopまでの経過時間
setButtonStateInitial(); // ボタンを"初期"状態とする

let counter = 0; // ターン数カウンター
const squares = document.getElementsByClassName("square"); // class="square" を取得（しゅとく）
const squaresArray = Array.from(squares); // Array に変換（へんかん）

// squaresの要素（ようそ）を取得（しゅとく）
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const a_4 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const b_4 = document.getElementById("b_4");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");
const c_4 = document.getElementById("c_4");
const d_1 = document.getElementById("d_1");
const d_2 = document.getElementById("d_2");
const d_3 = document.getElementById("d_3");
const d_4 = document.getElementById("d_4");

// メッセージ
const msgtxt1 = '<p class="text animate__animated animate__rubberBand">Push Start!!</p>';
const msgtxt2 = '<p class="text animate__bounceIn">Hurry Up!!</p>';
const msgtxt3 = '<p class="text animate__animated animate__heartBeat">Hurry Up!!!!!!!</p>';
const msgtxt4 = '<p class="text animate__animated animate__rollIn">Clear!!</p>';
// サウンド
let gameSound = [
  "sound/start.mp3",
  "sound/stop.mp3",
  "sound/reset.mp3",
  "sound/ok.mp3",
  "sound/ng.mp3"
];
// **********************************************
// ページ本体が読み込まれたタイミングで実行するコード
// **********************************************
window.addEventListener("DOMContentLoaded",
  function () {
    setMessage("start");
    let squaresBox = document.getElementById("squaresBox")
    squaresBox.classList.add("js-unclickable");
    squaresBox.style.backgroundColor = "grey";
  }, false
);

// **********************************************
// squareをクリックしたときにイベント発火（はっか）
// **********************************************
// クリックしたsquareに、penguinsかbearを表示。画像を表示したsquareはクリックできないようにする、win or lose Judgementの呼び出し
squaresArray.forEach(function (square) {
  square.addEventListener("click", () => {
    isSelect(square);
  });
});

// **********************************************
// クリックしたsquareにはpenguinsかbearを表示。
//  ・表示したところはクリックできないようにする。
//  ・win or lose 判定の呼び出し。
// **********************************************
function isSelect(selectSquare) {
  if (counter == 7){
    setMessage("hurryup1"); // メッセージ
  }
  if (counter == 12){
    setMessage("hurryup2"); // メッセージ
  }

  let w_id = selectSquare.getAttribute("id");
  let w_num = document.getElementById(w_id).innerHTML

  if (w_num == counter + 1) {
    // サウンド
    let music = new Audio(gameSound[3]); 
    music.currentTime = 0;
    music.play();  // 再生
    selectSquare.style.color = "grey";
    counter++; // ターン数カウンターを＋１する
  }
  else {
    // サウンド
    let music = new Audio(gameSound[4]); 
    music.currentTime = 0;
    music.play();  // 再生
  }

  // ターン数＝16になったらGameOver
  if (counter === 16) {
    gameOver();
  }

}

// **********************************************
// メッセージ切り替え（きりかえ）関数（かんすう）
// **********************************************
// 要素の中身を変える！JavaScriptでinnerHTMLの使い方【初心者向け】：https://techacademy.jp/magazine/15332
function setMessage(id) {
  switch (id) {
    case "start":
      document.getElementById("msgtext").innerHTML = msgtxt1;
      break;
    case "hurryup1":
      document.getElementById("msgtext").innerHTML = msgtxt2;
      break;
    case "hurryup2":
      document.getElementById("msgtext").innerHTML = msgtxt3;
      break;
    case "game_over":
      document.getElementById("msgtext").innerHTML = msgtxt4;
      break;
    default:
      document.getElementById("msgtext").innerHTML = msgtxt1;
  }
}

// **********************************************
// ゲーム終了時の処理
// **********************************************
// 実際に書いてみる！JavaScriptでforEachメソッドを使う方法【初心者向け】：https://techacademy.jp/magazine/14635
// classListの使い方まとめ：https://qiita.com/tomokichi_ruby/items/2460c5902d19b81cace5
function gameOver() {
  setMessage("game_over"); // メッセージ

  let squaresBox = document.getElementById("squaresBox")
  squaresBox.classList.add("js-unclickable");
  squaresBox.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
  // サウンド
  let music = new Audio(gameSound[1]); 
  music.currentTime = 0;
  music.play();  // 再生

  $(document).snowfall({
    flakeColor: "rgb(255,240,245)", // 雪の色
    maxSpeed: 3, // 最大速度（さいだい　そくど）
    minSpeed: 1, // 最小速度（さいしょう　そくど）
    maxSize: 20, // 最大サイズ（さいだい　サイズ）
    minSize: 10, // 最小サイズ（さいしょう　サイズ）
    image: "img/star.png"
  });

  // タイマーを"停止中"状態とする
  setButtonStateStopped();
  clearTimeout(timeoutid); //setTimeout()でセットしたタイマーを解除する際に使用
  stopTime = Date.now() - startTime;

}

// **********************************************
// 数字をランダムに配置
// **********************************************
let arrNum; // base 1~16
let arrId = ["a_1", "a_2", "a_3", "a_4", "b_1", "b_2", "b_3", "b_4", "c_1", "c_2", "c_3", "c_4", "d_1", "d_2", "d_3", "d_4"];
let numArr; // ランダムに配置
let numSquareId; // 1~16のsquareID

function randominzing() {
  arrNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  numArr = []; // ランダムに配置
  numSquareId = ["", "", "", "", "", "", "", "", "","", "", "", "", "", "", ""]; // 1~16のsquareID

  for (let i = 0, arrLen = arrNum.length; i < 16; i++, arrLen--) {
    let rndNum = Math.floor(Math.random() * arrLen);
    numArr.push(arrNum[rndNum]);
    arrNum[rndNum] = arrNum[arrLen - 1];
  }

  for (let i = 0; i < 16; i++) {
    let resultId = numArr.indexOf(i+1)
    numSquareId[resultId] = arrId[resultId]
    document.getElementById(arrId[i]).innerHTML = numArr[i];
  }

}

// **********************************************
// ボタン　クリック時
// **********************************************
////////////////////////
// Startボタンクリック
////////////////////////
start.addEventListener("click",
  function () {
    setMessage("hurryup1"); // メッセージ
    let squaresBox = document.getElementById("squaresBox")
    squaresBox.classList.remove("js-unclickable");
    squaresBox.style.backgroundColor = "";
    // サウンド
    let music = new Audio(gameSound[0]); 
    music.currentTime = 0;
    music.play();  // 再生
    // 数字シャッフル
    randominzing()
    // ボタンをタイマー"動作中"状態とする
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  }, false
);

////////////////////////
// Stopボタンクリック
////////////////////////
stop.addEventListener("click",
  function () {
    let squaresBox = document.getElementById("squaresBox")
    squaresBox.classList.add("js-unclickable");
    // タイマーを"停止中"状態とする
    setButtonStateStopped();
    clearTimeout(timeoutid); //setTimeout()でセットしたタイマーを解除する際に使用
    stopTime = Date.now() - startTime;
    // サウンド
    let music = new Audio(gameSound[1]); 
    music.currentTime = 0;
    music.play();  // 再生

  }, false
);

////////////////////////
// Resetボタンクリック
////////////////////////
reset.addEventListener("click",
  function () {
    setMessage("start");
    let squaresBox = document.getElementById("squaresBox")
    squaresBox.classList.add("js-unclickable");
    squaresBox.style.backgroundColor = "grey";

    $(document).snowfall("clear"); // stop snowfall

    counter = 0; // カウンター
    // サウンド
    let music = new Audio(gameSound[2]); 
    music.currentTime = 0;
    music.play();  // 再生
    // ボタンを"初期"状態とする
    setButtonStateInitial()
    timer.textContent = "00:00.000";
    stopTime = 0;

    squaresArray.forEach(function (square) {
      square.style.color = "black";
      let w_id = square.getAttribute("id");
      document.getElementById(w_id).innerHTML = "";
      square.style.color = "#4a488e";
    });
  }
);

// **********************************************
// タイマー
// **********************************************
function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  /* padStart()で２桁固定表示とする */
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  /* 描画 */
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutid = setTimeout(() => {
    //再帰呼び出し
    countUp();
  }, 10);
}
// **********************************************
// ボタン　表示制御
// **********************************************
// 初期 または Reset後
function setButtonStateInitial() {
  start.classList.remove("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.add("js-inactive");
  start.classList.remove("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.add("js-unclickable");
}

// 状態:タイマー動作中
function setButtonStateRunning() {
  start.classList.add("js-inactive");   // 非活性
  stop.classList.remove("js-inactive");  // 活性
  reset.classList.add("js-inactive");   // 非活性
  start.classList.add("js-unclickable");
  stop.classList.remove("js-unclickable");
  reset.classList.add("js-unclickable");
}

// 状態:タイマー停止中
function setButtonStateStopped() {
  start.classList.add("js-inactive"); // 活性
  stop.classList.add("js-inactive");    // 非活性
  reset.classList.remove("js-inactive"); // 活性
  start.classList.add("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.remove("js-unclickable");
}
