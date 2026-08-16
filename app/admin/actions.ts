"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const slug = (x: string) =>
  x.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") +
  "-" + Date.now().toString().slice(-6);

async function requireUser() {
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect("/login");
  return s;
}

async function upload(s: any, f: File) {
  if (!f?.size) return null;
  const extension = f.name.split(".").pop() || "jpg";
  const path = Date.now() + "-" + crypto.randomUUID() + "." + extension;
  const { error } = await s.storage.from("card-images").upload(path, f, { contentType: f.type });
  if (error) throw new Error(error.message);
  return s.storage.from("card-images").getPublicUrl(path).data.publicUrl;
}

function cardData(f: FormData, imageUrl: string | null) {
  return {
    name: String(f.get("name")),
    character: String(f.get("character")) || null,
    category: String(f.get("category")),
    set_name: String(f.get("set_name")) || null,
    card_number: String(f.get("card_number")) || null,
    rarity: String(f.get("rarity")) || null,
    grading_company: String(f.get("grading_company")) || null,
    grade: String(f.get("grade")) || null,
    estimated_value: String(f.get("estimated_value")) || null,
    notes: String(f.get("notes")) || null,
    featured: f.get("featured") === "on",
    ...(imageUrl ? { image_url: imageUrl } : {})
  };
}

function refreshPages() {
  revalidatePath("/");
  revalidatePath("/collection");
  revalidatePath("/featured");
  revalidatePath("/admin");
}

export async function add(f: FormData) {
  const s = await requireUser();
  const name = String(f.get("name"));
  const imageFiles = f.getAll("image") as File[];
const selectedImage = imageFiles.find((file) => file && file.size > 0);
const image = selectedImage ? await upload(s, selectedImage) : null;
  const { error } = await s.from("cards").insert({ ...cardData(f, image), slug: slug(name) });
  if (error) throw new Error(error.message);
  refreshPages();
  redirect("/admin");
}

export async function del(id: string) {
  const s = await requireUser();
  const { error } = await s.from("cards").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refreshPages();
}
