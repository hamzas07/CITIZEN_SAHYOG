import React from 'react';
import { User, Bell, Shield, Moon, Globe, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();

  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: User,
      items: [
        { label: 'Name', value: user?.name },
        { label: 'Email', value: user?.email },
        { label: 'Role', value: user?.role?.toUpperCase() },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', type: 'toggle', value: true },
        { label: 'SMS Alerts', type: 'toggle', value: false },
        { label: 'Push Notifications', type: 'toggle', value: true },
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        { label: 'Two-Factor Authentication', type: 'toggle', value: false },
        { label: 'Login Activity', type: 'link' },
        { label: 'Change Password', type: 'link' },
      ]
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account preferences
        </p>
      </div>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => (
        <div 
          key={section.title} 
          className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in"
          style={{ animationDelay: `${0.1 * sectionIndex}s` }}
        >
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <section.icon className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-semibold text-foreground">{section.title}</h2>
          </div>
          <div className="divide-y divide-border">
            {section.items.map((item, itemIndex) => (
              <div key={item.label} className="px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-foreground">{item.label}</span>
                {item.type === 'toggle' ? (
                  <button className={`w-10 h-6 rounded-full relative transition-colors ${
                    item.value ? 'bg-primary' : 'bg-muted'
                  }`}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      item.value ? 'right-1' : 'left-1'
                    }`} />
                  </button>
                ) : item.type === 'link' ? (
                  <button className="text-sm text-primary hover:underline">
                    Manage
                  </button>
                ) : (
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Help Section */}
      <div className="bg-card rounded-xl border border-border p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Need Help?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Contact our support team for assistance with your account or complaints.
            </p>
            <button className="mt-3 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="text-center text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <p>Citizen Sahyog v1.0.0</p>
        <p className="mt-1">© 2025 Government of India. All rights reserved.</p>
      </div>
    </div>
  );
}
