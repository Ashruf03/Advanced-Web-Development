import bcrypt from "bcrypt";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function POST(request: Request){
    
    let data;
    let name: string | null = null;
    
    // read data from the request body
    try {
        data = await request.json();
    } catch {
        return Response.json({error: "Invalid JSON"}, {status: 400});
    }

    // validate the data
    if (typeof data !== "object" || data === null){
        return Response.json({error: "Invalid data"}, {status: 400});
    }

    if (typeof data.email !== "string" || data.email.trim() === ""){
        return Response.json({error: "Email is required"}, {status: 400});
    }

    if (typeof data.password !== "string" || data.password.trim() === ""){
        return Response.json({error: "Password is required"}, {status: 400});
    }

    // normalise the email address
    const email = data.email.trim().toLowerCase();

    // check if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)){
        return Response.json({error: "Invalid email address"}, {status: 400});
    }

    // check if the password is valid
    if (data.password.length < 15){
        return Response.json({error: "Password must be at least 15 characters long"}, {status: 400});
    }

    if (data.password !== data.confirmed_password){
        return Response.json({error: "Passwords do not match"}, {status: 400});
    }

    // check bytes
    if (Buffer.byteLength(data.password, "utf8") > 72 ){
        return Response.json({error: "Password exceeds max number of bytes, try a shorter password"}, {status: 400})
    }

    // check if name is given
    if (data.name != null){
        if (typeof data.name !== "string"){
            return Response.json({error: "Invalid name"}, {status: 400});
        }

        name = data.name.trim() || null;
        
        // check if given name is valid
        if (name && name.length > 50){
                return Response.json({error: "Name must not exceed 50 characters long"}, {status: 400});
        }
    }

    try {
        // check if email already exists
        const existingUser = await prisma.user.findUnique({where: {email: email}});
        
        if (existingUser){
            return Response.json({error: "Email already exists"}, {status: 409});
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(data.password, 12);

        // create the user
        await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name
            }});
            return Response.json({message: "Successfully created account"}, {status: 201});

    } 
    catch (error){
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"){
            return Response.json({error: "Email already exists"}, {status: 409});
        }
        else{
        return Response.json({error: "Unable to create account"}, {status: 500});
        }
    }
}