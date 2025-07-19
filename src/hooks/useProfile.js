import { useState, useEffect } from 'react';

// Default profile data
const defaultProfile = {
  name: 'Edward',
  fullName: 'Edward Smith',
  profileImage: null, // Will use default image if null
};

// LocalStorage key for profile
const PROFILE_STORAGE_KEY = 'budgetApp_profile';

// Helper functions for localStorage
const loadProfileFromStorage = () => {
  try {
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (savedProfile) {
      return { ...defaultProfile, ...JSON.parse(savedProfile) };
    }
  } catch (error) {
    console.error('Error loading profile from localStorage:', error);
  }
  return defaultProfile;
};

const saveProfileToStorage = (profile) => {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('profileUpdated', { detail: profile }));
  } catch (error) {
    console.error('Error saving profile to localStorage:', error);
  }
};

// Custom hook for profile management
export const useProfile = () => {
  const [profile, setProfile] = useState(defaultProfile);

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = loadProfileFromStorage();
    setProfile(savedProfile);
  }, []);

  // Listen for profile updates from other components
  useEffect(() => {
    const handleProfileUpdate = (event) => {
      setProfile(event.detail);
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  const updateProfile = (newProfile) => {
    const updatedProfile = { ...profile, ...newProfile };
    setProfile(updatedProfile);
    saveProfileToStorage(updatedProfile);
  };

  return {
    profile,
    updateProfile,
  };
};
