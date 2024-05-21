async function fetchData() {
    try {
      const fetch = await import('node-fetch').then(module => module.default);
  
      const response = await fetch('https://web.furrl.in/vibeList?vibe=HomeHunts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 5000 // Timeout in milliseconds (5 seconds)
      });
  
      // Log the response status and status text
      console.log('Response status:', response.status);
      console.log('Response status text:', response.statusText);
  
      // Check if the response status is OK (status code 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
  
      // Parse the JSON from the response
      const data = await response.json();
  
      // Handle the data from the response
      console.log(data);
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  
  // Call the async function
  fetchData();
  