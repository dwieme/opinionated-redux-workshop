import jsonApiUrl from 'utils/json-api-url'
import fetch from 'isomorphic-fetch'
import { camelizeKeys } from 'humps'

export const FETCH_CREATOR_POST_FEED_START = 'FETCH_CREATOR_POST_FEED_START'
export const FETCH_CREATOR_POST_FEED_SUCCESS = 'FETCH_CREATOR_POST_FEED_SUCCESS'

const fetchCreatorPostFeedStart = () => {
    return { type: FETCH_CREATOR_POST_FEED_START };
}

const fetchCreatorPostFeedSuccess = (payload) => {
    return { type: FETCH_CREATOR_POST_FEED_SUCCESS, payload };
}

const fetchCreatorPostFeedIncludes = ['user.null']
const fetchCreatorPostFeedFields = {
    'post': [
        'title',
        'content',
        'like_count',
        'image',
        'published_at',
        'current_user_has_liked'
    ],
    'user': [
        'image_url',
        'full_name'
    ]
}

export const fetchCreatorPostFeed = (creatorId) => {
    return (dispatch, getState) => {
        const url = jsonApiUrl('/stream', {
            'include': fetchCreatorPostFeedIncludes,
            'fields': fetchCreatorPostFeedFields,
            'page': {
                'cursor': 'null'
            },
            'filter': {
                'is_by_creator': 'true',
                'is_following': 'false',
                'creator_id': creatorId
            }
        })

        dispatch(fetchCreatorPostFeedStart());

        fetch(url).then((response) => {
            return response.json()
        }).then((payload) => {
            const massagedData = payload.data.map((post) => {
                return {
                    ...post.attributes,
                    id: post.id
                }
            })

            dispatch(fetchCreatorPostFeedSuccess(massagedData));
        })
    };
}
