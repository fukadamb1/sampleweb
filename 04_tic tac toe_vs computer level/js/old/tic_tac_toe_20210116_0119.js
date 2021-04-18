'use strict';

// flagが"pen-flag"のときpenguinsのターン、"bear-flag"のときbearのターン
let flag = "pen-flag";

// ターン数カウンター
let counter = 9;

// class="square" を取得（しゅとく）
const squares = document.querySelectorAll(".square");

// Array に変換（へんかん） 「Array.prototype.slice」は短縮して「[ ].slice」 でもＯＫ
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
const squaresArray = Array.prototype.slice.call(squares);

// squaresの要素（ようそ）を取得（しゅとく）
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

// NewGameボタン取得（しゅとく）
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

// Win or Lose Judgment Line
const line1 = JudgLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squaresArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;

// メッセージ
const msgtxt1 = '<p class="image"><img src ="img/penguins.jpg" width=61px height=61px></p><p class="text">Penguins Attack!</p>';
const msgtxt2 = '<p class="image"><img src ="img/whitebear.jpg" width=61px height=61px></p><p class="text">WhiteBear Attack!</p>';
const msgtxt3 = '<p class="image"><img src ="img/penguins.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>';
const msgtxt4 = '<p class="image"><img src ="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">WhiteBear Win!!</p>';
const msgtxt5 = '<p class="image"><img src ="img/penguins.jpg" width=61px height=61px><img src ="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__bounceIn">Draw!!</p>';

// **********************************************
// ページ本体が読み込まれたタイミングで実行するコード
// **********************************************
window.addEventListener("DOMContentLoaded",
  function() {
    // メッセージ（最初はpenguinsのターンから）
    setMessage("pen-turn");
    // squareがクリック可能かを判断するクラスを追加 fukada
    squaresArray.forEach(function (square) {
      square.classList.add("js-clickable");
    });
  }, false
);

// **********************************************
// Win or Lose Judgment Lineを配列化
// **********************************************
// JavaScriptでfilterを使う方法：https://techacademy.jp/magazine/15575
function JudgLine(targetArray, idArray) {
  return targetArray.filter(function(e) {
    return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
  });
}

// **********************************************
// squareをクリックしたときにイベント発火（はっか）
// **********************************************
// クリックしたsquareに、penguinsかbearを表示。画像を表示したsquareはクリックできないようにする、win or lose Judgementの呼び出し

a_1.addEventListener("click",
  function() {
    isSelect(a_1);
    if (counter < 9) {
      bearTurn(); //fukada
    }
  }, false
);
// 上記のコーディングと下記のコーディングは同じ意味
a_2.addEventListener("click", () => {
  isSelect(a_2);
  if (counter < 9) {
    bearTurn(); //fukada
  }
});

a_3.addEventListener("click", () => {
  isSelect(a_3);
  if (counter < 9) {
    bearTurn(); //fukada
  }
});

b_1.addEventListener("click", () => {
  isSelect(b_1);
  if (counter < 9) {
    bearTurn(); //fukada
  }
});

b_2.addEventListener("click", () => {
  isSelect(b_2);
  if (counter < 9) {
    bearTurn(); //fukada
  }
});

b_3.addEventListener("click", () => {
  isSelect(b_3);
  if (counter < 9) {
    bearTurn(); //fukada
  }
});

c_1.addEventListener("click", () => {
  isSelect(c_1);
  if (counter < 9) {
    bearTurn(); //fukada
  }
});

c_2.addEventListener("click", () => {
  isSelect(c_2);
  if (counter < 9) {
    bearTurn(); //fukada
  }
});

c_3.addEventListener("click", () => {
  isSelect(c_3);
  if (counter < 9) {
    bearTurn(); //fukada
  }
});

// **********************************************
// クリックしたsquareにはpenguinsかbearを表示。
//  ・表示したところはクリックできないようにする。
//  ・win or lose 判定の呼び出し。
// **********************************************
function isSelect(selectSquare) {

    if (flag === "pen-flag") {
      selectSquare.classList.add("js-pen-checked"); //squareにはpenguinsを表示
      selectSquare.classList.add("js-unclickable"); //squareをクリックできないようにする
      selectSquare.classList.remove("js-clickable"); //squareがクリック可能かを判断するクラスを削除 fukada
      
      // penguins win
      if (isWinner("penguins")) {
        setMessage("pen-win"); //display win message
        gameOver("penguins");
        return;
      }
      setMessage("bear-turn");
      flag = "bear-flag";

    } else {
      selectSquare.classList.add("js-bear-checked");
      selectSquare.classList.add("js-unclickable");
      selectSquare.classList.remove("js-clickable"); //squareがクリック可能かを判断するクラスを削除 fukada
      // white-bear win
      if (isWinner("bear")) {
        setMessage("bear-win");
        gameOver("bear");
        return;
      }
      setMessage("pen-turn");
      flag = "pen-flag";
    }

    // ターン数カウンターを－１する
    counter--;

    // ターン数＝０になったらDRAW
    if (counter === 0) {
      setMessage("draw");
      gameOver("draw");
    }

}
// **********************************************
// 勝敗判定（しょうはい　はんてい）
// **********************************************
// classListの使い方まとめ：https://qiita.com/tomokichi_ruby/items/2460c5902d19b81cace5
function isWinner(symbol) { 
  // some: 1つでも条件（じょうけん）を満たしていればTrueを返す
 const result = lineArray.some(function (line) {
   // every: 全て条件を満たしていればTrueを返す
   const subResult = line.every(function (square) {
     if (symbol === "penguins") {
       return square.classList.contains("js-pen-checked");
     } else 
     if (symbol === "bear") {
       return square.classList.contains("js-bear-checked");
     }
   });
   // trueを返したlineをwinningLineに代入（だいにゅう）
   if (subResult) { winningLine = line }
   
   return subResult;
 });
 return result;
}
// **********************************************
// メッセージ切り替え（きりかえ）関数（かんすう）
// **********************************************
// 要素の中身を変える！JavaScriptでinnerHTMLの使い方【初心者向け】：https://techacademy.jp/magazine/15332
function setMessage(id) {
  switch (id) {
    case "pen-turn":
      document.getElementById("msgtext").innerHTML=msgtxt1;
      break;
    case "bear-turn":
      document.getElementById("msgtext").innerHTML=msgtxt2;
      break;
    case "pen-win":
      document.getElementById("msgtext").innerHTML=msgtxt3;
      break;
    case "bear-win":
      document.getElementById("msgtext").innerHTML=msgtxt4;
      break;
    case "draw":
      document.getElementById("msgtext").innerHTML=msgtxt5;
      break;
    default:
      document.getElementById("msgtext").innerHTML=msgtxt1;
  }
}

