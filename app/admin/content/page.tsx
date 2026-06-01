'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ContentPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (section: string) => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    toast.success(`${section} content saved successfully`)
    setIsSaving(false)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Content Management</h1>
        <p className="text-gray-600">Edit website content and settings</p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="about">About Page</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="seo">SEO Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Edit the main hero section on the homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroTagline">Tagline</Label>
                <Input
                  id="heroTagline"
                  defaultValue="Premium Textile Manufacturing"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroHeadline">Headline</Label>
                <Input
                  id="heroHeadline"
                  defaultValue="Turn Your Fashion Vision Into Reality"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroSubheadline">Subheadline</Label>
                <Textarea
                  id="heroSubheadline"
                  defaultValue="From concept to creation, we help entrepreneurs and brands launch their own clothing lines with premium quality manufacturing and global fulfillment."
                  rows={3}
                />
              </div>
              <Button
                onClick={() => handleSave('Hero')}
                disabled={isSaving}
                className="bg-black text-white hover:bg-black/90"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Page</CardTitle>
              <CardDescription>Edit the about page content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aboutStory">Our Story</Label>
                <Textarea
                  id="aboutStory"
                  defaultValue="Founded with a vision to democratize fashion manufacturing, SWANKY Factory has grown from a small operation to a global manufacturing partner for hundreds of brands worldwide."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission">Mission Statement</Label>
                <Textarea
                  id="mission"
                  defaultValue="To empower fashion entrepreneurs and brands by providing exceptional textile manufacturing services that combine quality, innovation, and sustainability."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision">Vision Statement</Label>
                <Textarea
                  id="vision"
                  defaultValue="To be the world's most trusted textile manufacturing partner, known for our commitment to excellence, ethical practices, and the success of every brand we work with."
                  rows={3}
                />
              </div>
              <Button
                onClick={() => handleSave('About')}
                disabled={isSaving}
                className="bg-black text-white hover:bg-black/90"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update contact details displayed on the website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="info@swankyfactory.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (234) 567-890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input id="whatsapp" defaultValue="1234567890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours">Business Hours</Label>
                  <Input id="hours" defaultValue="Mon - Fri: 9:00 AM - 6:00 PM" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  defaultValue="123 Factory Street, Manufacturing District, City, Country 12345"
                  rows={2}
                />
              </div>
              <Button
                onClick={() => handleSave('Contact')}
                disabled={isSaving}
                className="bg-black text-white hover:bg-black/90"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Manage search engine optimization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteTitle">Site Title</Label>
                <Input
                  id="siteTitle"
                  defaultValue="SWANKY Factory | Premium Textile Manufacturing"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Meta Description</Label>
                <Textarea
                  id="siteDescription"
                  defaultValue="Premium textile manufacturing for fashion entrepreneurs. From concept to creation, we bring your clothing brand vision to life with custom apparel, private label production, and worldwide fulfillment."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  defaultValue="textile manufacturing, custom apparel, private label, clothing production"
                />
              </div>
              <Button
                onClick={() => handleSave('SEO')}
                disabled={isSaving}
                className="bg-black text-white hover:bg-black/90"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
