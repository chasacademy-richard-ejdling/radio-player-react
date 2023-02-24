import * as React from 'react';
import RadioChannel from "./RadioChannel";

const url = 'https://api.sr.se/api/v2/channels?format=json&size=100'

function channelsReducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, data: action.payload, fetched: true, isError: false };
    case 'FETCH_FAILURE':
      return { ...state, fetched: true, isError: true }
  }
}

function App() {
  const [channels, dispatchChannels] = React.useReducer(channelsReducer, { data: {}, fetched: false, isError: false })

  React.useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(result => {
        dispatchChannels({ type: 'FETCH_SUCCESS', payload: result })
      })
      .catch(() => { dispatchChannels({ type: 'FETCH_FAILURE' }) })
  }, [])

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen'>
      {channels.fetched ?
        <RadioChannel data={channels.data.channels} channelNames={['P1', 'P2', 'P4 Stockholm']} /> : (
          channels.isError ? <RadioChannel channelNames='error' /> : <RadioChannel channelNames='loading' />
        )}
    </div>
  )
}

export default App