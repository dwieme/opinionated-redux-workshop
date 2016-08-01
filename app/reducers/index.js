import { FETCH_CREATOR_POST_FEED_START, FETCH_CREATOR_POST_FEED_SUCCESS } from 'actions/creator-post-feed'

const initialState = {
    posts: []
};

const posts = (state = [], action) => {
    switch(action.type) {
        case FETCH_CREATOR_POST_FEED_SUCCESS:
            return [
                ...state,
                ...action.payload
            ]
        default:
            return state;
    }
};

export const postFeed = (state = initialState, action) => {
    switch(action.type) {
        // case FETCH_CREATOR_POST_FEED_START:
        //     break;
        case FETCH_CREATOR_POST_FEED_SUCCESS:
            return {
                ...state,
                posts: posts(state.posts, action)
            }
        default:
            return state;
    }
}
