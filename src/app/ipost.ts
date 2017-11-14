import { IComment } from './icomment';
export interface IPost {
    id: number;
    title: string;
    body: string;
    comments: Array<IComment>;
}
