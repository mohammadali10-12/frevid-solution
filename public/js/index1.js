
 var typingEffect = new Typed(".multitext",{
<<<<<<< HEAD
     strings : ["Website-Desing","Logo-Desing","UI/UX-Desing"] ,
=======
     strings : ["Website-Design","Logo-Design","UI/UX-Design"] ,
>>>>>>> a69cbd580e83763d404df80c56d6cc025359536c
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

//  const counters = document.querySelectorAll('.counter');
//  const speed = 100;

//  counters.forEach(counter => {
//     const updateCount = () =>{
//         const target = +counter.getAttribute('data-target');
//         const count = +counter.innerText;

//         const inc = target / speed;

//         console.log (count);

//         if (count < target) {
//             counter.innerText = count + inc;
//             setTimeout(updateCount, 1);
//         }
//         else{
//             count.innerText = target;
//         }
//     }
//     updateCount();
//  });