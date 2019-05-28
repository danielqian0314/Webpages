/**
 * 
 */

function calculation() {
	
	var form = document.forms[0];
	var error = "";
	
	//All the alert texts needed to give cautions to users when their inputs are invalid.
	var alerttext101 = "Error 101 (Number of people): Cannot be null!\n";
	var alerttext102 = "Error 102 (Number of people): Please enter a number!\n";
	var alerttext201 = "Error 201 (Duration): Cannot be null!\n";
	var alerttext202 = "Error 202 (Duration): Please enter a number!\n";
	var alerttext301 = "Error 301 (From): Please choose one item!\n";
	var alerttext401 = "Error 401 (To): Please choose one item!\n";
	var alerttext501 = "Error 501 (Hotel): Please choose one item!\n";
	var alerttext601 = "Error 601 (Restaurant): Please choose one item!\n";
	
	//To get value of number of people, duration, place of departure, destination, hotel type and restaurant type.
	var num = form.amount.value;
	var dur = form.duration.value;
	var start = form.from.value;
	var end = form.to.value;
	var h = document.getElementsByName("hoteltype");
	var m = document.getElementsByName("mealtype");
	var htl = "";
	var meal = "";
	
	//To store everyone's cost on a single flight, single night of a hotel and a single meal.
	var air = 0;
	var airFixed = 0;
	var rail = 0;
	var railFixed = 0;
	var hotel = 0;
	var food = 0;
	
	//To store the name of the currency used in the destination country and the corresponding currency rate.
	var cur = "";
	var currate = 0.00;
	
	//To store the whole basic cost in the currency used in the destination (e.g. Swiss Francs or British Pounds). The formula will be provided at the end.
	var esti = 0.00;
	//To constraint the value to two decimal digits.
	var estiFixed = 0.00;
	
	//To store the whole cost transformed to Euro.
	var esti_EUR = 0.00;
	//To constraint the cost in Euro in two decimal digits.
	var estiFixed_EUR = 0.00;
	
	var bud = 0.00;
	var budFixed = 0.00;
	//The lowest budget recommended, equals to 120% of estimation.
	var budL = 0.00;
	//To constraint the value above.
	var budLFixed = 0.00;
	
	//The highest budget recommended, equals to 150% of estimation.
	var budH = 0.00;
	//To constraint the value above.
	var budHFixed = 0.00;
	
	var display = "";
	
	var cityLocation = [];
	
	cityLocation['Berlin'] = {latitude: '52.556463', longitude: '13.292588'};
	cityLocation['Bremen'] = {latitude: '53.049884', longitude: '8.783805'};
	cityLocation['Cologne'] = {latitude: '50.869945', longitude: '7.137913'};
	cityLocation['Dusseldorf'] = {latitude: '51.281919', longitude: '6.763150'};
	cityLocation['Frankfurt'] = {latitude: '50.038449', longitude: '8.559545'};
	cityLocation['Hamburg'] = {latitude: '53.631746', longitude: '9.998846'};
	cityLocation['Hannover'] = {latitude: '52.462352', longitude: '9.687425'};
	cityLocation['Munich'] = {latitude: '48.351865', longitude: '11.779040'};
	cityLocation['Nuremberg'] = {latitude: '49.495936', longitude: '11.078810'};
	cityLocation['Stuttgart'] = {latitude: '48.689393', longitude: '9.202872'};
	cityLocation['Amsterdam'] = {latitude: '52.306708', longitude: '4.774368', threestar: '60', fourstar: '75', fivestar: '90', normal: '15', excellent: '21', premium: '29', currency: 'EUR', rate: '1'};
	cityLocation['Athens'] = {latitude: '37.934716', longitude: '23.952675', threestar: '52', fourstar: '60', fivestar: '68', normal: '8', excellent: '12', premium: '18', currency: 'EUR', rate: '1'};
	cityLocation['Barcelona'] = {latitude: '41.297380', longitude: '2.081792', threestar: '58', fourstar: '70', fivestar: '82', normal: '10', excellent: '18', premium: '23', currency: 'EUR', rate: '1'};
	cityLocation['Basel'] = {latitude: '47.598889', longitude: '7.526955', threestar: '75', fourstar: '90', fivestar: '105', normal: '20', excellent: '29', premium: '37', currency: 'CHF', rate: '1.0255'};
	cityLocation['Bratislava'] = {latitude: '48.171401', longitude: '17.204880', threestar: '48', fourstar: '58', fivestar: '68', normal: '8', excellent: '10', premium: '15', currency: 'EUR', rate: '1'};
	cityLocation['Brussels'] = {latitude: '50.899416', longitude: '4.494007', threestar: '60', fourstar: '70', fivestar: '85', normal: '12', excellent: '16', premium: '22', currency: 'EUR', rate: '1'};
	cityLocation['Budapest'] = {latitude: '47.435397', longitude: '19.262904', threestar: '16000', fourstar: '18000', fivestar: '21000', normal: '3000', excellent: '4500', premium: '6000', currency: 'HUF', rate: '310.3997'};
	cityLocation['Copenhagen'] = {latitude: '55.617836', longitude: '12.656116', threestar: '550', fourstar: '660', fivestar: '760', normal: '130', excellent: '200', premium: '270', currency: 'DKK', rate: '7.4337'};
	cityLocation['Geneve'] = {latitude: '46.234912', longitude: '6.110301', threestar: '80', fourstar: '92', fivestar: '106', normal: '22', excellent: '32', premium: '43', currency: 'CHF', rate: '1.0255'};
	cityLocation['Helsinki'] = {latitude: '60.320454', longitude: '24.957239', threestar: '73', fourstar: '86', fivestar: '98', normal: '17', excellent: '25', premium: '32', currency: 'EUR', rate: '1'};
	cityLocation['Lisbon'] = {latitude: '38.774339', longitude: '-9.132481', threestar: '53', fourstar: '62', fivestar: '75', normal: '12', excellent: '15', premium: '20', currency: 'EUR', rate: '1'};
	cityLocation['Ljubljana'] = {latitude: '46.227354', longitude: '14.458918', threestar: '50', fourstar: '57', fivestar: '70', normal: '9', excellent: '13', premium: '18', currency: 'EUR', rate: '1'};
	cityLocation['London'] = {latitude: '51.467604', longitude: '-0.464275', threestar: '60', fourstar: '72', fivestar: '88', normal: '16', excellent: '24', premium: '30', currency: 'GBP', rate: '0.8503'};
	cityLocation['Madrid'] = {latitude: '40.487747', longitude: '-3.569593', threestar: '61', fourstar: '72', fivestar: '85', normal: '14', excellent: '19', premium: '25', currency: 'EUR', rate: '1'};
	cityLocation['Milan'] = {latitude: '45.630439', longitude: '8.723443', threestar: '66', fourstar: '70', fivestar: '84', normal: '13', excellent: '18', premium: '23', currency: 'EUR', rate: '1'};
	cityLocation['Moscow'] = {latitude: '55.973535', longitude: '37.411747', threestar: '4000', fourstar: '4600', fivestar: '5400', normal: '900', excellent: '1300', premium: '1700', currency: 'RUB', rate: '63.628'};
	cityLocation['Oslo'] = {latitude: '60.197529', longitude: '11.102411', threestar: '730', fourstar: '850', fivestar: '980', normal: '200', excellent: '270', premium: '330', currency: 'NOK', rate: '9.0955'};
	cityLocation['Paris'] = {latitude: '49.007867', longitude: '2.577867', threestar: '63', fourstar: '76', fivestar: '88', normal: '14', excellent: '18', premium: '22', currency: 'EUR', rate: '1'};
	cityLocation['Prag'] = {latitude: '50.105156', longitude: '14.262816', threestar: '1500', fourstar: '1700', fivestar: '2000', normal: '270', excellent: '400', premium: '500', currency: 'CZK', rate: '27.0217'};
	cityLocation['Reykjavik'] = {latitude: '64.131208', longitude: '-21.937714', threestar: '10000', fourstar: '11000', fivestar: '12000', normal: '2700', excellent: '3300', premium: '4200', currency: 'ISK', rate: '118.663'};
	cityLocation['Riga'] = {latitude: '56.922786', longitude: '23.975219', threestar: '45', fourstar: '58', fivestar: '70', normal: '12', excellent: '18', premium: '22', currency: 'EUR', rate: '1'};
	cityLocation['Rome'] = {latitude: '41.799943', longitude: '12.244801', threestar: '59', fourstar: '70', fivestar: '85', normal: '14', excellent: '19', premium: '24', currency: 'EUR', rate: '1'};
	cityLocation['Stockholm'] = {latitude: '59.649522', longitude: '17.924722', threestar: '750', fourstar: '870', fivestar: '1000', normal: '180', excellent: '240', premium: '320', currency: 'SEK', rate: '9.6254'};
	cityLocation['StPetersburg'] = {latitude: '59.801933', longitude: '30.274456', threestar: '3700', fourstar: '4400', fivestar: '5400', normal: '760', excellent: '950', premium: '1460', currency: 'RUB', rate: '63.628'};
	cityLocation['Tallinn'] = {latitude: '59.416005', longitude: '24.808368', threestar: '57', fourstar: '62', fivestar: '75', normal: '12', excellent: '14', premium: '20', currency: 'EUR', rate: '1'};
	cityLocation['Turin'] = {latitude: '45.195260', longitude: '7.649079', threestar: '61', fourstar: '73', fivestar: '88', normal: '15', excellent: '19', premium: '23', currency: 'EUR', rate: '1'};
	cityLocation['Vienna'] = {latitude: '48.116987', longitude: '16.566965', threestar: '64', fourstar: '78', fivestar: '90', normal: '18', excellent: '26', premium: '35', currency: 'EUR', rate: '1'};
	cityLocation['Warsaw'] = {latitude: '52.168619', longitude: '20.971443', threestar: '300', fourstar: '340', fivestar: '410', normal: '71', excellent: '102', premium: '133', currency: 'PLN', rate: '4.4217'};
	cityLocation['Zagreb'] = {latitude: '45.733874', longitude: '16.060469', threestar: '450', fourstar: '540', fivestar: '630', normal: '90', excellent: '136', premium: '180', currency: 'HRK', rate: '7.5327'};
	cityLocation['Zurich'] = {latitude: '47.460172', longitude: '8.554473', threestar: '83', fourstar: '96', fivestar: '110', normal: '24', excellent: '32', premium: '39', currency: 'CHF', rate: '1.0225'};
	
	var pi = Math.PI;
	var radius = 6378.1;
    var distance = 0.00;
	
	//To check if the number of people is empty and validate it.
    if(num == "" || num == null) {
		
		error = error + alerttext101;
		
	}
    else {
    	
    	if(!(num.match(/\D/) == null)) {
    		
    		error = error + alerttext102;
    		
    	}
    	
    }
	
    //To check if the duration is empty and validate it.
    if(dur == "" || dur == null) {
		
		error = error + alerttext201;
		
	}
    else {
    	
    	if(!(dur.match(/\D/) == null)) {
    		
    		error = error + alerttext202;
    		
    	}
    	
    }
    
    //To check if the place of departure is empty and validate it.
    var z = 0;
    
    for(var i = 1; i < form.from.options.length; i++) {
    	
    	if(form.from.options[i].selected) {
    		
    		z = i;
    		
    	}
    	
    }
    
    if (z == 0) {
    	
    	error = error + alerttext301;
    	
    }
    
    //To check if the place of departure is empty and validate it.
    z = 0;
    
    for(i = 1; i < form.to.options.length; i++) {
    	
    	if(form.to.options[i].selected) {
    		
    		z = i;
    		
    	}
    	
    }
    
    if (z == 0) {
    	
    	error = error + alerttext401;
    	
    }
    
  //To check if the hotel type is empty and validate it. If valid, get the value.
    if(!(form.hoteltype[0].checked || form.hoteltype[1].checked || form.hoteltype[2].checked)) {
    	
    	error = error +alerttext501;
    	
    }
    else {
    	
    	//Get the value of hotel type.
    	for(i = 0; i < h.length; i++) {
    		
    		if(h[i].checked) {
    			
    			htl = h[i].value;
    			
    		}
    		
    	}
    	
    }
    
    //To check if the restaurant type is empty and validate it. If valid, get the value.
    if(!(form.mealtype[0].checked || form.mealtype[1].checked || form.mealtype[2].checked)) {
    	
    	error = error +alerttext601;
    	
    }
    else {
    	
    	//Get the value of restaurant type.
    	for(i = 0; i < m.length; i++) {
    		
    		if(m[i].checked) {
    			
    			meal = m[i].value;
    			
    		}
    		
    	}
    	
    }
    
  //Invalid cautions or result display.
	if(error != "") {
		
		//Error message.
		var errorText = "Sorry, you have errors below :\n";
		errorText = errorText + error;
		window.alert(errorText);
		return false;
		
	}
	else {
		
		var laStart = cityLocation[start].latitude * pi / 180;
		var loStart = cityLocation[start].longitude * pi / 180;
		var laEnd = cityLocation[end].latitude * pi / 180;
		var loEnd = cityLocation[end].longitude * pi / 180;
		distance = radius * Math.acos(Math.cos(laStart) * Math.cos(laEnd) * Math.cos(loEnd - loStart) + Math.sin(laStart) * Math.sin(laEnd));
		
		display = "Transportation fee : " + "\n";
		
		if(distance <= 200) {
			
			rail = distance * 0.3 * num * 2;
			railFixed = rail.toFixed(2);
			display = display + railFixed + " EUR by ICE" + "\n" + "Since the distance is too near (less than 200 km), travelling by air is not recommended!" + "\n\n";
			
		}
		else if(distance <= 500) {
			
			rail = distance * 0.3 * num * 2;
			air = (distance * 0.2 + 60) * num * 2;
			railFixed = rail.toFixed(2);
			airFixed = air.toFixed(2);
			display = display + railFixed + " EUR by ICE" + "\n" + airFixed + " EUR by air." + "\n\n";
			
		}
		else {
			
			air = (distance * 0.2 + 60) * num * 2; 
			airFixed = air.toFixed(2);
			display = display + airFixed + " EUR by air" + "\n" + "Since the distance is too far (more than 500 km), travelling by rail is not recommended!" + "\n\n";
			
		}
		
		if(htl == "threestar") {
			
			hotel = cityLocation[end].threestar;
			
		}
		else if(htl == "fourstar") {
			
			hotel = cityLocation[end].fourstar;
			
		}
		else {
			
			hotel = cityLocation[end].fivestar;
			
		}
		
		if(meal == "normal") {
			
			food = cityLocation[end].normal;
			
		}
		else if(meal == "excellent") {
			
			food = cityLocation[end].excellent;
			
		}
		else {
			
			food = cityLocation[end].premium;
			
		}
		
		esti = (parseFloat(hotel) + parseFloat(food) * 2) * num * dur;
		estiFixed = esti.toFixed(2);
		
		display = display + "Basic Cost (including hotel and meal costs): " + "\n" + estiFixed + " " + cityLocation[end].currency;
		esti_EUR = esti / cityLocation[end].rate;
		estiFixed_EUR = esti_EUR.toFixed(2);
		
		if(cityLocation[end].currency != "EUR") {
			
			display = display + " (equal to " + estiFixed_EUR + " EUR)."
			display = display + "\n" + "To get a reasonable price of the currency you want, purchasing the currency in a bank before departure is recommended.";
			
		}
		
		if(railFixed >= airFixed) {
			
			estiFixed_EUR = parseFloat(estiFixed_EUR) + parseFloat(railFixed);
			
		}
		else {
			
			estiFixed_EUR = parseFloat(estiFixed_EUR) + parseFloat(airFixed);
			
		}
		
		estiFixed_EUR = estiFixed_EUR.toFixed(2);
		budL = estiFixed_EUR * 1.2;
        budH = estiFixed_EUR * 1.5;
        budLFixed = budL.toFixed(2);
        budHFixed = budH.toFixed(2);
		
		display = display + "\n\n" + "Total: " + "\n" + estiFixed_EUR + " EUR.";
		display = display + "\n" + "Since the cost of sightseeing is not considered, we recommend you to set your budget in the range of " + budLFixed + " EUR to " + budHFixed + " EUR.\n\n" + "Thank you for using our service."
		
		document.getElementById("calcuResult").value = display;
		
	}
	
	return true;
	
}