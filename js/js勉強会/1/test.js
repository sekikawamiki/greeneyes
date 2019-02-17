var message = 'sakana!!!!!!!!!!!!!!!!!!!';
var body = document.querySelector('body');
var run = function(){
body.innerText = message;
};
run();

//初級編
window.alert('aaaaaaaaa');

var title = document.title;
var body = document.querySelector('body');
var h1 = document.querySelector('h1');
var a = document.querySelectorAll('a');

var run = function(){
  body.innerText = title;
  console.log(h1);
  console.log(a.length);
}
run();

//上級編
// var h1 = document.querySelector('h1');
// var a = document.querySelectorAll('a');
// a.length;

//初級編
var h1 = document.querySelector('h1').innerHTML;
typeof h1;

var p = document.querySelectorAll('p');
console.log(p);

var allElem = document.all;
console.log(allElem.length);

//中級編
var a = document.querySelector('a');
console.log(a.getAttribute('href'));

var allImg = document.querySelectorAll('img');
var i = 0;
var allImgLength = allImg.length;

for( i; i < allImgLength; i++ ){
console.log(allImg[i].naturalWidth);
}

//上級編
var linkList = document.querySelectorAll('link[rel="stylesheet"]');
for( var i = 0; i < linkList.length; i++ ){
  linkList[i].remove();
}

var liList = document.querySelectorAll('li');
var text = '';
var i = 0;

for( i; i<  liList; i++){
  text.liList[i].innerText.length;
}
text.length;

//振り返り
var piyo = 'Hello world';
console.log(piyo);

var i = 0;
var max = 100;
var count = '';

for( i; i < max; i++ ){
count += [i];
}
console.log(count);

var val = 100;

if( val === 100 ){
console.log('あたり');
}

var obj = {
  hoge : {
    fuga : {
      a : 100
    }
  }
}
console.log(obj.hoge.fuga.a);

console.log('利用する際の決まりごと');
