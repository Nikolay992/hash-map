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
