function shuffle(array) {
	var m = array.length,
		t,
		i;

	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}

var Index = 0;
var x = document.getElementsByClassName("imageslide");
x = Array.from(x);
console.log(x)
x = shuffle(x);
console.log(x);
carousel();

function carousel() {
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	Index++;
	if (Index > x.length) {
		console.log(x.length);
		Index = 1;
	}
	x[Index - 1].style.display = "block";
	setTimeout(carousel, 5000);
}

document.onmousemove = function (event) {
  document.documentElement.style.cssText = `--deg: ${180 + Math.round((event.clientX-window.innerWidth/2)/18)}deg;`
};
