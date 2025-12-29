import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ahcpbpiqnejztmingajl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoY3BicGlxbmVqenRtaW5nYWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyODkxNDksImV4cCI6MjA2OTg2NTE0OX0.LOfXMTyg_2APCZdQGG5q6exZ1TgXVE05yjL3OeQ8AJk"
);

export default function mediaUpload(file) {
  const promise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected");
    }
    const timeStamp = new Date().getTime();
    const newFileName = timeStamp + file.name;

    supabase.storage
      .from("images")
      .upload(newFileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const url = supabase.storage.from("images").getPublicUrl(newFileName)
          .data.publicUrl;
        resolve(url);
      })
      .catch((error) => {
        console.log(error);
        reject("File upload failed");
      });
  });

  return promise;
}
