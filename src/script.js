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

var index = 0;
var x = shuffle(Array.from(document.getElementsByClassName("imageslide")));
carousel();

function carousel() {
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	index++;
	if (index > x.length) {
		index = 1;
	}
	x[index - 1].style.display = "block";
	setTimeout(carousel, 5000);
}

document.onmousemove = function (event) {
  document.documentElement.style.cssText = `--deg: ${180 - (Math.round((event.clientX-window.innerWidth/2)/18))}deg;`
};
