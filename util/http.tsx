import axios from "axios";

const BACKEND_URL =
  "https://cat-tracker-7657b-default-rtdb.europe-west1.firebasedatabase.app/";

export async function storeCat(catData: {}) {
  const response = await axios.post(BACKEND_URL + "/cats.json", catData);
  const id = response.data.name;
  return id;
}

export async function fetchCats() {
  const response = await axios.get(BACKEND_URL + "/cats.json");

  const cats = [];

  for (const key in response.data) {
    const catObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
      name: response.data[key].name,
    };
    cats.push(catObj);
  }

  return cats;
}

export function updateCat(id: string, catData: {}) {
  return axios.put(BACKEND_URL + `/cats/${id}.json`, catData);
}

export function deleteCat(id: string) {
  return axios.delete(BACKEND_URL + `/cats/${id}.json`);
}
