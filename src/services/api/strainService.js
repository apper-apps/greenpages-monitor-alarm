import mockStrains from "@/services/mockData/strains.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let strains = [...mockStrains];

export const getAllStrains = async () => {
  await delay(300);
  return [...strains.filter(strain => strain.active)];
};

export const getStrainById = async (id) => {
  await delay(200);
  const strain = strains.find(s => s.Id === id);
  if (!strain) {
    throw new Error("Strain not found");
  }
  return { ...strain };
};

export const getSellerStrains = async (sellerId) => {
  await delay(250);
  return [...strains.filter(strain => strain.sellerId === sellerId)];
};

export const createStrain = async (strainData) => {
  await delay(400);
  
  const newId = Math.max(...strains.map(s => s.Id)) + 1;
  const newStrain = {
    Id: newId,
    ...strainData,
    createdAt: new Date().toISOString()
  };
  
  strains.push(newStrain);
  return { ...newStrain };
};

export const updateStrain = async (id, strainData) => {
  await delay(350);
  
  const index = strains.findIndex(s => s.Id === id);
  if (index === -1) {
    throw new Error("Strain not found");
  }
  
  strains[index] = {
    ...strains[index],
    ...strainData,
    updatedAt: new Date().toISOString()
  };
  
  return { ...strains[index] };
};

export const deleteStrain = async (id) => {
  await delay(300);
  
  const index = strains.findIndex(s => s.Id === id);
  if (index === -1) {
    throw new Error("Strain not found");
  }
  
  strains.splice(index, 1);
  return { success: true };
};