import axios, { AxiosError } from 'axios';

export async function POST(request: Request) {
    const body = await request.json();
    const url = "https://script.google.com/macros/s/AKfycbwZl2qXGZ6rzaO2QFFfXcsUdfQ9IdS9k4JGs3wqrCySVcQgNDyb7jTcSvDWvy6aNGQoGw/exec";
    try {
        const { data } = await axios.post(url, body, {
            headers: { 'Content-Type': 'application/json' },
        });
        return Response.json(data);
    } catch (error) {
        const axiosError = error as AxiosError;
        return Response.json({
            status: false,
            error:
                axiosError.response?.data ?? axiosError.message,
        });
    }
}
