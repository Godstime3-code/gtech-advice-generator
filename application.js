"use strict"
let quoteText = document.querySelector('.quote');
let quoteAuthor = document.querySelector('.author-quote');
let quoteBtn = document.querySelector('.new-quote');
let copyIcon = document.querySelector('.copy');
let voiceIcon = document.querySelector('.icon-voice');

const quotes = [
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: 'Never give up because you never know if the next try is going to be the one that works',
    author: 'Mary Kay Ash'
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Do something today that your future self will thank you for.", author: "Unknown" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Keep your eyes on the stars, and your feet on the ground.", author: "Theodore Roosevelt" },
  { text: "You are never too young to lead and never too old to learn.", author: "Unknown" },
  { text: "The best way to predict your future is to create it.", author: "Abraham Lincoln" },
  { text: "Do not let what you cannot do interfere with what you can do.", author: "John Wooden" },
  { text: "You must do the thing you think you cannot do.", author: "Eleanor Roosevelt" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "You don't have to see the whole staircase, just take the first step.", author: "Martin Luther King Jr." },
  { text: "Excellence is not a destination; it is a continuous journey that never ends.", author: "Brian Tracy" },
  { text: "You are stronger than you seem, braver than you believe, and smarter than you think.", author: "Christopher Robin" }
];

let modalCopy =  document.querySelector('.modal-copy')


function getRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);

  return quotes[randomIndex]
}

let quote;
function renderQuote(){
  quote = getRandomQuote();
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = quote.author;
  changeBg();
}

async function copyText(text){
  try{
      await navigator.clipboard.writeText(text);
      modalCopy.classList.add('animate');
    
    setTimeout(function() {
      
      modalCopy.classList.add('animate-slideUp')
    },3000);
    modalCopy.classList.remove('animate-slideUp')
  }catch(err){
    console.error('Failed to copy text', err)
  }
}

copyIcon.addEventListener("click",()=>{
    const textToCopy = quote.text;
    copyText(textToCopy);

    if(window.speechSynthesis !== undefined){
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = 'Quote is now available on your clipboard';
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.voice = synth.getVoices()[0];
      synth.speak(utterance);
  
      console.log(synth.speaking? 'yes': 'no')
  }else{
      window.alert('Please your Browser Do not Support Speech Synthesis API')
  }
    
} )

function changeBg(){
  let r = Math.floor(Math.random() * 255 + 1);
  let g = Math.floor(Math.random() * 255 + 1);
  let b = Math.floor(Math.random() * 255 + 1);
  
  const body = document.body;
  body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
}

setInterval(renderQuote, 10000);

function readText(textToRead, author){
    if(window.speechSynthesis !== undefined){
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `${textToRead} by ${author}`;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.voice = synth.getVoices()[0];
      synth.speak(utterance);
  
      console.log(synth.speaking? 'yes': 'no')
  }else{
      window.alert('Please your Browser Do not Support Speech Synthesis API')
  }
}

voiceIcon.addEventListener('click', ()=>{
  const textToRead = quote.text;
  const authorToRead = quote.author;
  readText(textToRead, authorToRead);
})
