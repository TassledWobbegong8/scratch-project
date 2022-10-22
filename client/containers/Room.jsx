import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Chatbox from '../components/Chatbox';
import FlashContainer from '../containers/FlashContainer';
import DocumentEditor from '../components/DocumentEditor';
import $ from 'jquery';

function Room() {
  const [hostInfo, setHost] = useState({});
  const [hostView, setHostView] = useState(false);
  const [info, setInfo] = useState({});
  const [imgUrl, setImgUrl] = useState('');
  const [username, setUsername] = useState('');

  const state = useLocation().state;

  console.log('state', useLocation());

  // save roomdoc in cookie for retrieval after redirect
  const saveRoom = async () => {
    console.log('saving room');
    const saved = await fetch('/api/rooms/cookie', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ room: info._id }),
    }).then((response) => response.json());
    console.log(saved);
  };

  const getRoom = async () => {
    console.log('getting room');
    const room = await fetch('/api/rooms/cookie').then((response) =>
      response.json()
    );
    console.log(room);
    setInfo(room);
  };
  
  const fetchUsername = async () => {
    const userData = await fetch('/api/users').then(response => response.json());
    console.log('profile user data', userData);
    setUsername(userData.username);
  };
  fetchUsername();

  // fetch host if info doesn't already exist
  const fetchHost = async () => {
    const details = await fetch('/api/users').then((response) =>
      response.json()
    );
    setHost(details);
    // if room host is the same as the current user
    if (!info.host._id || info.host._id === details._id) setHostView(true);
  };

  // update room info
  useEffect(() => {
    // if state exists then set info
    if (state) setInfo(state.info);
    console.log('state', state);
    // if info is null (no state) then retrieve room info
    if (!state) getRoom();
  }, [hostView]);

  // set host and set cookie for room
  useEffect(() => {
    if (info.host) fetchHost();
    console.log('info', info);
    // if info was read from state then save id
    if (state) saveRoom();
    console.log('hostview', hostView);
  }, [info]);

  // js for collapsible button
  useEffect(() => {
    const coll = document.getElementsByClassName('collapsible');
    
    for (let i = 0; i < coll.length; i++) {
      console.log(coll[i].getAttribute('listener'));
      if(coll[i].getAttribute('listener') !== 'true') {
        coll[i].addEventListener('click', function() {
          this.classList.toggle('active');
          const content = this.nextElementSibling;
          if (content.style.maxHeight){
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + 'px';
          }
        });
      }
    }
  }, []);

  // js for setting a background image of the canvas
  useEffect(() => {
    const fileReader = new FileReader();
    const input = document.getElementById('blackBoardUploadButton');
    input.addEventListener('change', function(e) {
      console.log(fileReader);
      fileReader.onload = (e) => {setImgUrl(e.target.result);};
      fileReader.readAsDataURL(this.files[0]);
    });
    
  }, []);

  // blackboard js
  useEffect(() => {
    //https://codepen.io/aundreyd/pen/WxYNeV
    let color = $('.selected').css('background-color');
    const $canvas = $('canvas');
    const context = $canvas[0].getContext('2d');
    let lastEvent;
    let mouseDown = false;
    
    //When clicking on control list items
    $('.controls').on('click', 'li', function() {
      //Deselect sibling elements
      $(this).siblings().removeClass('selected');
      //Select clicked element
      $(this).addClass('selected');
      //cache current color
      color = $(this).css('background-color');
    });
    
    //When "New Color" is pressed
    $('#revealColorSelect').click(function() {
      //Show color select or hide the color select
      changeColor();
      $('#colorSelect').toggle();
    });
    
    //update the new color span
    function changeColor() {
      const r = $('#red').val();
      const g = $('#green').val();
      const b = $('#blue').val();
      $('#newColor').css('background-color', 'rgb(' + r + ',' + g + ', ' + b + ')');
    }
    
    //When color sliders change
    $('input[type=range]').change(changeColor);
    
    //When "Add Color" is pressed
    $('#addNewColor').click(function() {
      //Append the color to the controls ul
      var $newColor = $('<li></li>');
      $newColor.css('background-color', $('#newColor').css('background-color'));
      $('.controls ul').append($newColor);
      //Select the new color
      $newColor.click();
    });
    
    //On mouse events on the canvas
    $canvas.mousedown(function(e) {
      lastEvent = e;
      mouseDown = true;
    }).mousemove(function(e) {
      //Draw lines
      if (mouseDown) {
        context.beginPath();
        context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        context.strokeStyle = color;
        context.stroke();
        lastEvent = e;
      }
    }).mouseup(function() {
      mouseDown = false;
    }).mouseleave(function() {
      $canvas.mouseup();
    });
  }, []);

  return (
    <div className="room-page">
      <div id="room-page-info">
        <h2>Host: {info.host && (info.host.nickname || hostInfo.nickname)} </h2>
      </div>
      <button type="button" className="collapsible">Blackboard</button>
      <div className="content">
        <div>
          {/* Canvas width is 90% of the screen's width minus 100px. The height is 60% of the canvas width*/}
          <canvas style={{backgroundImage: `url(${imgUrl})`}} width={(window.innerWidth * 0.90) - 100} height={((window.innerWidth * 0.90) - 100) * .6}></canvas>
          <div className="controls">
            <div style={{paddingBottom: '50px'}}>
              <ul>
                <li className="red selected"></li>
                <li className="blue"></li>
                <li className="yellow"></li>
              </ul>
              <button id="revealColorSelect" className="buttonDesign">New Color</button>
            </div>
            <div id="colorSelect">
              <span id="newColor"></span>
              <div className="sliders">
                <p>
                  <label htmlFor="red">Red</label>
                  <input id="red" name="red" type="range" min='0' max='255' defaultValue='0'/>
                </p>
                <p>
                  <label htmlFor="green">Green</label>
                  <input id="green" name="green" type="range" min='0' max='255' defaultValue='0'/>
                </p>
                <p>
                  <label htmlFor="blue">Blue</label>
                  <input id="blue" name="blue" type="range" min='0' max='255' defaultValue='0'/>
                </p>
              </div>
              <div>
                <button id="addNewColor">Add Color</button>
              </div>
            </div>
            <div>
              <label className="uploadFileLabel buttonDesign" htmlFor="">
                <input className="buttonDesign" type='file' id='blackBoardUploadButton'/>
                Upload File
              </label>
            </div>
          </div>
        </div>
      </div>
      <FlashContainer />
      <DocumentEditor hostView={hostView}/>
      <Chatbox username={username} roomInfo={state.info}/>
    </div>
  );
}

export default Room;
