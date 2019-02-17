// 07/07まで
//
// ページ内の最初のh1要素を取得する
(function(){
  'use strict';
  var h1 = document.querySelector('h1');
  console.log(h1);
}());


// ページ内の最初のh2要素を取得する
(function(){
  'use strict';
  var h2 = document.querySelector('h2');
  console.log(h2);
}());


// ページ内の全てのp要素を取得する
(function(){
  'use strict';
  var allp = document.querySelectorAll('p');
  console.log(allp);
}());

// 「var宣言、変数piyoを定義します。値はnumber型100です。」をJSにしてみる。
(function(){
  'use strict';
  var piyo = 100;
}());


// 「変数piyoに10を足して、20を足して、30を足します。」をJSにしてみる
(function(){
  'use strict';
  var piyo = 10 + 20 + 30;
}());


// for文を使って、1〜10の数字を足した結果を求める
(function(){
  'use strict';
  var i = 0;
  var maxLength = 10;
  var counter = 0;
  for( i; i <= maxLength; i++ ){
    counter += i;
  }
  console.log(counter);
}());


// 資料の93〜98ページを写経する
//93
(function(){
  'use strict';
  var a1 = document.querySelector('a');
  var a2 = document.createElement('a');
  console.log(a1);
  console.log(a2);
}());

//94
(function(){
  'use strict';
  var a1 = document.querySelector('a');
  var a2 = document.createElement('a');

  a2.href = '/';
  a2.innerText = 'hogehoge';
  a2.target = '_blank';
  a2.classList.add('funk-link');

  document.body.firstElementChild.before(a2);

  console.log(a1);
  console.log(a2);
}());

//95
(function(){
  'use strict';
  var a = document.querySelector('a');
  var aList = document.querySelectorAll('a');

  console.log(a);
  console.log(aList);
  console.log(a === aList[0]);
}());

//96
(function(){
  'use strict';
  var a = document.querySelector('a');

  a.innerHTML = '<span>test</span>';
  a.title = 'sample';
}());

//97
(function(){
  'use strict';
  var a = document.querySelector('a');

  a.remove();
}());

//98
(function(){
  'use strict';
  var comment = document.createComment('hogehoge');
  var text = document.createTextNode('hogehoge');

  comment.textContent = '新しいコメント';
  text.textContent = '新しいテキスト';

  document.body.firstElementChild.before(comment);
  document.body.firstElementChild.before(text);

  console.log(comment);
  console.log(text);
}());

// 07/14まで
//
// string型「100」をnumber型「100」と足した値を console.log() する
(function(){
  'use strict';
  var string = '100';
  var number = 100;
  console.log(string + number);
}());


// string型「100」をnumber型に変換し、number型「100」と足した値を console.log() する
(function(){
  'use strict';
  var string = Number('100');
  var number = 100;
  console.log(string + number);
}());


// number型「100」をstring型「100」と足した値を console.log() する
(function(){
  'use strict';
  var number = 100;
  var string = '100';
  console.log(number + string);
}());


// number型「100」をstring型に変換し、number型「100」と足した値を console.log() する
(function(){
  'use strict';
  var number = String(100);
  var string = '100';
  console.log(number + string);
}());


// string型「hoge」をnumber型「100」と乗算しようとした結果を、計算が NaN だった場合は「値が正しくありません」、NaNではなかった場合は「計算結果」をそれぞれ console.log() する
(function(){
  'use strict';
  var string = 'hoge';
  var number = 100;
  var result = string * number;
  console.log(result);
  if(result === NaN){
    console.log('値が正しくありません');
  } else {
    console.log('計算結果');
  }
}());


// h2要素がクリックされた時、string型「hello」とstring型「world」を足して body要素の innerText に指定する
(function(){
  'use strict';

  var node = document.querySelector('h2');
  var string1 = 'hello';
  var string2 = 'world';
  var eventName = 'click';
  var eventHandler = function(){
    document.body.innerText = string1 + string2;
  };
  node.addEventListener(eventName, eventHandler);
}());

// すべての見出し要素のテキストをつなげて console.log() する
(function(){
  'use strict';
  var i = 0;
  var h1 = document.getElementsByTagName('h1');
  var h2 = document.getElementsByTagName('h2');
  var h3 = document.getElementsByTagName('h3');
  var h4 = document.getElementsByTagName('h4');
  var h5 = document.getElementsByTagName('h5');
  var h6 = document.getElementsByTagName('h6');
  var text;

  for(i; i < h1.length; i++){
    text += h1[i].textContent;
  }
  for(i; i < h2.length; i++){
    text += h2[i].textContent;
  }
  for(i; i < h3.length; i++){
    text += h3[i].textContent;
  }
  for(i; i < h4.length; i++){
    text += h4[i].textContent;
  }
  for(i; i < h5.length; i++){
    text += h5[i].textContent;
  }
  for(i; i < h6.length; i++){
    text += h6[i].textContent;
  }
  console.log(text);
// この問題が解けませんでした。

}());

// 07/21まで
//
// for文とif文を組み合わせて、10回の「0」と20回の「1」と1回の「2」をコンソールに表示する
(function(){
  'use strict';

  var i = 0;
  var counter = 10;

  if( counter === 10 ){
    for(i; i < counter; i++){
      console.log(0);
    }

    i = 0;
    counter = 20;

    for(i; i < counter; i++){
      console.log(1);
    }
  }

  counter = 1;
  console.log(2);

}());


// body要素の最初の子要素の位置にボタンを挿入し、クリックされた時に body 要素の背景色を pink に変更する
(function(){
  'use strict';

  var body = document.querySelector('body');
  var button = document.createElement('button');
  document.body.firstElementChild.before(button);
  var eventName = 'click';
  var eventHandler = function(){
    document.body.style.backgroundColor = 'pink';
  };
  body.addEventListener(eventName, eventHandler);
}());

// hoge.piyo() というメソッドを定義し、実行されると「window」オブジェクトから「alert」を実行する。 hogeオブジェクトのpiyoメソッドは、body要素がクリックされた時に実行されるようにする
(function(){
  'use strict';
  var hoge = {
    piyo : function(){
        window.alert();
    }
  }
  var body = document.querySelector('body');
  var eventName = 'click';
  var eventHandler = function(){
    hoge.piyo();
  };
  body.addEventListener(eventName, eventHandler);

}());

// 引数に受け取った2つの値を掛け算した数を返り値として返す関数「multiplicate」を定義しましょう
(function(){
  'use strict';
  var multiplicate = function(value1, value2){
    return value1 * value2;
  };
  multiplicate(2,3);
}());

// 引数を３つ受け取ることができる関数「hoge」を定義し、実行時に引数が3つ渡されていない場合「'入力値が間違っています'」という文字列を返し、渡されている場合はすべて console.log() するようにしてみましょう
(function(){
  'use strict';
  var error = '入力値が間違っています';

  var hoge = function(alg1, alg2, alg3){
    if(typeof alg1 && typeof alg2 && typeof alg3 === 'undefined'){
      return error;
    } else {
      console.log(alg1);
      console.log(alg2);
      console.log(alg3);
    }
  };

  hoge(2,3);
}());
