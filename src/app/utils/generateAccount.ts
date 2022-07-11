import * as admin from "firebase-admin";
import { readFileSync } from "fs";
import { join } from "path";

export const filePath = "C:\\Users\\Sedna\\Downloads\\commerc-71c2d-firebase-adminsdk-g0mbw-f7484fa4cc.json";

export const data = JSON.parse(readFileSync(join(filePath)).toString());

export const generateAdminAccount = () => {
    admin.initializeApp({
        credential: admin.credential.cert(data),
        databaseURL: "https://commerc-71c2d-default-rtdb.firebaseio.com"
    });
};