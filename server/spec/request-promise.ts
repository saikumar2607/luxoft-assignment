import { BASE_URL } from './utils';
import * as request from "request";

export function get(relativePath: string, options = {}): Promise<{ response: any, body: string; }> {
    return new Promise((resolve, reject) => {
        request.get(BASE_URL + relativePath, options, (error: any, response: any, body: any) => {
            if (error) {
                return reject(error);
            }
            resolve({ response, body });
        });
    });
}

export function post(relativePath: string, options?: any): Promise<{ response: any, body: string; }> {
    let url = relativePath.startsWith('/') ? BASE_URL + relativePath : relativePath;
    return new Promise((resolve, reject) => {
        request.post(url, options, (error: any, response: any, body: any) => {
            if (error) {
                return reject(error);
            }
            resolve({ response, body });
        });
    });
}
