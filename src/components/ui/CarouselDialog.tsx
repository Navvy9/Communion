import React, { useState } from 'react';

// Example card data (replace with actual images and descriptions)
const cardData = [
  { 
    id: 1, 
    image: 'https://wallpaperbat.com/img/1508960-aesthetic-wallpaper-of-kedarnath-temple-with-himalyan-mountains-in-the-background.webp',
    description: <p>'Kedarnath is a town in the Rudraprayag district of Uttarakhand, India, known primarily for the Kedarnath Temple, a significant Hindu shrine dedicated to Lord Shiva. The temple is one of the twelve Jyotirlingas and is located in the Garhwal Himalayan range near the Mandakini River1.Situated at an elevation of about 3,583 meters'</p>
  },
  { 
    id: 2, 
    image: 'https://thumbs.dreamstime.com/b/wall-decorative-mekkah-kaaba-hajj-ai-generator-wall-decorative-mekkah-kaaba-hajj-ai-generator-311124247.jpg',
    description: 'The Kaaba, located in the center of the Great Mosque in Mecca, is the most sacred site in Islam. During Hajj, millions of Muslims from around the world gather to perform rituals, including circling the Kaaba seven times in a practice called Tawaf.'
  },
  { 
    id: 3, 
    image: 'https://img.freepik.com/premium-photo/church-night_1203138-47429.jpg',
    description: 'St Paul’s Cathedral in London is an iconic Anglican cathedral designed by Sir Christopher Wren. Completed in 1710, it stands on Ludgate Hill, the highest point in the City of London'
  },
  { 
    id: 4, 
    image: 'https://www.ghumindiaghum.com/images/Package/4g9WD1RIcJ/Shravasti_Main1.jpg',
    description: 'A peaceful view of the Buddhist holy site in Shravasti, India.Shravasti, located in Uttar Pradesh, India, is a revered Buddhist site where the Buddha spent many monastic seasons and performed several miracles'
  },
];

const CustomCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  // Handle next and previous navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length);
  };

  // Handle opening modal with selected card
  const handleCardClick = (card: any) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative flex flex-col justify-center items-center max-h-screen bg-gray-100 py-10">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="absolute left-5 bg-gray-200 hover:bg-gray-400 px-3 py-2 rounded-full"
      >
        &lt;
      </button>

      {/* Carousel - Showing 3 cards */}
      <div className="flex space-x-8">
        {cardData.slice(currentIndex, currentIndex + 3).map((card) => (
          <div
            key={card.id}
            className="cursor-pointer transition-transform transform hover:scale-110"
            onClick={() => handleCardClick(card)}
          >
            <div className="w-64 h-64 flex justify-center items-center border border-gray-300 rounded-lg overflow-hidden shadow-lg">
              <img src={card.image} alt={`Card ${card.id}`} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-5 bg-gray-200 hover:bg-gray-400 px-3 py-2 rounded-full"
      >
        &gt;
      </button>

      {/* Modal with Blur Background */}
      {isModalOpen && selectedCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
              onClick={closeModal}
            >
              Close
            </button>

            {/* Enlarged Image and Description */}
            <div className="flex space-x-8 justify-center">
              {/* Image of the clicked card */}
              <div className="w-80 h-80 flex justify-center items-center border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                <img src={selectedCard.image} alt={`Card ${selectedCard.id}`} className="w-full h-full object-cover" />
              </div>

              {/* Description of the clicked card */}
              <div className="w-80 h-80 flex flex-col justify-center items-center p-4 border border-gray-300 rounded-lg shadow-lg">
                <p className="text-lg text-center">{selectedCard.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCarousel;
