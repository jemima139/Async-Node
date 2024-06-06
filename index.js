const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let mockDatabase = [];


const setTimeout= (response, delay) => {
    return new Promise(resolve => setTimeout(() => resolve(response), delay));
};


app.get('/api/data', async (req, res) => {
    const data = setTimeout(() => res.json(mockDatabase[index]), 500); 
    res.json(data);
});


app.post('/api/data', async (req, res) => {
    const newData = req.body;
    newData.id = mockDatabase.length ? mockDatabase[mockDatabase.length - 1].id + 1 : 1;
    mockDatabase.push(newData);
    
    setTimeout(() => res.json(mockDatabase[index]), 500);
    res.status(201).json(newData);
});


app.put('/api/data/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const updateData = req.body;
    const index = mockDatabase.findIndex(item => item.id === id);
    if (index !== -1) {
        mockDatabase[index] = { ...mockDatabase[index], ...updateData };
        
        setTimeout(() => res.json(mockDatabase[index]), 1000);
    } else {
        res.status(404).json({ error: 'Data not found' });
    }
});


app.delete('/api/data/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const index = mockDatabase.findIndex(item => item.id === id);
    if (index !== -1) {
        const deletedData = mockDatabase.splice(index, 1);
        // await simulateDelay(null, 500);
        setTimeout(() => res.json(mockDatabase[index]), 500);
        res.json(deletedData[0]);
    } else {
        res.status(404).json({ error: 'Data not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});