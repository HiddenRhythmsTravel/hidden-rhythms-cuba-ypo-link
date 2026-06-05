import React, { useState, useEffect } from "react";
import FlightSuggestions from "./FlightSuggestions";
import PricingGrid from "./PricingGrid";
import Lightbox from "../Lightbox";

const itineraryData = [
  {
    day: "Day 1",
    date: "Tuesday, January 27",
    title: "Welcome to Medellín",
    summary: "Your journey begins the moment you touch down. From the airport to your first evening in El Poblado, every detail has been arranged to ease you into the rhythm of Medellín with warmth and comfort.",
    activities: [
      {
        time: "Afternoon",
        activity: "Arrival and Welcome Transfer",
        details: "Touch down at Jose Maria Cordova International Airport (MDE). Your private group transfer is ready to welcome you with chilled drinks and light welcome appetizers on the scenic drive en route to El Poblado."
      },
      {
        time: "4:00 PM",
        activity: "Check-in at Hotel Click Clack",
        details: "Arrive at the design-forward Click Clack Hotel, perfectly located in the exclusive neighborhood of El Poblado. Check in and settle into your sophisticated room.",
        link: { text: "Hotel Click Clack", url: "https://www.clickclackhotel.com" }
      },
      {
        time: "7:30 PM",
        activity: "Welcome Dinner at Carmen",
        details: "An extraordinary culinary introduction to modern Colombian cuisine at Carmen, the acclaimed signature restaurant right next door to the hotel. Expect a multi-course menu showcasing native ingredients and flavor profiles.",
        link: { text: "Carmen Restaurant", url: "https://www.carmenmedellin.com" }
      }
    ],
    meals: "Appetizers en route and welcome dinner included"
  },
  {
    day: "Day 2",
    date: "Wednesday, January 28",
    title: "History, Culture and Community",
    summary: "An immersive look at Medellín social and cultural evolution. Explore the city complex history and contemporary transformation through expert-led historical discussions, guided walks, and deep dives into the region artistic and culinary heritage.",
    activities: [
      {
        time: "9:00 AM",
        activity: "Retreat Opening and History of Medellín",
        details: "Convene in a private studio at the hotel for a comprehensive keynote discussion and lecture (approx. 1.5 hours) on the history of Medellín, establishing a deep historical context for the city transformation."
      },
      {
        time: "11:00 AM",
        activity: "Provenza Architectural Walk and Coffee Masterclass",
        details: "A leisurely walk through the leafy streets of Provenza, descending to the Hotel Marquee for a guided Colombian coffee tasting masterclass and exploration of the bean-to-cup chemistry."
      },
      {
        time: "1:00 PM",
        activity: "Andaluz Lunch and Performance",
        details: "An authentic Afro-Colombian lunch at Andaluz, highlighted by an intimate live musical performance celebrating Afro-Colombian acoustic heritage, drumming, and deep cultural roots."
      },
      {
        time: "5:00 PM",
        activity: "Comuna 13 by Night",
        details: "Ascend the outdoor escalators into Comuna 13 after dark. A guided neighborhood tour led by residents who know its story firsthand, detailing the journey from violence to a hub of street art and pride. Concludes with an interactive percussion session paired with local cocktails."
      },
      {
        time: "8:30 PM",
        activity: "Late Dinner at Fidelina",
        details: "A reservation has been secured at Fidelina in the Laureles district—a three-story old-world gem reminiscent of Havana, packed with a lively local vibe and excellent cuisine. (Meal not included)."
      }
    ],
    meals: "Breakfast and lunch included"
  },
  {
    day: "Day 3",
    date: "Thursday, January 29",
    title: "Coffee, Startups and Fresh Air",
    summary: "The day blends traditional Colombian coffee cultivation, tech startup innovation exchanges, and relaxing wellness sessions before shifting into a classic Colombian social rhythm.",
    activities: [
      {
        time: "9:00 AM",
        activity: "Working Coffee Farm Visit",
        details: "Travel into the lush hills to a working Colombian coffee farm. Experience the full journey from cultivation to cup, gaining a firsthand appreciation for the craft and heritage behind Colombia celebrated export."
      },
      {
        time: "1:00 PM",
        activity: "Polygon US Tech Startup Exchange",
        details: "A visit to Polygon US for an off-the-record interactive exchange with a leading local tech startup. A rare opportunity to connect peer-to-peer with fellow founders in Medellín tech ecosystem."
      },
      {
        time: "2:30 PM",
        activity: "Lunch at Cafe Zorba and Guest Curation",
        details: "A relaxed vegetarian lunch at Cafe Zorba, accompanied by an unfiltered personal discussion with a guest speaker who grew up in Medellín during its most turbulent era, sharing their personal perspective on the city transformation."
      },
      {
        time: "4:30 PM",
        activity: "Meditation and Stretching in the Park",
        details: "A grounding, serene outdoor yoga and stretching session in a peaceful urban park to reset, reflect, and ground your energy."
      },
      {
        time: "6:00 PM",
        activity: "Tejo and Beers Traditional Evening",
        details: "Kick off the evening playing Colombia beloved national sport of Tejo, paired with cold local beers. We are joined by local Colombian players to help guide our throws and share in the fun."
      },
      {
        time: "8:00 PM",
        activity: "Live Music and Tapas at Quema Quema",
        details: "Head to Quema Quema for a curation of delicious appetizers, paired with live acoustic sets from local contemporary musicians before a night out in Provenza."
      }
    ],
    meals: "Breakfast, farm coffee, and appetizers included"
  },
  {
    day: "Day 4",
    date: "Friday, January 30",
    title: "Select Your Rhythm",
    summary: "Choose your own rhythm for the day with one of three bespoke excursions, culminating in our electric Medellín farewell dinner and salsa night.",
    activities: [
      {
        time: "Option A",
        activity: "Day Trip to Guatapé and The Brown Hotel",
        details: "Hike the 740 steps of La Piedra del Peñol for sweeping panoramic lake views, followed by a private day pass at the Brown Hotel. Choose between a guided walkthrough of the colorful town of Guatapé or relaxing poolside."
      },
      {
        time: "Option B",
        activity: "Deep Dive: History and Community Impact",
        details: "For those preferring to stay in the city, visit the poignant Casa de la Memoria museum. Afterwards, head into the hills to engage with Barrio Boxing, a high-impact local project utilizing sports for youth community renewal. Concludes with a discussion on the sex industry impact."
      },
      {
        time: "Option C",
        activity: "Paragliding at San Felix",
        details: "Take to the skies above the Andes with a professional tandem paragliding company for a spectacular, unforgettable aerial perspective of the green valley. (Paragliding fees not included)."
      },
      {
        time: "7:30 PM",
        activity: "Medellín Farewell Dinner at Mamba Negra",
        details: "A spectacular dinner at Mamba Negra, a dark, electric rooftop restaurant on the 22nd floor in El Poblado. The kitchen uses ember-driven plates, wood smoke, and bold Colombian ingredients.",
        link: { text: "Mamba Negra", url: "https://www.mambanegra.com" }
      },
      {
        time: "10:30 PM",
        activity: "Salsa Night at Mamasita Medello",
        details: "Close out the week with private tables, craft cocktails, and high-energy live salsa music at the legendary local club, Mamasita Medello."
      }
    ],
    meals: "Breakfast, lunch, and farewell dinner included"
  },
  {
    day: "Day 5",
    date: "Saturday, January 31",
    title: "Medellín Departure or Bogotá Extension",
    summary: "The main program concludes this morning for members returning home. For those seeking to deepen their engagement, we head to the capital for a sophisticated final chapter.",
    activities: [
      {
        time: "10:00 AM",
        activity: "Main Program Checkout and Departure",
        details: "Complete checkout at the Click Clack Hotel, enjoy a final breakfast in Medellín, and board your private airport shuttles back to Columbus, Ohio."
      },
      {
        time: "1:30 PM",
        activity: "Flight to Bogotá (Extension Members)",
        details: "Extension members board our domestic flight to Bogotá (MDE to BOG). Arrive in the high-altitude capital and transfer to the luxury Sofitel Victoria Regia.",
        link: { text: "Sofitel Victoria Regia", url: "https://all.accor.com/hotel/1841/index.en.shtml" }
      },
      {
        time: "6:00 PM",
        activity: "State of the Nation Briefing",
        details: "Pre-dinner drinks in the hotel private library, joined by a leading Colombian political analyst for an off-the-record briefing on the current presidential administration and the 2027 economic outlook."
      },
      {
        time: "8:00 PM",
        activity: "Welcome Dinner at Astoria Rooftop",
        details: "A welcome dinner at Astoria Rooftop, a high-energy, cosmopolitan lounge perched on the 15th floor, offering spectacular panoramic views of the Bogotá skyline."
      }
    ],
    meals: "Breakfast in Medellin and welcome dinner in Bogota included"
  },
  {
    day: "Day 6",
    date: "Sunday, February 1",
    title: "Gold, Ateliers and The Final Toast",
    summary: "Bogotá is where Colombia history meets its future. We spend our final 48 hours immersed in the city colonial heart, its Andean heights, and its most exclusive design districts.",
    activities: [
      {
        time: "9:30 AM",
        activity: "Gold and Gravity Private Curation",
        details: "Private guided tour of the world-famous Gold Museum to explore pre-Hispanic treasures, followed by a scenic gondola ride ascending 10,000 feet above the Andes to the peaks of Monserrate."
      },
      {
        time: "12:30 PM",
        activity: "Andean Panoramic Lunch at Casa Santa Clara",
        details: "A spectacular lunch overlooking the massive Andean sprawl at Casa Santa Clara, serving traditional Bogotá specialties."
      },
      {
        time: "3:00 PM",
        activity: "Art and Fashion Concierge",
        details: "Led by a Galavanta Art Concierge, explore the exclusive design ateliers of world-renowned Colombian designers Silvia Tcherassi and Johanna Ortiz, followed by a private walkthrough of Galería La Cometa."
      },
      {
        time: "6:00 PM",
        activity: "EO Connection Happy Hour",
        details: "An intimate, private happy hour networking session with local members of the EO Bogotá Chapter to share stories and trade business insights."
      },
      {
        time: "8:00 PM",
        activity: "Grand Farewell Dinner at Andrés D.C.",
        details: "A legendary four-story culinary universe in the heart of Zona T. Andrés D.C. blends a traditional Colombian steakhouse with a high-energy, theatrical carnival atmosphere. Each floor offers unique decor complete with live musicians and actors.",
        link: { text: "Andrés Carne de Res", url: "https://www.andrescarnederes.com" }
      }
    ],
    meals: "Breakfast, lunch, and farewell dinner included"
  },
  {
    day: "Day 7",
    date: "Monday, February 2",
    title: "Bogotá Checkout and Return Flights",
    summary: "Bid farewell to Colombia with a 360-degree understanding of its past and its trajectory.",
    activities: [
      {
        time: "Morning",
        activity: "Check-out and Departures",
        details: "Complete checkout at the Sofitel Victoria Regia. Private vehicle airport transit based on your individual flight departures from El Dorado International Airport (BOG) back to Columbus, Ohio."
      }
    ],
    meals: "Breakfast included"
  }
];

