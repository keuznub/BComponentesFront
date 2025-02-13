import Rate from "../models/Rate";
import fetchAPI from "./FetchAPI/fetchAPI";

export class RateService{
    static getAvgByProductId = async (id: number) => await fetchAPI(`rates/${id}`,"GET")
    static save = async (rate:Rate) => await fetchAPI(`rates/`,"POST",rate)
}

export default RateService