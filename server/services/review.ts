import { MESSAGE_TYPE } from './../constants';
import { IResult } from './../interfaces/common';
import BaseServerContext from "../baseServerContext";

export default class ReviewService extends BaseServerContext {
    public async findReviewById(id: number) {
        const { Reviews } = this.di;
        let result: IResult = {};
        result.data = await Reviews.findByPk(id);
        result.message = 'Review which id is ' + id + ' was ' + (result.data ? '' : ' not ') + 'found';
        result.messageType = result.data ? MESSAGE_TYPE.SUCCEEDED_CONSOLE : MESSAGE_TYPE.ERROR_CONSOLE;
        return result;
    }

    public async findAllReviews() {
        const { Reviews } = this.di;
        let result: IResult = {};
        result.data = await Reviews.findAll();
        result.message = 'All reviews was ' + (result.data ? '' : ' not ') + 'found';
        result.messageType = result.data ? MESSAGE_TYPE.SUCCEEDED_TOAST : MESSAGE_TYPE.ERROR_TOAST;
        return result;
    }

    public async findReviewsUsersOnStores() {
        const { Reviews, Users, Stores } = this.di;
        let result: IResult = {};
        result.data = await Reviews.findAll({
            include: [
                { model: Users },
                { model: Stores }
            ]
        });
        result.message = 'All reviews was ' + (result.data ? '' : ' not ') + 'found';
        result.messageType = result.data ? MESSAGE_TYPE.SUCCEEDED_TOAST : MESSAGE_TYPE.ERROR_TOAST;
        return result;
    }

    public async findReviewUserOnStore(id: number) {
        const { Reviews, Users, Stores } = this.di;
        let result: IResult = {};
        result.data = await Reviews.findOne({
            where: { id },
            include: [
                { model: Users },
                { model: Stores }
            ]
        });
        result.message = 'Review which id is ' + id + ' was ' + (result.data ? '' : ' not ') + 'found';
        result.messageType = result.data ? MESSAGE_TYPE.SUCCEEDED_CONSOLE : MESSAGE_TYPE.ERROR_CONSOLE;
        return result;
    }
}