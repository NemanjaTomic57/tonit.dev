import { apiUrl } from "@/environment";
import axios from "axios";

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);

    try {
        const r = await axios.post(apiUrl + "admin/login", body);
        console.log(r);
    } catch (error) {
        console.log("Error when logging in: " + error);
    }
}
