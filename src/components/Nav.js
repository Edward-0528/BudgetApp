import React, { useState } from 'react';
import profileImg from '../assets/imgs/profile.ed.jpg';
import { MdAddCard } from "react-icons/md";
import { useProfile } from '../hooks/useProfile';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { MdEdit } from "react-icons/md";

function Nav() {
  const { profile, updateProfile } = useProfile();
  const [open, setOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: profile.name,
    fullName: profile.fullName,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleClickOpen = () => {
    setEditedProfile({
      name: profile.name,
      fullName: profile.fullName,
    });
    setImagePreview(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImagePreview(null);
  };

  const handleInputChange = (field) => (event) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const updates = {
      name: editedProfile.name,
      fullName: editedProfile.fullName,
    };

    if (imagePreview) {
      updates.profileImage = imagePreview;
    }

    updateProfile(updates);
    handleClose();
  };

  // Use custom image if available, otherwise use default
  const displayImage = profile.profileImage || profileImg;

  return (
    <div>
        {/* Navigation bar */}
        <div className="max-w-7xl bg-zinc-900 text-white mx-auto py-6 px-4 sm:px-6 lg:px-8 justify-between flex">
          
          <div className="flex items-center space-x-4">
            <MdAddCard className="w-8 h-8" />
            <p className="text-lg font-semibold justify-start">Add Account</p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-lg font-semibold">Welcome, {profile.name}</p>
            <div className="relative">
              <img 
                src={displayImage} 
                alt="Profile" 
                className="w-14 h-14 rounded-full cursor-pointer hover:opacity-80 transition-opacity" 
                onClick={handleClickOpen}
              />
              <div className="absolute -bottom-1 -right-1 bg-gray-600 rounded-full p-1 hover:bg-gray-500 transition-colors">
                <MdEdit className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Edit Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <div className="flex flex-col items-center mb-4">
              <Avatar
                src={imagePreview || displayImage}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="profile-image-upload">
                <Button variant="outlined" component="span" size="small">
                  Change Picture
                </Button>
              </label>
            </div>
            
            <TextField
              autoFocus
              margin="dense"
              label="First Name"
              type="text"
              fullWidth
              variant="outlined"
              value={editedProfile.name}
              onChange={handleInputChange('name')}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Full Name"
              type="text"
              fullWidth
              variant="outlined"
              value={editedProfile.fullName}
              onChange={handleInputChange('fullName')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained"
              disabled={!editedProfile.name.trim() || !editedProfile.fullName.trim()}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    
  ); 
}

export default Nav;