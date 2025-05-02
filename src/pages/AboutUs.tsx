
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">About Campus Market</h1>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  Campus Market was created with a simple mission: to provide IIIT RK Valley students with a safe, 
                  convenient platform to buy and sell used items within the campus community. We believe in promoting 
                  sustainability by giving items a second life while helping students save money.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
                <p className="text-gray-700 mb-4">
                  We are a team of IIIT RK Valley students who recognized the need for a dedicated marketplace 
                  for our campus community. Our platform was built by students, for students, with the unique 
                  needs and challenges of campus life in mind.
                </p>
                <p className="text-gray-700">
                  Our team consists of passionate developers, designers, and student entrepreneurs committed to 
                  providing an exceptional service to our fellow students.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">How It Works</h2>
                <p className="text-gray-700 mb-4">
                  Campus Market provides a platform where students can list items they no longer need and browse 
                  listings from other students. From textbooks and electronics to furniture and clothing, our 
                  marketplace covers a wide range of categories.
                </p>
                <p className="text-gray-700">
                  We've designed the platform to be intuitive and user-friendly, with built-in messaging and 
                  search functionality to make the buying and selling process as smooth as possible.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Our Values</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Community</h3>
                    <p className="text-gray-700">We prioritize building a trusted community of buyers and sellers within IIIT RK Valley.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Sustainability</h3>
                    <p className="text-gray-700">By facilitating the reuse of items, we contribute to reducing waste and promoting sustainable consumption.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Affordability</h3>
                    <p className="text-gray-700">We help students save money by providing access to affordable used items.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Transparency</h3>
                    <p className="text-gray-700">We believe in being transparent about how our platform works and how we use your data.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  Have questions, suggestions, or feedback? We'd love to hear from you!
                </p>
                <p className="text-gray-700">
                  Email: campusmarket@iiitrkv.ac.in<br />
                  Location: Student Center, IIIT RK Valley Campus
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
