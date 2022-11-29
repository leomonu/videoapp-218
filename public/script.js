const socket = io("/")
var peer = new Peer(undefined,{
  path:"/peerjs",
  host:"/",
  port:"443"

})
const  user = prompt("Enter Your Name")
const myVideo = document.createElement("video")
myVideo.muted = true
var myStream
navigator.mediaDevices.getUserMedia({

  audio:true,video:true
})
.then((stream)=>{
  myStream = stream
  console.log(stream)
  addVideoStream(myVideo,stream)
  socket.on("user-connnected",(userId)=>{
    connectToNewUser(userId,stream)
  })
  peer.on("call",(call)=>{
    call.answer(stream)
    const video =document.createElement("video")
    call.on("stream",(userVideoStream)=>{
      addVideoStream(video,userVideoStream)
    })
  })
})
// we r using peer.js library
function connectToNewUser(userId,stream){
  const call = peer.call(userId,stream)
  var video = document.createElement("video")
  call.on("stream",(userVideoStream)=>{
    addVideoStream(video,userVideoStream)
  })
}
function addVideoStream(video,stream){
  video.srcObject = stream
  video.addEventListener("loadedmetadata",()=>{
    video.play()
    $("#video_grid").append(video)
  })
}




$(function () {

    $("#show_chat").click(function () {
      $(".left-window").css("display", "none");
      $(".right-window").css("display", "block");
      $(".header_back").css("display", "block");
    });
    $(".header_back").click(function () {
        $(".left-window").css("display", "block");
        $(".right-window").css("display", "none");
        $(".header_back").css("display", "none");
      })
$("#send").click(function(){
    if($("#chat_message").val().length!==0){
        socket.emit("message",$("chat_message").val())
        $("chat_message").val()="f"
    }
})
  });

  $("#mute_button").click(function(){
    const enable = myStream.getAudioTracks([])
  })
  $("#stop_video").click(function(){
    
  })

  peer.on("open",(id)=>{
    socket.emit("join-room",ROOM_ID,id,user)
  })
  socket.on("createMessage",(message,userName)=>{
    $(".messages").append(`
      <div class = "message">
        <b>
          <i class = "far fa-user-circle"></i> <span>${
            userName === user?"me":userName
          }</span>
        </b>
        <span>${message}</span>
      </div>
    `)

  })


  // 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