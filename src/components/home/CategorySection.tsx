
import { Link } from "react-router-dom";

const categories = [
  {
    id: "books",
    name: "Books",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1600",
    description: "Textbooks, novels, study materials and more",
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1600",
    description: "Laptops, phones, peripherals and accessories",
  },
  {
    id: "stationery",
    name: "Stationery",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc1b640?auto=format&fit=crop&q=80&w=1600",
    description: "Notebooks, pens, art supplies and tools",
  },
  {
    id: "clothing",
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?auto=format&fit=crop&q=80&w=1600",
    description: "Apparel, shoes, accessories and more",
  },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Shop By Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find exactly what you need from our wide range of categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-64 transform hover:-translate-y-1"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-200">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
