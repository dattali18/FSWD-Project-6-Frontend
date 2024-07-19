// load the environment variables
import { config } from "dotenv";

config();

// export the base url
export const BASE_URL = process.env.API_URL;