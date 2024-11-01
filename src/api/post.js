import { URL } from "../utils/constants";

const response = {
    code: 200,
    detail: "OK",
    data: null
}

const postData = {
    topic_id: 1,
    topic_title: "Programming",
    topic_by: "J. Carmack",
    post_date: "2024-10-14T18:40:00Z",
    post_title: "Panzofi test",
    post_subtitle: "Test for Panzofi in React",
    post_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    votes: 1,
    comments: 4
}

const sideMenuData = {
    first_container: {
        topic_title: "Programming",
        topic_description: "All about programming",
        topic_creation_date: "2006-10-14T18:40:00Z",
        topic_members: 100,
        topic_active_members: 14,
        topic_top: 3,
        community_options: [
            { key: 'opcion1', text: 'Opción 1', value: 'opcion1' },
            { key: 'opcion2', text: 'Opción 2', value: 'opcion2' },
            { key: 'opcion3', text: 'Opción 3', value: 'opcion3' }
        ]
    },
    second_container: [
        {
            rule: 'Keep submissions on topic and of high quality',
            description: 'Post content relevant to programming and ensure it provides value to the community.'
        },
        {
            rule: 'No surveys',
            description: 'Surveys, questionnaires, or forms to collect user information are not allowed.'
        },
        {
            rule: 'No résumés/job listings',
            description: 'Do not post résumés or job listings; this is not a place to seek or offer employment.'
        },
        {
            rule: '/r/programming is not a support forum',
            description: 'This subreddit is not intended for technical support or resolving specific code issues.'
        },
        {
            rule: 'Spam',
            description: 'Spam is not allowed. Avoid posting promotional or irrelevant content to the community.'
        },
    ],
    third_container: {
        infoLinks: [
            "/r/learnprogramming",
            "/r/askcareerquestions",
            "Stack Overflow",
            "/r/ProgrammerHumor",
            "/r/forhire",
            "/r/jobbit",
            "faq",
            "Read this first"
        ],
        relatedLinks: [
            "/r/technology",
            "/r/ProgrammerTIL",
            "/r/learnprogramming",
            "/r/askprogramming",
            "/r/coding",
            "/r/compsci",
            "/r/dailyprogrammer",
            "/r/netsec",
            "/r/webdev",
            "/r/awt",
            "/r/gamedev"
        ]
    }
}

const comments = [
    {
        id: 1,
        username: 'User123',
        role: 'Member',
        date: '2024-10-30T14:45:00Z',
        content: 'Este es un comentario muy interesante sobre el artículo.',
        votes: 12,
        userVote: null,
        responses: []
    },
    {
        id: 2,
        username: 'DevGuru',
        role: 'Moderator',
        date: '2024-10-29T10:30:00Z',
        content: 'Estoy de acuerdo con lo mencionado, especialmente en la parte sobre la creatividad humana.',
        votes: 25,
        userVote: null,
        responses: [
            {
                id: 1,
                username: '89Coder',
                role: 'Moderator',
                date: '2024-10-27T16:15:00Z',
                content: 'Te respondo luego',
                votes: 1,
                userVote: null,
                responses: [] 
            }
        ]
    },
    {
        id: 3,
        username: 'Coder89',
        role: 'Member',
        date: '2024-10-27T16:15:00Z',
        content: 'AI todavía no puede reemplazar la empatía y la comprensión del contexto que tenemos los humanos.',
        votes: 18,
        userVote: null,
        responses: []
    },
    {
        id: 4,
        username: 'TechLover',
        role: 'Member',
        date: '2024-10-26T09:00:00Z',
        content: 'Me encanta cómo se abordan los límites actuales de la IA en este artículo.',
        votes: 10,
        userVote: null,
        responses: []
    },
]

export async function getPostDataApi(id) {
    try {
        // const response = await fetch(`${URL}/getPostById/${id}`)
        const postResponse = { ...response };
        postResponse.data = postData;
        return postResponse;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getSideMenuDataApi(id) {
    try {
        const sideMenuResponse = { ...response };
        sideMenuResponse.data = sideMenuData;
        return sideMenuResponse;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getCommentsByIdPostApi(id) {
    try {
        const commentsResponse = { ...response };
        commentsResponse.data = comments
        return commentsResponse
    } catch (error) {
        throw new Error(error)
    }
}