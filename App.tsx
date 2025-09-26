import React, { useState } from 'react';
import type { Language, Ingredient } from './types';
import { translations } from './constants/translations';
import { ingredients } from './constants/ingredients';
import FeedbackCharts from './components/FeedbackCharts';
import BodyGraphic from './components/BodyGraphic';
import IngredientModal from './components/IngredientModal';
import ImageZoomModal from './components/ImageZoomModal';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('es');
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const t = translations[language];
  
  const productImages = Array.from({ length: 9 }, (_, i) => `/image/product${i + 1}.jpg`);

  return (
    <div className="min-h-screen font-sans">
      <header className="bg-black shadow-lg shadow-black/10 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/image/logo.png" alt={t.headerLogoAlt} className="w-[120px] h-[60px] object-contain" />
            <h1 className="text-2xl font-bold text-white">{t.headerTitle}</h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setLanguage('es')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${language === 'es' ? 'bg-[#507328] text-white shadow' : 'bg-transparent text-gray-300 border border-gray-700 hover:bg-[#507328] hover:text-white hover:border-[#507328]'}`}
            >
              Español
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${language === 'en' ? 'bg-[#507328] text-white shadow' : 'bg-transparent text-gray-300 border border-gray-700 hover:bg-[#507328] hover:text-white hover:border-[#507328]'}`}
            >
              English
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section id="product-info" className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">{t.productTitle}</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">{t.productDescription}</p>
        </section>

        <section id="media" className="mb-16">
            <div className="flex flex-col gap-16">
                <div className="max-w-3xl mx-auto w-full">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">{t.videoTitle}</h3>
                    <div className="aspect-video rounded-lg overflow-hidden shadow-lg shadow-black/15">
                        {language === 'es' ? (
                            <iframe src="https://www.youtube.com/embed/c8hvSMk906M?si=mLD9lQWa10sTsVr7=0" title="Video del producto en español" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
                        ) : (
                            <iframe src="https://www.youtube.com/embed/1ylEpICDQBg?si=K801QgjG02Z6MkJ9=0" title="Product video in English" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
                        )}
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">{t.galleryTitle}</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {productImages.map((src, index) => (
                        <img
                          key={src}
                          src={src}
                          alt={`Product shot ${index + 1}`}
                          className="rounded-lg shadow-lg object-cover w-full h-full aspect-video cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => setZoomedImage(src)}
                        />
                      ))}
                    </div>
                </div>
            </div>
        </section>


        <section id="ingredients" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">{t.ingredientsTitle}</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {ingredients.map((ingredient) => (
              <button
                key={ingredient.id}
                onClick={() => setSelectedIngredient(ingredient)}
                className="group flex flex-col items-center text-center p-2 bg-white/40 rounded-lg shadow-md hover:shadow-lg hover:shadow-[#a58545]/20 hover:-translate-y-1 transition-all duration-300"
              >
                <img src={ingredient.image} alt={ingredient.name[language]} className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-transparent group-hover:border-[#507328] transition-colors" />
                <span className="text-sm font-medium text-gray-800">{ingredient.name[language]}</span>
              </button>
            ))}
          </div>
        </section>

        <section id="feedback">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">{t.feedbackTitle}</h2>
          <FeedbackCharts language={language} />
        </section>
      </main>

      {selectedIngredient && (
        <IngredientModal
          ingredient={selectedIngredient}
          language={language}
          onClose={() => setSelectedIngredient(null)}
        />
      )}

      {zoomedImage && (
        <ImageZoomModal src={zoomedImage} onClose={() => setZoomedImage(null)} />
      )}
      
      <footer className="text-center py-6 mt-12 text-gray-700 text-sm border-t border-gray-900/20">
        <p>Vital Leafs &copy; {new Date().getFullYear()}. All Rights Reserved.</p>
        <p className="mt-1 max-w-2xl mx-auto">This product is a dietary supplement and is not intended to diagnose, treat, cure, or prevent any disease. Please read labels, warnings, and directions before using or consuming a product.</p>
      </footer>
    </div>
  );
};

export default App;