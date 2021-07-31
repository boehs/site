//////////////////
///   Utils   ///
/////////////////

function shuffle(array) {
  var m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//////////////////
///   Images   ///
/////////////////

var index = 0;
var ex = 0, s;
carousel();

function carousel() {
  s = shuffle(Array.from(document.getElementsByClassName("imageslide")))
  setTimeout(carousel, 5000);

  if (!s.length > 0) return;
  if (ex > s.length) ex = 0;

  if (ex - 1 == -1) s[s.length - 1].style.display = 'none';
  else s[ex - 1].style.display = 'none';
  if (ex == s.length) s[0].style.display = 'block';
  else s[ex].style.display = 'block'; // lol
  ex++;
}

////////////////////
///   Gradient   ///
////////////////////

document.onmousemove = function (event) {
  document.documentElement.style.cssText = `--deg: ${180 - (Math.round((event.clientX-window.innerWidth/2)/18))}deg;`
};

//////////////////////////
///   Smooth Loading   ///
//////////////////////////

var cache = {};
function loadPage(url) {
  if (cache[url])
    return new Promise(resolve => resolve(cache[url]));

  return fetch(url).then(res => {
    cache[url] = res.text();
    return cache[url];
  });
}

var main = document.getElementsByClassName('container');

function changePage() {

  var url = window.location.href;

  loadPage(url).then(function(responseText) {
    var wrapper = document.createElement('div');
        wrapper.innerHTML = responseText;

    var oldContent = document.querySelectorAll('[class*="col-"]');
    var newContent = wrapper.querySelectorAll('[class*="col-"]');

    console.log(main);
    console.log(newContent);

    animate(oldContent, newContent);
  });
}

function animate(oldContent, newContent) {

  oldContent[0].classList.add('hide');
  oldContent[1].classList.add('hide1');

  setTimeout(function() {
    oldContent[0].parentNode.removeChild(oldContent[0]);
    oldContent[1].parentNode.removeChild(oldContent[1]);
  },1000);

  setTimeout(function() {
    main[0].appendChild(newContent[0]);
    main[0].appendChild(newContent[1]);
    

    carousel();
    newContent[0].classList.add('show');
    newContent[1].classList.add('show1');

    setTimeout(function() {
      newContent[0].classList.remove('show');
      newContent[1].classList.remove('show1');
    }, 1000);
  }, 1000);

}

window.addEventListener('popstate', changePage);

document.addEventListener('click', function(e) {
  var el = e.target;

  while (el && !el.href) {
    el = el.parentNode;
  }

  if (el) {
    e.preventDefault();
    history.pushState(null, null, el.href);
    changePage();

    return;
  }
});
