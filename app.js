var button=document.getElementById("next")
var user_input = document.getElementById("input_user")
button.addEventListener("click",function(){
    window.location.href = './game.html'
    localStorage.setItem('name',user_input.value)
})
var ways=document.getElementById("ways")
ways.addEventListener("click",function(){
    window.location.href = './inst.html'
})