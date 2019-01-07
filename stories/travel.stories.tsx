import { storiesOf } from '@storybook/react'
import * as React from 'react'
import DEVICE_QUERIES from './lib/devices'
import destinations, { Destination } from './lib/travel/destinations'
import { mediaSetting, WithResponsiveProps } from '../src'

interface BaseComponent {
  className?: string
  style?: { [key: string]: string }
}

interface DetailsComponent extends BaseComponent {
  destination: Destination
}

interface DestinationList extends BaseComponent {
  onSelect: (i: number) => void
  options: Destination[]
  selection: number
}

interface TravelProps {
  destination: number
  setDestination: (destination: number) => void
}

interface SizeProp {
  size: string
}

const SIZE = { SMALL: 'small', MEDIUM: 'medium', LARGE: 'large' }

const withSize = WithResponsiveProps<SizeProp>([
  mediaSetting(DEVICE_QUERIES.PHONE, { size: SIZE.SMALL }),
  mediaSetting(DEVICE_QUERIES.TABLET, { size: SIZE.MEDIUM }),
  mediaSetting(DEVICE_QUERIES.MONITOR, { size: SIZE.LARGE })
])

/*
const withDestinations = () => {
    const [destination, setDestination] = useState(0);

    return { destination, setDestination };
};
*/

const DestinationDetails: React.SFC<DetailsComponent> = ({ className, destination, style }) => (
  <div className={className} style={style}>
    <h1>{destination.title}</h1>
    <img src={destination.image} />
    {destination.description}
  </div>
)

const DestinationList: React.SFC<DestinationList> = ({ className, onSelect, options, style }) => (
  <ul className={className} style={style}>
    {options.map((option, i) => (
      <li key={i} onClick={() => onSelect(i)}>
        {option.title}
      </li>
    ))}
  </ul>
)

const MonitorTravel: React.SFC<TravelProps> = ({ destination, setDestination }) => (
  <div className='flex'>
    <DestinationDetails destination={destinations[destination]} />
    <DestinationList options={destinations} onSelect={setDestination} selection={destination} />
  </div>
)

const Travel: React.SFC<SizeProp> = ({ size }) => {
  const [destination, setDestination] = React.useState(0)

  if (size === SIZE.LARGE) {
    return <MonitorTravel destination={destination} setDestination={setDestination} />
  }

  return <div>{`Can't render for this device`}</div>
}

const TravelStory = withSize<{}>(Travel)

// eslint-disable-next-line no-undef
storiesOf('Travel stories', module).add('size prop', () => <TravelStory />)
