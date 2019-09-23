export interface UserState {
    username: string;
    pwd: string;
    image: string;
}

export const initialUserState: UserState = {
    username: '',
    pwd: '',
    image: ''
}