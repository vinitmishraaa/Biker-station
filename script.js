const PLAYLIST_ID="PLOCzi8H64KuY";
const bg=document.getElementById("bg"), play=document.getElementById("play");
const prev=document.getElementById("prev"), next=document.getElementById("next");
const song=document.getElementById("song");
let player=null,ready=false,playing=false,playlistLoaded=false;

function clock(){document.getElementById("clock").textContent=new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"});}
clock();setInterval(clock,1000);

window.onYouTubeIframeAPIReady=()=>{
  player=new YT.Player("yt",{width:"2",height:"2",playerVars:{
    autoplay:0,controls:0,disablekb:1,fs:0,playsinline:1,rel:0
  },events:{onReady:ytReady,onStateChange:ytState,onError:ytError}});
};

function ytReady(){
  ready=true;
  // Explicitly load the playlist so nextVideo()/previousVideo() have a playlist.
  player.loadPlaylist({listType:"playlist",list:PLAYLIST_ID,index:0,startSeconds:0});
  setTimeout(()=>{
    try{player.setShuffle(true);playlistLoaded=true;}catch(e){}
  },1500);
}

function start(){
  bg.play().catch(()=>{});
  if(!ready){song.textContent="Loading YouTube…";playing=true;play.textContent="Ⅱ";return;}
  try{
    if(!playlistLoaded){
      player.loadPlaylist({listType:"playlist",list:PLAYLIST_ID,index:0,startSeconds:0});
      setTimeout(()=>{try{player.setShuffle(true);player.playVideo();}catch(e){}},900);
    }else{
      player.setShuffle(true);
      player.playVideo();
    }
    playing=true;play.textContent="Ⅱ";title();
  }catch(e){song.textContent="Tap Play again";}
}

function pause(){
  bg.pause();
  if(ready)try{player.pauseVideo()}catch(e){}
  playing=false;play.textContent="▶";
}

play.onclick=()=>playing?pause():start();

function changeTrack(direction){
  if(!ready)return;
  // The first click after loading is allowed to finish playlist initialization.
  try{
    player.setShuffle(true);
    if(direction>0) player.nextVideo();
    else player.previousVideo();
    bg.play().catch(()=>{});
    playing=true;play.textContent="Ⅱ";
    setTimeout(title,500);
  }catch(e){}
}

next.onclick=()=>changeTrack(1);
prev.onclick=()=>changeTrack(-1);

function ytState(e){
  if(e.data===YT.PlayerState.PLAYING){
    playing=true;play.textContent="Ⅱ";bg.play().catch(()=>{});title();
  }else if(e.data===YT.PlayerState.PAUSED){
    playing=false;play.textContent="▶";bg.pause();
  }
}

function title(){
  setTimeout(()=>{try{const t=player.getVideoData().title;if(t)song.textContent=t}catch(e){}},250);
}
function ytError(){song.textContent="YouTube playlist unavailable";}

document.getElementById("active").textContent=Math.floor(Math.random()*4)+1;
