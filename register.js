const baseUrl = "https://localhost:7027/api/User"

const stateText = document.getElementById("stateText")
const submitRegisterButton = document.getElementById("submitRegister")

submitRegisterButton.addEventListener('click', async (event) => {
  event.preventDefault()
  try {
    const data = await submitRegisterForm()

    if (!data) {
      stateText.textContent = 'Could not register succesfully. Try again'
      window.location.reload()
    }

    stateText.textContent = 'Register succesfully. Wait for redirection...'

    window.location.pathname = '/index.html'
  } catch (error) {
    stateText.textContent = error.message
  }
})

async function submitRegisterForm() {
  const email = document.getElementById('email').value
  const username = document.getElementById('username').value
  const fullName = document.getElementById('fullName').value
  const password = document.getElementById('password').value

  if (!username || !password || !fullName || !email) {
    throw new Error("Complete credentials to continue.")
  }

  stateText.textContent = 'Registering...'

  const response = await fetch(`${baseUrl}/Register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      username,
      fullName,
      password,
    }),
  }).catch((error) => { 
    error.message = 'Server is down.'
    throw error
   })

  if (!response.ok) throw new Error("Network response was not ok.");

  return await response.json()
}
