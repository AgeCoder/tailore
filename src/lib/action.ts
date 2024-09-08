"use server";

import { signIn } from "@/auth";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { Client, orders, User } from "@/db/schema";
import { hash } from "bcryptjs";
import { revalidatePath } from 'next/cache'
import { FormDatatype } from "@/app/(main)/ClientManagement/types";

export async function SignInAuth(formdata: FormData) {
  const name = formdata.get("name") as string;
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Please fill all the fields" };
  }
  const user = await db
    .select({ email: User.email })
    .from(User)
    .where(eq(User.email, email as string));

  if (user.length > 0) {
    return { error: "User already exists" };
  }
  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(User).values({
      email: email as string,
      name: name as string,
      password: hashedPassword,
    });
  } catch (error) {
    return { error: "Somthing went Wrong Try again" };
  }

  return { success: "User created successfully" };
}

export async function LoginHandlerAuth(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: "Login created successfully" }
  } catch (error: any) {
    // console.log(error);

    return { error: "Invalid credentials" };
  }
}

export async function updateUserMeasurements(formData: FormDatatype) {
  try {
    await db.update(Client).set({
      ...formData
    }).where(eq(Client.phone, formData.phone as string))
    return { message: 'Measurements updated successfully!' }
  } catch (error) {
    // console.log(error);
    return { message: 'Failed to update measurements' }
  }

}

export async function GetClinetdata(phone: string) {
  const client = await db
    .selectDistinct({
      name: Client.name,
      phone: Client.phone,
      address: Client.address,
      dateOfBirth: Client.dateOfBirth,
      top: Client.top,
      length: Client.length,
      chest: Client.chest,
      waist: Client.waist,
      seat: Client.seat,
      shoulder: Client.shoulder,
      sleeve: Client.sleeve,
      churidar: Client.churidar,
      patiala: Client.patiala,
      stand: Client.stand,
      back: Client.back,
      front: Client.front,
      flare: Client.flare,
      vCut: Client.vCut,
    })
    .from(Client)
    .where(eq(Client.phone, phone));
  return client
}

export async function CreateOrder(data: any) {
  const order = await db.insert(orders).values({
    totalAmount: String(data.total),
    bill: data.bill,
    clientPhone: String(data.phone),
    status: "pending",
    advanceAmount: String(data.advancePayment),
    paymentMethod: data.paymentMethod,
    paymentStatus: data.paymentStatus,
    deliveryDate: data.deliveryDate,
    clientName: data.name,
  }).returning({
    id: orders.id,
    clientName: orders.clientName,
    clientPhone: orders.clientPhone,

  })

  // console.log(order);


  return { ...order }
}

export async function createOrderAction(data: any) {
  try {
    const res = await CreateOrder(data)
    revalidatePath('/billing')
    return { success: true, orderId: res[0].id, clientName: res[0].clientName, clientPhone: res[0].clientPhone }
  } catch (error) {
    return { success: false, error: "Error creating order" }
  }
}

export async function getClientDataAction(phone: string) {
  try {
    const res = await GetClinetdata(phone)
    return res && res.length > 0 ? res[0] : null
  } catch (error) {
    throw new Error("Failed to fetch client data")
  }
}

export async function updateMeasurementsAction(formData: FormDatatype) {
  try {
    const result = await updateUserMeasurements(formData)
    revalidatePath('/ClientManagement')
    return result
  } catch (error) {
    throw new Error("Failed to update measurements")
  }
}