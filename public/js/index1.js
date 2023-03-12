
 var typingEffect = new Typed(".multitext",{
     strings : ["Website-Design","Logo-Design","UI/UX-Design",] ,
     loop : true,
     typeSpeed : 80,
     backSpeed : 80,
     backDelay : 1500
     
 })

 const value = document.querySelectorAll('.null');
 const interval = 10;

 value.forEach((value) =>{
    let startvalue = 0;
    let endvalue = parseInt(value.getAttribute("data-target"));

    let duration = Math.floor(interval/endvalue);
    let counter = setInterval(function(){
        startvalue += 5;
        value.textContent = startvalue;

        if(startvalue == endvalue){
            clearInterval(counter);
        }

    },duration);
 });

 const valuedisplay = document.querySelectorAll('.nul');
 const inter = 1;

 valuedisplay.forEach((valuedisplay) =>{
    let startvalue = 0;
    let endvalue = parseInt(valuedisplay.getAttribute("data-counter"));

    let duration = Math.floor(intervaluedisplay);
    let counter = setInterval(function(){
        startvalue += 1;
        valuedisplay.textContent = startvalue;

        if(startvalue == endvalue){
            clearInterval(counter);
        }

    },duration);
 });

 function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }