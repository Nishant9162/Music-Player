console.log("Welcome to Music Player")

// Intiliaze the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
  {songName : "Let me Love You" , filePath:"songs/1.mp3" , coverPath:"cover/cover.png"},
  {songName : "Chand Chupa Badal Mai" , filePath:"songs/2.mp3" , coverPath:"cover/cover3.jpg"},
  {songName : "Maan Kyu Bheka re " , filePath:"songs/3.mp3" , coverPath:"cover/cover2.png"},
  {songName : "Maan Meri Jaan" , filePath:"songs/4.mp3" , coverPath:"cover/cover5.jpeg"},
  {songName : "Ram Siya Ram" , filePath:"songs/5.mp3" , coverPath:"cover/cover.png"},
  {songName : "Tere Hawaale" , filePath:"songs/6.mp3" , coverPath:"cover/cover2.png"},
  {songName : "Tu Hai To Mujhe Phir" , filePath:"songs/7.mp3" , coverPath:"cover/cover4.jpeg"},
  {songName : "Chand Taro Se Kaho" , filePath:"songs/8.mp3" , coverPath:"cover/cover3.jpg"},
  {songName : "Tera Chehra Jab Nazar Aaye" , filePath:"songs/9.mp3" , coverPath:"cover/cover4.jpeg"}

];

songItems.forEach((element , i)=>{
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// handle play/pause click.
  masterPlay.addEventListener('click' , ()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  }
  else{
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
});

// Listen to Events
audioElement.addEventListener('timeupdate' , ()=>{
  // update seekbar
  progress = parseInt((audioElement.currentTime/audioElement.duration)*  100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change' , ()=>{
     audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});

   const makeAllPlays = ()=>{
     Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
       element.classList.remove('fa-pause-circle');
       element.classList.add('fa-play-circle');
     })
   }

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click' , (e)=>{
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
  })
})

document.getElementById('next').addEventListener('click' , ()=>{
  if(songIndex>=8){
    songIndex=0;
  }
  else{
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex+1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click' , ()=>{
  if(songIndex<=0){
    songIndex=0;
  }
  else{
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex+1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
})
