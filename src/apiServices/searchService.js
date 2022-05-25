import * as request from '~/utils/request';

export const search = async (query, type = 'less') => {
    try {
        const res = await request.getData('users/search', {
            params: {
                q: query,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
