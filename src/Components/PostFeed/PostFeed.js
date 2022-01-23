import { Alert, Grid, IconButton, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FeedPost from '../FeedPost/FeedPost';
import CloseIcon from '@mui/icons-material/Close';

const PostFeed = () => {
    const [users, setUsers] = useState([]);
    const [post, setPost] = useState([]);
    const [success, setSuccess] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        fetch('https://shrouded-eyrie-37217.herokuapp.com/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    useEffect(() => {
        fetch('https://shrouded-eyrie-37217.herokuapp.com/posts')
            .then(res => res.json())
            .then(data => setPost(data));
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    const handleDelete = (id) => {
        const url = `https://shrouded-eyrie-37217.herokuapp.com/posts/${id}`
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                const confirm = window.confirm('Are you sure? You wanna delete your post!')

                if (confirm === true) {
                    if (data.deletedCount) {
                        setSuccess(true);
                        setOpenSnackbar(true);
                        const remaining = post.filter(p => p._id !== id);
                        setPost(remaining);
                        window.location.reload();
                    }
                }
                else {
                    setPost(data);
                    window.location.reload();
                }
            })
    }


    return (
        <Grid item xs={12} sm={12} md={5.5} className="gridCard">
            {
                post.slice(0).reverse().map(singlePost => <FeedPost
                    key="singlePost._id"
                    singlePost={singlePost}
                    handleDelete={handleDelete}
                />)
            }

            {success && <Snackbar open={openSnackbar} autoHideDuration={2000} action={action}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Post deleted successfully!
                </Alert>
            </Snackbar>}
        </Grid>
    );
};

export default PostFeed;