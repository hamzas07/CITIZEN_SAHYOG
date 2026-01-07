import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, FileText, Send, CheckCircle, Image, Video, X, Upload } from 'lucide-react';
import { categories } from "../../data/mockData";
import { createComplaint } from "../../services/complaintService";

export default function NewComplaint() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    address: '',
    latitude: '',
    longitude: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    addFiles(files);
  };

  const addFiles = (files) => {
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const isValidSize = file.size <= 20 * 1024 * 1024; // 20MB
      return (isImage || isVideo) && isValidSize;
    });

    const newFiles = validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('video/') ? 'video' : 'image'
    }));

    setMediaFiles(prev => [...prev, ...newFiles].slice(0, 5)); // Max 5 files
  };

  const removeFile = (id) => {
    setMediaFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);

    mediaFiles.forEach((media) => {
      data.append("media", media.file);
    });

    await createComplaint(data);

    setSuccess(true);
    setTimeout(() => navigate("/dashboard"), 2000);
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6)
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center animate-pulse-glow relative">
            <div className="absolute inset-0 rounded-full bg-success/10 animate-ping" />
            <CheckCircle className="w-12 h-12 text-success relative z-10" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Complaint Submitted!</h2>
          <p className="text-muted-foreground">Your complaint has been registered successfully.</p>
          <p className="text-sm text-muted-foreground mt-2">Redirecting to your complaints...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
          <FileText className="w-4 h-4" />
          New Grievance
        </div>
        <h1 className="text-3xl font-bold text-foreground">Submit Your Complaint</h1>
        <p className="text-muted-foreground mt-2">
          Provide detailed information to help us address your concern quickly
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-strong rounded-2xl p-8 space-y-6 animate-fade-in stagger-1">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Complaint Title <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief title describing your complaint"
              className="w-full px-4 py-3.5 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50 transition-all duration-300"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category <span className="text-destructive">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground transition-all duration-300"
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description <span className="text-destructive">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide detailed information about your complaint..."
              rows={5}
              className="w-full px-4 py-3.5 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 resize-none"
              required
            />
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Upload Photos / Videos
            </label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative rounded-xl border-2 border-dashed transition-all duration-300 ${
                dragActive 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border/50 hover:border-primary/50 bg-muted/30'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <p className="text-foreground font-medium mb-1">
                  Drag & drop files here, or{' '}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-primary hover:underline"
                  >
                    browse
                  </button>
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports: JPG, PNG, GIF, MP4, MOV (Max 20MB each, up to 5 files)
                </p>
              </div>
            </div>

            {/* Preview Files */}
            {mediaFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {mediaFiles.map((media) => (
                  <div
                    key={media.id}
                    className="relative group aspect-square rounded-xl overflow-hidden bg-muted border border-border"
                  >
                    {media.type === 'video' ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-muted">
                        <Video className="w-8 h-8 text-muted-foreground" />
                        <video 
                          src={media.preview} 
                          className="absolute inset-0 w-full h-full object-cover opacity-50"
                        />
                      </div>
                    ) : (
                      <img
                        src={media.preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeFile(media.id)}
                        className="p-2 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-1 left-1">
                      {media.type === 'video' ? (
                        <Video className="w-4 h-4 text-white drop-shadow" />
                      ) : (
                        <Image className="w-4 h-4 text-white drop-shadow" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Location Section */}
        <div className="glass-strong rounded-2xl p-8 space-y-6 animate-fade-in stagger-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Location Details</h3>
              <p className="text-sm text-muted-foreground">Where is the issue located?</p>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Address / Location <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter the location of the issue"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50 transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Latitude
              </label>
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="28.6139"
                className="w-full px-4 py-3.5 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Longitude
              </label>
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="77.2090"
                className="w-full px-4 py-3.5 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50 transition-all duration-300"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={getCurrentLocation}
            className="text-sm text-primary hover:text-primary/80 flex items-center gap-2 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Use my current location
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl btn-primary text-lg flex items-center justify-center gap-3 animate-fade-in stagger-3"
        >
          {loading ? (
            <>
              <div className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Complaint
            </>
          )}
        </button>
      </form>
    </div>
  );
}
