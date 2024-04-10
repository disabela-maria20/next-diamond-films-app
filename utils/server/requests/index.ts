const baseURL = process.env.API_URL
const headers = new Headers()
headers.append('Content-Type', 'application/json')
headers.append('token', process.env.API_TOKEN || '')

export async function getCatalogoFilme(slug: string) {
  try {
    const res = await fetch(`${baseURL}/movie/get/${slug}`, {
      headers,
      cache: 'force-cache',
      next: { revalidate: 3600 }
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export async function getHome() {
  try {
    const res = await fetch(`${baseURL}/movie/list-all`, {
      headers,
      cache: 'force-cache',
      next: { revalidate: 3600 }
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export async function getHomeBanner() {
  try {
    const res = await fetch(`${baseURL}/banner-home`, {
      headers,
      cache: 'force-cache',
      next: { revalidate: 3600 }
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export async function postNewsletter(
  name: string,
  email: string,
  phone: string,
  url: string
) {
  try {
    const res = await fetch(`${baseURL}/save/optin`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, email, phone, url })
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export async function postContact(
  name: string,
  email: string,
  phone: string,
  message: string
) {
  try {
    const res = await fetch(`${baseURL}/save/optin`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, email, phone, message })
    })
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}
