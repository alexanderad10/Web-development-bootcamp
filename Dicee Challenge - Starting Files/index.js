var randomNumber1 = Math.floor(Math.random() * 6) + 1;
console.log("Number1: " + randomNumber1);
document.getElementsByClassName("img1")[0].src="./images/dice" + randomNumber1 + ".png";
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
console.log("Number2: " + randomNumber2);
document.getElementsByClassName("img2")[0].src="./images/dice" + randomNumber2 + ".png";
if(randomNumber1 > randomNumber2){
    document.querySelector("h1").textContent = "Player 1 Wins!";
}
else if(randomNumber1 < randomNumber2) {
    document.querySelector("h1").textContent = "Player 2 Wins!";
}
else{
    document.querySelector("h1").textContent = "Draw";
}