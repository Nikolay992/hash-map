// USER Fetches
export const requestProduct = async (productId) => {
  await fetch(`http://localhost:3000/api/tracking/trackProduct?productId=${productId}`)
    .catch(error => console.log('error', error))

  const response = await fetch("/api/requestProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      'productId': productId
    }),
  });

  if (!response.ok) {
    console.log(`Error: ${response.status}`);
  }

  const data = await response.json();
  console.log('POST: ', data);
}

export const orderProduct = async (productId) => {
  await fetch(`http://localhost:3000/api/tracking/trackProduct?productId=${productId}`)
    .catch(error => console.log('error', error))

  const response = await fetch("/api/orderProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      'productId': productId
    }),
  });

  if (!response.ok) {
    console.log(`Error: ${response.status}`);
  }

  const data = await response.json()
    .then((res) => res)
  console.log('POST: ', data);
  return { ...data }
}

// ADMIN Fetches
export const updateProductQty = async (productId, newQty) => {
  const response = await fetch("/api/admin/updateQty", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      'productId': productId,
      newQty
    }),
  });

  if (!response.ok) {
    console.log(`Error: ${response.status}`);
  }

  const data = await response.json()
    .then((res) => res)
  console.log('POST: ', data);
  return { ...data }
}

export const editProduct = async (productId, { productName, note }) => {
  const response = await fetch("/api/admin/editProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      'productId': productId,
      productName,
      note
    }),
  });

  if (!response.ok) {
    console.log(`Error: ${response.status}`);
  }

  const data = await response.json()
    .then((res) => res)
  console.log('POST: ', data);
  return { ...data }
}

export const createProduct = async (productData) => {
  const response = await fetch("/api/admin/createProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      productData
    }),
  });

  if (!response.ok) {
    return `${response.error}`;
  }

  const data = await response.json()
    .then((res) => res)
  console.log('POST: ', data);
  return { ...data }
}

export const deleteProducts = async (productId) => {
  const response = await fetch("/api/admin/deleteProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      'productId': productId
    }),
  });

  if (!response.ok) {
    console.log(`Error: ${response.status}`);
  }

  const data = await response.json()
    .then((res) => res)
  console.log('POST: ', data);
  return { ...data }
}
