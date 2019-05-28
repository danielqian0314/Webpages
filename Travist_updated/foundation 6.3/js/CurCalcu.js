/**
 * 
 */

function calcu() {
	
	var form = document.forms[0];
	var error = "";
	
	var amount = form.currency.value;
	var buy = form.buy.value;
	var sell = form.sell.value;
	
	var integer = 0;
	var decimal = 0;
	
	var alerttext701 = "Error 701: The input box cannot be empty!";
	var alerttext702 = "Error 702: Please input in the right form of xxx.xx!";
	var alerttext703 = "Error 703: Only digits and ONE decimal point is allowed!";
	
	var CurrencyRate = [];
	
	CurrencyRate['EUR'] = {rate: '1'};
	CurrencyRate['CHF'] = {rate: '1.0255'};
	CurrencyRate['CZK'] = {rate: '27.0217'};
	CurrencyRate['DKK'] = {rate: '7.4337'};
	CurrencyRate['GBP'] = {rate: '0.8503'};
	CurrencyRate['HRK'] = {rate: '7.5327'};
	CurrencyRate['HUF'] = {rate: '310.3997'};
	CurrencyRate['ISK'] = {rate: '118.663'};
	CurrencyRate['NOK'] = {rate: '9.0955'};
	CurrencyRate['PLN'] = {rate: '4.4217'};
	CurrencyRate['RUB'] = {rate: '63.628'};
	CurrencyRate['SEK'] = {rate: '9.6254'};
	
    if(amount == "" || amount == null) {
		
		error = error + alerttext701;
		
	}
    else {
    	
    	if(amount.length - amount.indexOf(".") != 3) {
    		
    		error = error + alerttext702;
    		
    	}
    	else {
    		
    		integer = amount.substring(0, amount.indexOf("."));
        	decimal = amount.substring(amount.indexOf(".") + 1);
        	
        	if(!(integer.match(/\D/) == null) || !(decimal.match(/\D/) == null)){
        		
        		error = error +alerttext703;
        		
        	}
    		
    	}
    	
    }
    
    if(error != "") {
		
		//Error message.
		var errorText = "Sorry, you have errors below :\n";
		errorText = errorText + error;
		window.alert(errorText);
		return false;
		
	}
    
    var result = parseFloat(amount) * parseFloat(CurrencyRate[sell].rate) / parseFloat(CurrencyRate[buy].rate);
    result = result.toFixed(2);
    var display = "Calculation result: \n" + amount + " " + buy + " = " + result + " " + sell;
    document.getElementById("calcuResult").value = display;
	
}