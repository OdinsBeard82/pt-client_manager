const API_BASE_URL = "http://127.0.0.1:8001";

export async function getClients() {
  const response = await fetch(`${API_BASE_URL}/clients/`);

  if (!response.ok) {
    throw new Error("Failed to fetch clients");
  }

  return response.json();
}

export async function getClient(id) {
  const response = await fetch(`${API_BASE_URL}/clients/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch client");
  }

  return response.json();
}


export async function createClient(clientData) {
    const jsonString = JSON.stringify(clientData);

    const response = await fetch(`${API_BASE_URL}/clients/`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: jsonString,
    });  
    
    if (!response.ok) {
        throw new Error("Failed to create clients");
    }
    
    return response.json();
}



export async function updateClient(id, updates) {
  const jsonString = JSON.stringify(updates);

  const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: jsonString,
  });

  if (!response.ok) {
    throw new Error("Failed to update client");
  }

  return response.json();
}

export async function deleteClient(id) {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete client");
    }

    return response.json();
};