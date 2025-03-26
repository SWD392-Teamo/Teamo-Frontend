import { auth } from "@/auth";


const baseUrl = process.env.API_URL;

// GET request
async function get(url: string) {
    const requestOptions = {
        method: 'GET',
        headers: await getHeaders()
    }

    const response = await fetch(baseUrl + url, requestOptions);
    return handleResponse(response);
}

// POST request
async function post(url: string, body: NonNullable<unknown>) {
    const headers = await getHeaders();
    
    // If body is FormData, don't set Content-Type header
    if (body instanceof FormData) {
        delete headers['Content-Type'];
    }

    const requestOptions = {
        method: 'POST',
        headers: headers,
        // Don't stringify if it's FormData
        body: body instanceof FormData ? body : JSON.stringify(body)
    }

    const response = await fetch(baseUrl + url, requestOptions);

    return handleResponse(response);
}

// PUT request
async function put(url: string, body: NonNullable<unknown>) {
    const requestOptions = {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    }

    const response = await fetch(baseUrl + url, requestOptions);

    return handleResponse(response);
}

// PATCH request
async function patch(url: string, body: NonNullable<unknown>) {
    const headers = await getHeaders();
    
    // If body is FormData, don't set Content-Type header
    if (body instanceof FormData) {
        delete headers['Content-Type'];
    }

    const requestOptions = {
        method: 'PATCH',
        headers: headers,
        // Don't stringify if it's FormData
        body: body instanceof FormData ? body : JSON.stringify(body)
    }

    const response = await fetch(baseUrl + url, requestOptions);

    return handleResponse(response);
}

// DELETE request
async function del(url: string) {
    const requestOptions = {
        method: 'DELETE',
        headers: await getHeaders()
    }

    const response = await fetch(baseUrl + url, requestOptions);

    return handleResponse(response);
}

async function getHeaders() {

    // Get session from next auth session
    const session = await auth();

    // Set header attributes
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    } as Record<string, string>;

    // If the session has token then added Authorization header with the token as value
    if (session?.accessToken) {
        headers.Authorization = 'Bearer ' + session.accessToken
    }
    
    return headers;
}

// return JSON data or error object
async function handleResponse(response: Response) {
    const text = await response.text();

    // Check if the error is a json object or normal string
    let data;
    try {
        data = JSON.parse(text);
    } catch (error) {
        data = text;
    }

    if (response.ok) {
        return data || response.statusText;
    } else {
        const errorMessage = data?.message || response.statusText;
        const error = new Error(errorMessage); 

        // (error as any).status = response.status;
        // (error as any).responseData = data;

        throw error;
    }
}

export const fetchWrapper = {
    get,
    post,
    put,
    patch,
    del
}