const galleryItems = [
  {
    type: "video",
    src: "/assets/drone_footage_comuna13.mp4",
    title: "Comuna 13",
    location: "Medellín",
    date: "January 2027"
  },
  {
    type: "image",
    src: "/assets/coffee-marquee.jpeg",
    title: "Coffee Tasting Masterclass",
    location: "Hotel Marquee",
    date: "January 2027"
  },
  {
    type: "image",
    src: "/assets/el-cielo-smoke.webp",
    title: "Senses at El Cielo",
    location: "El Poblado",
    date: "January 2027"
  },
  {
    type: "video",
    src: "/assets/helicopter_tour.mp4",
    title: "Helicopter Tour",
    location: "El Peñol",
    date: "January 2027"
  },
  {
    type: "image",
    src: "/assets/colombia_elections.jpeg",
    title: "Presidential Elections at stake for 2026",
    location: "Colombia",
    date: "January 2027"
  },
  {
    type: "image",
    src: "/assets/coffee-farmer.jpg",
    title: "Antioquia Coffee Farm",
    location: "Sabaneta Hills",
    date: "January 2027"
  },
  {
    type: "image",
    src: "/assets/son-bata.webp",
    title: "Son Batá Live Rhythm Session",
    location: "Comuna 13",
    date: "January 2027"
  },
  {
    type: "image",
    src: "/assets/paragliding_user.jpeg",
    title: "Paragliding over the Andes",
    location: "San Felix",
    date: "January 2027"
  },
  {
    type: "image",
    src: "/assets/Speakewasy overlooking Valley.jpg",
    title: "Speakeasy Cocktail Curation",
    location: "Provenza Overlook",
    date: "January 2027"
  },
  {
    type: "video",
    src: "/assets/montserrat_cable_car.mp4",
    title: "Montserrat",
    location: "Cable Car ride in Bogota",
    date: "January 2027"
  },
  {
    type: "image",
    src: "/assets/gold_museum.jpeg",
    title: "Gold Museum",
    location: "Bogotá",
    date: "January 2027"
  },
  {
    type: "image",
    src: "/assets/polygon.webp",
    title: "Meet Fellow Entrepeneurs who are making a difference",
    location: "Polygon US",
    date: "January 2027"
  }
];

