export const API_BASE_URL = 'https://678f678849875e5a1a91b27f.mockapi.io/houses';
const LOCATIONIQ_API_KEY = "pk.fdd1c8d05e7d370f85ea023d73555606"; 





export const getAddressFromCoords = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      {
        headers: {
          "User-Agent": "frontent@/1.0.0 kmchanchal185@gmail.com", 
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch address: ${response.statusText}`);
    }

    const data = await response.json();

    // console.log("API Response:", data);

    return data.display_name || "Location not found";
  } catch (error) {
    console.error("Error fetching address:", error.message);
    return "Location not found";
  }
};




export const fetchHomes = async () => {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch homes: ${response.statusText}`);
    }

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      throw new Error("Invalid JSON response from server");
    }

    return data;
  } catch (error) {
    console.error("Error fetching homes:", error.message);
    throw new Error(error.message || "Something went wrong while fetching homes");
  }
};



export const unlockHome = async (homeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${homeId}/unlock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'unlocked' }),
    });

    let result;
    try {
      result = await response.json();
    } catch (jsonError) {
      throw new Error('Invalid JSON response from server');
    }

    if (!response.ok) {
      throw new Error(result?.message || 'Unlock failed');
    }

    return result;
  } catch (error) {
    console.error('Error unlocking home:', error.message);
    throw new Error(error.message || 'Something went wrong');
  }
};





