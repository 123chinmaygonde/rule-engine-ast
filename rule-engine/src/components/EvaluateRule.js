import React, { useState } from 'react';

const EvaluateRule = () => {
    const [ruleId, setRuleId] = useState('');
    const [userData, setUserData] = useState('');
    const [result, setResult] = useState('');

    const evaluateRule = async () => {
        const response = await fetch('http://localhost:3000/api/rules/evaluate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ruleId, userData: JSON.parse(userData) }),
        });

        const data = await response.json();
        if (!response.ok) {
            setResult(`Error: ${data.message}`);
        } else {
            setResult(`User eligible: ${data.eligible}`);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Evaluate Rule</h2>
            <input
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                type="text"
                value={ruleId}
                onChange={(e) => setRuleId(e.target.value)}
                placeholder="Rule ID"
            />
            <textarea
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                value={userData}
                onChange={(e) => setUserData(e.target.value)}
                placeholder='Enter user data as JSON (e.g. {"age": 35, "department": "Sales", "salary": 60000})'
            ></textarea>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={evaluateRule}
            >
                Evaluate Rule
            </button>
            <div className="mt-4 text-green-500">{result}</div>
        </div>
    );
};

export default EvaluateRule;