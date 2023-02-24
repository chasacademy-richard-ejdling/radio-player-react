export default function RadioChannel({
    data = [{
        color: 'F0F0F0',
        image: 'https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png',
        name: '',
        liveaudio: {
            url: ''
        },
        id: 74
    }],
    channelNames
}) {

    let channels = {}

    if (channelNames === 'loading') {
        data.name = 'Loading...'
        channels = data
    } else if (channelNames === 'error') {
        data.name = 'Error'
        channels = data
    } else {
        const dataNames = data.map(item => item.name)
        const index = channelNames.map(name => dataNames.indexOf(name)).filter(index => index != -1)
        channels = index.map(item => data[item])
    }

    return (
        <ul>
            {channels.map(channel => {
                return (
                    <li  key={channel.id} className="flex items-center h-60 w-fit" style={{ backgroundColor: `#${channel.color}` }}>
                        <img className="h-full" src={channel.image} alt={`${channel.name} logga`} />
                        <div className="flex flex-col justify-evenly h-full pr-8 text-5xl font-semibold">
                            <h1>{channel.name}</h1>
                            <audio src={channel.liveaudio.url} type="audio/mpeg" controls></audio>
                        </div>
                    </li>
                )

            })}
        </ul>
    )
}