// **********************************************
// ゲーム終了時の処理
// **********************************************
// 実際に書いてみる！JavaScriptでforEachメソッドを使う方法【初心者向け】：https://techacademy.jp/magazine/14635
// classListの使い方まとめ：https://qiita.com/tomokichi_ruby/items/2460c5902d19b81cace5
function gameOver(status) {
  // all square unclickable
  squaresArray.forEach(function (square) {
    square.classList.add("js-unclickable");
  });

  // display New Game button：display
  newgamebtn_display.classList.remove("js-hidden");

  // winEffect
  if(status==="penguins") {
    // winner-line penguins high-light
    if (winningLine) {
      winningLine.forEach(function (square) {
        square.classList.add("js-pen_highLight");
      });
    }
    // penguins win!! ==>snow color is pink
    $(document).snowfall({
      flakeColor : "rgb(255,240,245)", // 雪の色
      maxSpeed : 3, // 最大速度（さいだい　そくど）
      minSpeed : 1, // 最小速度（さいしょう　そくど）
      maxSize  : 20, // 最大サイズ（さいだい　サイズ）
      minSize  : 10, // 最小サイズ（さいしょう　サイズ）
      round : true // 雪の形を丸にする
    });

  } else if(status==="bear") {
    // winner-line bear high-light
    if (winningLine) {
      winningLine.forEach(function (square) {
        square.classList.add("js-bear_highLight");
      });
    }
    // whitebear win!! ==>snow color is blue
    $(document).snowfall({
      flakeColor : "rgb(175,238,238)", // 雪の色
      maxSpeed : 3, // 最大速度（さいだい　そくど）
      minSpeed : 1, // 最小速度（さいしょう　そくど）
      maxSize  : 20, // 最大サイズ（さいだい　サイズ）
      minSize  : 10, // 最小サイズ（さいしょう　サイズ）
      round : true // 雪の形を丸にする
    });
  }
  
}

// **********************************************
// NewGameボタン　クリック時、ゲーム初期化 
// **********************************************
// classListの使い方まとめ：https://qiita.com/tomokichi_ruby/items/2460c5902d19b81cace5
newgamebtn.addEventListener("click", function () {
    // penguinsのターン
    flag = "pen-flag";
    // ターン数カウンター
    counter = 9;
    winningLine = null;
    squaresArray.forEach(function (square) {
      square.classList.remove("js-pen-checked");
      square.classList.remove("js-bear-checked");
      square.classList.remove("js-unclickable");
      square.classList.remove("js-pen_highLight");
      square.classList.remove("js-bear_highLight");
      square.classList.add("js-clickable"); // squareがクリック可能かを判断するクラスを追加 fukada
    });

    setMessage("pen-turn");
    newgamebtn_display.classList.add("js-hidden");
  
    // snowfall stop
    $(document).snowfall("clear");
});
// **********************************************
// クマのターン 
// **********************************************
function bearTurn() {
  flag = "bear-flag";
  isBearClick();
}
// **********************************************
// クマのターン（マス目をえらぶ）
// **********************************************
function isBearClick() { 
  let bearCheckCnt = 0;  //クマがチェックされている数
  let penCheckCnt = 0;   //ペンギンがチェックされている数
  let bearTurnEnd = 0;   // クマのターン  1:終了

  // リーチの列をさがす
  const bearResult1 = lineArray.some(function (line) {
    const bearResult2 = line.forEach(function (square) {
      if (square.classList.contains("js-bear-checked")) {
        bearCheckCnt++; //クマがチェックされている数
      }
      if (square.classList.contains("js-pen-checked")) {
        penCheckCnt++;  //ペンギンがチェックされている数
      }
    });
    // リーチ行のとき
    if (bearCheckCnt === 2 && penCheckCnt === 0) {
      line.some(function (square) {
        if (square.classList.contains("js-clickable")) {
          isSelect(square);
          bearTurnEnd = 1; // クマのターン終了
          return true;
        }
      })
    }

    if(bearTurnEnd === 1){
      return true;  // forEach のloop処理を終了
    }
  });

  // リーチ行がないとき、クリックできるマス目をランダムにえらぶ
  if(bearTurnEnd === 0){
    const bearSquare = squaresArray.filter(function(square) {
      return square.classList.contains("js-clickable");
    });
    let n = Math.floor(Math.random() * bearSquare.length);
    isSelect(bearSquare[n]);
  }
}