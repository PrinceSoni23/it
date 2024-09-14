import React, { useState } from 'react';
import './ItineraryPage.css'; // For custom animations

const ItineraryPage = () => {
  const [city, setCity] = useState('');
  const [duration, setDuration] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to generate itinerary based on city and duration
  const generateItinerary = (city, duration) => {
    const places = {
      
      "New York": {
        "Morning": ["Visit Central Park", "Walk across Brooklyn Bridge", "Visit the Statue of Liberty"],
          "Afternoon": ["Explore The Metropolitan Museum of Art", "Tour the Empire State Building", "Visit Times Square"],
            "Evening": ["Watch a Broadway show", "Dine at a rooftop restaurant", "Walk around Bryant Park"]
      },
      "Paris": {
        "Morning": ["Visit the Eiffel Tower", "Walk along the Seine River", "Tour Notre-Dame Cathedral"],
          "Afternoon": ["Explore the Louvre Museum", "Visit Montmartre", "Relax in Luxembourg Gardens"],
            "Evening": ["Enjoy dinner at a Parisian bistro", "Watch a cabaret show", "Stroll through the Champs-Élysées"]
      },
      "Tokyo": {
        "Morning": ["Visit the Meiji Shrine", "Explore Asakusa Temple", "Walk in Ueno Park"],
          "Afternoon": ["Tour the Tokyo Skytree", "Shop in Shibuya", "Explore Akihabara"],
            "Evening": ["Dine in Shinjuku", "Watch a sumo match", "Visit Roppongi nightlife district"]
      },
      "London": {
        "Morning": ["Visit the British Museum", "Walk through Hyde Park", "See Buckingham Palace"],
          "Afternoon": ["Explore the London Eye", "Visit the Tate Modern", "Tour the Tower of London"],
            "Evening": ["Watch a show in the West End", "Dine at a restaurant in Covent Garden", "Stroll along the Thames"]
      },
      "Rome": {
        "Morning": ["Visit the Colosseum", "Tour the Vatican Museums", "See the Pantheon"],
          "Afternoon": ["Explore the Roman Forum", "Walk through Piazza Navona", "Visit the Trevi Fountain"],
            "Evening": ["Dinner in Trastevere", "Walk around Piazza di Spagna", "Enjoy gelato at the Spanish Steps"]
      },
      "Sydney": {
        "Morning": ["Walk around Bondi Beach", "Tour the Sydney Opera House", "Explore the Royal Botanic Garden"],
          "Afternoon": ["Visit Taronga Zoo", "Stroll through Darling Harbour", "Explore The Rocks"],
            "Evening": ["Dinner at a waterfront restaurant", "Enjoy views from Sydney Harbour Bridge", "Explore Circular Quay"]
      },
      "Dubai": {
        "Morning": ["Visit Burj Khalifa", "Explore Dubai Mall", "Walk around the Dubai Marina"],
          "Afternoon": ["Visit the Dubai Aquarium", "Relax at Jumeirah Beach", "Explore the Dubai Desert Conservation Reserve"],
            "Evening": ["Dine at a high-end restaurant in Downtown", "Take a sunset cruise", "Visit the Dubai Fountain show"]
      },
      "Hong Kong": {
        "Morning": ["Visit Victoria Peak", "Explore Hong Kong Park", "Walk around Tsim Sha Tsui"],
          "Afternoon": ["Visit the Hong Kong Museum of History", "Shop at Mong Kok", "Explore Lantau Island"],
            "Evening": ["Enjoy a Symphony of Lights show", "Dine in Lan Kwai Fong", "Explore the night markets"]
      },
      "Barcelona": {
        "Morning": ["Visit La Sagrada Familia", "Stroll down La Rambla", "Explore Park Güell"],
          "Afternoon": ["Visit the Gothic Quarter", "Explore the Picasso Museum", "Relax at Barceloneta Beach"],
            "Evening": ["Enjoy tapas in El Born", "Watch a Flamenco show", "Stroll along the marina"]
      },
      "Moscow": {
        "Morning": ["Visit the Red Square", "Tour the Kremlin", "Walk around Gorky Park"],
          "Afternoon": ["Explore the Tretyakov Gallery", "Visit St. Basil's Cathedral", "Stroll along Arbat Street"],
            "Evening": ["Dine at a traditional Russian restaurant", "Enjoy a ballet performance", "Explore the Moscow Metro stations"]
      },
      "Istanbul": {
        "Morning": ["Visit the Hagia Sophia", "Explore the Blue Mosque", "Walk around Sultanahmet Square"],
          "Afternoon": ["Visit Topkapi Palace", "Shop at the Grand Bazaar", "Explore the Basilica Cistern"],
            "Evening": ["Dine at a restaurant overlooking the Bosphorus", "Enjoy a traditional Turkish bath", "Stroll along Istiklal Street"]
      },
      "Mumbai": {
        "Morning": ["Visit the Gateway of India", "Explore Marine Drive", "Walk around Colaba Causeway"],
          "Afternoon": ["Visit Chhatrapati Shivaji Maharaj Terminus", "Explore Elephanta Caves", "Stroll in Sanjay Gandhi National Park"],
            "Evening": ["Dine at a restaurant in Bandra", "Watch a Bollywood movie", "Visit Juhu Beach"]
      },
      "Delhi": {
        "Morning": ["Visit the Red Fort", "Explore India Gate", "See Qutub Minar"],
          "Afternoon": ["Visit Humayun's Tomb", "Stroll in Lotus Temple", "Explore Raj Ghat"],
            "Evening": ["Dine in Connaught Place", "Enjoy a cultural performance", "Explore Hauz Khas Village"]
      },
      "Bangalore": {
        "Morning": ["Visit Lalbagh Botanical Garden", "Explore Bangalore Palace", "Walk in Cubbon Park"],
          "Afternoon": ["Visit Vidhana Soudha", "Explore the National Gallery of Modern Art", "Shop at Commercial Street"],
            "Evening": ["Dine at a restaurant on Brigade Road", "Enjoy a pub crawl", "Stroll around Ulsoor Lake"]
      },
      "Kolkata": {
        "Morning": ["Visit Victoria Memorial", "Explore Howrah Bridge", "Walk around Indian Museum"],
          "Afternoon": ["Visit Marble Palace", "Explore the Kalighat Temple", "Stroll in Eden Gardens"],
            "Evening": ["Dine at a restaurant in Park Street", "Enjoy a cultural show", "Walk along the Hooghly River"]
      },
      "Chennai": {
        "Morning": ["Visit Marina Beach", "Explore Kapaleeshwarar Temple", "Walk around Fort St. George"],
          "Afternoon": ["Visit Government Museum", "Explore the Botanical Gardens", "Shop at T. Nagar"],
            "Evening": ["Dine at a restaurant in Nungambakkam", "Watch a traditional dance performance", "Stroll along Elliots Beach"]
      },
      "Hyderabad": {
        "Morning": ["Visit Charminar", "Explore Golconda Fort", "Walk around Hussain Sagar Lake"],
          "Afternoon": ["Visit Salar Jung Museum", "Explore Qutb Shahi Tombs", "Stroll in Nehru Zoological Park"],
            "Evening": ["Dine at a restaurant in Banjara Hills", "Enjoy a light and sound show", "Explore Necklace Road"]
      },
      "Rio de Janeiro": {
        "Morning": ["Visit Christ the Redeemer", "Walk around Ipanema Beach", "Explore Sugarloaf Mountain"],
          "Afternoon": ["Visit Maracanã Stadium", "Explore the Selaron Steps", "Stroll through Tijuca Forest"],
            "Evening": ["Dine at a churrascaria", "Enjoy samba music in Lapa", "Walk along Copacabana Beach"]
      },
      "Cape Town": {
        "Morning": ["Hike up Table Mountain", "Explore the V&A Waterfront", "Visit Robben Island"],
          "Afternoon": ["Tour Kirstenbosch Gardens", "Explore Bo-Kaap", "Walk along Camps Bay Beach"],
            "Evening": ["Dine at a seafood restaurant", "Enjoy a sunset cruise", "Visit the Two Oceans Aquarium"]
      },
      "Los Angeles": {
        "Morning": ["Walk along Hollywood Boulevard", "Visit Griffith Observatory", "Explore Santa Monica Pier"],
          "Afternoon": ["Tour Universal Studios", "Stroll through Beverly Hills", "Visit the Getty Center"],
            "Evening": ["Dine at a celebrity chef restaurant", "Watch a movie at TCL Chinese Theatre", "Explore Venice Beach boardwalk"]
      },
      "Singapore": {
        "Morning": ["Visit Gardens by the Bay", "Explore the Marina Bay Sands SkyPark", "Walk around Sentosa Island"],
          "Afternoon": ["Tour the Singapore Zoo", "Shop on Orchard Road", "Visit the National Gallery"],
            "Evening": ["Dine at a hawker center", "Enjoy the Supertree Grove light show", "Explore Clarke Quay nightlife"]
      },
      "Toronto": {
        "Morning": ["Visit the CN Tower", "Walk around Toronto Islands", "Explore St. Lawrence Market"],
          "Afternoon": ["Tour the Royal Ontario Museum", "Visit Casa Loma", "Explore Distillery District"],
            "Evening": ["Dine at a restaurant in Kensington Market", "Watch a show at the Elgin Theatre", "Stroll along Harbourfront"]
      },
      "Cairo": {
        "Morning": ["Visit the Pyramids of Giza", "Tour the Egyptian Museum", "Walk around Al-Azhar Park"],
          "Afternoon": ["Explore Khan El Khalili bazaar", "Visit the Citadel of Salah El-Din", "Walk around Coptic Cairo"],
            "Evening": ["Dine at a restaurant along the Nile", "Watch a traditional belly dance show", "Explore Old Cairo streets"]
      },
      "Lisbon": {
        "Morning": ["Visit Jerónimos Monastery", "Walk around Belem Tower", "Explore Alfama district"],
          "Afternoon": ["Tour the National Tile Museum", "Explore LX Factory", "Walk through Bairro Alto"],
            "Evening": ["Dine at a traditional fado restaurant", "Explore the waterfront at Praça do Comércio", "Stroll along Avenida da Liberdade"]
      }
    

  };

  if (!(city in places)) {
    return `Sorry, we don't have itinerary information for ${city} yet.`;
  }

  let itinerary = `Trip Itinerary for ${city} (${duration} days):\n`;

  for (let day = 1; day <= duration; day++) {
    itinerary += `\nDay ${day}:\n`;
    itinerary += `Morning: ${places[city]['Morning'][Math.floor(Math.random() * places[city]['Morning'].length)]}\n`;
    itinerary += `Afternoon: ${places[city]['Afternoon'][Math.floor(Math.random() * places[city]['Afternoon'].length)]}\n`;
    itinerary += `Evening: ${places[city]['Evening'][Math.floor(Math.random() * places[city]['Evening'].length)]}\n`;
  }

  return itinerary;
};

const handleSearch = () => {
  if (!city || !duration) {
    setError("Please fill in both fields");
    return;
  }

  setLoading(true);
  setError('');

  try {
    const result = generateItinerary(city, parseInt(duration));
    setItinerary(result);
  } catch (error) {
    setError('Error generating itinerary. Please try again.');
  } finally {
    setLoading(false);
  }
};

return (
  <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-6 animate__animated animate__fadeIn">Itinerary Planner</h1>
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Number of days"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleSearch}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {loading ? 'Loading...' : 'Get Itinerary'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
    <div className="mt-6 w-full max-w-md">
      {itinerary && (
        <div className="bg-white shadow-md rounded-lg p-4 animate__animated animate__fadeIn">
          <h2 className="text-xl font-semibold mb-4">Itinerary for {city}</h2>
          <pre>{itinerary}</pre>
        </div>
      )}
    </div>
  </div>
);
};

export default ItineraryPage;
