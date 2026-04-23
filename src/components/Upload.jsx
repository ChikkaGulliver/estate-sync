import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../firebase/config";

export default function Upload() {
  const storage = getStorage(app);

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, "docs/" + file.name);
    await uploadBytes(storageRef, file);
    alert("Uploaded!");
  };

  return <input type="file" onChange={uploadFile} />;
}
