var kw = document.getElementById("keyword"),
	btn = document.getElementById("btn"),
	inputEl = document.getElementById("text"),
	outputEl = document.getElementById("encrypt"),
    plainT = inputEl.value,
	flag=true;
	pinp = document.getElementById("input");
	btn.addEventListener("click", validation);
	function validation(e){
	e.preventDefault();
	var str= kw.value.split("");
	if(kw.value){
		flag=true;
	}
			var len = str.length;
			for(i=0;i<len;i++){
				console.log(typeof str[i]);
			if(!isNaN(str[i])){
			flag = false;
			//var span = document.createElement('span');
			// span.texttextContent = "Моля, въведете валидна ключова дума";
			// span.style.color = "red";
			// kw.appendChild(span);
		}
		}
		if(kw.length > 25 || kw.length === 0){
			flag=false;
			// var span = document.createElement('span');
			// span.texttextContent = "Моля, въведете валидна ключова дума";
			// span.style.color = "red";
			// kw.appendChild(span);
			// }	
		}
		if(!flag){
			alert("Моля, въведете валидна ключова дума");
		}
else{

	if(kw.value !== ' '){
			function strip(Str) {	
			var splitStr= "";		
			for (var item in Str) {	
			var letter = Str.charAt(item);

			// ignore whitespace and append to string
			if (letter.search(/\s|\W|\d/igm) == -1) {
			splitStr += letter;
			}
			}
			return splitStr;
			}
			}
		else{
		 	alert("Моля, въведете валидна ключова дума");
		}
	var first = strip(kw.value);
	function fillMatrix(){
	var userInput = first;
	var m = new Array(25);
	var mIndex = 0;
	var kIndex = 0;
	var alphabet = "abcdefghijklmnopqrstuvwxyz";
	// strip whitespace
	userInput.strip;
	userInput.toLowerCase;
	// Fill in the keyword
	while ( kIndex < userInput.length ) {
	var letter = userInput.charAt(kIndex);
	if ( m.indexOf(letter) == -1 ) {
	m[mIndex] = letter;
	mIndex++;
	}
	kIndex++;
	}
	// Insert unique letters from the alphabet
	for (var item in alphabet) {
	var literal = alphabet.charAt(item);
	//check both uppercase and lowercase letters
	var letterNotInm = (m.indexOf(literal) +
	m.indexOf(literal.toUpperCase()) == -2);
	// if the letter is not in the m (-1 + -1)
	if ( letterNotInm   ) {
	// Skip i or j if already in m
	if ( (literal == "i" || literal == "I") && (m.indexOf("j") == -1 &&
	m.indexOf("J") == -1 ) ) {
	m[mIndex] = literal;
	mIndex++;
	}
	// replace j with i
	else if ( literal == "j" || literal == "J" &&
	(m.indexOf("i") == -1 && m.indexOf("I") == -1 ) ) {}
	else {
	m[mIndex] = literal;
	mIndex++;
	}
	}
	}
	return m;
	}
var second=fillMatrix();
		function getDigrams(Str) {
			var count = 0;
			var input = Str.toLowerCase();
			var tempDigram = "";
			var textLength = input.length;
			var digramLength;
			var letter;
			var array = [];
			while (count < input.length) {
			
				digramLength = tempDigram.length;
				letter = input.charAt(count);
			
				if ( digramLength == 0 ) {
				tempDigram += letter;
				}
				else if ( digramLength == 1 ) {
					var str = tempDigram.charAt(0);
					if (  str == letter ) {
					tempDigram += "x";
				count--; // stay at the current char
					}
					else {
						tempDigram += letter;
						array.push(tempDigram);
						tempDigram = "";
					}
				}
				else {
					array.push(tempDigram);
					tempDigram = "";
					tempDigram += letter;
				}
		// check odd ending
		if ( textLength % 2 != 0 && count == input.length - 1 && tempDigram.length % 2 != 0 ) {
			tempDigram += "x";
			array.push(tempDigram);
			}
		// check odd letters
		else if (count == input.length - 1 && tempDigram.length != 0) {
			tempDigram = letter + "x";
			array.push(tempDigram);
			}
			count++;
			}
		return array;
		}
		var third=getDigrams(inputEl.value);
		
		//function encrypt(){
		var m = second;
		var plainT = strip(document.getElementById("text").value);
		var digrams = third;
		var encryptedArray = [];
		var tempString = "";
		var letter1;
		var letter2;
		var letterPosition1;
		var letterPosition2;
		var distance;
		var difference;
		var mod4Result;
		var mod5Result;
		var mod6Result;
		var offset;
		var min;
		var max;
		console.log(plainT);
		
		if ( plainT == "" || !isNaN(plainT.value)) {
		alert("Моля, въведете валиден текст за шифроване!");
		}
		else {
		for (var i = 0; i < digrams.length; i++) {
		letter1 = digrams[i][0];
		letter2 = digrams[i][1];
		// replace j with i
		if (letter1 == "j") {
		letter1 = "i"
		}
		else if (letter2 == "j") {
		letter2 = "i";
		}
		letterPosition1 = m.indexOf(letter1);
		letterPosition2 = m.indexOf(letter2);
		min = Math.min(letterPosition1, letterPosition2);
		max = Math.max(letterPosition1, letterPosition2);
		var minDistanceFromEdge = min % 5;
		var maxDistanceFromEdge = max % 5;
		difference = Math.abs(letterPosition1 - letterPosition2);
		mod4Result = difference % 4;
		mod5Result = difference % 5;
		mod6Result = difference % 6;
		
		// if in the same column
		if (mod5Result == 0) {
		
		if (letterPosition1 >= 20) { // If at the bottom of column
		tempString += m[letterPosition1 - 20]; // go up
		tempString += m[letterPosition2 + 5]; // choose element below
		}
		else if (letterPosition2 >= 20) {
		tempString += m[letterPosition1 + 5];
		tempString += m[letterPosition2 - 20];
		}
		else {
		tempString += m[letterPosition1 + 5];
		tempString += m[letterPosition2 + 5];
		}
		}
		// if in the same row
		else if ( difference <= 4 && maxDistanceFromEdge > minDistanceFromEdge ) {
		
		//further verification (diagonal check)
		if (difference == 4) {
		
		if ( ((max + 1) % 5) == 0 ) {
		
		if ( ( (letterPosition1 + 1) % 5) == 0 ) {
		tempString += m[letterPosition1 - 4];
		tempString += m[letterPosition2 + 1];
		}
		else if ( ( (letterPosition2 + 1) % 5) == 0  ) {
		tempString += m[letterPosition1 + 1];
		tempString += m[letterPosition2 - 4];
		}
		}
		}
		else {
		
		if ( ( letterPosition1 + 1 ) % 5 == 0 ) {
		tempString += m[letterPosition1 - 4];
		tempString += m[letterPosition2 + 1];
		}
		else if ( ( letterPosition2 + 1 ) % 5 == 0 ) {
		tempString += m[letterPosition1 + 1];
		tempString += m[letterPosition2 - 4];
		}
		else {
		tempString += m[letterPosition1 + 1];
		tempString += m[letterPosition2 + 1];
		}
		}
		}
		
		// diagonal part
		else {
		
		var counter = min;
		var rowD = 0;
		
		
		// if at the edge of m
		if ( (min + 1) % 5 == 0 || minDistanceFromEdge > maxDistanceFromEdge ) {
		/* loop till the desired column is reached */
		while ( Math.abs(counter - max) % 5 != 0 ) {counter--; rowD--;}
		}
		else{
		/* loop till the desired column is reached */
		while ( Math.abs(counter - max) % 5 != 0 ) {counter++; rowD++;}
		}
		
		if ( letterPosition1 == min ) {
		tempString += m[letterPosition1 + rowD];
		tempString += m[letterPosition2 - rowD];
		}
		else {
		tempString += m[letterPosition1 - rowD];
		tempString += m[letterPosition2 + rowD];
		}
		}
		
		encryptedArray.push(tempString);
		tempString = "";
		}
		
		document.getElementById("encT").innerHTML= encryptedArray.toString().replace(/,/g, " ");
		console.log(encryptedArray.toString().replace(/,/g, " "))
		}
	//}	
}
	
}