import { cookies } from 'next/headers';

const baseUrl = process.env.API_URL;

// GET request
async function get(url: string) {
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: await getHeaders(),
        credentials: 'include'
    }

    const response = await fetch(baseUrl + url, requestOptions);
    return handleResponse(response);
}

// POST request
async function post(url: string, body: NonNullable<unknown>) {
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(body),
        credentials: 'include'
    }

    const response = await fetch(baseUrl + url, requestOptions);

    return handleResponse(response);
}

// PUT request
async function put(url: string, body: NonNullable<unknown>) {
    const requestOptions: RequestInit = {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(body),
        credentials: 'include'
    }

    const response = await fetch(baseUrl + url, requestOptions);

    return handleResponse(response);
}

// DELETE request
async function del(url: string) {
    const requestOptions: RequestInit = {
        method: 'DELETE',
        headers: await getHeaders(),
        credentials: 'include'
    }

    const response = await fetch(baseUrl + url, requestOptions);

    return handleResponse(response);
}

async function getHeaders() {
    // Get cookie from browser
    var cookieHeader = await cookies();
    var cookie = cookieHeader.toString();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    // Set cookie in the header
    if(cookie) {
        headers['Cookie'] = cookie
    }

    return headers;
}

// return JSON data or error object
async function handleResponse(response: Response) {
    const text = await response.text();

    // Extract cookies from response headers
    const cookies = response.headers.get('set-cookie')

    // Check if the error is a json object or normal string
    let data;
    try {
        data = JSON.parse(text);
    } catch (error) {
        data = text;
    }

    if (response.ok) {
        if (cookies) {
            return { data: data || response.statusText, cookies };
        }
        return { data: data || response.statusText };
    } else {
        const error = {
            status: response.status,
            // If there is an error text then display it
            message: typeof(data === 'string') ? data : response.statusText
        }
        return {error}
    }
}

export const fetchWrapper = {
    get,
    post,
    put,
    del
}