export interface Destination {
  image: string
  title: string
  description: string
}

const destinations: Destination[] = [
  {
    image: 'https://i.imgur.com/wwFNec3.jpg',
    title: 'Lake Tahoe',
    description: `Lake Tahoe is one of the prettiest places in California and Nevada. The deep, clear-water alpine lake is almost a mile high, sitting in a bowl of granite mountain peaks. It's is a great place to get away, whether you want to escape summer heat or a get some peace and quiet away from the city. Once you get there, you can wear yourself out playing outdoors or just take a peaceful wander around the lake's perimeter.`
  },
  {
    image: 'https://i.imgur.com/MAiWcy9.jpg',
    title: 'Jackson Hole',
    description: `Wildlife viewing, national parks, historic, western town and the best skiing around make Jackson Hole the ideal location for your family ski vacation. Jackson Hole has terrain to suit the entire family with a focus on fun learning techniques as well as raising the next generation of passionate skiers and riders.`
  },
  {
    image: 'https://i.imgur.com/H9mvjM6.jpg',
    title: 'Glacier Park',
    description: `Known as the Crown of the Continent, Glacier National Park encompasses more than one million acres of terrain. Explore glacial-carved mountain peaks and valleys, cascading waterfalls and the iconic Going-to-the-Sun Road, which runs through the heart of the park and crests the Continental Divide at Logan Pass. The park is open year-round and offers sightseeing, wildlife watching, fall foliage, boating, snowshoeing, cross-country skiing, bicycling, fine dining and luxury accommodations.`
  }
]

export default destinations
