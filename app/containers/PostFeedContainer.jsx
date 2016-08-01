import { connect } from 'react-redux'
import { fetchCreatorPostFeed } from '../actions/creator-post-feed'
import PostFeed from 'components/PostFeed'
import { CREATOR_ID } from '../index.js'

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.postFeed.posts // SELECTOR FTW
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMount: () => {
            dispatch(fetchCreatorPostFeed(CREATOR_ID));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFeed)
