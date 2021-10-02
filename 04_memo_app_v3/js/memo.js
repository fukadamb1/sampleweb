"use strict";

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
  function() {

    // 1.localStorageが使えるか（つかえるか）確認（かくにん）
    if (typeof  localStorage === "undefined") {
      window.alert("このブラウザはLocal Storage機能が実装されていません");
      return;
    } else {
      viewStorage();      // localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
      saveLocalStorage(); // 2.localStorageへの保存（ほぞん）
      delLocalStorage();  // 3.localStorageから１件削除（さくじょ）
      allClearLocalStorage();  // 4.localStorageからすべて削除（さくじょ）
      selectTable();      // 5.データ選択（せんたく）
    }

  }, false
);

// 2.localStorageへの保存（ほぞん）
function saveLocalStorage() {
  const save = document.getElementById("save");
  save.addEventListener("click",
    function(e){
      e.preventDefault();
      const key = document.getElementById("textKey").value;
      const value = document.getElementById("textMemo").value;

      // 値の入力チェック
      if (key=="" || value=="") {
          window.alert("Key、Memoはいずれも必須です。");
          return;
      }else{
        let w_confirm = window.confirm("LocalStorageに\n「" + key + " " + value + "」\nを保存（save）しますか？");
        //確認（かくにん）ダイアログで「OK」を押されたとき、保存（ほぞん）する
        if (w_confirm === true){
          localStorage.setItem(key, value);
          viewStorage(); //localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
          let w_msg = "LocalStorageに" + key + " " + value + "を保存（ほぞん）しました。";
          window.alert(w_msg);
          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
        }
      }
    }, false
  );
};

// 3.localStorageから選択されている行を削除（さくじょ） //version-up3 chg  １件削除（さくじょ）==> 選択されている行を削除（さくじょ）
function delLocalStorage() {
  const del = document.getElementById("del");
  del.addEventListener("click",
    function(e) {
      e.preventDefault();
      const chkbox1 = document.getElementsByName("chkbox1"); // version-up3 add
      const table1 = document.getElementById("table1");      // version-up3 add
      let w_cnt = 0; //選択（せんたく）されているチェックボックスの数が返却（へんきゃく）される　//version-up3 w_sel="0" ==> w_cnt=0
      w_cnt = selectCheckBox("del"); // テーブルからデータ選択（せんたく）// version-up3 chg  戻り値:w_sel ==> w_cnt 引数:なし==>"del"

      if(w_cnt >= 1){     // version-up3 chg  w_sel === "1" ==> w_cnt >= 1
        // const key = document.getElementById("textKey").value;  //version-up3 del
        // const value = document.getElementById("textMemo").value;  //version-up3 del
        let w_confirm = window.confirm("LocalStorageから選択されている" + w_cnt + "件を削除（delete）しますか？");   // version-up3 chg
        //確認（かくにん）ダイアログで「OK」を押されたとき、削除（さくじょ）する
        if (w_confirm === true){
          for(let i = 0; i < chkbox1.length; i++){ // version-up3 add
                if(chkbox1[i].checked) { // version-up3 add
                  localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);  // version-up3 chg
                }  // version-up3 add
          } // version-up3 add
          viewStorage(); //localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
          let w_msg = "LocalStorageから" + w_cnt + "件を削除（delete）しました。";  // version-up3 chg
          window.alert(w_msg);
          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
        }
      }
    }, false
  );
};

// 4.localStorageからすべて削除（さくじょ）
function allClearLocalStorage() {
  const allClear = document.getElementById("allClear");
  allClear.addEventListener("click",
    function(e) {
      e.preventDefault();
      let w_confirm = window.confirm("LocalStorageのデータをすべて削除（all clear）します。\nよろしいですか？");
      //確認（かくにん）ダイアログで「OK」を押されたとき、すべて削除（さくじょ）する
      if (w_confirm === true){
          localStorage.clear();
          viewStorage(); //localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
          let w_msg = "LocalStorageのデータをすべて削除（all clear）しました。";
          window.alert(w_msg);
          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
      }
    }, false
  );
};

// 5.データ選択（せんたく）
function selectTable() {
  const select = document.getElementById("select");
  select.addEventListener("click",
    function(e) {
      e.preventDefault();
      selectCheckBox("select"); //テーブルからデータ選択（せんたく）// version-up3 chg  引数:なし==>"select"
    }, false
  );
};

// テーブルからデータ選択（せんたく）
function selectCheckBox(mode) { // version-up3 chg  引数:なし==> mode
  //let w_sel = "0"; //選択（せんたく）されていれば、”１”にする // version-up3 del
  let w_cnt = 0;   //選択されているチェックボックスの数
  const chkbox1 = document.getElementsByName("chkbox1");
  const table1 = document.getElementById("table1");
  let w_textKey = "";  // work
  let w_textMemo = ""; // work

  for(let i = 0; i < chkbox1.length; i++){
    if(chkbox1[i].checked) {
      if(w_cnt === 0) {      //最初にチェックされている行をワークに退避
        w_textKey = table1.rows[i+1].cells[1].firstChild.data;
        w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
      }
      w_cnt++; //選択されているチェックボックスの数をカウント
    }
  }

  document.getElementById("textKey").value = w_textKey;
  document.getElementById("textMemo").value = w_textMemo;

  if(mode === "select"){ // version-up3 add 
    if (w_cnt===1) {
      return w_cnt;      // version-up3 chg  w_sel = "1" ==> w_cnt
    }
    else {
      window.alert("１つ選択（select）してください。");
    }
  }                      // version-up3 add

  if(mode === "del"){  // version-up3 add
    if (w_cnt >= 1) {  // version-up3 add
      return w_cnt;    // version-up3 add
    }                  // version-up3 add
    else {             // version-up3 add
      window.alert("１つ選択（select）してください。");// version-up3 add
    }                  // version-up3 add
  }                    // version-up3 add
};

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
    
    td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
    td2.innerHTML = w_key;
    td3.innerHTML = localStorage.getItem(w_key);
  }

  // jQueryのplugin tablesorterを使ってテーブルのソート
  // sortList: 引数１...最初からソートしておく列を指定、引数２...0…昇順,1…降順
  $("#table1").tablesorter({
    sortList: [[1, 0]]
  });

  $("#table1").trigger("update");
};