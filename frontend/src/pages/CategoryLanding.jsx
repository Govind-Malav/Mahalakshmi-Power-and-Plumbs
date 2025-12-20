import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Panel = ({ title, subtitle, img, onClick, cta }) => (
  <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
    <div
      className="h-48 bg-contain bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${img})` }}
    />
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{subtitle}</p>
      <button
        onClick={onClick}
        className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-500"
      >
        {cta}
      </button>
    </div>
  </div>
);

const CategoryLanding = ({ categoryFromProps }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // allow route param or prop
  const path = location.pathname;
  const category = categoryFromProps || (path.includes("electrical") ? "electrical" : "sanitary");

  const title = category === "electrical" ? "Electrical" : "Sanitary";

  const productsImg =
    category === "electrical" ? "/images/microwave-stove.jpg" : "/images/tap.jpg";

  const essentialsLabel =
    category === "electrical" ? "Appliances" : "Essentials";

  const essentialsImg =
    category === "electrical" ? "/images/led-fitting.jpg" : "/images/pipe.jpg";
  const essentialsType = category === "electrical" ? "appliances" : "essentials";

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">{title}</h1>
        <p className="text-gray-600 mt-2">Explore curated selections and essentials</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <Panel
          title={`${title} Products`}
          subtitle={`Shop top ${title.toLowerCase()} products — quality brands and warranty.`}
          img={productsImg}
          cta="Browse Products"
          onClick={() => navigate(`/products?category=${category}&type=products`)}
        />

        <Panel
          title={`${title} ${essentialsLabel}`}
          subtitle={`Find essential ${essentialsLabel.toLowerCase()} and accessories for ${title.toLowerCase()} installations.`}
          img={essentialsImg}
          cta={`View ${essentialsLabel}`}
          onClick={() => navigate(`/products?category=${category}&type=${essentialsType}`)}
        />
      </div>
    </div>
  );
};

export default CategoryLanding;
