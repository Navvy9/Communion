import React, { useState } from 'react';

// 25 Learnings/Quotes for each holy book
const quotesData = {
  gita: [
    "You have the right to work, but never to its fruits.",
    "The soul is neither born, nor does it die.",
    "Set thy heart upon thy work, but never on its reward.",
    "For one who has conquered his mind, a mind is the best of friends.",
    "The wise see the same soul in a humble sage and a learned priest.",
    "We are kept from our goal not by obstacles but by a clear path to a lesser goal.",
    "Yoga is the journey of the self, through the self, to the self.",
    "The peace of mind that comes from detachment is the highest happiness.",
    "Perform your duty with a calm mind, free from all attachment.",
    "You have the right to perform your duties, but you are not entitled to the fruits of your actions.",
    // More quotes
  ],
  bible: [
    "I can do all things through Christ who strengthens me.",
    "Love is patient, love is kind. It does not envy, it does not boast.",
    "The Lord is my shepherd; I shall not want.",
    "For God so loved the world, that he gave his only Son.",
    "Trust in the Lord with all your heart and lean not on your own understanding.",
    "Do unto others as you would have them do unto you.",
    "God is our refuge and strength, a very present help in trouble.",
    "The Lord is my light and my salvation; whom shall I fear?",
    "Faith can move mountains.",
    "Love never fails.",
    // More quotes
  ],
  quran: [
    "Indeed, Allah is with the patient.",
    "And whoever fears Allah, He will make for him a way out.",
    "Indeed, the mercy of Allah is near to the doers of good.",
    "Allah does not burden a soul beyond that it can bear.",
    "So verily, with the hardship, there is relief.",
    "The truth is from your Lord, so do not be among the doubters.",
    "And whoever puts their trust in Allah, He will be enough for him.",
    "And seek help in patience and prayer.",
    "Indeed, the best provision is righteousness.",
    "The remembrance of Allah is the greatest.",
    // More quotes
  ],
  tripitaka: [
    "Hatred does not cease by hatred, but only by love.",
    "Peace comes from within. Do not seek it without.",
    "There is no path to happiness. Happiness is the path.",
    "Every morning we are born again. What we do today is what matters most.",
    "To live a pure unselfish life, one must count nothing as one's own.",
    "Thousands of candles can be lit from a single candle, and the life of the candle will not be shortened.",
    "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.",
    "No one saves us but ourselves. We must walk the path.",
    "An idea that is developed and put into action is more important than an idea that exists only as an idea.",
    "What you think, you become.",
    // More quotes
  ]
};

const DivineQuotes: React.FC = () => {
  const [gitaIndex, setGitaIndex] = useState(0);
  const [bibleIndex, setBibleIndex] = useState(0);
  const [quranIndex, setQuranIndex] = useState(0);
  const [tripitakaIndex, setTripitakaIndex] = useState(0);

  // Functions to handle clicks on each card
  const handleGitaClick = () => setGitaIndex((prevIndex) => (prevIndex + 1) % quotesData.gita.length);
  const handleBibleClick = () => setBibleIndex((prevIndex) => (prevIndex + 1) % quotesData.bible.length);
  const handleQuranClick = () => setQuranIndex((prevIndex) => (prevIndex + 1) % quotesData.quran.length);
  const handleTripitakaClick = () => setTripitakaIndex((prevIndex) => (prevIndex + 1) % quotesData.tripitaka.length);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">Divine Wisdom from Holy Scriptures</h1>

      {/* Four Cards */}
      <div className="grid grid-cols-2 gap-16">
        {/* Gita Card */}
        <div
          className="relative cursor-pointer w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex flex-col justify-center items-center rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
          onClick={handleGitaClick}
        >
          <div className="text-2xl font-semibold mb-4">Bhagavad Gita</div>
          <div className="text-center text-lg italic px-4">"{quotesData.gita[gitaIndex]}"</div>
          <div className="mt-4 text-xs absolute bottom-4">- Gita Wisdom</div>
        </div>

        {/* Bible Card */}
        <div
          className="relative cursor-pointer w-80 h-80 bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex flex-col justify-center items-center rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
          onClick={handleBibleClick}
        >
          <div className="text-2xl font-semibold mb-4">Holy Bible</div>
          <div className="text-center text-lg italic px-4">"{quotesData.bible[bibleIndex]}"</div>
          <div className="mt-4 text-xs absolute bottom-4">- Bible Verse</div>
        </div>

        {/* Quran Card */}
        <div
          className="relative cursor-pointer w-80 h-80 bg-gradient-to-br from-green-400 to-teal-600 text-white flex flex-col justify-center items-center rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
          onClick={handleQuranClick}
        >
          <div className="text-2xl font-semibold mb-4">Holy Quran</div>
          <div className="text-center text-lg italic px-4">"{quotesData.quran[quranIndex]}"</div>
          <div className="mt-4 text-xs absolute bottom-4">- Quran Insight</div>
        </div>

        {/* Tripitaka Card */}
        <div
          className="relative cursor-pointer w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 text-white flex flex-col justify-center items-center rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
          onClick={handleTripitakaClick}
        >
          <div className="text-2xl font-semibold mb-4">Tripitaka</div>
          <div className="text-center text-lg italic px-4">"{quotesData.tripitaka[tripitakaIndex]}"</div>
          <div className="mt-4 text-xs absolute bottom-4">- Buddhist Teachings</div>
        </div>
      </div>
    </div>
  );
};

export default DivineQuotes;
