const baseUrl = "https://localhost:7027/api/User"

const stateText = document.getElementById("stateText")
const submitLoginButton = document.getElementById("submitLogin")

submitLoginButton.addEventListener('click', async (event) => {
  event.preventDefault()
  try {
    const data = await submitRegisterForm()

    stateText.textContent = 'Logged succesfully. Wait for redirection...'
    
    window.location.replace(`${data.redirectionUrl}?accessToken=${data.token}`)
  } catch (error) {
    stateText.textContent = error.message
  }
})

async function submitRegisterForm() {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  if (!username || !password) {
    throw new Error("Complete credentials to continue.")
  }

  const urlParams = new URLSearchParams(window.location.search);
  const redirectionUrl = urlParams.get('redirectionUrl')

  if (!redirectionUrl){
    throw new Error("No redirection url provided.");
  }

  stateText.textContent = 'Login in...'

  const response = await fetch(`${baseUrl}/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password
    }),
  }).catch((error) => { 
    error.message = 'Server is down.'
    throw error
   })

  if (!response.ok) throw new Error("Network response was not ok.");

  const data = await response.json()

  if (!data.token) throw new Error("An error ocurred.");

  return { ...data, redirectionUrl }
}

const submitRegisterButton = document.getElementById("submitRegister")

submitRegisterButton.addEventListener('click', async (event) => {
  event.preventDefault()
  try {
    const data = await submitRegisterForm()

    stateText.textContent = 'Logged succesfully. Wait for redirection...'
    
    window.location.replace(`${data.redirectionUrl}?accessToken=${data.token}`)
  } catch (error) {
    stateText.textContent = error.message
  }
})

async function submitRegisterForm() {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  if (!username || !password) {
    throw new Error("Complete credentials to continue.")
  }

  const urlParams = new URLSearchParams(window.location.search);
  const redirectionUrl = urlParams.get('redirectionUrl')

  if (!redirectionUrl){
    throw new Error("No redirection url provided.");
  }

  stateText.textContent = 'Login in...'

  const response = await fetch(`${baseUrl}/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password
    }),
  }).catch((error) => { 
    error.message = 'Server is down.'
    throw error
   })

  if (!response.ok) throw new Error("Network response was not ok.");

  const data = await response.json()

  if (!data.token) throw new Error("An error ocurred.");

  return { ...data, redirectionUrl }
}
