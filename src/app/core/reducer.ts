import { Action } from '@ngrx/store';
import { UserState, initialUserState } from './model';
import { ADD_USER, RESET } from './actions';

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export function CommentsReducer(state: UserState = initialUserState, action: ActionWithPayload<UserState>) {
    switch (action.type) {
        case ADD_USER:
            return {...state, ...action.payload};
        case RESET:
            return {...state, initialUserState};
        default:
            return state;

    }
}