'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EditHeroModal from '@/components/Admin/EditHeroModal';

interface HeroImage {
  id: number;
  name: string;
  filename: string;
  url: string;
  alt: string;
  order: number;
}

export default function AdminHeroSliderPage() {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([
    {
      id: 1,
      name: "Hero Image 1",
      filename: "Hero.jpg",
      url: "/Hero/Hero.jpg",
      alt: "Main hero image",
      order: 1
    },
    {
      id: 2,
      name: "Hero Image 2",
      filename: "hero2.webp",
      url: "/Hero/hero2.webp",
      alt: "Secondary hero image",
      order: 2
    },
    {
      id: 3,
      name: "Hero Image 3",
      filename: "hero3.webp",
      url: "/Hero/hero3.webp",
      alt: "Tertiary hero image",
      order: 3
    }
  ]);

  // Edit modal state
  const [editingImage, setEditingImage] = useState<HeroImage | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedImages(heroImages.map(img => img.id));
    } else {
      setSelectedImages([]);
    }
  };

  const handleSelectImage = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedImages(prev => [...prev, id]);
    } else {
      setSelectedImages(prev => prev.filter(imgId => imgId !== id));
    }
  };

  const handleDeleteMultiple = () => {
    if (selectedImages.length === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedImages.length} selected hero images?`)) {
      setHeroImages(prev => prev.filter(img => !selectedImages.includes(img.id)));
      setSelectedImages([]);
    }
  };

  const handleDeleteImage = (id: number) => {
    if (confirm('Are you sure you want to delete this hero image?')) {
      setHeroImages(prev => prev.filter(img => img.id !== id));
    }
  };

  const handleEditImage = (id: number) => {
    const image = heroImages.find(img => img.id === id);
    if (image) {
      setEditingImage(image);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = (updatedImage: HeroImage) => {
    setHeroImages(prev => 
      prev.map(img => 
        img.id === updatedImage.id ? updatedImage : img
      )
    );
    setIsEditModalOpen(false);
    setEditingImage(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingImage(null);
  };

  const handleReorder = (id: number, direction: 'up' | 'down') => {
    setHeroImages(prev => {
      const currentIndex = prev.findIndex(img => img.id === id);
      if (currentIndex === -1) return prev;

      const newImages = [...prev];
      if (direction === 'up' && currentIndex > 0) {
        // Move up
        [newImages[currentIndex], newImages[currentIndex - 1]] = 
        [newImages[currentIndex - 1], newImages[currentIndex]];
        // Update order
        newImages[currentIndex].order = currentIndex + 1;
        newImages[currentIndex - 1].order = currentIndex;
      } else if (direction === 'down' && currentIndex < newImages.length - 1) {
        // Move down
        [newImages[currentIndex], newImages[currentIndex + 1]] = 
        [newImages[currentIndex + 1], newImages[currentIndex]];
        // Update order
        newImages[currentIndex].order = currentIndex + 1;
        newImages[currentIndex + 1].order = currentIndex + 2;
      }
      return newImages;
    });
  };

  return (
    <section className="pt-32 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-600">Hero Slider Images</h1>
              <p className="text-gray-600 mt-2">Manage your hero section slider images</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleDeleteMultiple}
                disabled={selectedImages.length === 0}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Delete Multiple Data
              </button>
              <Link
                href="/admin/hero-slider/upload"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                ADD
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Images Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    <input
                      type="checkbox"
                      checked={selectedImages.length === heroImages.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {heroImages.map((image) => (
                  <tr key={image.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedImages.includes(image.id)}
                        onChange={(e) => handleSelectImage(image.id, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">{image.order}</span>
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => handleReorder(image.id, 'up')}
                            disabled={image.order === 1}
                            className="w-6 h-6 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded flex items-center justify-center text-xs"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => handleReorder(image.id, 'down')}
                            disabled={image.order === heroImages.length}
                            className="w-6 h-6 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded flex items-center justify-center text-xs"
                          >
                            ↓
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {image.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-20 h-16 relative rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditImage(image.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          EDIT
                        </button>
                        <button
                          onClick={() => handleDeleteImage(image.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          DELETE
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Total Hero Images: {heroImages.length} | Selected: {selectedImages.length}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Hero Slider Information:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Order matters:</strong> Images are displayed in the order shown above</li>
            <li>• <strong>Use arrows:</strong> Click ↑↓ to reorder images</li>
            <li>• <strong>Edit images:</strong> Replace hero images while keeping the same filename</li>
            <li>• <strong>Delete images:</strong> Remove images from the slider</li>
          </ul>
        </div>
      </div>

      {/* Edit Modal */}
      {editingImage && (
        <EditHeroModal
          image={editingImage}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleSaveEdit}
        />
      )}
    </section>
  );
}
