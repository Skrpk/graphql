import React, { Component } from 'react';

import './Events.css';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

import AuthContext from '../context/auth-context';

import EventList from '../components/Events/EventList';

class EventsPage extends Component {
  state = {
    creating: false,
    events: []
  }

  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.titleEl = React.createRef();
    this.descEl = React.createRef();
    this.priceEl = React.createRef();
    this.dateEl = React.createRef();
  }

  componentDidMount() {
    this.fetchEvents();
  }

  createEventHandler = () => {
    this.setState({ creating: true });
  }

  modalConfirmHandler = () => {
    this.setState({ creating: false });

    const title = this.titleEl.current.value;
    const desc = this.descEl.current.value;
    const price = +this.priceEl.current.value;
    const date = this.dateEl.current.value;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      desc.trim().length === 0 ||
      date.trim().length === 0
    ) {
      return;
    }

    const requestBody = {
      query: `
        mutation {
          createEvent(eventInput: {title: "${title}", description: "${desc}", price: ${price}, date: "${date}"}) {
            title
            description
            date
            price
          }
        }
      `
    };

    const token = this.context.token;

    fetch('http://localhost:4000/graphql', {
      method: 'post',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!', res);
        }

        return res.json();
      })
      .then(resBody => {
        this.fetchEvents();
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchEvents = () => {
    const requestBody = {
      query: `
        query {
          events {
            title
            description
            date
            id
            price
            user {
              id
              email
            }
          }
        }
      `
    };

    const token = this.context.token;

    fetch('http://localhost:4000/graphql', {
      method: 'post',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!', res);
        }

        return res.json();
      })
      .then(resBody => {
        const { events } = resBody.data;
        this.setState({ events });
      })
      .catch(err => {
        console.log(err);
      });
  }

  modalCancelHandler = () => {
    this.setState({ creating: false });
  }

  render() {
    return (
      <React.Fragment>
        { this.state.creating && <Backdrop /> }
        { this.state.creating &&
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleEl} />
              </div>
              <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea rows="4" id="description" ref={this.descEl} />
              </div>
              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={this.priceEl} />
              </div>
              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" ref={this.dateEl} />
              </div>
            </form>
          </Modal>
        }


        { this.context.token && (
          <div className="events-control">
            <p>Share your own events!</p>
            <button className="btn" onClick={this.createEventHandler}>Create Event</button>
          </div>
        )}
        <EventList
          events={this.state.events}
          authUserId={this.context.userId}
        />
      </React.Fragment>
    );
  }
}

export default EventsPage;
