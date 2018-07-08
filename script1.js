var kw = document.getElementById("keyword"),
	btn = document.getElementById("btn"),
	inputEl = document.getElementById("text"),
	outputEl = document.getElementById("encrypt"),
    plainT = inputEl.value,
	pinp = document.getElementById("input"),
	flag = true;
	btn.addEventListener("click", validation);
	function validation(e){
		e.preventDefault();
		var str= kw.value.split("");
		if(kw.value){
			flag=true;
		}
		var len = str.length;
		for(i=0;i<len;i++){
			if(!isNaN(str[i]) || !(/^[a-zA-Z]/.test(str[i]))){
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
		//stripping the keyword
			function strip(Str) {	
				var splitStr= "";		
				for (var item in Str) {	
					 var letter = Str.charAt(item);
					//appending to string, despite of the whitespace
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
		//filling the matrix to 25 elementswiuth the alphabet
		function fillMatrix(){
			var userInput = first,
				m = new Array(25),
			    mIndex = 0,
			    kIndex = 0,
		   	    alphabet = "abcdefghijklmnopqrstuvwxyz";
			//strip whitespace
			userInput.strip;
			userInput.toLowerCase;
			//adding the keyword to the matrix
			while ( kIndex < userInput.length ) {
				var letter = userInput.charAt(kIndex);
				if ( m.indexOf(letter) == -1 ) {
					m[mIndex] = letter;
					mIndex++;
				}
			kIndex++;
			}
			for (var item in alphabet) {
				var aconst = alphabet.charAt(item);
				//validating both uppercase and lowercase letters
				var letterNotInm = (m.indexOf(aconst) +
				m.indexOf(aconst.toUpperCase()) == -2);
				// if the letter is not in the matrix (-1 + -1)
				if ( letterNotInm ) {
					//if i or j are already in m, we will skeep them both
					if ( (aconst == "i" || aconst == "I") && (m.indexOf("j") == -1 &&	m.indexOf("J") == -1 ) ) {
						m[mIndex] = aconst;
						mIndex++;
					}
					// replace j with i
					else if ( aconst == "j" || aconst == "J" && (m.indexOf("i") == -1 && m.indexOf("I") == -1 ) ) {
						m[mIndex] = aconst;
						mIndex++;
					}
					else {
						m[mIndex] = aconst;
						mIndex++;
					}
				}
			}
			return m;
		}
		var second = fillMatrix();
		//adding x when needed
		function getDigrams(str) {
			var count = 0,
				input = str.toLowerCase(),
				local = "",
				textLength = input.length,
				digramLength,
				letter,
				arr = [];
			while (count < input.length) {
				digramLength = local.length;
				letter = input.charAt(count);
				if ( digramLength == 0 ) {
					local += letter;
				}
				else if ( digramLength == 1 ) {
					var str = local.charAt(0);
					if (  str == letter ) {
						local += "x";
						count--; 
					}
					else {
						local += letter;
						arr.push(local);
						local = "";
					}
				}
				else {
					arr.push(local);
					local = "";
					local += letter;
				}
				// check odd ending
				if ( textLength % 2 != 0 && count == input.length - 1 && local.length != 0 ) {
					local += "x";
					arr.push(local);
				}
				// check odd letters
				else if (count == input.length - 1 && local.length != 0) {
					local = letter + "x";
					arr.push(local);
				}
				count++;
			}
			return arr;
		}
		var third = getDigrams(inputEl.value);	
		//function encrypt(){
		var m = second;
		var plainT = strip(document.getElementById("text").value);
		var digrams = third,
		    encryptedArray = [],
		    strlocal = "",
		    letter1,
		    letter2,
	        position1,
	        position2,
		    distance,
		    difference,
		    mod4Result,
		    mod5Result,
		    mod6Result,
		    offset,
		    min,
		    max;
		if ( plainT == "" || !isNaN(plainT.value) || !(/^[a-zA-Z]/.test(plainT))) {
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
			position1 = m.indexOf(letter1);
			position2 = m.indexOf(letter2);
			min = Math.min(position1, position2);
			max = Math.max(position1, position2);
			var minEdgeDistance = min % 5,
			    maxEdgeDistance = max % 5;
				difference = Math.abs(position1 - position2);
				mod4Result = difference % 4;
				mod5Result = difference % 5;
				mod6Result = difference % 6;
			// if in the same column
			if (mod5Result == 0) {
				if (position1 >= 20) { // If at the bottom of column
					strlocal += m[position1 - 20]; // go up
					strlocal += m[position2 + 5]; // choose element below
				}
				else if (position2 >= 20) {
					strlocal += m[position1 + 5];
					strlocal += m[position2 - 20];
				}
				else {
					strlocal += m[position1 + 5];
					strlocal += m[position2 + 5];
				}
				}
				// if in the same row
			else if ( difference <= 4 && maxEdgeDistance > minEdgeDistance ) {
			//further verification (diagonal check)
				if (difference == 4) {	
					if ( ((max + 1) % 5) == 0 ) {	
						if ( ( (position1 + 1) % 5) == 0 ) {
							strlocal += m[position1 - 4];
							strlocal += m[position2 + 1];
						}
						else if ( ( (position2 + 1) % 5) == 0  ) {
							strlocal += m[position1 + 1];
							strlocal += m[position2 - 4];
						}
					}
				}
				else {
					if ( ( position1 + 1 ) % 5 == 0 ) {
						strlocal += m[position1 - 4];
						strlocal += m[position2 + 1];
					}
					else if ( ( position2 + 1 ) % 5 == 0 ) {
						strlocal += m[position1 + 1];
						strlocal += m[position2 - 4];
					}
					else {
						strlocal += m[position1 + 1];
						strlocal += m[position2 + 1];
					}
					}
			}
			// diagonal part
			else {
				var counter = min,
				    rowD = 0;
			// if at the edge of m
			if ( (min + 1) % 5 == 0 || minEdgeDistance > maxEdgeDistance ) {
			/* loop till the desired column is reached */
				while ( Math.abs(counter - max) % 5 != 0 ) {counter--; rowD--;}
			}
			else{
			/* loop till the desired column is reached */
				while ( Math.abs(counter - max) % 5 != 0 ) {counter++; rowD++;}
			}	
			if ( position1 == min ) {
				strlocal += m[position1 + rowD];
				strlocal += m[position2 - rowD];
			}
			else {
				strlocal += m[position1 - rowD];
				strlocal += m[position2 + rowD];
			}
			}
			encryptedArray.push(strlocal);
			strlocal = " ";
		}	
		document.getElementById("encT").innerHTML= encryptedArray.toString().replace(/,/g, " ");
		console.log(encryptedArray.toString().replace(/,/g, ""))
		}
	}
}