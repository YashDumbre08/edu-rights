import React, { useState, useEffect } from 'react';

const Reviews = ({ darkMode = false }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reviews from the public folder
    fetch('/reviews.json')
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading reviews:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading reviews...</div>;
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <section className={`py-20 px-6 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 text-lg font-semibold mb-4 block">Testimonials</span>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            What Students & Parents Say
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Discover how Legal Champs is transforming legal education for young learners across India
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'
              }`}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {renderStars(review.rating)}
              </div>

              {/* Comment */}
              <p className={`text-lg mb-6 leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                "{review.comment}"
              </p>

              {/* Divider */}
              <div className={`h-px mb-6 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>

              {/* Reviewer Info */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {review.reviewerName}
                  </h3>
                  <p className="text-blue-600 font-semibold text-sm mb-2">
                    {review.role}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    📍 {review.location}
                  </p>
                </div>
                <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
