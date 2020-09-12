import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    status: 'off',
    time: 1200,
    timer: null,
  };

  formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = time % 60 >= 10 ? time % 60 : `0${time % 60}`;
    return `${min}:${sec}`;
  }

  step = () => {
    const { time, status } = this.state;

    if (time > 1) {
      this.setState({ time: time - 1 });
    } else {
      if (status === 'work') {
        this.setState({
          status: 'rest',
          time: 600,
        });
        this.playBell();
      } else if (status === 'rest') {
        this.setState({
          status: 'work',
          time: 1200,
        });
        this.playBell();
      }
    }
  };

  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
      time: 1200,
      status: 'work',
    });
  };

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      time: 0,
      status: 'off',
    });
  };

  closeApp = () => {
    window.close();
  };

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  render() {
    const { status, time } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === 'off' && (
          <div>
            <p>
              According to optometrists in order to save your eyes, you should
              follow the 20/20/20. It means you should to rest your eyes every
              20 minutes for 20 seconds by looking more than 20 feet away.
            </p>
            <p>
              This app will help you track your time and inform you when it's
              time to rest.
            </p>
            <button className='btn' onClick={this.startTimer}>
              Start
            </button>
          </div>
        )}
        {status === 'work' && <img src='./images/work.png' />}
        {status === 'rest' && <img src='./images/rest.png' />}
        {status !== 'off' && (
          <div className='timer'>{this.formatTime(time)}</div>
        )}
        {status !== 'off' && (
          <button className='btn' onClick={this.stopTimer}>
            Stop
          </button>
        )}
        <button className='btn btn-close' onClick={this.closeApp}>
          X
        </button>
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
