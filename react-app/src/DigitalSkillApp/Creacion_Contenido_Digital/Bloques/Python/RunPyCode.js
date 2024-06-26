export default async function UsePython(code) {
    try {
      const response = await fetch('http://localhost:3000/run-python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pythonCode: code })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error in UsePython function:', error);
      throw error;
    }
  }
  