export default function EOColumbusProposal() {
  const [activeTab, setActiveTab] = useState("gallery");
  const [activeMedia, setActiveMedia] = useState(null);

  const openLightbox = (item, idx) => {
    setActiveMedia({
      ...item,
      items: galleryItems,
      initialIndex: idx
    });
  };

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 130;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const sections = ["gallery", "program", "lodging", "flights", "pricing", "register"];
    const observerOptions = {
      root: null,
      rootMargin: "-150px 0px -40% 0px",
      threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="fade-in bg-brand-green min-h-screen text-brand-white" style={{ fontFamily: "var(--font-sans)", backgroundColor: "var(--bg-primary)" }}>
      
      {/* Sticky Header Nav Logo */}
      <header className="glass-nav sticky top-0 z-50 py-4 px-6 md:px-12 flex justify-between items-center" style={{ backdropFilter: "blur(16px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/assets/humingbird-logo.jpg" alt="Hidden Rhythms Logo" style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid rgba(239, 156, 130, 0.3)" }} />
          <h1 className="font-serif" style={{ fontSize: "1.35rem", color: "var(--accent)", margin: 0, letterSpacing: "0.05em", fontWeight: "normal" }}>
            Hidden Rhythms
          </h1>
        </div>
        <span className="font-sans" style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "white", textTransform: "uppercase", opacity: 0.6 }}>
          EO Columbus Retreat
        </span>
      </header>

      {/* Hero Section */}
      <section className="proposal-hero" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative", backgroundColor: "var(--bg-primary)" }}>
        <div className="proposal-hero-map-container" style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "85%",
          aspectRatio: "1/1",
          opacity: 0.65,
          zIndex: 1,
          pointerEvents: "none"
        }}>
          <svg
            viewBox="0 0 1024 1024"
            style={{ width: "100%", height: "100%" }}
            fill="rgba(9, 57, 55, 0.65)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)">
              <path vectorEffect="non-scaling-stroke" d="M5871 10207 c-10 -28 -18 -36 -46 -41 -21 -4 -32 -11 -29 -19 5 -15 -107 -57 -153 -57 -40 0 -46 -9 -48 -84 -1 -40 -9 -78 -24 -109 -25 -54 -55 -73 -186 -117 -101 -35 -295 -151 -360 -217 -84 -85 -85 -85 -268 -91 l-163 -5 -55 32 c-54 30 -105 39 -155 25 -21 -5 -54 -78 -54 -117 0 -11 -7 -34 -16 -53 -13 -28 -26 -37 -67 -49 -51 -15 -52 -15 -174 26 l-123 41 -49 -39 c-27 -21 -57 -50 -67 -64 -9 -14 -44 -41 -76 -58 -40 -22 -63 -42 -71 -62 -8 -21 -29 -38 -67 -57 -52 -26 -55 -30 -61 -72 -3 -26 -19 -66 -37 -94 -17 -27 -36 -64 -42 -82 -6 -18 -22 -40 -36 -49 -20 -13 -23 -19 -13 -31 10 -12 18 -8 53 23 40 36 41 37 44 14 2 -12 -3 -28 -11 -34 -13 -11 -22 -47 -43 -187 -4 -23 -17 -44 -37 -62 l-31 -26 47 -7 c52 -8 54 -14 41 -96 -8 -46 -33 -59 -120 -59 -52 0 -76 -6 -124 -30 -54 -27 -62 -36 -104 -112 -58 -107 -110 -168 -142 -168 -17 0 -24 -6 -24 -20 0 -12 -21 -33 -60 -60 -33 -22 -64 -49 -70 -60 -8 -14 -26 -21 -71 -26 -50 -6 -66 -12 -90 -38 l-29 -31 41 -20 c51 -26 79 -69 79 -120 0 -22 7 -65 15 -95 16 -61 19 -118 6 -138 -5 -9 -18 -11 -37 -7 -16 3 -39 8 -51 11 -28 5 -31 34 -4 34 14 0 20 9 23 33 3 17 9 40 13 51 7 16 5 17 -23 11 -29 -6 -32 -3 -52 34 -11 23 -27 41 -35 41 -8 0 -26 22 -39 48 -19 38 -33 52 -65 64 -23 9 -44 25 -47 35 -23 72 -44 79 -92 30 -39 -40 -40 -60 -7 -99 14 -16 28 -42 32 -56 3 -15 23 -52 43 -82 20 -30 46 -81 58 -113 l22 -58 -28 -10 c-15 -5 -33 -12 -39 -14 -7 -2 -20 -31 -29 -64 -18 -63 -47 -99 -116 -140 l-37 -22 -12 23 c-19 38 -61 78 -82 78 -17 0 -18 -5 -12 -52 7 -48 5 -54 -18 -72 -16 -14 -32 -45 -45 -88 l-20 -67 27 -24 c14 -13 41 -33 59 -43 31 -18 33 -23 31 -64 -5 -93 -1 -107 29 -113 27 -6 62 -57 62 -92 0 -9 10 -15 25 -15 15 0 25 6 25 15 0 12 4 13 25 3 14 -6 25 -16 25 -21 0 -6 10 -21 23 -35 21 -22 21 -24 5 -36 -10 -7 -18 -20 -18 -29 0 -9 -8 -20 -17 -26 -17 -9 -17 -11 1 -24 18 -13 18 -17 6 -47 l-14 -33 -17 22 c-9 11 -19 21 -22 21 -2 0 -2 -21 0 -47 4 -34 19 -69 49 -117 30 -48 44 -81 44 -105 1 -20 7 -47 15 -61 12 -23 11 -27 -13 -52 -19 -21 -35 -28 -64 -28 -33 0 -41 -5 -63 -40 -34 -55 -33 -80 4 -80 48 0 55 -19 62 -179 3 -86 12 -161 20 -183 11 -28 13 -66 8 -158 -7 -131 -11 -141 -76 -181 -28 -18 -33 -26 -33 -60 0 -31 10 -53 51 -109 28 -39 54 -70 58 -70 4 0 18 23 31 51 23 47 25 49 34 29 8 -17 6 -24 -7 -31 -22 -13 -33 -75 -16 -95 13 -16 39 -15 109 2 20 5 16 0 -17 -26 -35 -25 -43 -38 -43 -63 0 -36 -74 -137 -159 -217 -39 -37 -49 -55 -60 -102 -11 -51 -15 -58 -36 -58 -30 0 -45 -26 -45 -80 0 -23 -10 -64 -22 -92 -18 -42 -29 -53 -66 -69 -24 -10 -54 -19 -67 -19 -15 0 -26 -7 -30 -20 -4 -14 -15 -20 -35 -20 -22 0 -30 6 -38 30 l-11 30 -33 -19 c-18 -10 -63 -29 -100 -41 -58 -18 -74 -29 -116 -78 -27 -31 -59 -83 -72 -115 -21 -50 -22 -62 -12 -90 7 -19 12 -46 12 -61 0 -14 7 -29 15 -32 8 -4 15 -12 15 -19 0 -7 7 -15 15 -19 18 -6 19 -26 4 -60 -9 -19 -16 -23 -28 -17 -9 5 -42 12 -73 15 -54 7 -60 6 -103 -25 -43 -31 -85 -84 -85 -106 0 -6 27 -20 60 -32 33 -12 60 -28 60 -35 0 -20 132 -146 152 -146 10 0 22 -9 28 -20 7 -13 21 -20 40 -20 22 0 37 -11 66 -45 26 -32 44 -45 62 -45 15 0 45 -16 74 -41 30 -25 62 -43 86 -46 20 -4 58 -16 85 -28 36 -17 56 -21 86 -15 44 8 71 -6 71 -38 0 -26 60 -78 99 -87 30 -6 31 -9 31 -59 0 -52 0 -52 45 -74 26 -13 65 -22 90 -22 38 0 46 -4 61 -29 11 -19 28 -31 48 -35 77 -13 351 -26 374 -18 6 2 12 21 12 41 0 62 67 106 100 66 7 -8 28 -15 46 -15 19 0 34 -4 34 -10 0 -5 10 -10 23 -10 16 0 32 -16 61 -60 21 -33 57 -74 80 -91 37 -28 46 -30 94 -25 51 6 55 5 98 -32 53 -47 116 -68 157 -53 37 14 84 14 93 0 3 -6 33 -28 65 -49 51 -33 64 -37 103 -33 l45 5 3 -43 c3 -40 6 -44 37 -52 82 -21 201 -148 201 -214 0 -21 9 -36 31 -52 20 -15 27 -26 20 -30 -8 -6 -7 -17 4 -44 17 -40 74 -77 120 -77 28 0 58 -17 124 -69 30 -24 52 -35 70 -33 34 4 121 -44 121 -67 0 -9 14 -38 30 -65 24 -38 28 -51 20 -67 -6 -10 -8 -35 -4 -54 9 -50 81 -100 131 -92 45 8 82 -10 89 -42 3 -14 14 -56 24 -93 l18 -66 -24 -23 c-44 -41 -21 -109 36 -109 14 0 39 -14 57 -32 33 -31 36 -33 106 -30 58 3 75 7 90 24 l17 21 61 -28 c42 -19 71 -25 92 -22 86 15 124 24 144 35 12 7 40 12 61 12 35 0 45 6 79 44 47 53 113 96 113 73 0 -17 21 -27 54 -27 13 0 42 -13 64 -30 23 -16 46 -30 52 -30 5 0 14 -9 20 -20 11 -21 50 -26 122 -14 28 5 38 12 40 28 2 16 11 22 35 24 17 2 37 10 43 18 7 8 29 14 50 14 38 0 84 -29 173 -107 21 -19 48 -33 63 -33 14 0 38 -7 53 -15 16 -8 47 -17 69 -21 33 -5 43 -13 61 -45 19 -33 27 -39 55 -39 21 0 40 -8 55 -24 l22 -23 -211 -319 -210 -319 47 -22 c50 -23 98 -30 107 -14 3 5 27 12 52 16 46 6 48 6 96 -42 28 -27 53 -64 60 -85 14 -49 78 -111 109 -106 22 3 27 25 170 808 82 443 148 822 148 842 1 29 7 41 26 54 21 14 25 24 25 66 0 35 -6 58 -20 75 -11 14 -20 37 -20 51 0 13 -15 45 -34 71 -48 66 -68 108 -64 139 1 15 -1 52 -5 83 -8 53 -10 57 -39 63 -17 3 -55 24 -83 46 -29 22 -56 40 -61 40 -5 1 -30 20 -55 44 l-47 42 10 215 c5 118 11 219 13 226 2 7 37 22 77 34 40 12 91 35 114 50 58 39 136 43 182 9 26 -19 48 -25 104 -28 66 -4 71 -3 64 14 -4 10 -11 48 -16 84 -4 36 -15 82 -24 103 -19 43 -60 65 -88 48 -12 -7 -33 -8 -69 -1 -28 6 -73 10 -98 10 -26 0 -52 5 -57 10 -8 8 -19 7 -39 0 -15 -6 -29 -9 -30 -8 -1 2 0 92 3 200 l5 197 46 6 c25 3 68 10 95 14 28 5 62 5 80 0 36 -11 323 -12 600 -2 l197 6 -32 33 c-31 32 -32 35 -18 60 7 15 19 29 26 31 25 10 60 -7 71 -33 16 -34 74 -104 87 -104 42 0 85 24 110 61 34 53 98 121 147 161 l39 30 44 -17 c40 -15 45 -20 45 -47 0 -22 15 -49 53 -97 30 -36 64 -93 76 -126 21 -55 22 -70 16 -184 -7 -117 -6 -123 11 -118 11 3 40 8 67 12 52 7 54 11 33 70 -8 22 -26 92 -40 156 -15 63 -41 144 -58 180 -16 35 -30 78 -30 95 1 23 -8 40 -33 64 -39 38 -47 87 -19 110 13 12 3 26 -82 111 -54 54 -108 100 -121 104 -15 3 -30 19 -38 39 -12 27 -22 35 -59 45 -25 6 -59 11 -75 11 -17 0 -31 4 -31 8 0 15 237 242 253 242 21 0 76 58 84 89 5 19 0 30 -23 49 -16 14 -45 57 -64 96 -29 58 -40 72 -63 76 -23 4 -32 15 -50 60 -13 30 -46 99 -75 153 -49 95 -51 100 -37 127 24 47 19 85 -15 113 -30 25 -30 26 -14 63 25 59 31 282 10 362 -19 77 -15 87 61 159 l55 51 -7 57 c-9 76 5 107 77 175 l58 55 -30 48 c-25 39 -28 49 -15 53 8 4 15 16 15 29 0 19 -12 28 -74 54 -83 35 -135 39 -210 16 -27 -8 -65 -15 -85 -15 -20 0 -56 -10 -80 -21 -38 -17 -57 -19 -126 -13 -69 5 -86 4 -109 -11 -26 -17 -31 -17 -124 3 -163 35 -155 35 -200 -3 -44 -38 -90 -46 -113 -19 -9 11 -22 14 -44 10 -30 -6 -36 -1 -199 199 -92 113 -171 205 -176 205 -5 0 -25 14 -44 31 -33 29 -39 30 -90 24 -66 -9 -181 24 -191 54 -4 14 -20 20 -67 25 -88 9 -146 7 -153 -4 -12 -19 -85 -51 -141 -61 -46 -8 -59 -8 -72 4 -10 8 -46 17 -82 20 -235 21 -213 22 -257 -6 l-41 -26 -59 25 c-53 23 -63 32 -91 84 -18 31 -32 69 -32 84 0 34 -50 66 -106 66 -33 0 -44 5 -62 30 -20 26 -22 41 -22 154 0 100 4 133 19 169 11 25 24 48 30 51 13 8 13 79 2 149 -7 42 -18 58 -93 135 l-84 87 -33 123 c-47 182 -42 172 -101 172 -50 0 -50 0 -50 33 0 17 -3 42 -6 54 -6 22 -7 22 -86 -18 -64 -32 -88 -39 -125 -37 l-45 3 45 60 c24 33 52 76 60 96 8 20 29 46 46 58 42 30 111 167 111 219 0 21 9 64 19 94 11 31 22 102 26 163 8 107 8 109 62 204 30 52 62 114 73 137 10 23 28 47 39 53 12 7 21 20 21 30 0 46 123 136 177 129 27 -3 32 4 111 160 76 150 85 162 110 162 15 0 95 19 177 42 140 40 153 45 192 85 22 24 50 43 61 43 11 0 31 9 46 21 34 27 34 71 1 115 -14 18 -25 44 -25 57 0 20 -10 30 -52 51 -29 14 -62 26 -74 26 -13 0 -29 8 -36 18 -18 26 -32 32 -86 41 -26 5 -54 12 -63 15 -13 6 -20 -1 -28 -27z" />
            </g>
          </svg>
          <div style={{
            position: "absolute",
            left: "34.3%",
            top: "37.2%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30px",
            height: "30px"
          }}>
            <div className="animate-ping" style={{
              position: "absolute",
              width: "20px",
              height: "20px",
              backgroundColor: "var(--accent)",
              borderRadius: "50%",
              opacity: 0.8
            }}></div>
            <div className="animate-map-blink" style={{
              width: "10px",
              height: "10px",
              backgroundColor: "var(--accent)",
              borderRadius: "50%",
              boxShadow: "0 0 15px var(--accent)"
            }}></div>
            <span style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "0.75rem",
              color: "white",
              marginTop: "4px",
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.05em",
              textShadow: "0 2px 4px rgba(0,0,0,0.8)",
              whiteSpace: "nowrap",
              opacity: 0.7
            }}>
              Medellín
            </span>
          </div>
          <div style={{
            position: "absolute",
            left: "43.1%",
            top: "47.1%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30px",
            height: "30px"
          }}>
            <div className="animate-ping" style={{
              position: "absolute",
              width: "20px",
              height: "20px",
              backgroundColor: "var(--accent)",
              borderRadius: "50%",
              opacity: 0.8
            }}></div>
            <div className="animate-map-blink" style={{
              width: "10px",
              height: "10px",
              backgroundColor: "var(--accent)",
              borderRadius: "50%",
              boxShadow: "0 0 15px var(--accent)"
            }}></div>
            <span style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "0.75rem",
              color: "white",
              marginTop: "4px",
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.05em",
              textShadow: "0 2px 4px rgba(0,0,0,0.8)",
              whiteSpace: "nowrap",
              opacity: 0.7
            }}>
              Bogotá
            </span>
          </div>
        </div>
        <div className="proposal-hero-content" style={{ zIndex: 10 }}>
          <span style={{
            fontSize: "0.85rem", color: "var(--accent)", letterSpacing: "0.25em",
            textTransform: "uppercase", fontWeight: "bold", display: "block", marginBottom: "1rem"
          }}>
            Exclusive Chapter Retreat
          </span>
          <h1 style={{
            fontSize: "clamp(2.2rem, 7vw, 3.75rem)", fontFamily: "var(--font-serif)", color: "var(--text-heading)",
            lineHeight: "1.1", marginBottom: "1.5rem"
          }}>
            EO Columbus Chapter Retreat
          </h1>
          <p style={{
            fontSize: "clamp(1.3rem, 4vw, 1.8rem)", fontFamily: "var(--font-serif)", color: "var(--accent)",
            fontStyle: "italic", marginBottom: "1.5rem"
          }}>
            Medellín with Bogotá Extension
          </p>
          <p style={{ fontSize: "1.2rem", opacity: 0.9, maxWidth: "750px", margin: "0 auto 2.5rem", lineHeight: "1.7" }}>
            January 27 – February 2, 2027
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#register" onClick={() => scrollToSection("register")} style={{
              background: "var(--accent)", color: "var(--bg-primary)", fontWeight: "bold",
              textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.85rem",
              padding: "0.85rem 2rem", borderRadius: "30px", textDecoration: "none",
              boxShadow: "0 4px 15px rgba(239,156,130,0.3)"
            }} className="hover-lift">
              Register Now
            </a>
            <a href="#itinerary" onClick={() => scrollToSection("program")} style={{
              background: "var(--accent)", color: "var(--bg-primary)", fontWeight: "bold",
              textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.85rem",
              padding: "0.85rem 2rem", borderRadius: "30px", textDecoration: "none",
              boxShadow: "0 4px 15px rgba(239,156,130,0.3)"
            }} className="hover-lift">
              View Itinerary
            </a>
          </div>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <div className="sticky-subnav" style={{ top: "66px" }}>
        <button onClick={() => scrollToSection("gallery")} className={`subnav-btn ${activeTab === "gallery" ? "active" : ""}`}>
          Gallery
        </button>
        <button onClick={() => scrollToSection("program")} className={`subnav-btn ${activeTab === "program" ? "active" : ""}`}>
          Itinerary
        </button>
        <button onClick={() => scrollToSection("lodging")} className={`subnav-btn ${activeTab === "lodging" ? "active" : ""}`}>
          Lodging
        </button>
        <button onClick={() => scrollToSection("flights")} className={`subnav-btn ${activeTab === "flights" ? "active" : ""}`}>
          Flights
        </button>
        <button onClick={() => scrollToSection("pricing")} className={`subnav-btn ${activeTab === "pricing" ? "active" : ""}`}>
          Pricing and Terms
        </button>
        <button onClick={() => scrollToSection("register")} className={`subnav-btn ${activeTab === "register" ? "active" : ""}`}>
          Registration
        </button>
      </div>

            <main className="proposal-main" style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "6rem" }}>
        {/* SECTION 1: GALLERY */}
        <section id="gallery" className="fade-in" style={{ scrollMarginTop: "140px" }}>
          <div className="fade-in">
            <h2 style={{ fontSize: "2.5rem", fontFamily: "var(--font-serif)", textAlign: "center", marginBottom: "1rem" }}>
              Retreat Media Gallery
            </h2>
            <p style={{ fontStyle: "italic", opacity: 0.8, textAlign: "center", marginBottom: "4rem", maxWidth: "800px", margin: "0 auto 4rem" }}>
              A curated collage of photos capturing our cultural, historical, and culinary experiences in Colombia.
            </p>

            <div className="responsive-grid-gallery" style={{ padding: "0 1rem" }}>
              {galleryItems.map((item, idx) => (
                <div 
                  key={idx} 
                  style={{
                    position: "relative", width: "100%", paddingBottom: "100%", overflow: "hidden",
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "4px", boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    transition: "transform 0.4s ease"
                  }}
                  className="hover-lift"
                >
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        position: "absolute", inset: 0, width: "100%", height: "100%",
                        objectFit: "cover", transition: "transform 0.5s ease"
                      }}
                    />
                  ) : (
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      style={{
                        position: "absolute", inset: 0, width: "100%", height: "100%",
                        objectFit: "cover", transition: "transform 0.5s ease"
                      }}
                    />
                  )}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
                    padding: "1rem", color: "white", fontSize: "0.85rem", opacity: 0.9
                  }}>
                    <strong style={{ display: "block" }}>{item.title}</strong>
                    <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>{item.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: ITINERARY */}
        <section id="program" className="fade-in" style={{ scrollMarginTop: "140px" }}>
          <div className="fade-in">
            <h2 style={{ fontSize: "2.5rem", fontFamily: "var(--font-serif)", textAlign: "center", marginBottom: "1rem" }}>
              The Curated Journey
            </h2>
            <p style={{ fontStyle: "italic", opacity: 0.8, textAlign: "center", marginBottom: "4rem", maxWidth: "800px", margin: "0 auto 4rem" }}>
              Explore the detailed chronological retreat program. Alternating physical engagement, academic startup exploration, and elite cultural connections.
            </p>

            <div className="timeline-container">
              {itineraryData.map((day, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-marker" />
                  <div className="timeline-content-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "1rem" }}>
                      <span style={{ fontSize: "0.9rem", color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: "bold" }}>
                        {day.day} — {day.date}
                      </span>
                      <span style={{ fontSize: "0.8rem", opacity: 0.6, background: "rgba(255,255,255,0.05)", padding: "0.25rem 0.75rem", borderRadius: "12px" }}>
                        {day.meals}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.8rem", fontFamily: "var(--font-serif)", color: "var(--text-heading)", marginBottom: "1rem" }}>
                      {day.title}
                    </h3>
                    <p style={{ opacity: 0.85, fontSize: "0.98rem", marginBottom: "2rem", lineHeight: "1.7", color: "var(--text-primary)" }}>
                      {day.summary}
                    </p>

                    {/* Activities List */}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      {day.activities.map((act, aIdx) => (
                        <div key={aIdx} style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                          <div style={{ minWidth: "90px", fontWeight: "bold", color: "var(--accent)", fontSize: "0.95rem" }}>
                            {act.time}
                          </div>
                          <div style={{ flex: 1, minWidth: "250px" }}>
                            <div style={{ fontWeight: "bold", color: "var(--text-heading)", fontSize: "1.05rem", marginBottom: "4px" }}>
                              {act.activity}
                            </div>
                            <p style={{ opacity: 0.8, fontSize: "0.92rem", lineHeight: "1.6", margin: 0, color: "var(--text-primary)" }}>
                              {act.details}
                            </p>
                            {act.link && (
                              <div style={{ marginTop: "8px" }}>
                                <a href={act.link.url} target="_blank" rel="noopener noreferrer" className="direct-link">
                                  Official Website: {act.link.text} ↗
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* SECTION 3: LODGING */}
        <section id="lodging" className="fade-in" style={{ scrollMarginTop: "140px" }}>
          <div className="fade-in">
            <h2 style={{ fontSize: "2.5rem", fontFamily: "var(--font-serif)", textAlign: "center", marginBottom: "1rem" }}>
              Elite Accommodations
            </h2>
            <p style={{ opacity: 0.8, textAlign: "center", marginBottom: "4rem" }}>
              Explore the premium design properties secured for the Columbus chapter retreat.
            </p>

            <div className="responsive-grid-2">
              {/* Hotel Click Clack */}
              <div style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", overflow: "hidden" }} className="hover-lift">
                <div style={{ height: "300px", backgroundImage: "url('/assets/click_clack_user.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ padding: "2.5rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: "bold" }}>Medellín Retreat Base</span>
                  <h3 style={{ fontSize: "2rem", fontFamily: "var(--font-serif)", margin: "0.5rem 0 1rem", color: "var(--text-heading)" }}>Hotel Click Clack</h3>
                  <p style={{ opacity: 0.8, fontSize: "0.95rem", lineHeight: "1.7", marginBottom: "1.5rem", color: "var(--text-primary)" }}>
                    Distinguished by its acclaimed open-concept architecture and high-energy rooftop amenities, Hotel Click Clack is the definitive base of operations in Medellín. Nestled within the exclusive El Poblado district, the property acts as an ideal nexus balancing contemporary aesthetic sensibilities with local Colombian character. Proximity to Provenza ensures a seamless integration between scheduled events and nightly strolls.
                  </p>
                  <a href="https://www.clickclackhotel.com" target="_blank" rel="noopener noreferrer" className="direct-link" style={{ fontSize: "1rem" }}>
                    Official Website: Click Clack Medellín ↗
                  </a>
                </div>
              </div>

              {/* Sofitel Victoria Regia */}
              <div style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", overflow: "hidden" }} className="hover-lift">
                <div style={{ height: "300px", backgroundImage: "url('/assets/sofitel_user.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ padding: "2.5rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: "bold" }}>Bogotá Extension Base</span>
                  <h3 style={{ fontSize: "2rem", fontFamily: "var(--font-serif)", margin: "0.5rem 0 1rem", color: "var(--text-heading)" }}>Sofitel Victoria Regia</h3>
                  <p style={{ opacity: 0.8, fontSize: "0.95rem", lineHeight: "1.7", marginBottom: "1.5rem", color: "var(--text-primary)" }}>
                    Designed by the renowned Colombian architect Miguel Soto, this 5-star sanctuary is a masterwork of French elegance and high-altitude Andean soul. Located inside Zona T—the prestigious cosmopolitan center of Colombian fashion, art, and Michelin-level dining—this boutique hotel provides refined marble interiors, personalized service, and absolute security for our high-level briefings.
                  </p>
                  <a href="https://all.accor.com/hotel/1841/index.en.shtml" target="_blank" rel="noopener noreferrer" className="direct-link" style={{ fontSize: "1rem" }}>
                    Official Website: Sofitel Victoria Regia ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: FLIGHTS */}
        <section id="flights" className="fade-in" style={{ scrollMarginTop: "140px" }}>
          <div className="fade-in">
            <h2 style={{ fontSize: "2.5rem", fontFamily: "var(--font-serif)", textAlign: "center", marginBottom: "1rem" }}>
              Flight Routing Curation
            </h2>
            <FlightSuggestions />
          </div>
        </section>

        {/* SECTION 5: PRICING */}
        <section id="pricing" className="fade-in" style={{ scrollMarginTop: "140px" }}>
          <div className="fade-in">
            <h2 style={{ fontSize: "2.5rem", fontFamily: "var(--font-serif)", textAlign: "center", marginBottom: "1rem" }}>
              Ground Package Pricing
            </h2>
            <PricingGrid />
          </div>
        </section>

        {/* SECTION 6: REGISTRATION */}
        <section id="register" className="fade-in" style={{ scrollMarginTop: "140px" }}>
          <div className="fade-in" id="register">
            
            {/* Experience the Journey Videos */}
            <div style={{ marginBottom: "4rem" }}>
              <h2 style={{ fontSize: "2.5rem", fontFamily: "var(--font-serif)", textAlign: "center", marginBottom: "1rem", color: "var(--text-heading)" }}>
                Experience the Journey
              </h2>
              <p style={{ opacity: 0.8, textAlign: "center", marginBottom: "3rem", color: "var(--text-primary)" }}>
                Watch glimpses of the signature experiences awaiting our EO Columbus delegation.
              </p>
              
              <div className="bottom-videos-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "2rem", maxWidth: "900px", margin: "0 auto", justifyItems: "center" }}>
                {/* Helicopter Video */}
                <div className="bottom-video-card hover-lift" style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", overflow: "hidden", padding: "1.2rem", maxWidth: "450px", margin: "0 auto", width: "100%" }}>
                  <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", borderRadius: "8px", overflow: "hidden", background: "#0b1a19" }}>
                    <video
                      src="/assets/helicopter_tour.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: "bold" }}>
                      Andean Helicopter Flight
                    </span>
                  </div>
                </div>

                {/* Montserrat Video */}
                <div className="bottom-video-card hover-lift" style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", overflow: "hidden", padding: "1.2rem", maxWidth: "450px", margin: "0 auto", width: "100%" }}>
                  <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", borderRadius: "8px", overflow: "hidden", background: "#0b1a19" }}>
                    <video
                      src="/assets/montserrat_cable_car.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: "bold" }}>
                      Monserrate Cable Car
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", padding: "4rem 2rem", background: "var(--surface)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px" }}>
              <span style={{ fontSize: "2.5rem" }}>✈</span>
              <h2 style={{ fontSize: "2.5rem", fontFamily: "var(--font-serif)", margin: "1rem 0", color: "var(--text-heading)" }}>Passenger Registration Portal</h2>
              <p style={{ opacity: 0.85, fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "2.5rem", color: "var(--text-primary)" }}>
                Welcome, EO Columbus members and spouse/partners. Please complete the formal traveler registration below to confirm your ground package allocation and select your extension nights.
                <br /><br />
                A copy of your passport will be requested during registration. Please have it ready when you begin the form.
              </p>
              
              <div style={{
                background: "rgba(239, 156, 130, 0.08)", padding: "1.5rem 2rem", borderRadius: "12px",
                display: "inline-block", border: "1px dashed var(--accent)", marginBottom: "2.5rem"
              }}>
                <span style={{ fontSize: "0.82rem", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.1em", display: "block" }}>Required Registration Details</span>
                <strong style={{ fontSize: "1.5rem", color: "white", marginTop: "4px", display: "block" }}>Trip ID: Columbus27</strong>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
                <a href="https://forms.zohopublic.com/caribbeanexecutivetravel1/form/HRTTravelRegistration/formperma/SHoOEyI-cABdddRGuEWJtOC16QHkqKNZAqN8ONrdI6M" target="_blank" rel="noopener noreferrer" style={{
                  background: "var(--accent)", color: "var(--bg-primary)", fontWeight: "bold",
                  textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.9rem",
                  padding: "1rem 3rem", borderRadius: "30px", border: "none", cursor: "pointer",
                  display: "inline-block", textDecoration: "none",
                  boxShadow: "0 4px 15px rgba(239,156,130,0.3)"
                }} className="hover-lift">
                  Begin Registration Form ➔
                </a>
                <span style={{ fontSize: "0.88rem", opacity: 0.95, marginTop: "8px", color: "white" }}>
                  Please use <strong style={{ color: "var(--accent)" }}>Trip ID: Columbus27</strong> on the registration form.
                </span>
                <span style={{ fontSize: "0.78rem", opacity: 0.5, marginTop: "2px" }}>Form takes approx. 4 minutes to complete. SECURE SSL ENCRYPTED CONNECTION.</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Implementation */}
      {activeMedia && (
        <Lightbox 
          item={activeMedia} 
          onClose={() => setActiveMedia(null)}
        />
      )}

      {/* Footer */}
      <footer style={{
        background: "var(--surface)", borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "4rem 2rem 2rem", fontSize: "0.88rem", opacity: 0.8
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <strong style={{ fontSize: "1.2rem", fontFamily: "var(--font-serif)", color: "var(--accent)", display: "block" }}>Hidden Rhythms</strong>
            <span style={{ fontSize: "0.75rem", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.15em" }}>Bespoke Premium Curations</span>
          </div>
          <div style={{ display: "flex", gap: "2rem", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.75rem" }}>
            <span style={{ cursor: "pointer" }} onClick={() => scrollToSection("program")}>Itinerary</span>
            <span style={{ cursor: "pointer" }} onClick={() => scrollToSection("gallery")}>Gallery</span>
            <span style={{ cursor: "pointer" }} onClick={() => scrollToSection("lodging")}>Accommodations</span>
            <span style={{ cursor: "pointer" }} onClick={() => scrollToSection("pricing")}>Pricing and Terms</span>
          </div>
        </div>
        <div style={{ maxWidth: "1200px", margin: "2rem auto 0", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", fontSize: "0.75rem", opacity: 0.5 }}>
          <span>© 2026 Hidden Rhythms Travel. All rights reserved.</span>
          <span>Designed with local rhythms. A Curated Experience for EO.</span>
        </div>
      </footer>

    </div>
  );
}
