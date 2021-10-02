// 2020/12/23 fukada  change radio-button to check-box
// 2020/12/27 fukada  change Delete multiple(複数行を削除)

"use strict";

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
  function() {

    // 1.localStorageが使えるか（つかえるか）確認（かくにん）
    if (typeof  localStorage === "undefined") {
      window.alert("このブラウザはLocal Storage機能が実装されていません");
      return;
    } else {
      // window.alert("このブラウザはLocal Storage機能を実装しています。");

      // localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
      viewStorage();

      // 2.localStorageへの保存（ほぞん）
      const save = document.getElementById("save");
      save.addEventListener("click",
        function(e){
          e.preventDefault();
          const key = document.getElementById("textkey").value;
          const value = document.getElementById("textdata").value;

          // 値の入力チェック
          if (key=="" || value=="") {
            window.alert("Key、Memoはいずれも必須です。");
            return;
          }else{
            // version-up str 
            let w_msg = "LocalStorageに\n「" + key + " " + value + "」\nを保存（save）しますか？"; 
            if (window.confirm(w_msg)) {
              // OKが選択されたときの処理
              localStorage.setItem(key, value);
              // localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
              viewStorage();
              // let w_msg = "LocalStorageに" + key + " " + value + "を保存（save）しました。";
              let w_msg = "LocalStorageに保存（save）しました。";
              window.alert(w_msg);
              document.getElementById("textkey").value = "";
              document.getElementById("textdata").value = "";
            }
            // version-up end
          }
        }, false
      );
      
      // 3.localStorageから選択されている行を削除（さくじょ） 2020/12/27 fukada chg １件削除==> 選択されている行を削除
      const del = document.getElementById("del");
      del.addEventListener("click",
        function(e) {
          e.preventDefault();
          // テーブルからデータ選択（せんたく）
          const chkbox1 = document.getElementsByName("chkbox1");
          const table1 = document.getElementById("table1");
          let w_cnt = 0; //選択（せんたく）されているチェックボックスの数が返却（へんきゃく）される
          w_cnt = selectCheckBox("del");
          if(w_cnt >= 1){
            let w_msg = "LocalStorageから選択されている" + w_cnt + "件を削除（delete）しますか？";
            if (confirm(w_msg)) {
              // 2020/12/27 fukada add 複数行を削除
              for(let i = 0; i < chkbox1.length; i++){
                if(chkbox1[i].checked) {
                  localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                }
              }

              // localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
              viewStorage();
              let w_msg = "LocalStorageから" + w_cnt + "件を削除（delete）しました。"; 
              window.alert(w_msg);
              document.getElementById("textkey").value = "";
              document.getElementById("textdata").value = "";
            }
          }
        }, false
      );
      
      // 4.localStorageからすべて削除（さくじょ）
      const allClear = document.getElementById("allClear");
      allClear.addEventListener("click",
        function(e) {
          e.preventDefault();
          let w_confirm = "" //確認（かくにん）ダイアログの結果（けっか）をいれる。
          w_confirm = confirm("LocalStorageのデータをすべて削除（all clear）します。\nよろしいですか？");
          //確認（かくにん）ダイアログの結果（けっか）がOKのとき、すべて削除（さくじょ）する
          if (w_confirm === true){
              localStorage.clear();
              // localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
              viewStorage();
              let w_msg = "LocalStorageのデータをすべて削除（all clear）しました。";
              window.alert(w_msg);
              document.getElementById("textkey").value = "";
              document.getElementById("textdata").value = "";
          }
        }, false
      );
      
      // 5.テーブルからデータ選択（せんたく）
      const select = document.getElementById("select");
      select.addEventListener("click",
        function(e) {
          e.preventDefault();
          selectCheckBox("select");   // 2020/12/27 fukada chg  引数を追加
        }, false
      );

    }

  }, false
);

// localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
function viewStorage() {

  const list = document.getElementById("list");
  // htmlのテーブル初期化（しょきか）
  while(list.rows[0]) list.deleteRow(0);

  // localStorageすべての情報（じょうほう）の取得（しゅとく）
  for (let i=0; i < localStorage.length; i++) {
    let w_key = localStorage.key(i);

    // localStorageのキーと値（あたい）を表示（ひょうじ）
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    list.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    
    td1.innerHTML = "<input name='chkbox1' type='checkbox'>" ;  // 2020/12/23 fukada chg
    td2.innerHTML = w_key;
    td3.innerHTML = localStorage.getItem(w_key);
  }

}

// テーブルからデータ選択（せんたく）
function selectCheckBox(mode) {   // 2020/12/27 fukada chg  引数を追加
  let w_cnt = 0   //選択されているチェックボックスの数
  const chkbox1 = document.getElementsByName("chkbox1");
  const table1 = document.getElementById("table1");
  let w_textkey = "";  // work
  let w_textdata = ""; // work

  for(let i = 0; i < chkbox1.length; i++){
    if(chkbox1[i].checked) {
      //最初にチェックされている行をワークに退避
      if(w_cnt === 0) {
        w_textkey = table1.rows[i+1].cells[1].firstChild.data;
        w_textdata = table1.rows[i+1].cells[2].firstChild.data;
      }
      w_cnt++;                               //選択されているチェックボックスの数をカウント
    }
  }
  // 「選択」ボタンのときのチェック
  if(mode === "select"){ 
    if (w_cnt===1) {
      document.getElementById("textkey").value = w_textkey;
      document.getElementById("textdata").value = w_textdata;
      return w_cnt;
    }
    else {
      window.alert("１つ選択（select）してください。");
    }  
  }

  // 「削除」ボタンのときのチェック
  if(mode === "del"){ 
    if (w_cnt >= 1) {
      document.getElementById("textkey").value = "";
      document.getElementById("textdata").value = "";
      return w_cnt;
    }
    else {
      window.alert("１つ以上選択（select）してください。");
    }  
  }

}