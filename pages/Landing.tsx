
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Edit3, Layout, Shield } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';

const Landing = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Edit3 className="h-8 w-8 text-amber-500" />,
      title: "Mindful Journaling",
      description: "Document your thoughts, feelings, and experiences with our feature-rich journal editor."
    },
    {
      icon: <Calendar className="h-8 w-8 text-amber-500" />,
      title: "12-Week Planning",
      description: "Plan your goals and track your progress with our 12-Week Year methodology implementation."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-amber-500" />,
      title: "Markdown Notes",
      description: "Create and organize your notes using Markdown, with seamless integration with your journal entries."
    },
    {
      icon: <Shield className="h-8 w-8 text-amber-500" />,
      title: "No Login Required",
      description: "During our beta phase, access all features without creating an account. Your data stays on your device."
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <AnimatedTransition>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-amber-800">
              Mindful Journal
            </h1>
            <p className="text-lg md:text-xl text-amber-700 max-w-2xl mx-auto mb-10">
              A modern journaling app designed to help you achieve your goals with the 12-Week Year methodology and mindful practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/')} 
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-6 text-lg"
              >
                Start Journaling
              </Button>
              <Button 
                onClick={() => navigate('/twelve-week')} 
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-100 px-8 py-6 text-lg"
              >
                Explore 12-Week Planning
              </Button>
            </div>
          </AnimatedTransition>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white/80">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12 text-amber-800">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AnimatedTransition delay={100 * index} key={index}>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100 hover:shadow-md transition-all">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-medium mb-2 text-amber-800">{feature.title}</h3>
                  <p className="text-amber-700">{feature.description}</p>
                </div>
              </AnimatedTransition>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-amber-100/70">
        <div className="container mx-auto px-4 text-center">
          <AnimatedTransition>
            <h2 className="text-3xl font-semibold mb-6 text-amber-800">Ready to start your journey?</h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto mb-8">
              Begin your mindfulness journey today with Mindful Journal. No account required during beta.
            </p>
            <Button 
              onClick={() => navigate('/dashboard')} 
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-6 text-lg"
            >
              <Layout className="mr-2 h-5 w-5" />
              Go to Dashboard
            </Button>
          </AnimatedTransition>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-amber-800 text-amber-100">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Mindful Journal. All rights reserved.</p>
          <p className="mt-2 text-sm">Currently in Beta - No login required to access all features</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
