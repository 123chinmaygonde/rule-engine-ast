import React, { useState } from 'react';

const CreateRule = () => {
    const [ruleString, setRuleString] = useState('');
    const [ruleName, setRuleName] = useState('');
    const [message, setMessage] = useState('');

    const createRule = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/rules/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ruleString, ruleName })
            });

            if (!response.ok) {
                const errorMessage = await response.text(); // Get the error message
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
            }

            const data = await response.json();
            setMessage(`Rule created: ${JSON.stringify(data)}`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-semibold mb-4'>Create Rule</h2>
            <input
                className='w-full p-2 mb-4 border border-gray-300 rounded-lg'
                type='text'
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                placeholder='Rule Name'
            />
            <input
                className='w-full p-2 mb-4 border border-gray-300 rounded-lg'
                type='text'
                value={ruleString}
                onChange={(e) => setRuleString(e.target.value)}
                placeholder='Rule String'
            />
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={createRule}>Create Rule</button>
            <div className='mt-4 text-green-500'>{message}</div>
        </div>
    );
};

export default CreateRule;