import { Avatar, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Box } from "@mui/system";
import React, { useEffect, useState } from 'react';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Profile = ({ userData }) => {
    const [userPost, setUserPost] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://shrouded-eyrie-37217.herokuapp.com/posts/${userData.email}`)
            .then(res => res.json())
            .then(data => setUserPost(data));
    }, [userData.email])

    const handleSavedPosts = () => {
        const link = `/users/${userData.displayName}/savedPosts`;
        const updateLink = link.replace(/ /g, '');
        navigate(updateLink)
    }

    return (
        <Grid item xs={12} sm={12} md={3} className="userInfoGridCard" data-aos="fade-right">
            <Box className="userInfoGrid">
                <Box sx={{ py: 2 }}>
                    <Box className="alignCenter">
                        <Avatar
                            alt={userData.displayName}
                            src={userData.photoURL}
                            className="avatar"
                            sx={{ width: 100, height: 100, mt: 1, mb: 3, mx: 'auto' }}
                        />
                    </Box>
                    <Box className="userName">
                        <Typography variant="h5">{userData.displayName}</Typography>
                    </Box>
                    <Box className="alignCenter">
                        {userData.email && <Typography variant="body2">Total Post - {userPost.length}</Typography>}
                    </Box>
                    {userData.displayName === user?.displayName && <Tooltip title="Saved Posts">
                        <IconButton type="button" onClick={handleSavedPosts}>
                            <FolderSpecialIcon sx={{ color: '#0693E3', fontSize: '1.25em' }} />
                        </IconButton>
                    </Tooltip>}
                </Box>
            </Box>
        </Grid>
    );
};

export default Profile;