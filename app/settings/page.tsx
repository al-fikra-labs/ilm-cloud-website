"use client"

import { useState } from "react"
import { Bell, Download, Globe, Moon, Sun, Volume2, Shield, User, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/contexts/language-context"

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [autoDownload, setAutoDownload] = useState(false)
  const [offlineMode, setOfflineMode] = useState(false)
  const [volume, setVolume] = useState([75])
  const [audioQuality, setAudioQuality] = useState("high")
  const [downloadQuality, setDownloadQuality] = useState("medium")

  return (
    <div className="flex-1 p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{t("nav.settings")}</h1>
        <p className="text-muted-foreground">Manage your account and app preferences</p>
      </div>

      <div className="space-y-6">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account
            </CardTitle>
            <CardDescription>Manage your account information and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Profile Information</h4>
                <p className="text-sm text-muted-foreground">Update your name, email, and profile picture</p>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-muted-foreground">Update your account password</p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Language & Region
            </CardTitle>
            <CardDescription>Choose your preferred language and regional settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">App Language</h4>
                <p className="text-sm text-muted-foreground">Select your preferred language</p>
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ml">മലയാളം</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              Appearance
            </CardTitle>
            <CardDescription>Customize how the app looks and feels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Dark Mode</h4>
                <p className="text-sm text-muted-foreground">Use dark theme for better viewing in low light</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </CardContent>
        </Card>

        {/* Audio Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Audio Settings
            </CardTitle>
            <CardDescription>Configure audio playback and quality settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Volume</h4>
                <span className="text-sm text-muted-foreground">{volume[0]}%</span>
              </div>
              <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-full" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Streaming Quality</h4>
                <p className="text-sm text-muted-foreground">Higher quality uses more data</p>
              </div>
              <Select value={audioQuality} onValueChange={setAudioQuality}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="very-high">Very High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Download Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Settings
            </CardTitle>
            <CardDescription>Manage offline downloads and storage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Download Quality</h4>
                <p className="text-sm text-muted-foreground">Quality for offline downloads</p>
              </div>
              <Select value={downloadQuality} onValueChange={setDownloadQuality}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Auto Download</h4>
                <p className="text-sm text-muted-foreground">
                  Automatically download new episodes from subscribed courses
                </p>
              </div>
              <Switch checked={autoDownload} onCheckedChange={setAutoDownload} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Download via WiFi only</h4>
                <p className="text-sm text-muted-foreground">Only download when connected to WiFi</p>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>Control what notifications you receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Push Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive notifications about new courses and updates</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive email updates about your courses</p>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>Manage your privacy and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Data Usage</h4>
                <p className="text-sm text-muted-foreground">View and manage your data usage</p>
              </div>
              <Button variant="outline">View Usage</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Privacy Policy</h4>
                <p className="text-sm text-muted-foreground">Read our privacy policy</p>
              </div>
              <Button variant="outline">View Policy</Button>
            </div>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Help & Support
            </CardTitle>
            <CardDescription>Get help and contact support</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Help Center</h4>
                <p className="text-sm text-muted-foreground">Find answers to common questions</p>
              </div>
              <Button variant="outline">Visit Help Center</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Contact Support</h4>
                <p className="text-sm text-muted-foreground">Get in touch with our support team</p>
              </div>
              <Button variant="outline">Contact Us</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">App Version</h4>
                <p className="text-sm text-muted-foreground">AudioCourse v1.0.0</p>
              </div>
              <Button variant="outline">Check for Updates</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
