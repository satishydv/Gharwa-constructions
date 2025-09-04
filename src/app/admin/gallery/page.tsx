'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EditImageModal from '@/components/Admin/EditImageModal';

interface GalleryImage {
  id: number;
  name: string;
  filename: string;
  url: string;
  alt: string;
}

export default function AdminGalleryPage() {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([
    {
      id: 1,
      name: "Gallery Image 1",
      filename: "gallery-1.jpg",
      url: "/Gallery/gallery-1.jpg",
      alt: "Construction site view"
    },
    {
      id: 2,
      name: "Gallery Image 2",
      filename: "gallery-2.jpg",
      url: "/Gallery/gallery-2.jpg",
      alt: "Building exterior"
    },
    {
      id: 3,
      name: "Gallery Image 3",
      filename: "gallery-3.jpg",
      url: "/Gallery/gallery-3.jpg",
      alt: "Interior design"
    },
    {
      id: 4,
      name: "Gallery Image 4",
      filename: "gallery-4.jpg",
      url: "/Gallery/gallery-4.jpg",
      alt: "Project overview"
    },
    {
      id: 5,
      name: "Gallery Image 5",
      filename: "gallery-5.webp",
      url: "/Gallery/gallery-5.webp",
      alt: "Construction progress"
    },
    {
      id: 6,
      name: "Gallery Image 6",
      filename: "gallery-6.webp",
      url: "/Gallery/gallery-6.webp",
      alt: "Final result"
    },
    {
      id: 7,
      name: "Gallery Image 7",
      filename: "gallery-7.webp",
      url: "/Gallery/gallery-7.webp",
      alt: "Project showcase"
    },
    {
      id: 8,
      name: "Gallery Image 8",
      filename: "gallery-8.jpg",
      url: "/Gallery/gallery-8.jpg",
      alt: "Completed work"
    }
  ]);

  // Edit modal state
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedImages(galleryImages.map(img => img.id));
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
    
    if (confirm(`Are you sure you want to delete ${selectedImages.length} selected images?`)) {
      setGalleryImages(prev => prev.filter(img => !selectedImages.includes(img.id)));
      setSelectedImages([]);
    }
  };

  const handleDeleteImage = (id: number) => {
    if (confirm('Are you sure you want to delete this image?')) {
      setGalleryImages(prev => prev.filter(img => img.id !== id));
    }
  };

  const handleEditImage = (id: number) => {
    const image = galleryImages.find(img => img.id === id);
    if (image) {
      setEditingImage(image);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = (updatedImage: GalleryImage) => {
    setGalleryImages(prev => 
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-600">Gallery Images</h1>
              <p className="text-gray-600 mt-2">Manage your gallery images</p>
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
                href="/admin/gallery/upload"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                ADD
              </Link>
            </div>
          </div>
        </div>

        {/* Gallery Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    <input
                      type="checkbox"
                      checked={selectedImages.length === galleryImages.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    EDIT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    DELETE
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {galleryImages.map((image) => (
                  <tr key={image.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedImages.includes(image.id)}
                        onChange={(e) => handleSelectImage(image.id, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {image.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {image.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEditImage(image.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        EDIT
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Total Images: {galleryImages.length} | Selected: {selectedImages.length}
        </div>
      </div>

      {/* Edit Modal */}
      {editingImage && (
        <EditImageModal
          image={editingImage}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
