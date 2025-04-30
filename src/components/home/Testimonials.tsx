
const testimonials = [
  {
    id: 1,
    name: "Rohit Sharma",
    role: "4th Year CSE Student",
    text: "Campus Market helped me sell all my textbooks within days! I made good money and didn't have to carry them home. The local campus network makes transactions safe and convenient.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Aisha Patel",
    role: "3rd Year ECE Student",
    text: "I found a great deal on a barely used graphing calculator that I needed for my engineering course. Saved me thousands compared to buying new, and the seller was just in the next hostel block!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Akash Verma",
    role: "2nd Year CSE Student",
    text: "As a new student, I needed to furnish my room. Found everything from desk lamps to storage bins from seniors at amazing prices. Campus Market is now my go-to for everything!",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">What Students Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from fellow IIIT RK Valley students who use Campus Market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-4">
                <svg width="24" height="18" xmlns="http://www.w3.org/2000/svg" className="text-campus-primary/20 mb-2">
                  <path d="M14.425 0c2.375 0 4.25.6 5.625 1.8C21.425 3 22.113 4.7 22.113 6.9c0 2.4-.775 4.433-2.325 6.1-1.55 1.667-3.55 2.9-6 3.7l-.6-1.2c1.8-.7 3.25-1.717 4.35-3.05 1.1-1.333 1.65-2.75 1.65-4.25 0-.5-.125-.933-.375-1.3-.25-.367-.625-.55-1.125-.55-.55 0-1.025.183-1.425.55-.4.367-.6.817-.6 1.35 0 .533.175 1.033.525 1.5.35.467.775.833 1.275 1.1-.4 1.233-1.175 2.217-2.325 2.95-1.15.733-2.4 1.1-3.75 1.1-1.5 0-2.675-.433-3.525-1.3-.85-.867-1.275-2.017-1.275-3.45 0-1.8.6-3.483 1.8-5.05C9.7 3.017 11.825 1.233 14.425 0zm-11 0c2.375 0 4.25.6 5.625 1.8C10.425 3 11.113 4.7 11.113 6.9c0 2.4-.775 4.433-2.325 6.1-1.55 1.667-3.55 2.9-6 3.7l-.6-1.2c1.8-.7 3.25-1.717 4.35-3.05 1.1-1.333 1.65-2.75 1.65-4.25 0-.5-.125-.933-.375-1.3-.25-.367-.625-.55-1.125-.55-.55 0-1.025.183-1.425.55-.4.367-.6.817-.6 1.35 0 .533.175 1.033.525 1.5.35.467.775.833 1.275 1.1-.4 1.233-1.175 2.217-2.325 2.95-1.15.733-2.4 1.1-3.75 1.1-1.5 0-2.675-.433-3.525-1.3C.675 13.233.25 12.083.25 10.65c0-1.8.6-3.483 1.8-5.05C3.7 3.017 5.825 1.233 8.425 0z" fill="currentColor" fillRule="nonzero"/>
                </svg>
                <p className="text-gray-700 italic">{testimonial.text}</p>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
