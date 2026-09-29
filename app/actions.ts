"use server";

import {db} from "@/database";
import {users} from "@/database/schema";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";

export async function createUser(formData: FormData) {
    await db.insert(users).values({
        name: formData.get("name") as string,
        age: 12,
        email: formData.get("email") as string,
    });

    revalidatePath("/");
}

export async function updateUser(formData: FormData) {
    const id = Number(formData.get("id"));
    await db
        .update(users)
        .set({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
        })
        .where(eq(users.id, id));

    revalidatePath("/");
}

export async function deleteUser(formData: FormData) {
    const id = Number(formData.get("id"));
    await db.delete(users).where(eq(users.id, id));

    revalidatePath("/");
}