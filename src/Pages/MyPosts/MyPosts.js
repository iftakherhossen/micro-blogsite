import { Container, Grid } from '@mui/material';
import React from 'react';
import Navigation from '../../Components/Navigation/Navigation';
import WritePost from '../../Components/WritePost/WritePost';
import PostFeed from '../../Components/PostFeed/PostFeed';
import UserInfo from '../../Components/UserInfo/UserInfo';
import Footer from '../../Components/Footer/Footer';

const MyPosts = () => {
    return (
        <div>
            <Navigation />
            <Container>
                <Grid container>
                    <WritePost />
                    <PostFeed />
                    <UserInfo />
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default MyPosts;