function updateDetails() {

	//getting public address
	var req1 = new XMLHttpRequest();
	req1.onreadystatechange = function (){
		if(req1.status==200 && req1.readyState==4) 
			document.getElementById('pub_add').innerHTML = req1.responseText;
	}
	req1.open('GET', "http://localhost:3001/getPublic", true);
	req1.send();

	//getting balance
	var req2 = new XMLHttpRequest();
	req2.onreadystatechange = function (){
		if(req2.status==200 && req2.readyState==4) {
			var data = JSON.parse(req2.responseText);
			document.getElementById('balance').innerHTML = data.balance;
		}
	}
	req2.open('GET', "http://localhost:3001/balance", true);
	req2.send();

	//get transaction pool
	var req3 = new XMLHttpRequest();
	req3.onreadystatechange = function (){
		if(req3.status==200 && req3.readyState==4) {
			var data = JSON.parse(req3.responseText);
			if(data.length>0)
				document.getElementById('transactionPool').style.display = 'none';	
			var table = document.getElementById('txPool');			
			for(var i=0; i<data.length; i++) {
				var row = table.insertRow();

				var txIns = data[i]['txIns'][0];
				var txOuts = data[i]['txOuts'];
				var id = data[i]['id'];

				var c=row.insertCell(0);
				c.innerHTML = (id);

				var c=row.insertCell(1);
				
				var temp = "To&nbspAddress:&nbsp".bold().fontcolor("green") + data[i]['txOuts'][0].address;
				temp = temp.concat("<br>Amount: ".bold().fontcolor("green") + data[i]['txOuts'][0].amount);
				
				temp = temp.concat("<br><br>To&nbspAddress:&nbsp".bold().fontcolor("green") + data[i]['txOuts'][1].address);
				temp = temp.concat("<br>Amount: ".bold().fontcolor("green") + data[i]['txOuts'][1].amount);
				c.innerHTML = (temp);

				//var c=row.insertCell(2);
				//c.innerHTML = JSON.stringify(id);

			}
		}
	}
	req3.open('GET', "http://localhost:3001/transactionPool", true);
	req3.send();
}


var request1 = new XMLHttpRequest();
request1.onreadystatechange = function (){
	if (request1.status == 200  && request1.readyState == 4) {
		console.log('Transaction Sent!!');
		updateDetails();
	}
}

var request2 = new XMLHttpRequest();
request2.onreadystatechange = function (){
	if (request2.status == 200  && request2.readyState == 4) {
		console.log('Block Mined!!');
		updateDetails();
	}
}

function send() {
	var receiverAddress = document.getElementById('receiverAddress').value;
	var amount = document.getElementById('amount').value;

	var data = {
		"address": receiverAddress,
		"amount": amount
	}

	request1.open('POST', "http://localhost:3001/sendTransaction", true);
	request1.setRequestHeader('Content-type', 'application/json');
	request1.send(JSON.stringify(data));
}

function mine() {
	request2.open('POST', "http://localhost:3001/mineBlock", true);
	request2.send();
}


$(function() {
  $(window).load(function() {
  	updateDetails();
  });
});
