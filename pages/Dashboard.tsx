
import React from 'react';
import Navbar from "@/components/Navbar";
import TwelveWeekCounter from "@/components/TwelveWeekCounter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, PlusCircle, Timer, Calendar, Edit3, Download, BookMarked } from 'lucide-react';
import { toast } from 'sonner';
import TemplateBuilder from '@/components/TemplateBuilder';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleExportObsidian = () => {
    toast.success("Templates exported for Obsidian");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold mb-2">
                {user ? `Welcome, ${user.email?.split('@')[0] || 'User'}` : 'Welcome to Mindful Journal (Beta)'}
              </h1>
              <p className="text-gray-500">
                {user ? 'Your mindfulness journey dashboard' : 'All features are accessible without login during beta'}
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex items-center space-x-2">
              <Button variant="outline" className="flex items-center border-amber-600/30 text-amber-800 hover:bg-amber-50 hover:text-amber-900" onClick={() => navigate('/wiki')}>
                <BookMarked className="h-4 w-4 mr-2" />
                View Wiki
              </Button>
              <Button variant="outline" className="flex items-center border-amber-600/30 text-amber-800 hover:bg-amber-50 hover:text-amber-900" onClick={handleExportObsidian}>
                <Download className="h-4 w-4 mr-2" />
                Export to Obsidian
              </Button>
              <Button className="flex items-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white" onClick={() => navigate('/')}>
                <Edit3 className="h-4 w-4 mr-2" />
                New Journal Entry
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <TwelveWeekCounter className="lg:col-span-2" />
            
            <Card className="shadow-sm border-amber-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-amber-600" />
                    Recent Journals
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/archive')} className="text-amber-700 hover:text-amber-900 hover:bg-amber-50">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="border border-amber-100 rounded-md p-3 hover:bg-amber-50 cursor-pointer">
                    <p className="font-medium">Morning Reflection</p>
                    <p className="text-sm text-gray-500">Today, 8:30 AM</p>
                  </div>
                  <div className="border border-amber-100 rounded-md p-3 hover:bg-amber-50 cursor-pointer">
                    <p className="font-medium">Weekly Planning</p>
                    <p className="text-sm text-gray-500">Yesterday, 7:15 PM</p>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full mt-4 text-amber-700 hover:text-amber-900 hover:bg-amber-50" onClick={() => navigate('/')}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Journal Entry
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-amber-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <Timer className="h-5 w-5 mr-2 text-amber-600" />
                    Recent Meditations
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/meditations')} className="text-amber-700 hover:text-amber-900 hover:bg-amber-50">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="border border-amber-100 rounded-md p-3 hover:bg-amber-50 cursor-pointer">
                    <p className="font-medium">Mindful Breathing</p>
                    <p className="text-sm text-gray-500">15 min • Today</p>
                  </div>
                  <div className="border border-amber-100 rounded-md p-3 hover:bg-amber-50 cursor-pointer">
                    <p className="font-medium">Body Scan</p>
                    <p className="text-sm text-gray-500">10 min • 2 days ago</p>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full mt-4 text-amber-700 hover:text-amber-900 hover:bg-amber-50" onClick={() => navigate('/meditations')}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Start Meditation
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="templates" className="mb-8">
            <TabsList className="mb-4 bg-amber-50/50 border border-amber-100">
              <TabsTrigger value="templates" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">Template Builder</TabsTrigger>
              <TabsTrigger value="calendar" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">12-Week Calendar</TabsTrigger>
            </TabsList>
            <TabsContent value="templates">
              <Card className="border-amber-100">
                <CardHeader>
                  <CardTitle>Create & Manage Templates</CardTitle>
                  <CardDescription>
                    Build custom templates for your journal entries, meditations, and 12-Week plans
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TemplateBuilder />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="calendar">
              <Card className="border-amber-100">
                <CardHeader>
                  <CardTitle>12-Week Year Calendar</CardTitle>
                  <CardDescription>
                    Track your progress and plan your 12-Week year
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-20">
                    <Calendar className="h-16 w-16 mx-auto text-amber-300 mb-4" />
                    <h3 className="text-xl font-medium mb-2">12-Week Calendar Coming Soon</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      We're working on a full-featured 12-Week Year calendar to help you plan and track your goals.
                    </p>
                    <Button onClick={() => navigate('/wiki/twelve-week')} className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
                      View 12-Week Year Wiki
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
