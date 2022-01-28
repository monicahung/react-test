import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';


const Channels = () => {
  const [show, setShow] = useState(false);
  const [channels, setChannels] = useState([]);
  const [newChannelVal, setNewChannelVal] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = (e) => {
    e.preventDefault();
    if (newChannelVal === '') {
      return;
    }
    setChannels([...channels, newChannelVal]);
    setNewChannelVal('');
  }

  return (
    <>
      <button onClick={handleShow} className="btn btn-primary"> Click me! </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Channels</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col"><ul>{channels.map(channel => <li>{channel}</li>)}</ul></div>
            <div className="col">
              <form onSubmit={handleSave}>
                <input type="text" onChange={e => setNewChannelVal(e.target.value)} value={newChannelVal} /><button type="submit">Save</button>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Channels;
