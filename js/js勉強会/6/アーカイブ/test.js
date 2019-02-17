// var run = function(arg){
//   console.log(arg);
//   return 'hoge';
// }

// var ans1 = run('引き渡す値');
// var ans2 = run(100);

//returnは戻り値

//return文が読まれるとそこでその関数の処理は終了する
//必ずしも必要ではない


//■スコープ
// var obj = '実行';
// var run = function(){
//   console.log(obj);
//   obj = '実行済';
// }


// var hoge = '未実行';
// var run = function(){
//   var hoge = 'ずっと未実行';
//   console.log(hoge);
// }
// var hoge = '実行済';
// run();

//■匿名即時関数
// (function(){
//   'use strict';
//   //ここにコード書く
//   var obj = '文字列';
//   console.log();
// }());

//新規で作る場合は匿名即時関数で括る
//匿名即時関数の中でも機能ごとに匿名即時関数を書く
//1.
// (function(){
//   'use strict';
//   console.log(0);
// }());

//2.
// (function(){
//   value = 0;
//   console.log(value);
// }());


// (function(){
//   'use strict';
//   value = 0;
//   console.log(value);
// }());

//3.
// (function(){
//   'use strict';
//   (function(){
//     var hoge = '１';
//     console.log(hoge);
//   }());
//   (function(){
//     var hoge = '２';
//     console.log(hoge);
//   }());
// }());


//四則演算
// (function(){
//   'use strict';
//   var sum = function( arg1, arg2 ){
//     return arg1 + arg2;
//   };
//   var run = sum(1,2);
//   console.log(run);
// }());

//引数に何がはいるか分からないのでこんな感じ
// (function(){
//   'use strict';
//   var sum = function( arg ){
//     if(!arg){
//       return;
//     }
//   };
//   var run = sum(1,2,3,4,5);
//   console.log(run);
// }());

//DOM API
//イベント

(function(){
  'use strict';
  (function(){
    var node = document.querySelector(''); //cssセレクタを記述
    var eventName = ''; //任意のイベント名
    var eventHandler = function(){ //イベントハンドラー

    };
    console.log(node);
    node.addEventListener(eventName, eventHandler);
  }());
}());

(function(){
  'use strict';
  (function(){
    var node = document.querySelector('h1 > a'); //cssセレクタを記述
    var eventName = 'click'; //任意のイベント名
    var eventHandler = function(){ //イベントハンドラー
      alert('クリック');
    };
    console.log(node);
    node.addEventListener(eventName, eventHandler);
  }());
}());


(function(){
  'use strict';
  (function(){
    var node = window; //cssセレクタを記述
    var eventName = 'resize'; //任意のイベント名
    var eventHandler = function(){ //イベントハンドラー
      alert('クリック');
    };
    console.log(node);
    node.addEventListener(eventName, eventHandler);
  }());
}());

(function(){
  'use strict';
  (function(){
    var node = document.querySelector('h1 > a'); //cssセレクタを記述
    var eventName = 'click'; //任意のイベント名
    var eventHandler = function(e){ //イベントハンドラー
      e.preventDefault();
      console.log(e);
    };
    console.log(node);
    node.addEventListener(eventName, eventHandler);
  }());
}());


//1. h1要素の中の a要素をクリックした時、その要素を削除する
(function(){
  'use strict';
  (function(){
    var node = document.querySelector('h1 > a'); //cssセレクタを記述
    var eventName = 'click'; //任意のイベント名
    var eventHandler = function(e){ //イベントハンドラー
      e.preventDefault();
      node.remove();
    };
    node.addEventListener(eventName, eventHandler);
  }());
}());

//2. 「トピックス」という見出しをクリックした時にbody要素の背景色を変更する
(function(){
  'use strict';
  (function(){
    var node = document.querySelector('#main_content > section:first-child > .hdg_l2_2'); //cssセレクタを記述
    var body = document.querySelector('body');
    var eventName = 'click'; //任意のイベント名
    var eventHandler = function(){ //イベントハンドラー
      body.style.backgroundColor = '#000000';
    };
    node.addEventListener(eventName, eventHandler);
  }());
}());

//3. 特定の要素をクリックしたとき、クリックされた要素の要素名を取得して、console.log()する
handler = function(){
  this // イベントを発火させられた要素が入る
}

(function(){
  'use strict';
  (function(){
    var node = document.querySelectorAll('*')[13]; //cssセレクタを記述
    var eventName = 'click'; //任意のイベント名
    var eventHandler = function(e){ //イベントハンドラー
      var elemName = this.tagName;
      console.log(elemName);
    };
    node.addEventListener(eventName, eventHandler);
  }());
}());

//4. querySelectorAllで画像全てを取得し、for文で組み合わせてクリックした画像のalt属性をconsole.log()する
(function(){
  'use strict';
  (function(){
    var node = document.querySelectorAll('img'); //cssセレクタを記述
    var eventName = 'click'; //任意のイベント名
    var eventHandler = function(e){ //イベントハンドラー
      e.preventDefault();
      console.log(this.alt);
    };
    var i = 0;
    var max = node.length;
    for( i; i < max; i++ ){
      node[i].addEventListener(eventName, eventHandler);
    }
  }());
}());
//5. querySelectorAllで要素全てを取得し、for文を組み合わせてクリックした要素の一覧を配列に追加し、その度に配列をconsole.log()に追加する
(function(){
  'use strict';
  (function(){
    var node = document.querySelectorAll('*'); //cssセレクタを記述
    var clickedElementList = [];
    var eventName = 'click'; //任意のイベント名
    var eventHandler = function(e){ //イベントハンドラー
      e.preventDefault();
      clickedElementList.
      console.log(this.alt);
    };
    var i = 0;
    var max = node.length;
    for( i; i < max i++ ){
      node[i].addEventListener(eventName, eventHandler);
    }
  }());
}());
