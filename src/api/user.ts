import service from './request';

export interface Info {
    name: string;
    age: number;
}

// get请求
export const getTopicsInfo = () => {
    return service.get<Info>('/api/topics');
};
