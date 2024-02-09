import io from 'socket.io-client'

const button=document.querySelector('.button');
const  text=document.querySelector('.text');
const  messageblock=document.querySelector('.message');
console.log(button);
const socket=io();
const name=prompt("enter user name");


socket.emit('join',name);
socket.on('welcome',(mes)=>{
  if(name===null)return;
  let userelem=document.createElement('div');
   userelem.innerText=mes;
   userelem.className='rec';
   messageblock.appendChild(userelem)
})
socket.on('new-user joined',name=>
{
  if(name===null)return;
 let userelem=document.createElement('div');
  userelem.innerText=`${name} has joined the chat`;
  userelem.className='rec';
  userelem.style.backgroundColor='black';
  userelem.style.color='green';
 
  messageblock.appendChild(userelem);
});
button.addEventListener('click',()=>{
  if(text.value==='')return;
  socket.emit('send',text.value);
  let sender=document.createElement('div');
  sender.innerHTML=`<p><strong>You:</strong></p><p>${text.value}</p>`;
   sender.className='send';
   
   messageblock.appendChild(sender);
   text.value='';
})
socket.on('recieve',(message)=>{
  let userelem=document.createElement('div');
  userelem.innerHTML=`<p><strong>${message.user_name}</strong></p><p>${message.message}</p>`;
  userelem.className='rec';
  messageblock.appendChild(userelem);
})
socket.on('leave',user=>
{
  if(user===null)return ;

  let p=document.createElement('div');
  p.innerText=`${user} left the chat`;
  p.style.color='black';
  p.className='rec';
  p.style.backgroundColor='black';
  p.style.color='red';
  messageblock.appendChild(p);
})