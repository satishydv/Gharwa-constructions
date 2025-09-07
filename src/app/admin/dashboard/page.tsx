'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Star, 
  Eye, 
  Clock,
  TrendingUp,
  Users,
  Image as ImageIcon,
  Sliders
} from "lucide-react";

interface DashboardStats {
  totalReviews: number;
  activeReviews: number;
  pendingReviews: number;
  averageRating: number;
  totalGalleryImages: number;
  totalHeroImages: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalReviews: 0,
    activeReviews: 0,
    pendingReviews: 0,
    averageRating: 0,
    totalGalleryImages: 0,
    totalHeroImages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch reviews stats
        const reviewsResponse = await fetch('/api/admin/reviews?limit=1000', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const reviewsData = await reviewsResponse.json();
        
        if (reviewsResponse.ok) {
          const reviews = reviewsData.reviews || [];
          const totalReviews = reviews.length;
          const activeReviews = reviews.filter((r: any) => r.status === 'active').length;
          const pendingReviews = reviews.filter((r: any) => r.status === 'pending').length;
          const averageRating = reviews.length > 0 
            ? (reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 0;

          setStats(prev => ({
            ...prev,
            totalReviews,
            activeReviews,
            pendingReviews,
            averageRating: parseFloat(averageRating)
          }));
        }

        // Fetch gallery images count
        const galleryResponse = await fetch('/api/gallery-images');
        const galleryData = await galleryResponse.json();
        if (galleryResponse.ok) {
          setStats(prev => ({
            ...prev,
            totalGalleryImages: galleryData.images?.length || 0
          }));
        }

        // Fetch hero images count
        const heroResponse = await fetch('/api/hero-images');
        const heroData = await heroResponse.json();
        if (heroResponse.ok) {
          setStats(prev => ({
            ...prev,
            totalHeroImages: heroData.images?.length || 0
          }));
        }

      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Reviews',
      value: stats.totalReviews,
      icon: MessageSquare,
      color: 'text-blue-600 bg-blue-100',
      description: 'All submitted reviews'
    },
    {
      title: 'Active Reviews',
      value: stats.activeReviews,
      icon: Eye,
      color: 'text-green-600 bg-green-100',
      description: 'Currently displayed'
    },
    {
      title: 'Pending Reviews',
      value: stats.pendingReviews,
      icon: Clock,
      color: 'text-yellow-600 bg-yellow-100',
      description: 'Awaiting approval'
    },
    {
      title: 'Average Rating',
      value: stats.averageRating,
      icon: Star,
      color: 'text-orange-600 bg-orange-100',
      description: 'Out of 5 stars'
    },
    {
      title: 'Gallery Images',
      value: stats.totalGalleryImages,
      icon: ImageIcon,
      color: 'text-purple-600 bg-purple-100',
      description: 'Total uploaded'
    },
    {
      title: 'Hero Images',
      value: stats.totalHeroImages,
      icon: Sliders,
      color: 'text-indigo-600 bg-indigo-100',
      description: 'Slider images'
    }
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard. Here's an overview of your website content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/reviews"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageSquare className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Manage Reviews</h3>
              <p className="text-sm text-gray-600">Approve or reject customer reviews</p>
            </div>
          </a>
          
          <a
            href="/admin/gallery"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ImageIcon className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Gallery Management</h3>
              <p className="text-sm text-gray-600">Upload and organize gallery images</p>
            </div>
          </a>
          
          <a
            href="/admin/hero-slider"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Sliders className="w-8 h-8 text-indigo-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Hero Slider</h3>
              <p className="text-sm text-gray-600">Manage homepage slider images</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="text-center py-8">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Recent activity will be displayed here</p>
          <p className="text-sm text-gray-500 mt-2">This feature will show recent reviews, uploads, and other activities</p>
        </div>
      </div>
    </div>
  );
}
