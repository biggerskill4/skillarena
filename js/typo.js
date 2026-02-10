// const text = "Lorem Ipsum is simply dummy text of the printing and types hello world typing test sliding effect";
// const track = document.getElementById('text-track');
// const input = document.getElementById('hidden-input');
// const timerEl = document.getElementById('timer');

// let timeLeft = 60;
// let started = false;

// // Har character ko span mein load karna
// text.split('').forEach(char => {
//     const span = document.createElement('span');
//     span.innerText = char;
//     span.classList.add('char');
//     track.appendChild(span);
// });

// const charSpans = track.querySelectorAll('.char');

// input.addEventListener('input', () => {
//     if (!started) {
//         startTimer();
//         started = true;
//     }

//     const typedValues = input.value.split('');
//     const currentPos = typedValues.length;

//     charSpans.forEach((span, index) => {
//         const typedChar = typedValues[index];

//         if (typedChar == null) {
//             span.className = 'char'; // Untyped
//         } else if (typedChar === span.innerText) {
//             span.className = 'char correct';
//         } else {
//             span.className = 'char wrong'; // Only wrong ones turn red
//         }
//     });

//     // SLIDING LOGIC: Har character ke sath text ko peeche move karna
//     // 18px ek average character width hai, isse adjust kar sakte hain
//     const offset = 40 - (currentPos * 18.5); 
//     track.style.left = offset + "px";
// });

// function startTimer() {
//     const timer = setInterval(() => {
//         timeLeft--;
//         timerEl.innerText = `Time: ${timeLeft}s`;
//         if (timeLeft <= 0) {
//             clearInterval(timer);
//             input.disabled = true;
//         }
//     }, 1000);
// }

// // Focus fix
// document.querySelector('.sliding-window').addEventListener('click', () => input.focus());